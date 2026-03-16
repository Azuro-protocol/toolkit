import { type SignTypedDataParameters, type Address, type TypedDataDomain } from 'viem'

import {
  COMBO_BET_DATA_TYPES,
  TYPED_DATA_DOMAIN_NAME,
  TYPED_DATA_DOMAIN_VERSION,
} from '../../config'
import { type BetClientData } from '../../global'


export type GetComboBetTypedDataParams = {
  account: Address
  minOdds: string | bigint
  amount: string | bigint
  nonce: string | bigint
  clientData: BetClientData
  bets: {
    conditionId: string | bigint
    outcomeId: string | bigint
  }[]
}

/**
 * Generates EIP-712 typed data for signing a combo (parlay) bet.
 * This typed data is used with wallet signing methods to create a combo bet signature.
 *
 * - Docs: https://dev-gem.azuro.org/hub/apps/toolkit/bet/getComboBetTypedData
 *
 * @example
 * import { getComboBetTypedData } from '@azuro-org/toolkit'
 * import { signTypedData } from 'viem/actions'
 *
 * const account = '0x...'
 * const clientData = { chainId: 137, core: '0x...', ... }
 * const bets = [
 *   { conditionId: '1', outcomeId: '1' },
 *   { conditionId: '2', outcomeId: '2' },
 * ]
 *
 * const typedData = getComboBetTypedData({
 *   account,
 *   clientData,
 *   bets,
 *   amount: '1000000',
 *   minOdds: '3000000000000',
 *   nonce: '1',
 * })
 * const signature = await signTypedData(walletClient, typedData)
 * */
export const getComboBetTypedData = (props: GetComboBetTypedDataParams): SignTypedDataParameters<typeof COMBO_BET_DATA_TYPES> => {
  const { account, amount, minOdds, nonce, clientData, bets } = props
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
    primaryType: 'ClientComboBetData',
    types: COMBO_BET_DATA_TYPES,
    message: {
      amount: BigInt(amount),
      minOdds: BigInt(minOdds),
      nonce: BigInt(nonce),
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
      bets: bets.map(bet => ({
        conditionId: BigInt(bet.conditionId),
        outcomeId: BigInt(bet.outcomeId),
      })),
    },
  }
}
