# HybridAgent — Smart Contracts

Full-settlement escrow for property/vehicle sales, denominated in **USDC**, with
automatic agent-commission splitting. Built with Hardhat + OpenZeppelin.

## Contracts

- **`MandateRegistry.sol`** — on-chain "agent of record" agreements. An owner
  authorizes a specific agent to broker a specific listing for an agreed
  commission, with an expiry. The agent accepts; the escrow reads this to decide
  whether (and how much) commission is owed.
- **`HybridEscrow.sol`** — the buyer funds the full price in USDC; on completion
  the contract atomically pays **agent → commission**, **platform → fee**,
  **seller → remainder**. The seller can never be paid without the commission
  being carved out, so an agent cannot be cheated.
- **`mocks/MockUSDC.sol`** — 6-decimal test token (local/testnet only).

## Deal lifecycle

```
createDeal → fundDeal → confirmCompletion        (buyer confirms)
                      ↘ claimAfterTimeout         (seller, after dispute window)
                      ↘ raiseDispute → resolveDispute (arbiter: release or refund)
createDeal → cancelDeal                            (before funding)
```

`OWNER_DIRECT` deals (agent = `address(0)`, mandateId = 0) pay no commission.
`AGENT_BROKERED` deals require a valid accepted mandate.

## Usage

```bash
cp .env.example .env
npm install
npm test                 # 5 passing tests cover both flows + disputes

# Local chain
npx hardhat node         # terminal 1
npm run deploy:local     # terminal 2

# Public testnet (set PRIVATE_KEY + RPC + USDC_ADDRESS in .env)
npm run deploy:baseSepolia
```

Deployment writes `deployments/<network>.json` and prints the env values the
backend needs (`USDC_ADDRESS`, `MANDATE_REGISTRY_ADDRESS`, `HYBRID_ESCROW_ADDRESS`).

## Recommended chains

EVM L2s with native USDC and cheap gas: **Base** (84532 = Sepolia) or
**Arbitrum** (421614 = Sepolia). On mainnet, set `USDC_ADDRESS` to Circle's
native USDC for that chain — never deploy `MockUSDC` to production.
