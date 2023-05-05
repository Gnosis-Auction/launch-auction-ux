const EasyAuctionABI = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "auctionId", type: "uint256" },
      { indexed: false, internalType: "uint96", name: "soldAuctioningTokens", type: "uint96" },
      { indexed: false, internalType: "uint96", name: "soldBiddingTokens", type: "uint96" },
      { indexed: false, internalType: "bytes32", name: "clearingPriceOrder", type: "bytes32" },
    ],
    name: "AuctionCleared",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "auctionId", type: "uint256" },
      { indexed: true, internalType: "uint64", name: "userId", type: "uint64" },
      { indexed: false, internalType: "uint96", name: "buyAmount", type: "uint96" },
      { indexed: false, internalType: "uint96", name: "sellAmount", type: "uint96" },
    ],
    name: "CancellationSellOrder",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "auctionId", type: "uint256" },
      { indexed: true, internalType: "uint64", name: "userId", type: "uint64" },
      { indexed: false, internalType: "uint96", name: "buyAmount", type: "uint96" },
      { indexed: false, internalType: "uint96", name: "sellAmount", type: "uint96" },
    ],
    name: "ClaimedFromOrder",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "auctionId", type: "uint256" },
      { indexed: true, internalType: "contract IERC20", name: "_auctioningToken", type: "address" },
      { indexed: true, internalType: "contract IERC20", name: "_biddingToken", type: "address" },
      { indexed: false, internalType: "uint256", name: "orderCancellationEndDate", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "auctionEndDate", type: "uint256" },
      { indexed: false, internalType: "uint64", name: "userId", type: "uint64" },
      { indexed: false, internalType: "uint96", name: "_auctionedSellAmount", type: "uint96" },
      { indexed: false, internalType: "uint96", name: "_minBuyAmount", type: "uint96" },
      { indexed: false, internalType: "uint256", name: "minimumBiddingAmountPerOrder", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "minFundingThreshold", type: "uint256" },
      { indexed: false, internalType: "address", name: "allowListContract", type: "address" },
      { indexed: false, internalType: "bytes", name: "allowListData", type: "bytes" },
    ],
    name: "NewAuction",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "auctionId", type: "uint256" },
      { indexed: true, internalType: "uint64", name: "userId", type: "uint64" },
      { indexed: false, internalType: "uint96", name: "buyAmount", type: "uint96" },
      { indexed: false, internalType: "uint96", name: "sellAmount", type: "uint96" },
    ],
    name: "NewSellOrder",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint64", name: "userId", type: "uint64" },
      { indexed: true, internalType: "address", name: "userAddress", type: "address" },
    ],
    name: "NewUser",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "previousOwner", type: "address" },
      { indexed: true, internalType: "address", name: "newOwner", type: "address" },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      { indexed: false, internalType: "uint64", name: "userId", type: "uint64" },
    ],
    name: "UserRegistration",
    type: "event",
  },
  {
    inputs: [],
    name: "FEE_DENOMINATOR",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "auctionAccessData",
    outputs: [{ internalType: "bytes", name: "", type: "bytes" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "auctionAccessManager",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "auctionCounter",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "auctionData",
    outputs: [
      { internalType: "contract IERC20", name: "auctioningToken", type: "address" },
      { internalType: "contract IERC20", name: "biddingToken", type: "address" },
      { internalType: "uint256", name: "orderCancellationEndDate", type: "uint256" },
      { internalType: "uint256", name: "auctionEndDate", type: "uint256" },
      { internalType: "bytes32", name: "initialAuctionOrder", type: "bytes32" },
      { internalType: "uint256", name: "minimumBiddingAmountPerOrder", type: "uint256" },
      { internalType: "uint256", name: "interimSumBidAmount", type: "uint256" },
      { internalType: "bytes32", name: "interimOrder", type: "bytes32" },
      { internalType: "bytes32", name: "clearingPriceOrder", type: "bytes32" },
      { internalType: "uint96", name: "volumeClearingPriceOrder", type: "uint96" },
      { internalType: "bool", name: "minFundingThresholdNotReached", type: "bool" },
      { internalType: "bool", name: "isAtomicClosureAllowed", type: "bool" },
      { internalType: "uint256", name: "feeNumerator", type: "uint256" },
      { internalType: "uint256", name: "minFundingThreshold", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "auctionId", type: "uint256" },
      { internalType: "bytes32[]", name: "_sellOrders", type: "bytes32[]" },
    ],
    name: "cancelSellOrders",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "auctionId", type: "uint256" },
      { internalType: "bytes32[]", name: "orders", type: "bytes32[]" },
    ],
    name: "claimFromParticipantOrder",
    outputs: [
      { internalType: "uint256", name: "sumAuctioningTokenAmount", type: "uint256" },
      { internalType: "uint256", name: "sumBiddingTokenAmount", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "auctionId", type: "uint256" },
      { internalType: "bytes32", name: "order", type: "bytes32" },
    ],
    name: "containsOrder",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "feeNumerator",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "feeReceiverUserId",
    outputs: [{ internalType: "uint64", name: "", type: "uint64" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "auctionId", type: "uint256" }],
    name: "getSecondsRemainingInBatch",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "getUserId",
    outputs: [{ internalType: "uint64", name: "userId", type: "uint64" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract IERC20", name: "_auctioningToken", type: "address" },
      { internalType: "contract IERC20", name: "_biddingToken", type: "address" },
      { internalType: "uint256", name: "orderCancellationEndDate", type: "uint256" },
      { internalType: "uint256", name: "auctionEndDate", type: "uint256" },
      { internalType: "uint96", name: "_auctionedSellAmount", type: "uint96" },
      { internalType: "uint96", name: "_minBuyAmount", type: "uint96" },
      { internalType: "uint256", name: "minimumBiddingAmountPerOrder", type: "uint256" },
      { internalType: "uint256", name: "minFundingThreshold", type: "uint256" },
      { internalType: "bool", name: "isAtomicClosureAllowed", type: "bool" },
      { internalType: "address", name: "accessManagerContract", type: "address" },
      { internalType: "bytes", name: "accessManagerContractData", type: "bytes" },
    ],
    name: "initiateAuction",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "numUsers",
    outputs: [{ internalType: "uint64", name: "", type: "uint64" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "auctionId", type: "uint256" },
      { internalType: "uint96[]", name: "_minBuyAmounts", type: "uint96[]" },
      { internalType: "uint96[]", name: "_sellAmounts", type: "uint96[]" },
      { internalType: "bytes32[]", name: "_prevSellOrders", type: "bytes32[]" },
      { internalType: "bytes", name: "allowListCallData", type: "bytes" },
    ],
    name: "placeSellOrders",
    outputs: [{ internalType: "uint64", name: "userId", type: "uint64" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "auctionId", type: "uint256" },
      { internalType: "uint96[]", name: "_minBuyAmounts", type: "uint96[]" },
      { internalType: "uint96[]", name: "_sellAmounts", type: "uint96[]" },
      { internalType: "bytes32[]", name: "_prevSellOrders", type: "bytes32[]" },
      { internalType: "bytes", name: "allowListCallData", type: "bytes" },
      { internalType: "address", name: "orderSubmitter", type: "address" },
    ],
    name: "placeSellOrdersOnBehalf",
    outputs: [{ internalType: "uint64", name: "userId", type: "uint64" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "auctionId", type: "uint256" },
      { internalType: "uint256", name: "iterationSteps", type: "uint256" },
    ],
    name: "precalculateSellAmountSum",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "registerUser",
    outputs: [{ internalType: "uint64", name: "userId", type: "uint64" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  { inputs: [], name: "renounceOwnership", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [
      { internalType: "uint256", name: "newFeeNumerator", type: "uint256" },
      { internalType: "address", name: "newfeeReceiverAddress", type: "address" },
    ],
    name: "setFeeParameters",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "auctionId", type: "uint256" }],
    name: "settleAuction",
    outputs: [{ internalType: "bytes32", name: "clearingOrder", type: "bytes32" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "auctionId", type: "uint256" },
      { internalType: "uint96[]", name: "_minBuyAmount", type: "uint96[]" },
      { internalType: "uint96[]", name: "_sellAmount", type: "uint96[]" },
      { internalType: "bytes32[]", name: "_prevSellOrder", type: "bytes32[]" },
      { internalType: "bytes", name: "allowListCallData", type: "bytes" },
    ],
    name: "settleAuctionAtomically",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const ERC20ABI = [
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [
      {
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_spender",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_from",
        type: "address",
      },
      {
        name: "_to",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [
      {
        name: "",
        type: "uint8",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [
      {
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_to",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
      {
        name: "_spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    payable: true,
    stateMutability: "payable",
    type: "fallback",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
];
const DAIABI = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "chainId_",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "src",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "guy",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "wad",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: true,
    inputs: [
      {
        indexed: true,
        internalType: "bytes4",
        name: "sig",
        type: "bytes4",
      },
      {
        indexed: true,
        internalType: "address",
        name: "usr",
        type: "address",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "arg1",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "arg2",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "LogNote",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "src",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "dst",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "wad",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    constant: true,
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "PERMIT_TYPEHASH",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "usr",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "wad",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "usr",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "wad",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "guy",
        type: "address",
      },
    ],
    name: "deny",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "usr",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "wad",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "src",
        type: "address",
      },
      {
        internalType: "address",
        name: "dst",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "wad",
        type: "uint256",
      },
    ],
    name: "move",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "nonces",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "nonce",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "expiry",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "allowed",
        type: "bool",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "permit",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "usr",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "wad",
        type: "uint256",
      },
    ],
    name: "pull",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "usr",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "wad",
        type: "uint256",
      },
    ],
    name: "push",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "guy",
        type: "address",
      },
    ],
    name: "rely",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "dst",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "wad",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "src",
        type: "address",
      },
      {
        internalType: "address",
        name: "dst",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "wad",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "version",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "wards",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

// Mainnet DAI, Optimism and Arbitrium Rollup Contracts with local addresses
module.exports = {
  1: {
    contracts: {
      DAI: {
        address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
        abi: DAIABI,
      },
      UNI: {
        address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
        abi: ERC20ABI,
      },
      EasyAuction: {
        address: "0x0b7ffc1f4ad541a4ed16b40d8c37f0929158d101",
        abi: EasyAuctionABI,
      },
    },
  },
  5: {
    contracts: {
      EasyAuction: {
        address: "0x1fbab40c338e2e7243da945820ba680c92ef8281",
        abi: EasyAuctionABI,
      },
    },
  },
  100: {
    contracts: {
      EasyAuction: {
        address: "0x0b7ffc1f4ad541a4ed16b40d8c37f0929158d101",
        abi: EasyAuctionABI,
      },
    },
  },
  137: {
    contracts: {
      EasyAuction: {
        address: "0x0b7ffc1f4ad541a4ed16b40d8c37f0929158d101",
        abi: EasyAuctionABI,
      },
    },
  },
  80001: {
    contracts: {
      EasyAuction: {
        address: "0x4100aF1E6e8bBc174fc5da4D409e1e3C03F1f85E",
        abi: EasyAuctionABI,
      },
    },
  },
};
