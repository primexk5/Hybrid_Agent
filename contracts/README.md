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

## Deploy to Base Sepolia (target network)

The deploy script **auto-uses Circle's real test USDC** on Base Sepolia
(`0x036CbD53842c5426634e7929541eC2318f3dCF7e`) — no `MockUSDC` on public chains.

1. Create a fresh deployer wallet. **This wallet becomes the contract owner — the
   only address that can withdraw platform fees** (`withdrawFees()`).
2. Fund it:
   - Base Sepolia ETH (gas) — a Base Sepolia faucet.
   - Test USDC — https://faucet.circle.com (select Base Sepolia).
3. `cp .env.example .env` and set `PRIVATE_KEY` (leave `USDC_ADDRESS` blank to
   auto-resolve). Optionally set `FEE_RECIPIENT` / `ARBITER` / `PLATFORM_FEE_BPS`.
4. Deploy:
   ```bash
   npm run deploy:baseSepolia
   ```
5. Paste the printed `CHAIN_ID / USDC_ADDRESS / MANDATE_REGISTRY_ADDRESS /
   HYBRID_ESCROW_ADDRESS` into `backend/.env` to switch the indexer on.
6. (Optional) Verify on Basescan — set `BASESCAN_API_KEY` in `.env`, then run the
   `npx hardhat verify …` command the deploy script prints.

## Networks

| Network | chainId | USDC (auto) |
|---|---|---|
| `baseSepolia` (target) | 84532 | Circle test USDC |
| `base` (production) | 8453 | Circle native USDC |
| `arbitrumSepolia` | 421614 | Circle test USDC |
| `localhost` / `hardhat` | — | MockUSDC (auto-deployed) |

Production target is **Base mainnet** (cheap L2 gas, native USDC) — never deploy
`MockUSDC` there.
