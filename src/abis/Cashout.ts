export default [
  {
    'inputs': [],
    'name': 'BetAlreadyPaid',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'BetAlreadyResolved',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'BetNotOwned',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'BetOwnerSignatureExpired',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'BettingContractNotAllowed',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'CobmoBetResolving',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'ECDSAInvalidSignature',
    'type': 'error',
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': 'length',
        'type': 'uint256',
      },
    ],
    'name': 'ECDSAInvalidSignatureLength',
    'type': 'error',
  },
  {
    'inputs': [
      {
        'internalType': 'bytes32',
        'name': 's',
        'type': 'bytes32',
      },
    ],
    'name': 'ECDSAInvalidSignatureS',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'EnforcedPause',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'ExpectedPause',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'InsufficientBalance',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'InvalidBetOwnerSignature',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'InvalidChainId',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'InvalidInitialization',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'InvalidOdds',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'InvalidOddsCount',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'InvalidOracleSignature',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'NotInitializing',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'NothingChanged',
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
        'indexed': true,
        'internalType': 'address',
        'name': 'bettingContract',
        'type': 'address',
      },
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'betOwner',
        'type': 'address',
      },
      {
        'indexed': false,
        'internalType': 'uint256',
        'name': 'betId',
        'type': 'uint256',
      },
      {
        'indexed': false,
        'internalType': 'uint64',
        'name': 'odds',
        'type': 'uint64',
      },
      {
        'indexed': false,
        'internalType': 'uint256',
        'name': 'payout',
        'type': 'uint256',
      },
    ],
    'name': 'BetCashedOut',
    'type': 'event',
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': false,
        'internalType': 'address',
        'name': 'bettingContract',
        'type': 'address',
      },
      {
        'indexed': false,
        'internalType': 'address',
        'name': 'betToken',
        'type': 'address',
      },
    ],
    'name': 'BettingContractUpdated',
    'type': 'event',
  },
  {
    'anonymous': false,
    'inputs': [],
    'name': 'EIP712DomainChanged',
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
        'indexed': false,
        'internalType': 'address',
        'name': 'account',
        'type': 'address',
      },
      {
        'indexed': false,
        'internalType': 'bool',
        'name': 'isOracle',
        'type': 'bool',
      },
    ],
    'name': 'OracleUpdated',
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
        'indexed': false,
        'internalType': 'address',
        'name': 'account',
        'type': 'address',
      },
    ],
    'name': 'Paused',
    'type': 'event',
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': false,
        'internalType': 'address',
        'name': 'account',
        'type': 'address',
      },
    ],
    'name': 'Unpaused',
    'type': 'event',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'betOwner',
        'type': 'address',
      },
      {
        'components': [
          {
            'internalType': 'string',
            'name': 'attention',
            'type': 'string',
          },
          {
            'internalType': 'uint256',
            'name': 'chainId',
            'type': 'uint256',
          },
          {
            'components': [
              {
                'internalType': 'uint256',
                'name': 'betId',
                'type': 'uint256',
              },
              {
                'internalType': 'address',
                'name': 'bettingContract',
                'type': 'address',
              },
              {
                'internalType': 'uint64',
                'name': 'minOdds',
                'type': 'uint64',
              },
            ],
            'internalType': 'struct ICashOut.CashOutItem[]',
            'name': 'items',
            'type': 'tuple[]',
          },
          {
            'internalType': 'uint64',
            'name': 'expiresAt',
            'type': 'uint64',
          },
        ],
        'internalType': 'struct ICashOut.CashOutOrder',
        'name': 'order',
        'type': 'tuple',
      },
      {
        'internalType': 'uint64[]',
        'name': 'odds',
        'type': 'uint64[]',
      },
      {
        'internalType': 'bytes',
        'name': 'betOwnerSignature',
        'type': 'bytes',
      },
      {
        'internalType': 'bytes',
        'name': 'oracleSignature',
        'type': 'bytes',
      },
    ],
    'name': 'cashOutBets',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [],
    'name': 'eip712Domain',
    'outputs': [
      {
        'internalType': 'bytes1',
        'name': 'fields',
        'type': 'bytes1',
      },
      {
        'internalType': 'string',
        'name': 'name',
        'type': 'string',
      },
      {
        'internalType': 'string',
        'name': 'version',
        'type': 'string',
      },
      {
        'internalType': 'uint256',
        'name': 'chainId',
        'type': 'uint256',
      },
      {
        'internalType': 'address',
        'name': 'verifyingContract',
        'type': 'address',
      },
      {
        'internalType': 'bytes32',
        'name': 'salt',
        'type': 'bytes32',
      },
      {
        'internalType': 'uint256[]',
        'name': 'extensions',
        'type': 'uint256[]',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'contract IERC20',
        'name': 'payoutToken_',
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
        'name': '',
        'type': 'address',
      },
    ],
    'name': 'isOracle',
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
    'inputs': [],
    'name': 'pause',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [],
    'name': 'paused',
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
    'name': 'renounceOwnership',
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
    'inputs': [],
    'name': 'unpause',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'bettingContract',
        'type': 'address',
      },
      {
        'internalType': 'address',
        'name': 'betToken',
        'type': 'address',
      },
    ],
    'name': 'updateBettingContract',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'account',
        'type': 'address',
      },
      {
        'internalType': 'bool',
        'name': 'isOracle_',
        'type': 'bool',
      },
    ],
    'name': 'updateOracle',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'token',
        'type': 'address',
      },
      {
        'internalType': 'address',
        'name': 'to',
        'type': 'address',
      },
      {
        'internalType': 'uint256',
        'name': 'value',
        'type': 'uint256',
      },
    ],
    'name': 'withdrawToken',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
] as const
