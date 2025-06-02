export default [
  {
    'inputs': [],
    'name': 'DepositDoesNotExist',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'ERC721EnumerableForbiddenBatchMint',
    'type': 'error',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'sender',
        'type': 'address',
      },
      {
        'internalType': 'uint256',
        'name': 'tokenId',
        'type': 'uint256',
      },
      {
        'internalType': 'address',
        'name': 'owner',
        'type': 'address',
      },
    ],
    'name': 'ERC721IncorrectOwner',
    'type': 'error',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'operator',
        'type': 'address',
      },
      {
        'internalType': 'uint256',
        'name': 'tokenId',
        'type': 'uint256',
      },
    ],
    'name': 'ERC721InsufficientApproval',
    'type': 'error',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'approver',
        'type': 'address',
      },
    ],
    'name': 'ERC721InvalidApprover',
    'type': 'error',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'operator',
        'type': 'address',
      },
    ],
    'name': 'ERC721InvalidOperator',
    'type': 'error',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'owner',
        'type': 'address',
      },
    ],
    'name': 'ERC721InvalidOwner',
    'type': 'error',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'receiver',
        'type': 'address',
      },
    ],
    'name': 'ERC721InvalidReceiver',
    'type': 'error',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'sender',
        'type': 'address',
      },
    ],
    'name': 'ERC721InvalidSender',
    'type': 'error',
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': 'tokenId',
        'type': 'uint256',
      },
    ],
    'name': 'ERC721NonexistentToken',
    'type': 'error',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'owner',
        'type': 'address',
      },
      {
        'internalType': 'uint256',
        'name': 'index',
        'type': 'uint256',
      },
    ],
    'name': 'ERC721OutOfBoundsIndex',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'IncorrectAmount',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'IncorrectDeposit',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'IncorrectLeaf',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'IncorrectPercent',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'InsufficientTopNodeAmount',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'InvalidInitialization',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'LeafNotExist',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'LeafNumberRangeExceeded',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'LiquidityIsLocked',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'NotEnoughLiquidity',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'NotEnoughLockedLiquidity',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'NotInitializing',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'OnlyAdmin',
    'type': 'error',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'owner',
        'type': 'address',
      },
    ],
    'name': 'OwnableInvalidOwner',
    'type': 'error',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'account',
        'type': 'address',
      },
    ],
    'name': 'OwnableUnauthorizedAccount',
    'type': 'error',
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': false,
        'internalType': 'address',
        'name': 'newAdmin',
        'type': 'address',
      },
    ],
    'name': 'AdminChanged',
    'type': 'event',
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'owner',
        'type': 'address',
      },
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'approved',
        'type': 'address',
      },
      {
        'indexed': true,
        'internalType': 'uint256',
        'name': 'tokenId',
        'type': 'uint256',
      },
    ],
    'name': 'Approval',
    'type': 'event',
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'owner',
        'type': 'address',
      },
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'operator',
        'type': 'address',
      },
      {
        'indexed': false,
        'internalType': 'bool',
        'name': 'approved',
        'type': 'bool',
      },
    ],
    'name': 'ApprovalForAll',
    'type': 'event',
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': false,
        'internalType': 'uint64',
        'name': 'version',
        'type': 'uint64',
      },
    ],
    'name': 'Initialized',
    'type': 'event',
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'previousOwner',
        'type': 'address',
      },
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'newOwner',
        'type': 'address',
      },
    ],
    'name': 'OwnershipTransferred',
    'type': 'event',
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'from',
        'type': 'address',
      },
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'to',
        'type': 'address',
      },
      {
        'indexed': true,
        'internalType': 'uint256',
        'name': 'tokenId',
        'type': 'uint256',
      },
    ],
    'name': 'Transfer',
    'type': 'event',
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': false,
        'internalType': 'address',
        'name': 'wallet',
        'type': 'address',
      },
      {
        'indexed': false,
        'internalType': 'uint128',
        'name': 'amount',
        'type': 'uint128',
      },
    ],
    'name': 'Withdrawn',
    'type': 'event',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'depositor',
        'type': 'address',
      },
      {
        'internalType': 'uint128',
        'name': 'amount',
        'type': 'uint128',
      },
    ],
    'name': 'addDeposit',
    'outputs': [
      {
        'internalType': 'uint48',
        'name': 'depositId',
        'type': 'uint48',
      },
    ],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'uint128',
        'name': 'amount',
        'type': 'uint128',
      },
      {
        'internalType': 'uint48',
        'name': 'depositId',
        'type': 'uint48',
      },
    ],
    'name': 'addLiquidity',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [],
    'name': 'admin',
    'outputs': [
      {
        'internalType': 'address',
        'name': '',
        'type': 'address',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'to',
        'type': 'address',
      },
      {
        'internalType': 'uint256',
        'name': 'tokenId',
        'type': 'uint256',
      },
    ],
    'name': 'approve',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'owner',
        'type': 'address',
      },
    ],
    'name': 'balanceOf',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'newAdmin',
        'type': 'address',
      },
    ],
    'name': 'changeAdmin',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': 'tokenId',
        'type': 'uint256',
      },
    ],
    'name': 'getApproved',
    'outputs': [
      {
        'internalType': 'address',
        'name': '',
        'type': 'address',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [],
    'name': 'getLastDepositId',
    'outputs': [
      {
        'internalType': 'uint48',
        'name': 'depositId',
        'type': 'uint48',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [],
    'name': 'getReserve',
    'outputs': [
      {
        'internalType': 'uint128',
        'name': 'reserve',
        'type': 'uint128',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'token_',
        'type': 'address',
      },
    ],
    'name': 'initialize',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'owner',
        'type': 'address',
      },
      {
        'internalType': 'address',
        'name': 'operator',
        'type': 'address',
      },
    ],
    'name': 'isApprovedForAll',
    'outputs': [
      {
        'internalType': 'bool',
        'name': '',
        'type': 'bool',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': 'depositId',
        'type': 'uint256',
      },
    ],
    'name': 'isDepositExists',
    'outputs': [
      {
        'internalType': 'bool',
        'name': '',
        'type': 'bool',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'uint128',
        'name': 'amount',
        'type': 'uint128',
      },
    ],
    'name': 'lockLiquidity',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [],
    'name': 'lockedLiquidity',
    'outputs': [
      {
        'internalType': 'uint128',
        'name': '',
        'type': 'uint128',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [],
    'name': 'name',
    'outputs': [
      {
        'internalType': 'string',
        'name': '',
        'type': 'string',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [],
    'name': 'nextNode',
    'outputs': [
      {
        'internalType': 'uint48',
        'name': '',
        'type': 'uint48',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'uint48',
        'name': 'leaf',
        'type': 'uint48',
      },
    ],
    'name': 'nodeWithdrawView',
    'outputs': [
      {
        'internalType': 'uint128',
        'name': 'withdrawAmount',
        'type': 'uint128',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [],
    'name': 'owner',
    'outputs': [
      {
        'internalType': 'address',
        'name': '',
        'type': 'address',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': 'tokenId',
        'type': 'uint256',
      },
    ],
    'name': 'ownerOf',
    'outputs': [
      {
        'internalType': 'address',
        'name': '',
        'type': 'address',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [],
    'name': 'renounceOwnership',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'from',
        'type': 'address',
      },
      {
        'internalType': 'address',
        'name': 'to',
        'type': 'address',
      },
      {
        'internalType': 'uint256',
        'name': 'tokenId',
        'type': 'uint256',
      },
    ],
    'name': 'safeTransferFrom',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'from',
        'type': 'address',
      },
      {
        'internalType': 'address',
        'name': 'to',
        'type': 'address',
      },
      {
        'internalType': 'uint256',
        'name': 'tokenId',
        'type': 'uint256',
      },
      {
        'internalType': 'bytes',
        'name': 'data',
        'type': 'bytes',
      },
    ],
    'name': 'safeTransferFrom',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'operator',
        'type': 'address',
      },
      {
        'internalType': 'bool',
        'name': 'approved',
        'type': 'bool',
      },
    ],
    'name': 'setApprovalForAll',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'bytes4',
        'name': 'interfaceId',
        'type': 'bytes4',
      },
    ],
    'name': 'supportsInterface',
    'outputs': [
      {
        'internalType': 'bool',
        'name': '',
        'type': 'bool',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [],
    'name': 'symbol',
    'outputs': [
      {
        'internalType': 'string',
        'name': '',
        'type': 'string',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [],
    'name': 'token',
    'outputs': [
      {
        'internalType': 'address',
        'name': '',
        'type': 'address',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': 'index',
        'type': 'uint256',
      },
    ],
    'name': 'tokenByIndex',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'owner',
        'type': 'address',
      },
      {
        'internalType': 'uint256',
        'name': 'index',
        'type': 'uint256',
      },
    ],
    'name': 'tokenOfOwnerByIndex',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': 'tokenId',
        'type': 'uint256',
      },
    ],
    'name': 'tokenURI',
    'outputs': [
      {
        'internalType': 'string',
        'name': '',
        'type': 'string',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [],
    'name': 'totalSupply',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'from',
        'type': 'address',
      },
      {
        'internalType': 'address',
        'name': 'to',
        'type': 'address',
      },
      {
        'internalType': 'uint256',
        'name': 'tokenId',
        'type': 'uint256',
      },
    ],
    'name': 'transferFrom',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'newOwner',
        'type': 'address',
      },
    ],
    'name': 'transferOwnership',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'uint48',
        'name': '',
        'type': 'uint48',
      },
    ],
    'name': 'treeNode',
    'outputs': [
      {
        'internalType': 'uint64',
        'name': 'updateId',
        'type': 'uint64',
      },
      {
        'internalType': 'uint128',
        'name': 'amount',
        'type': 'uint128',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'uint128',
        'name': 'amount',
        'type': 'uint128',
      },
    ],
    'name': 'unlockLiquidity',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [],
    'name': 'updateId',
    'outputs': [
      {
        'internalType': 'uint64',
        'name': '',
        'type': 'uint64',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'uint48',
        'name': 'depositId',
        'type': 'uint48',
      },
      {
        'internalType': 'uint40',
        'name': 'percent',
        'type': 'uint40',
      },
    ],
    'name': 'withdrawDeposit',
    'outputs': [
      {
        'internalType': 'uint128',
        'name': 'withdrawnAmount',
        'type': 'uint128',
      },
    ],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'to',
        'type': 'address',
      },
      {
        'internalType': 'uint128',
        'name': 'amount',
        'type': 'uint128',
      },
      {
        'internalType': 'uint48',
        'name': 'depositId',
        'type': 'uint48',
      },
    ],
    'name': 'withdrawLiquidityFor',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
] as const
