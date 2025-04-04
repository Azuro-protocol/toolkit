export default [
  {
    'inputs': [],
    'stateMutability': 'nonpayable',
    'type': 'constructor',
  },
  {
    'inputs': [],
    'name': 'AlreadyPaid',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'AlreadyRejected',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'BetNotExists',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'CobmoBetNotResolved',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'ComboBetResolvedPartially',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'ConditionAlreadyResolved',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'ConditionNotFinished',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'ConditionNotRunning',
    'type': 'error',
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': 'outcomeId',
        'type': 'uint256',
      },
    ],
    'name': 'DuplicateOutcomes',
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
    'name': 'IncorrectAffiliate',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'IncorrectAmount',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'IncorrectBetType',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'IncorrectBetsConditionsCount',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'IncorrectConditionId',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'IncorrectConditionIds',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'IncorrectOutcomeId',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'IncorrectOutcomesCount',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'IncorrectSettleDate',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'IncorrectSubBetsToReset',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'IncorrectWinningOutcomesCount',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'InvalidBettorSignature',
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
    'name': 'InvalidNonce',
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
    'name': 'OddsTooSmall',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'OnlyLp',
    'type': 'error',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': '',
        'type': 'address',
      },
    ],
    'name': 'OnlyOracle',
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
    'inputs': [],
    'name': 'PotentialLossLimit',
    'type': 'error',
  },
  {
    'inputs': [
      {
        'internalType': 'enum SafeCast.Type',
        'name': 'to',
        'type': 'uint8',
      },
    ],
    'name': 'SafeCastError',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'SignatureExpired',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'SmallBet',
    'type': 'error',
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': 'conditionId',
        'type': 'uint256',
      },
    ],
    'name': 'SubBetConditionResolved',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'SubBetDuplicated',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'WrongOutcome',
    'type': 'error',
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'internalType': 'uint256',
        'name': 'tokenId',
        'type': 'uint256',
      },
    ],
    'name': 'BetRejected',
    'type': 'event',
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'internalType': 'uint256',
        'name': 'gameId',
        'type': 'uint256',
      },
      {
        'indexed': true,
        'internalType': 'uint256',
        'name': 'conditionId',
        'type': 'uint256',
      },
      {
        'indexed': false,
        'internalType': 'uint128[]',
        'name': 'outcomes',
        'type': 'uint128[]',
      },
      {
        'indexed': false,
        'internalType': 'uint64[]',
        'name': 'odds',
        'type': 'uint64[]',
      },
      {
        'indexed': false,
        'internalType': 'uint8',
        'name': 'winningOutcomesCount',
        'type': 'uint8',
      },
    ],
    'name': 'ConditionCreated',
    'type': 'event',
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'internalType': 'uint256',
        'name': 'conditionId',
        'type': 'uint256',
      },
      {
        'indexed': false,
        'internalType': 'uint8',
        'name': 'state',
        'type': 'uint8',
      },
      {
        'indexed': false,
        'internalType': 'uint128[]',
        'name': 'winningOutcomes',
        'type': 'uint128[]',
      },
      {
        'indexed': false,
        'internalType': 'int128',
        'name': 'lpProfit',
        'type': 'int128',
      },
      {
        'indexed': false,
        'internalType': 'uint64',
        'name': 'settledAt',
        'type': 'uint64',
      },
    ],
    'name': 'ConditionResolved',
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
        'indexed': true,
        'internalType': 'uint256',
        'name': 'tokenId',
        'type': 'uint256',
      },
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'bettor',
        'type': 'address',
      },
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'affiliate',
        'type': 'address',
      },
      {
        'indexed': false,
        'internalType': 'enum IOrder.BetType',
        'name': 'betType',
        'type': 'uint8',
      },
      {
        'indexed': false,
        'internalType': 'uint256',
        'name': 'nonce',
        'type': 'uint256',
      },
      {
        'indexed': false,
        'internalType': 'uint128',
        'name': 'amount',
        'type': 'uint128',
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
            'internalType': 'uint128',
            'name': 'outcomeId',
            'type': 'uint128',
          },
          {
            'internalType': 'uint64',
            'name': 'odds',
            'type': 'uint64',
          },
        ],
        'indexed': false,
        'internalType': 'struct ILiveCore.SubBetData[]',
        'name': 'betDatas',
        'type': 'tuple[]',
      },
      {
        'indexed': false,
        'internalType': 'uint128',
        'name': 'potentialLossLimit',
        'type': 'uint128',
      },
    ],
    'name': 'NewLiveBet',
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
    'inputs': [],
    'name': 'azuroBet',
    'outputs': [
      {
        'internalType': 'contract IAzuroBet',
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
        'name': '',
        'type': 'uint256',
      },
    ],
    'name': 'bets',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': 'conditionId',
        'type': 'uint256',
      },
      {
        'internalType': 'uint128',
        'name': 'amount',
        'type': 'uint128',
      },
      {
        'internalType': 'uint128',
        'name': 'payout',
        'type': 'uint128',
      },
      {
        'internalType': 'uint128',
        'name': 'outcomeId',
        'type': 'uint128',
      },
      {
        'internalType': 'uint64',
        'name': 'timestamp',
        'type': 'uint64',
      },
      {
        'internalType': 'bool',
        'name': 'isPaid',
        'type': 'bool',
      },
      {
        'internalType': 'uint48',
        'name': 'lastDepositId',
        'type': 'uint48',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'uint256[]',
        'name': 'conditionIds',
        'type': 'uint256[]',
      },
    ],
    'name': 'cancelConditions',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256',
      },
    ],
    'name': 'conditions',
    'outputs': [
      {
        'internalType': 'uint128',
        'name': 'totalNetBets',
        'type': 'uint128',
      },
      {
        'internalType': 'uint64',
        'name': 'settledAt',
        'type': 'uint64',
      },
      {
        'internalType': 'uint48',
        'name': 'lastDepositId',
        'type': 'uint48',
      },
      {
        'internalType': 'uint8',
        'name': 'winningOutcomesCount',
        'type': 'uint8',
      },
      {
        'internalType': 'enum ILiveCore.ConditionState',
        'name': 'state',
        'type': 'uint8',
      },
      {
        'internalType': 'address',
        'name': 'oracle',
        'type': 'address',
      },
    ],
    'stateMutability': 'view',
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
        'internalType': 'uint256',
        'name': 'conditionId',
        'type': 'uint256',
      },
    ],
    'name': 'getCondition',
    'outputs': [
      {
        'components': [
          {
            'components': [
              {
                'internalType': 'uint256',
                'name': 'time',
                'type': 'uint256',
              },
              {
                'internalType': 'uint256',
                'name': 'tokenId',
                'type': 'uint256',
              },
            ],
            'internalType': 'struct ILiveCore.TimeBet[]',
            'name': 'timeBets',
            'type': 'tuple[]',
          },
          {
            'internalType': 'uint128[]',
            'name': 'payouts',
            'type': 'uint128[]',
          },
          {
            'internalType': 'uint128',
            'name': 'totalNetBets',
            'type': 'uint128',
          },
          {
            'internalType': 'uint64',
            'name': 'settledAt',
            'type': 'uint64',
          },
          {
            'internalType': 'uint48',
            'name': 'lastDepositId',
            'type': 'uint48',
          },
          {
            'internalType': 'uint8',
            'name': 'winningOutcomesCount',
            'type': 'uint8',
          },
          {
            'internalType': 'enum ILiveCore.ConditionState',
            'name': 'state',
            'type': 'uint8',
          },
          {
            'internalType': 'address',
            'name': 'oracle',
            'type': 'address',
          },
        ],
        'internalType': 'struct ILiveCore.Condition',
        'name': '',
        'type': 'tuple',
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
    ],
    'stateMutability': 'pure',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': 'conditionId',
        'type': 'uint256',
      },
      {
        'internalType': 'uint128',
        'name': 'outcomeId',
        'type': 'uint128',
      },
    ],
    'name': 'getOutcomeIndex',
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
        'name': 'azuroBet_',
        'type': 'address',
      },
      {
        'internalType': 'address',
        'name': 'lp_',
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
        'internalType': 'uint256',
        'name': 'conditionId',
        'type': 'uint256',
      },
    ],
    'name': 'isConditionCanceled',
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
        'name': 'conditionId',
        'type': 'uint256',
      },
      {
        'internalType': 'uint128',
        'name': 'outcome',
        'type': 'uint128',
      },
    ],
    'name': 'isOutcomeWinning',
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
    'inputs': [
      {
        'internalType': 'address',
        'name': '',
        'type': 'address',
      },
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256',
      },
    ],
    'name': 'nonces',
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
      {
        'internalType': 'address',
        'name': 'betOwner',
        'type': 'address',
      },
      {
        'internalType': 'uint256',
        'name': 'minBet',
        'type': 'uint256',
      },
      {
        'internalType': 'bytes',
        'name': 'data',
        'type': 'bytes',
      },
    ],
    'name': 'putOrder',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'components': [
          {
            'internalType': 'uint256',
            'name': 'conditionId',
            'type': 'uint256',
          },
          {
            'internalType': 'uint256[]',
            'name': 'tokenIds',
            'type': 'uint256[]',
          },
        ],
        'internalType': 'struct ILiveCore.RejectedBet[]',
        'name': 'bets_',
        'type': 'tuple[]',
      },
    ],
    'name': 'rejectBets',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'components': [
          {
            'internalType': 'uint256',
            'name': 'tokenId',
            'type': 'uint256',
          },
          {
            'components': [
              {
                'internalType': 'uint256',
                'name': 'conditionId',
                'type': 'uint256',
              },
              {
                'internalType': 'uint128',
                'name': 'outcomeId',
                'type': 'uint128',
              },
            ],
            'internalType': 'struct ILiveCore.ComboSubBet[]',
            'name': 'subBets',
            'type': 'tuple[]',
          },
        ],
        'internalType': 'struct ILiveCore.RejectedComboBet[]',
        'name': 'bets_',
        'type': 'tuple[]',
      },
    ],
    'name': 'rejectComboBets',
    'outputs': [],
    'stateMutability': 'nonpayable',
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
        'components': [
          {
            'internalType': 'uint256',
            'name': 'conditionId',
            'type': 'uint256',
          },
          {
            'internalType': 'uint128[]',
            'name': 'winningOutcomes',
            'type': 'uint128[]',
          },
          {
            'internalType': 'uint64',
            'name': 'settledAt',
            'type': 'uint64',
          },
        ],
        'internalType': 'struct ILiveCore.ResolveData[]',
        'name': 'resolveData',
        'type': 'tuple[]',
      },
    ],
    'name': 'resolveConditions',
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
    'name': 'resolvePayout',
    'outputs': [
      {
        'internalType': 'address',
        'name': '',
        'type': 'address',
      },
      {
        'internalType': 'uint128',
        'name': '',
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
        'internalType': 'uint256',
        'name': 'tokenId',
        'type': 'uint256',
      },
    ],
    'name': 'viewPayout',
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
] as const
