const { ethers } = require("ethers");
const config = require("./index");

// Human-readable ABIs — only the fragments the backend reads/indexes.
const MANDATE_ABI = [
  "function nextMandateId() view returns (uint256)",
  "function getMandate(uint256 id) view returns (tuple(address owner,address agent,bytes32 listingRef,uint16 commissionBps,uint64 expiry,uint8 status))",
  "function validate(uint256 id,address owner,address agent,bytes32 listingRef) view returns (bool ok,uint16 commissionBps)",
  "event MandateCreated(uint256 indexed id,address indexed owner,address indexed agent,bytes32 listingRef,uint16 commissionBps,uint64 expiry)",
  "event MandateAccepted(uint256 indexed id,address indexed agent)",
  "event MandateRevoked(uint256 indexed id,address indexed owner)",
];

const ESCROW_ABI = [
  "function nextDealId() view returns (uint256)",
  "function platformFeeBps() view returns (uint16)",
  "function getDeal(uint256 id) view returns (tuple(address buyer,address seller,address agent,uint256 price,uint16 commissionBps,uint16 platformFeeBps,uint256 mandateId,bytes32 listingRef,uint8 state,uint64 fundedAt,uint64 disputeDeadline))",
  "function quote(uint256 price,uint16 commissionBps) view returns (uint256 commission,uint256 fee,uint256 proceeds)",
  "event DealCreated(uint256 indexed id,address indexed buyer,address indexed seller,address agent,uint256 price,uint16 commissionBps,uint16 platformFeeBps,bytes32 listingRef,uint256 mandateId)",
  "event DealFunded(uint256 indexed id,address indexed buyer,uint256 price,uint64 disputeDeadline)",
  "event DealCompleted(uint256 indexed id,uint256 proceeds,uint256 commission,uint256 fee)",
  "event DealDisputed(uint256 indexed id,address indexed by)",
  "event DealRefunded(uint256 indexed id,address indexed buyer,uint256 amount)",
  "event DealCancelled(uint256 indexed id)",
];

let provider = null;
let mandateRegistry = null;
let hybridEscrow = null;

if (config.chainConfigured) {
  provider = new ethers.JsonRpcProvider(config.rpcUrl, config.chainId);
  mandateRegistry = new ethers.Contract(config.mandateRegistryAddress, MANDATE_ABI, provider);
  hybridEscrow = new ethers.Contract(config.hybridEscrowAddress, ESCROW_ABI, provider);
}

module.exports = { ethers, provider, mandateRegistry, hybridEscrow };
