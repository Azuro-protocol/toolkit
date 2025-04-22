export default [
  {
    'inputs': [
      {
        'internalType': 'uint64',
        'name': 'waitTime',
        'type': 'uint64',
      },
    ],
    'name': 'ClaimTimeout',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'CoreNotActive',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'IncorrectAmount',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'IncorrectCoreState',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'IncorrectFee',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'IncorrectLegacyLP',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'IncorrectMinBet',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'IncorrectMinDepo',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'IncorrectReinforcementAbility',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'IncorrectRelayer',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'InvalidInitialization',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'LiquidityNotOwned',
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
    'name': 'LockedBetToken',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'LockedLiquidityComboLimitReached',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'LockedLiquidityLimitReached',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'NotInitializing',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'OnlyFactory',
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
    'name': 'SmallBet',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'SmallDepo',
    'type': 'error',
  },
  {
    'inputs': [],
    'name': 'UnknownCore',
    'type': 'error',
  },
  {
    'inputs': [
      {
        'internalType': 'uint64',
        'name': 'waitTime',
        'type': 'uint64',
      },
    ],
    'name': 'WithdrawalTimeout',
    'type': 'error',
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': false,
        'internalType': 'address',
        'name': 'newAffilaite',
        'type': 'address',
      },
    ],
    'name': 'AffiliateChanged',
    'type': 'event',
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'core',
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
        'internalType': 'uint256',
        'name': 'tokenId',
        'type': 'uint256',
      },
      {
        'indexed': false,
        'internalType': 'uint256',
        'name': 'amount',
        'type': 'uint256',
      },
    ],
    'name': 'BettorWin',
    'type': 'event',
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': false,
        'internalType': 'uint64',
        'name': 'newClaimTimeout',
        'type': 'uint64',
      },
    ],
    'name': 'ClaimTimeoutChanged',
    'type': 'event',
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'core',
        'type': 'address',
      },
      {
        'indexed': false,
        'internalType': 'enum ILP.CoreState',
        'name': 'state',
        'type': 'uint8',
      },
      {
        'indexed': false,
        'internalType': 'uint64',
        'name': 'reinforcementAbility',
        'type': 'uint64',
      },
      {
        'indexed': false,
        'internalType': 'uint64',
        'name': 'reinforcementAbilityCombo',
        'type': 'uint64',
      },
      {
        'indexed': false,
        'internalType': 'uint128',
        'name': 'minBet',
        'type': 'uint128',
      },
    ],
    'name': 'CoreSettingsUpdated',
    'type': 'event',
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': false,
        'internalType': 'address',
        'name': 'newDataProvider',
        'type': 'address',
      },
    ],
    'name': 'DataProviderChanged',
    'type': 'event',
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'depositor',
        'type': 'address',
      },
      {
        'indexed': true,
        'internalType': 'uint48',
        'name': 'depositId',
        'type': 'uint48',
      },
      {
        'indexed': false,
        'internalType': 'uint48[]',
        'name': 'oldDepositIds',
        'type': 'uint48[]',
      },
    ],
    'name': 'DepositsMigrated',
    'type': 'event',
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': false,
        'internalType': 'enum ILP.FeeType',
        'name': 'feeType',
        'type': 'uint8',
      },
      {
        'indexed': false,
        'internalType': 'uint64',
        'name': 'fee',
        'type': 'uint64',
      },
    ],
    'name': 'FeeChanged',
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
        'name': 'legacyLP',
        'type': 'address',
      },
    ],
    'name': 'LegacyLPSet',
    'type': 'event',
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'account',
        'type': 'address',
      },
      {
        'indexed': true,
        'internalType': 'uint48',
        'name': 'depositId',
        'type': 'uint48',
      },
      {
        'indexed': false,
        'internalType': 'uint256',
        'name': 'amount',
        'type': 'uint256',
      },
    ],
    'name': 'LiquidityAdded',
    'type': 'event',
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'account',
        'type': 'address',
      },
      {
        'indexed': true,
        'internalType': 'uint48',
        'name': 'depositId',
        'type': 'uint48',
      },
      {
        'indexed': false,
        'internalType': 'uint40',
        'name': 'percent',
        'type': 'uint40',
      },
      {
        'indexed': false,
        'internalType': 'uint256',
        'name': 'amount',
        'type': 'uint256',
      },
    ],
    'name': 'LiquidityRemoved',
    'type': 'event',
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': false,
        'internalType': 'uint128',
        'name': 'newMinDepo',
        'type': 'uint128',
      },
    ],
    'name': 'MinDepoChanged',
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
        'name': 'relayer',
        'type': 'address',
      },
    ],
    'name': 'RelayerSet',
    'type': 'event',
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': false,
        'internalType': 'uint64',
        'name': 'newWithdrawTimeout',
        'type': 'uint64',
      },
    ],
    'name': 'WithdrawTimeoutChanged',
    'type': 'event',
  },
  {
    'inputs': [],
    'name': 'access',
    'outputs': [
      {
        'internalType': 'contract IAccess',
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
        'name': 'core',
        'type': 'address',
      },
    ],
    'name': 'addCore',
    'outputs': [],
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
        'internalType': 'address',
        'name': 'account',
        'type': 'address',
      },
      {
        'internalType': 'uint128',
        'name': 'amount',
        'type': 'uint128',
      },
    ],
    'name': 'addDepositFor',
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
        'name': 'lockedReserve',
        'type': 'uint128',
      },
      {
        'internalType': 'uint128',
        'name': 'finalReserve',
        'type': 'uint128',
      },
      {
        'internalType': 'uint48',
        'name': 'depositId',
        'type': 'uint48',
      },
    ],
    'name': 'addReserve',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [],
    'name': 'affiliate',
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
        'name': 'core',
        'type': 'address',
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
        'name': 'data',
        'type': 'bytes',
      },
    ],
    'name': 'betOrder',
    'outputs': [
      {
        'internalType': 'uint256[]',
        'name': '',
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
        'name': 'newAffiliate',
        'type': 'address',
      },
    ],
    'name': 'changeAffiliate',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'uint64',
        'name': 'newClaimTimeout',
        'type': 'uint64',
      },
    ],
    'name': 'changeClaimTimeout',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'newDataProvider',
        'type': 'address',
      },
    ],
    'name': 'changeDataProvider',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'enum ILP.FeeType',
        'name': 'feeType',
        'type': 'uint8',
      },
      {
        'internalType': 'uint64',
        'name': 'newFee',
        'type': 'uint64',
      },
    ],
    'name': 'changeFee',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'int128',
        'name': 'deltaReserve',
        'type': 'int128',
      },
      {
        'internalType': 'bool',
        'name': 'isCombo',
        'type': 'bool',
      },
    ],
    'name': 'changeLockedLiquidity',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'uint128',
        'name': 'newMinDepo',
        'type': 'uint128',
      },
    ],
    'name': 'changeMinDepo',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'uint64',
        'name': 'newWithdrawTimeout',
        'type': 'uint64',
      },
    ],
    'name': 'changeWithdrawTimeout',
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
        'internalType': 'address',
        'name': 'target',
        'type': 'address',
      },
      {
        'internalType': 'bytes4',
        'name': 'selector',
        'type': 'bytes4',
      },
    ],
    'name': 'checkAccess',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'core',
        'type': 'address',
      },
    ],
    'name': 'checkCore',
    'outputs': [],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'owner_',
        'type': 'address',
      },
    ],
    'name': 'checkOwner',
    'outputs': [],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [],
    'name': 'claimReward',
    'outputs': [
      {
        'internalType': 'uint128',
        'name': 'claimedAmount',
        'type': 'uint128',
      },
    ],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [],
    'name': 'claimTimeout',
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
        'internalType': 'address',
        'name': '',
        'type': 'address',
      },
    ],
    'name': 'cores',
    'outputs': [
      {
        'internalType': 'enum ILP.CoreState',
        'name': 'state',
        'type': 'uint8',
      },
      {
        'internalType': 'uint64',
        'name': 'reinforcementAbility',
        'type': 'uint64',
      },
      {
        'internalType': 'uint64',
        'name': 'reinforcementAbilityCombo',
        'type': 'uint64',
      },
      {
        'internalType': 'uint128',
        'name': 'minBet',
        'type': 'uint128',
      },
      {
        'internalType': 'uint128',
        'name': 'lockedLiquidity',
        'type': 'uint128',
      },
      {
        'internalType': 'uint128',
        'name': 'lockedLiquidityCombo',
        'type': 'uint128',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [],
    'name': 'dataProvider',
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
    'name': 'factory',
    'outputs': [
      {
        'internalType': 'contract IOwnable',
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
    'name': 'fees',
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
    'inputs': [
      {
        'internalType': 'address',
        'name': 'core',
        'type': 'address',
      },
    ],
    'name': 'getLockedLiquidityLimit',
    'outputs': [
      {
        'internalType': 'uint128',
        'name': 'maxLiquidity',
        'type': 'uint128',
      },
      {
        'internalType': 'uint128',
        'name': 'maxLiquidityCombo',
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
        'name': 'access_',
        'type': 'address',
      },
      {
        'internalType': 'address',
        'name': 'vault_',
        'type': 'address',
      },
      {
        'internalType': 'address',
        'name': 'dataProvider_',
        'type': 'address',
      },
      {
        'internalType': 'address',
        'name': 'affiliate_',
        'type': 'address',
      },
      {
        'internalType': 'uint128',
        'name': 'minDepo_',
        'type': 'uint128',
      },
      {
        'internalType': 'uint64',
        'name': 'daoFee',
        'type': 'uint64',
      },
      {
        'internalType': 'uint64',
        'name': 'dataProviderFee',
        'type': 'uint64',
      },
      {
        'internalType': 'uint64',
        'name': 'affiliateFee',
        'type': 'uint64',
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
    'inputs': [],
    'name': 'legacyLP',
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
        'internalType': 'uint48[]',
        'name': 'oldDepositIds',
        'type': 'uint48[]',
      },
    ],
    'name': 'migrateDeposits',
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
    'inputs': [],
    'name': 'minDepo',
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
    'name': 'relayer',
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
        'name': '',
        'type': 'address',
      },
    ],
    'name': 'rewards',
    'outputs': [
      {
        'internalType': 'int128',
        'name': 'amount',
        'type': 'int128',
      },
      {
        'internalType': 'uint64',
        'name': 'claimedAt',
        'type': 'uint64',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'legacyLP_',
        'type': 'address',
      },
    ],
    'name': 'setLegacyLP',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'relayer_',
        'type': 'address',
      },
    ],
    'name': 'setRelayer',
    'outputs': [],
    'stateMutability': 'nonpayable',
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
        'internalType': 'address',
        'name': 'core',
        'type': 'address',
      },
      {
        'internalType': 'enum ILP.CoreState',
        'name': 'state',
        'type': 'uint8',
      },
      {
        'internalType': 'uint64',
        'name': 'reinforcementAbility',
        'type': 'uint64',
      },
      {
        'internalType': 'uint64',
        'name': 'reinforcementAbilityCombo',
        'type': 'uint64',
      },
      {
        'internalType': 'uint128',
        'name': 'minBet',
        'type': 'uint128',
      },
    ],
    'name': 'updateCoreSettings',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [],
    'name': 'vault',
    'outputs': [
      {
        'internalType': 'contract IVault',
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
        'name': 'core',
        'type': 'address',
      },
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
  {
    'inputs': [
      {
        'internalType': 'uint48',
        'name': '',
        'type': 'uint48',
      },
    ],
    'name': 'withdrawAfter',
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
        'name': 'core',
        'type': 'address',
      },
      {
        'internalType': 'uint256',
        'name': 'tokenId',
        'type': 'uint256',
      },
    ],
    'name': 'withdrawPayout',
    'outputs': [
      {
        'internalType': 'uint128',
        'name': 'amount',
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
        'name': 'core',
        'type': 'address',
      },
      {
        'internalType': 'uint256[]',
        'name': 'tokenIds',
        'type': 'uint256[]',
      },
    ],
    'name': 'withdrawPayouts',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [],
    'name': 'withdrawTimeout',
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
    'stateMutability': 'payable',
    'type': 'receive',
  },
] as const
