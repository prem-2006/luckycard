
## 🔗 Contract Address
`0x270455692EFc56c5A88e946194be5C3E2A7dc29c`  
Explorer Ref: https://coston2-explorer.flare.network/address/0x270455692EFc56c5A88e946194be5C3E2A7dc29c

<img width="1346" height="613" alt="image" src="https://github.com/user-attachments/assets/e6a04868-c6e8-47a9-b02f-0e33fb7d0a1f" />




## 📌 Overview
**Lucky Card** is a beginner-friendly decentralized application deployed on **Flare Coston2 Testnet** that allows users to draw a random lucky card from a predefined collection stored entirely inside the smart contract. The contract is deployed without requiring any constructor parameters, enabling a frictionless deployment and interaction experience.

Users can trigger `drawCard()` on-chain to generate a lucky card, and later retrieve their most recently drawn result using `myLuckyCard()` which reads from a persistent mapping (`lastCard`). The project serves both as a learning benchmark for randomness, state storage, wallet integration, and smart contract consumption on the client side.

## ✨ Features
- 🚀 **Zero-config deployment** — no constructor arguments or input fields during deployment
- 🎲 **Public card draw** via `drawCard()` (nonpayable)
- 🧾 **User-specific state storage** using a mapping (`lastCard[address] → string`)
- 👤 **Self-read API** with `myLuckyCard()` to fetch last drawn card for the caller
- 🔐 **Wallet-gated UI** ensuring only connected wallets interact
- ⏳ **Loading, pending and error states** preserved using Wagmi + Viem hooks
- 🌐 **Flare Testnet support** (Coston2)

## 🧩 Problem & Solution
### Problem:
Beginner dApps that rely on user input during contract deployment introduce unnecessary complexity for learning or onboarding flows. Many sample projects also lack practical state persistence, real wallet gating, or demonstrate rewardful interactions in a themed context.

### Solution:
Lucky Card solves this by shipping:
- **Hardcoded lucky card library** inside the contract, removing deployment-time inputs
- **On-chain state memory** so every wallet retains the last drawn card and can read it anytime
- **Simple test-safe randomness** for concept understanding
- **A ready-to-plug React/TSX integration** powered by Wagmi/Viem for fetching and writing contract state

### Use Cases:
- Onboarding new Solidity developers building themed dApps
- Learning contract randomness, state storage, and front-end web3 integration
- Hackathons, fun reward experiments, rarity extensions, and NFT upgrades

---

## 🏗 Tech Stack
- **Solidity `0.8.x`**
- **Flare Coston2 Testnet**
- **React (TSX)**
- **Wagmi Hooks**
- **Viem Utilities**
- **TypeScript (Viem/Wagmi compatible ABI — `as const` format)**

---

This project is intentionally minimal for rapid iteration and learning. Future upgrades may include verifiable randomness (VRF), NFT minting, rarity tiers, or reward payouts while preserving the same **zero-input-deployment philosophy**.
