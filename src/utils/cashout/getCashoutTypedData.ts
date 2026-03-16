import { type SignTypedDataParameters, type Address, type TypedDataDomain, parseUnits } from 'viem'

import {
  type ChainId,
  chainsData,
  CASHOUT_DATA_TYPES,
  CASHOUT_TYPED_DATA_DOMAIN_NAME,
  CASHOUT_TYPED_DATA_DOMAIN_VERSION,
  ODDS_DECIMALS,
} from '../../config'


export type GetCashoutTypedDataParams = {
  chainId: ChainId
  account: Address
  attention: string
  tokenId: string | bigint
  cashoutOdds: string | bigint
  expiredAt: number
}

/**
 * Generates EIP-712 typed data for signing a cashout order.
 * This typed data must be signed by the user before submitting the cashout.
 *
 * - Docs: https://gem.azuro.org/hub/apps/toolkit/utils/cashout/getCashoutTypedData
 *
 * @example
 * import { getCashoutTypedData } from '@azuro-org/toolkit'
 * import { signTypedData } from 'viem/accounts'
 *
 * const chainId = 100
 * const account = '0x123...'
 * const tokenId = '456'
 * const cashoutOdds = '1.85'
 * const expiredAt = Math.floor(Date.now() / 1000) + 3600
 * const attention = 'By signing this transaction, I agree to cash out on Azuro'
 *
 * const typedData = getCashoutTypedData({
 *   chainId,
 *   account,
 *   attention,
 *   tokenId,
 *   cashoutOdds,
 *   expiredAt,
 * })
 *
 * const signature = await signTypedData(typedData)
 * */
export const getCashoutTypedData = (props: GetCashoutTypedDataParams): SignTypedDataParameters<typeof CASHOUT_DATA_TYPES> => {
  const { account, chainId, attention, tokenId, cashoutOdds, expiredAt } = props

  const { contracts } = chainsData[chainId]

  if (!contracts.cashout?.address) {
    throw new Error('provided chainId is not supported for cashout')
  }

  const EIP712Domain: TypedDataDomain = {
    name: CASHOUT_TYPED_DATA_DOMAIN_NAME,
    version: CASHOUT_TYPED_DATA_DOMAIN_VERSION,
    chainId,
    verifyingContract: contracts.cashout.address,
  }

  return {
    account: account,
    domain: EIP712Domain,
    primaryType: 'CashOutOrder',
    types: CASHOUT_DATA_TYPES,
    message: {
      attention: attention || 'By signing this transaction, I agree to cash out on \'Azuro SDK Example',
      chainId: BigInt(chainId),
      items: [
        {
          betId: BigInt(tokenId),
          bettingContract: contracts.core.address,
          minOdds: typeof cashoutOdds === 'string' ? (
            parseUnits(cashoutOdds, ODDS_DECIMALS)
          ) : cashoutOdds,
        },
      ],
      expiresAt: BigInt(expiredAt),
    },
  }
}
