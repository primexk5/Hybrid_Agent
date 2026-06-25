const { expect } = require("chai");
const { ethers } = require("hardhat");

const USDC = (n) => ethers.parseUnits(n.toString(), 6);
const LISTING_REF = ethers.id("listing:demo:1");

describe("HybridEscrow", function () {
  let usdc, mandates, escrow;
  let admin, owner, agent, buyer, feeRecipient, arbiter;
  const platformFeeBps = 100; // 1%

  beforeEach(async function () {
    [admin, owner, agent, buyer, feeRecipient, arbiter] = await ethers.getSigners();

    const MockUSDC = await ethers.getContractFactory("MockUSDC");
    usdc = await MockUSDC.deploy();

    const MandateRegistry = await ethers.getContractFactory("MandateRegistry");
    mandates = await MandateRegistry.deploy();

    const HybridEscrow = await ethers.getContractFactory("HybridEscrow");
    escrow = await HybridEscrow.deploy(
      await usdc.getAddress(),
      await mandates.getAddress(),
      feeRecipient.address,
      platformFeeBps,
      arbiter.address
    );

    await usdc.mint(buyer.address, USDC(1_000_000));
    await usdc.connect(buyer).approve(await escrow.getAddress(), USDC(1_000_000));
  });

  async function createAcceptedMandate(commissionBps) {
    const expiry = (await ethers.provider.getBlock("latest")).timestamp + 86400;
    await mandates.connect(owner).createMandate(agent.address, LISTING_REF, commissionBps, expiry);
    const id = (await mandates.nextMandateId()) - 1n;
    await mandates.connect(agent).acceptMandate(id);
    return id;
  }

  it("splits an agent-brokered sale: agent commission, platform fee, owner remainder", async function () {
    const price = USDC(100_000);
    const commissionBps = 500; // 5%
    const mandateId = await createAcceptedMandate(commissionBps);

    await escrow
      .connect(agent)
      .createDeal(buyer.address, owner.address, agent.address, price, LISTING_REF, mandateId);
    const dealId = (await escrow.nextDealId()) - 1n;

    await escrow.connect(buyer).fundDeal(dealId);
    expect(await usdc.balanceOf(await escrow.getAddress())).to.equal(price);

    await escrow.connect(buyer).confirmCompletion(dealId);

    expect(await usdc.balanceOf(agent.address)).to.equal(USDC(5_000)); // 5%
    expect(await usdc.balanceOf(owner.address)).to.equal(USDC(94_000)); // remainder
    // Platform fee is retained in the contract, not pushed to feeRecipient.
    expect(await usdc.balanceOf(feeRecipient.address)).to.equal(0);
    expect(await escrow.accruedFees()).to.equal(USDC(1_000)); // 1%
    expect(await usdc.balanceOf(await escrow.getAddress())).to.equal(USDC(1_000));

    // Only the deployer (owner) can withdraw fees.
    await expect(escrow.connect(agent).withdrawFees()).to.be.revertedWithCustomError(
      escrow,
      "OwnableUnauthorizedAccount"
    );
    await escrow.connect(admin).withdrawFees();
    expect(await usdc.balanceOf(feeRecipient.address)).to.equal(USDC(1_000));
    expect(await escrow.accruedFees()).to.equal(0);
    expect(await usdc.balanceOf(await escrow.getAddress())).to.equal(0);
  });

  it("pays no commission on an owner-direct sale", async function () {
    const price = USDC(50_000);

    await escrow
      .connect(owner)
      .createDeal(buyer.address, owner.address, ethers.ZeroAddress, price, LISTING_REF, 0);
    const dealId = (await escrow.nextDealId()) - 1n;

    await escrow.connect(buyer).fundDeal(dealId);
    await escrow.connect(buyer).confirmCompletion(dealId);

    expect(await usdc.balanceOf(owner.address)).to.equal(USDC(49_500));
    expect(await usdc.balanceOf(agent.address)).to.equal(0);
    expect(await escrow.accruedFees()).to.equal(USDC(500)); // 1% retained for deployer
  });

  it("rejects an agent-brokered deal without a valid mandate", async function () {
    const price = USDC(10_000);
    await expect(
      escrow
        .connect(agent)
        .createDeal(buyer.address, owner.address, agent.address, price, LISTING_REF, 999)
    ).to.be.revertedWith("invalid mandate");
  });

  it("lets the arbiter refund the buyer on a dispute", async function () {
    const price = USDC(20_000);
    await escrow
      .connect(owner)
      .createDeal(buyer.address, owner.address, ethers.ZeroAddress, price, LISTING_REF, 0);
    const dealId = (await escrow.nextDealId()) - 1n;

    await escrow.connect(buyer).fundDeal(dealId);
    await escrow.connect(buyer).raiseDispute(dealId);
    await escrow.connect(arbiter).resolveDispute(dealId, false);

    expect(await usdc.balanceOf(buyer.address)).to.equal(USDC(1_000_000));
  });

  it("lets the seller claim after the dispute window elapses", async function () {
    const price = USDC(30_000);
    await escrow
      .connect(owner)
      .createDeal(buyer.address, owner.address, ethers.ZeroAddress, price, LISTING_REF, 0);
    const dealId = (await escrow.nextDealId()) - 1n;

    await escrow.connect(buyer).fundDeal(dealId);
    await ethers.provider.send("evm_increaseTime", [7 * 86400 + 1]);
    await ethers.provider.send("evm_mine", []);

    await escrow.connect(owner).claimAfterTimeout(dealId);
    expect(await usdc.balanceOf(owner.address)).to.equal(USDC(29_700)); // minus 1% fee
  });
});
