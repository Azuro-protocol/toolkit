export default [
  {
    'inputs': [],
    'stateMutability': 'nonpayable',
    'type': 'constructor',
  },
  {
    'inputs': [],
    'name': 'IncorrectAddress',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'InvalidInitialization',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'NotInitializing',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'OnlyPaymaster',
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
        'name': 'relayer',
        'type': 'address',
      },
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'affiliate',
        'type': 'address',
      },
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'bettor',
        'type': 'address',
      },
      {
        'indexed': false,
        'internalType': 'address',
        'name': 'core',
        'type': 'address',
      },
      {
        'indexed': false,
        'internalType': 'uint256[]',
        'name': 'tokenIds',
        'type': 'uint256[]',
      },
      {
        'indexed': false,
        'internalType': 'uint256',
        'name': 'amount',
        'type': 'uint256',
      },
    ],
    'name': 'FeeSponsored',
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
        'name': 'payMaster',
        'type': 'address',
      },
    ],
    'name': 'PayMasterChanged',
    'type': 'event',
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'relayer',
        'type': 'address',
      },
      {
        'indexed': false,
        'internalType': 'uint256',
        'name': 'amount',
        'type': 'uint256',
      },
    ],
    'name': 'RelayerRewarded',
    'type': 'event',
  },
  {
    'inputs': [],
    'name': '_CLIENTBETDATA_TYPEHASH',
    'outputs': [
      {
        'internalType': 'bytes32',
        'name': '',
        'type': 'bytes32',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [],
    'name': '_CLIENTDATA_TYPEHASH',
    'outputs': [
      {
        'internalType': 'bytes32',
        'name': '',
        'type': 'bytes32',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [],
    'name': '_COMBOPART_TYPE_TYPEHASH',
    'outputs': [
      {
        'internalType': 'bytes32',
        'name': '',
        'type': 'bytes32',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [],
    'name': '_SUBBET_TYPEHASH',
    'outputs': [
      {
        'internalType': 'bytes32',
        'name': '',
        'type': 'bytes32',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'components': [
          {
            'internalType': 'address',
            'name': 'betOwner',
            'type': 'address',
          },
          {
            'components': [
              {
                'internalType': 'uint256',
                'name': 'gameId',
                'type': 'uint256',
              },
              {
                'internalType': 'uint256',
                'name': 'conditionId',
                'type': 'uint256',
              },
              {
                'internalType': 'enum IOrder.ConditionKind',
                'name': 'conditionKind',
                'type': 'uint8',
              },
              {
                'internalType': 'uint64[]',
                'name': 'odds',
                'type': 'uint64[]',
              },
              {
                'internalType': 'uint128[]',
                'name': 'outcomes',
                'type': 'uint128[]',
              },
              {
                'internalType': 'uint128',
                'name': 'potentialLossLimit',
                'type': 'uint128',
              },
              {
                'internalType': 'uint8',
                'name': 'winningOutcomesCount',
                'type': 'uint8',
              },
            ],
            'internalType': 'struct IOrder.ConditionData[]',
            'name': 'conditionDatas',
            'type': 'tuple[]',
          },
          {
            'internalType': 'enum IOrder.BetType',
            'name': 'betType',
            'type': 'uint8',
          },
          {
            'internalType': 'address',
            'name': 'oracle',
            'type': 'address',
          },
          {
            'internalType': 'bytes',
            'name': 'clientBetData',
            'type': 'bytes',
          },
          {
            'internalType': 'bytes',
            'name': 'bettorSignature',
            'type': 'bytes',
          },
          {
            'internalType': 'bytes',
            'name': 'oracleSignature',
            'type': 'bytes',
          },
        ],
        'internalType': 'struct IOrder.OrderData[]',
        'name': 'orders',
        'type': 'tuple[]',
      },
    ],
    'name': 'betFor',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'relayExecutor',
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
            'internalType': 'address',
            'name': 'affiliate',
            'type': 'address',
          },
          {
            'internalType': 'address',
            'name': 'core',
            'type': 'address',
          },
          {
            'internalType': 'uint256',
            'name': 'expiresAt',
            'type': 'uint256',
          },
          {
            'internalType': 'uint256',
            'name': 'chainId',
            'type': 'uint256',
          },
          {
            'internalType': 'uint256',
            'name': 'relayerFeeAmount',
            'type': 'uint256',
          },
          {
            'internalType': 'bool',
            'name': 'isFeeSponsored',
            'type': 'bool',
          },
          {
            'internalType': 'bool',
            'name': 'isBetSponsored',
            'type': 'bool',
          },
          {
            'internalType': 'bool',
            'name': 'isSponsoredBetReturnable',
            'type': 'bool',
          },
        ],
        'internalType': 'struct IOrder.ClientData',
        'name': 'data',
        'type': 'tuple',
      },
      {
        'components': [
          {
            'internalType': 'address',
            'name': 'betOwner',
            'type': 'address',
          },
          {
            'components': [
              {
                'internalType': 'uint256',
                'name': 'gameId',
                'type': 'uint256',
              },
              {
                'internalType': 'uint256',
                'name': 'conditionId',
                'type': 'uint256',
              },
              {
                'internalType': 'enum IOrder.ConditionKind',
                'name': 'conditionKind',
                'type': 'uint8',
              },
              {
                'internalType': 'uint64[]',
                'name': 'odds',
                'type': 'uint64[]',
              },
              {
                'internalType': 'uint128[]',
                'name': 'outcomes',
                'type': 'uint128[]',
              },
              {
                'internalType': 'uint128',
                'name': 'potentialLossLimit',
                'type': 'uint128',
              },
              {
                'internalType': 'uint8',
                'name': 'winningOutcomesCount',
                'type': 'uint8',
              },
            ],
            'internalType': 'struct IOrder.ConditionData[]',
            'name': 'conditionDatas',
            'type': 'tuple[]',
          },
          {
            'internalType': 'enum IOrder.BetType',
            'name': 'betType',
            'type': 'uint8',
          },
          {
            'internalType': 'address',
            'name': 'oracle',
            'type': 'address',
          },
          {
            'internalType': 'bytes',
            'name': 'clientBetData',
            'type': 'bytes',
          },
          {
            'internalType': 'bytes',
            'name': 'bettorSignature',
            'type': 'bytes',
          },
          {
            'internalType': 'bytes',
            'name': 'oracleSignature',
            'type': 'bytes',
          },
        ],
        'internalType': 'struct IOrder.OrderData',
        'name': 'order',
        'type': 'tuple',
      },
      {
        'internalType': 'address',
        'name': 'betOwner',
        'type': 'address',
      },
      {
        'internalType': 'bytes',
        'name': 'hashes',
        'type': 'bytes',
      },
    ],
    'name': 'betOrder',
    'outputs': [
      {
        'internalType': 'uint256[]',
        'name': 'tokenIds',
        'type': 'uint256[]',
      },
    ],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'payMaster_',
        'type': 'address',
      },
    ],
    'name': 'changePayMaster',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'components': [
          {
            'internalType': 'address',
            'name': 'betOwner',
            'type': 'address',
          },
          {
            'components': [
              {
                'internalType': 'uint256',
                'name': 'gameId',
                'type': 'uint256',
              },
              {
                'internalType': 'uint256',
                'name': 'conditionId',
                'type': 'uint256',
              },
              {
                'internalType': 'enum IOrder.ConditionKind',
                'name': 'conditionKind',
                'type': 'uint8',
              },
              {
                'internalType': 'uint64[]',
                'name': 'odds',
                'type': 'uint64[]',
              },
              {
                'internalType': 'uint128[]',
                'name': 'outcomes',
                'type': 'uint128[]',
              },
              {
                'internalType': 'uint128',
                'name': 'potentialLossLimit',
                'type': 'uint128',
              },
              {
                'internalType': 'uint8',
                'name': 'winningOutcomesCount',
                'type': 'uint8',
              },
            ],
            'internalType': 'struct IOrder.ConditionData[]',
            'name': 'conditionDatas',
            'type': 'tuple[]',
          },
          {
            'internalType': 'enum IOrder.BetType',
            'name': 'betType',
            'type': 'uint8',
          },
          {
            'internalType': 'address',
            'name': 'oracle',
            'type': 'address',
          },
          {
            'internalType': 'bytes',
            'name': 'clientBetData',
            'type': 'bytes',
          },
          {
            'internalType': 'bytes',
            'name': 'bettorSignature',
            'type': 'bytes',
          },
          {
            'internalType': 'bytes',
            'name': 'oracleSignature',
            'type': 'bytes',
          },
        ],
        'internalType': 'struct IOrder.OrderData',
        'name': 'order',
        'type': 'tuple',
      },
    ],
    'name': 'getClientData',
    'outputs': [
      {
        'components': [
          {
            'internalType': 'string',
            'name': 'attention',
            'type': 'string',
          },
          {
            'internalType': 'address',
            'name': 'affiliate',
            'type': 'address',
          },
          {
            'internalType': 'address',
            'name': 'core',
            'type': 'address',
          },
          {
            'internalType': 'uint256',
            'name': 'expiresAt',
            'type': 'uint256',
          },
          {
            'internalType': 'uint256',
            'name': 'chainId',
            'type': 'uint256',
          },
          {
            'internalType': 'uint256',
            'name': 'relayerFeeAmount',
            'type': 'uint256',
          },
          {
            'internalType': 'bool',
            'name': 'isFeeSponsored',
            'type': 'bool',
          },
          {
            'internalType': 'bool',
            'name': 'isBetSponsored',
            'type': 'bool',
          },
          {
            'internalType': 'bool',
            'name': 'isSponsoredBetReturnable',
            'type': 'bool',
          },
        ],
        'internalType': 'struct IOrder.ClientData',
        'name': 'clientData',
        'type': 'tuple',
      },
    ],
    'stateMutability': 'pure',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'components': [
          {
            'internalType': 'address',
            'name': 'betOwner',
            'type': 'address',
          },
          {
            'components': [
              {
                'internalType': 'uint256',
                'name': 'gameId',
                'type': 'uint256',
              },
              {
                'internalType': 'uint256',
                'name': 'conditionId',
                'type': 'uint256',
              },
              {
                'internalType': 'enum IOrder.ConditionKind',
                'name': 'conditionKind',
                'type': 'uint8',
              },
              {
                'internalType': 'uint64[]',
                'name': 'odds',
                'type': 'uint64[]',
              },
              {
                'internalType': 'uint128[]',
                'name': 'outcomes',
                'type': 'uint128[]',
              },
              {
                'internalType': 'uint128',
                'name': 'potentialLossLimit',
                'type': 'uint128',
              },
              {
                'internalType': 'uint8',
                'name': 'winningOutcomesCount',
                'type': 'uint8',
              },
            ],
            'internalType': 'struct IOrder.ConditionData[]',
            'name': 'conditionDatas',
            'type': 'tuple[]',
          },
          {
            'internalType': 'enum IOrder.BetType',
            'name': 'betType',
            'type': 'uint8',
          },
          {
            'internalType': 'address',
            'name': 'oracle',
            'type': 'address',
          },
          {
            'internalType': 'bytes',
            'name': 'clientBetData',
            'type': 'bytes',
          },
          {
            'internalType': 'bytes',
            'name': 'bettorSignature',
            'type': 'bytes',
          },
          {
            'internalType': 'bytes',
            'name': 'oracleSignature',
            'type': 'bytes',
          },
        ],
        'internalType': 'struct IOrder.OrderData',
        'name': 'order',
        'type': 'tuple',
      },
    ],
    'name': 'getOrderBetsAmounts',
    'outputs': [
      {
        'internalType': 'uint128',
        'name': 'totalAmount',
        'type': 'uint128',
      },
      {
        'internalType': 'uint128[]',
        'name': 'amounts',
        'type': 'uint128[]',
      },
    ],
    'stateMutability': 'pure',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'lp_',
        'type': 'address',
      },
      {
        'internalType': 'address',
        'name': 'payMaster_',
        'type': 'address',
      },
    ],
    'name': 'initialize',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [],
    'name': 'lp',
    'outputs': [
      {
        'internalType': 'contract ILP',
        'name': '',
        'type': 'address',
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
    'name': 'payMaster',
    'outputs': [
      {
        'internalType': 'contract IPayMaster',
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
        'name': 'newOwner',
        'type': 'address',
      },
    ],
    'name': 'transferOwnership',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
] as const
