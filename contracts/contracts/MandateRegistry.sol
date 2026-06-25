// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title MandateRegistry
/// @notice On-chain "agent of record" agreements. An owner authorizes a specific
///         agent to broker a specific listing for an agreed commission, for a
///         limited period. This is the record that prevents an owner from later
///         denying the agent's role, and the source of truth the escrow reads to
///         decide whether (and how much) commission is owed.
contract MandateRegistry {
    enum MandateStatus {
        None,
        Pending,
        Accepted,
        Revoked
    }

    struct Mandate {
        address owner; // owner granting the mandate (the seller)
        address agent; // agent authorized to broker the sale
        bytes32 listingRef; // hash linking to the off-chain listing
        uint16 commissionBps; // agreed commission, basis points (100 = 1%)
        uint64 expiry; // unix timestamp after which the mandate is void
        MandateStatus status;
    }

    /// @notice Hard cap on commission to protect owners from fat-finger / abuse.
    uint16 public constant MAX_COMMISSION_BPS = 3000; // 30%

    uint256 public nextMandateId = 1;
    mapping(uint256 => Mandate) private _mandates;

    event MandateCreated(
        uint256 indexed id,
        address indexed owner,
        address indexed agent,
        bytes32 listingRef,
        uint16 commissionBps,
        uint64 expiry
    );
    event MandateAccepted(uint256 indexed id, address indexed agent);
    event MandateRevoked(uint256 indexed id, address indexed owner);

    /// @notice Owner authorizes `agent` to broker `listingRef` for `commissionBps`.
    function createMandate(
        address agent,
        bytes32 listingRef,
        uint16 commissionBps,
        uint64 expiry
    ) external returns (uint256 id) {
        require(agent != address(0) && agent != msg.sender, "bad agent");
        require(commissionBps > 0 && commissionBps <= MAX_COMMISSION_BPS, "bad commission");
        require(expiry > block.timestamp, "bad expiry");

        id = nextMandateId++;
        _mandates[id] = Mandate({
            owner: msg.sender,
            agent: agent,
            listingRef: listingRef,
            commissionBps: commissionBps,
            expiry: expiry,
            status: MandateStatus.Pending
        });

        emit MandateCreated(id, msg.sender, agent, listingRef, commissionBps, expiry);
    }

    /// @notice The agent accepts the mandate, making it a mutual agreement.
    function acceptMandate(uint256 id) external {
        Mandate storage m = _mandates[id];
        require(m.status == MandateStatus.Pending, "not pending");
        require(m.agent == msg.sender, "not agent");
        m.status = MandateStatus.Accepted;
        emit MandateAccepted(id, msg.sender);
    }

    /// @notice The owner revokes a mandate (only before it is consumed by a deal).
    function revokeMandate(uint256 id) external {
        Mandate storage m = _mandates[id];
        require(m.owner == msg.sender, "not owner");
        require(
            m.status == MandateStatus.Pending || m.status == MandateStatus.Accepted,
            "cannot revoke"
        );
        m.status = MandateStatus.Revoked;
        emit MandateRevoked(id, msg.sender);
    }

    function getMandate(uint256 id) external view returns (Mandate memory) {
        return _mandates[id];
    }

    /// @notice Validate that mandate `id` currently authorizes `agent` to broker
    ///         `listingRef` on behalf of `owner`. Used by the escrow at deal time.
    function validate(
        uint256 id,
        address owner,
        address agent,
        bytes32 listingRef
    ) external view returns (bool ok, uint16 commissionBps) {
        Mandate storage m = _mandates[id];
        ok =
            m.status == MandateStatus.Accepted &&
            m.owner == owner &&
            m.agent == agent &&
            m.listingRef == listingRef &&
            m.expiry > block.timestamp;
        commissionBps = m.commissionBps;
    }
}
