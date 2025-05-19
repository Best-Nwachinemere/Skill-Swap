const contractABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "previousAdmin",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "newAdmin",
          "type": "address"
        }
      ],
      "name": "AdminChanged",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "auctionId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "seller",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "skillDescription",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "minBid",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "duration",
          "type": "uint256"
        }
      ],
      "name": "AuctionCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "auctionId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "winner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "AuctionSettled",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "beacon",
          "type": "address"
        }
      ],
      "name": "BeaconUpgraded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint8",
          "name": "version",
          "type": "uint8"
        }
      ],
      "name": "Initialized",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "auctionId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "bidder",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "bidAmount",
          "type": "uint256"
        }
      ],
      "name": "NewBid",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "auctionId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "PayoutReleased",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "implementation",
          "type": "address"
        }
      ],
      "name": "Upgraded",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "auctionCounter",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "auctions",
      "outputs": [
        {
          "internalType": "address",
          "name": "seller",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "skillDescription",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "minBid",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "highestBid",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "highestBidder",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "endTime",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "settled",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "paidOut",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "auctionId",
          "type": "uint256"
        }
      ],
      "name": "bid",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "skillDescription",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "minBid",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "durationInSeconds",
          "type": "uint256"
        }
      ],
      "name": "createAuction",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "initialize",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "auctionId",
          "type": "uint256"
        }
      ],
      "name": "payout",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "proxiableUUID",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "auctionId",
          "type": "uint256"
        }
      ],
      "name": "settleAuction",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newImplementation",
          "type": "address"
        }
      ],
      "name": "upgradeTo",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newImplementation",
          "type": "address"
        },
        {
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
        }
      ],
      "name": "upgradeToAndCall",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    }
  ]

const contractAddress = "0x13c3AF52cc89fe31E998a2E2A2cfEcBe656122E5"

// Initialize contract
function initContract() {
  if (!window.liskSDK && !window.web3) {
    return { success: false, error: "LISK SDK not initialized" }
  }

  try {
    // Use LISK SDK if available, otherwise fallback to web3
    const contract = window.liskSDK
      ? new window.liskSDK.Contract(contractABI, contractAddress)
      : new window.web3.eth.Contract(contractABI, contractAddress)

    return { success: true, contract }
  } catch (error) {
    return { success: false, error: "Failed to initialize contract" }
  }
}

// Get all auctions
async function getAuctions() {
  const contractResult = initContract()
  if (!contractResult.success) return contractResult

  const contract = contractResult.contract

  try {
    const auctionCount = await contract.methods.auctionCounter().call()
    const auctions = []

    for (let i = 0; i < auctionCount; i++) {
      const auction = await contract.methods.auctions(i).call()
      auctions.push({
        id: i,
        seller: auction.seller,
        skillDescription: auction.skillDescription,
        minBid: window.liskSDK
          ? window.liskSDK.utils.fromWei(auction.minBid, "ether")
          : window.web3.utils.fromWei(auction.minBid, "ether"),
        highestBid: window.liskSDK
          ? window.liskSDK.utils.fromWei(auction.highestBid, "ether")
          : window.web3.utils.fromWei(auction.highestBid, "ether"),
        highestBidder: auction.highestBidder,
        endTime: auction.endTime * 1000, // Convert to milliseconds
        settled: auction.settled,
        paidOut: auction.paidOut,
      })
    }

    return { success: true, auctions }
  } catch (error) {
    return { success: false, error: "Failed to fetch auctions" }
  }
}

// Create auction
async function createAuction(skillDescription, minBid, durationInSeconds, account) {
  const contractResult = initContract()
  if (!contractResult.success) return contractResult

  const contract = contractResult.contract

  try {
    const minBidWei = window.liskSDK
      ? window.liskSDK.utils.toWei(minBid.toString(), "ether")
      : window.web3.utils.toWei(minBid.toString(), "ether")

    const result = await contract.methods
      .createAuction(skillDescription, minBidWei, durationInSeconds)
      .send({ from: account })

    return { success: true, transactionHash: result.transactionHash }
  } catch (error) {
    return { success: false, error: "Failed to create auction" }
  }
}

// Place bid
async function placeBid(auctionId, bidAmount, account) {
  const contractResult = initContract()
  if (!contractResult.success) return contractResult

  const contract = contractResult.contract

  try {
    const bidAmountWei = window.liskSDK
      ? window.liskSDK.utils.toWei(bidAmount.toString(), "ether")
      : window.web3.utils.toWei(bidAmount.toString(), "ether")

    const result = await contract.methods.bid(auctionId).send({ from: account, value: bidAmountWei })

    return { success: true, transactionHash: result.transactionHash }
  } catch (error) {
    return { success: false, error: "Failed to place bid" }
  }
}

// Settle auction
async function settleAuction(auctionId, account) {
  const contractResult = initContract()
  if (!contractResult.success) return contractResult

  const contract = contractResult.contract

  try {
    const result = await contract.methods.settleAuction(auctionId).send({ from: account })

    return { success: true, transactionHash: result.transactionHash }
  } catch (error) {
    return { success: false, error: "Failed to settle auction" }
  }
}

// Payout
async function payout(auctionId, account) {
  const contractResult = initContract()
  if (!contractResult.success) return contractResult

  const contract = contractResult.contract

  try {
    const result = await contract.methods.payout(auctionId).send({ from: account })

    return { success: true, transactionHash: result.transactionHash }
  } catch (error) {
    return { success: false, error: "Failed to process payout" }
  }
}

// Export functions
window.contractUtils = {
  getAuctions,
  createAuction,
  placeBid,
  settleAuction,
  payout,
}
