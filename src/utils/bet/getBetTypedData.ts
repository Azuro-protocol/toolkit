import { type SignTypedDataParameters, type Address, type TypedDataDomain } from 'viem'

import {
  BET_DATA_TYPES,
  TYPED_DATA_DOMAIN_NAME,
  TYPED_DATA_DOMAIN_VERSION,
} from '../../config'
import { type BetClientData } from '../../global'


export type GetBetTypedDataParams = {
  account: Address
  clientData: BetClientData
  bet: {
    conditionId: string | bigint
    outcomeId: string | bigint
    minOdds: string | bigint
    amount: string | bigint
    nonce: string | bigint
  }
}

/**
 * Generates EIP-712 typed data for signing a single (ordinary) bet.
 * This typed data is used with wallet signing methods to create a bet signature.
 *
 * - Docs: https://dev-gem.azuro.org/hub/apps/toolkit/bet/getBetTypedData
 *
 * @example
 * import { getBetTypedData } from '@azuro-org/toolkit'
 * import { signTypedData } from 'viem/actions'
 *
 * const account = '0x...'
 * const clientData = { chainId: 137, core: '0x...', ... }
 * const bet = {
 *   conditionId: '1',
 *   outcomeId: '1',
 *   minOdds: '1500000000000',
 *   amount: '1000000',
 *   nonce: '1',
 * }
 *
 * const typedData = getBetTypedData({ account, clientData, bet })
 * const signature = await signTypedData(walletClient, typedData)
 * */
export const getBetTypedData = (props: GetBetTypedDataParams): SignTypedDataParameters<typeof BET_DATA_TYPES> => {
  const { account, clientData, bet } = props
  const { chainId, core } = clientData

  const EIP712Domain: TypedDataDomain = {
    name: TYPED_DATA_DOMAIN_NAME,
    version: TYPED_DATA_DOMAIN_VERSION,
    chainId,
    verifyingContract: core,
  }

  return {
    account: account,
    domain: EIP712Domain,
    primaryType: 'ClientBetData',
    types: BET_DATA_TYPES,
    message: {
      clientData: {
        attention: clientData.attention,
        affiliate: clientData.affiliate,
        core: clientData.core,
        expiresAt: BigInt(clientData.expiresAt),
        chainId: BigInt(clientData.chainId),
        relayerFeeAmount: BigInt(clientData.relayerFeeAmount),
        isBetSponsored: clientData.isBetSponsored,
        isFeeSponsored: clientData.isFeeSponsored,
        isSponsoredBetReturnable: clientData.isSponsoredBetReturnable,
      },
      bets: [
        {
          conditionId: BigInt(bet.conditionId),
          outcomeId: BigInt(bet.outcomeId),
          minOdds: BigInt(bet.minOdds),
          amount: BigInt(bet.amount),
          nonce: BigInt(bet.nonce),
        },
      ],
    },
  }
}
