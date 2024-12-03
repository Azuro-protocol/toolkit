import { type SignTypedDataParameters, type Address, type TypedDataDomain, parseUnits } from 'viem'

import {
  type ChainId,
  chainsData,
  CASHOUT_DATA_TYPES,
  CASHOUT_TYPED_DATA_DOMAIN_NAME,
  CASHOUT_TYPED_DATA_DOMAIN_VERSION,
  ODDS_DECIMALS,
} from '../../config'


type Props = {
  chainId: ChainId
  account: Address
  attention: string
  tokenId: string | bigint
  betCoreAddress: Address
  multiplier: string | bigint
  expiredAt: number
}

export const getCashoutTypedData = (props: Props): SignTypedDataParameters<typeof CASHOUT_DATA_TYPES> => {
  const { account, chainId, attention, tokenId, betCoreAddress, multiplier, expiredAt } = props

  const { contracts } = chainsData[chainId]

  if (!contracts.cashout?.address) {
    throw new Error('provided chainId is not supported for cashout')
  }

  const EIP712Domain: TypedDataDomain = {
    name: CASHOUT_TYPED_DATA_DOMAIN_NAME,
    version: CASHOUT_TYPED_DATA_DOMAIN_VERSION,
    chainId,
    verifyingContract: contracts.liveCore!.address,
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
          bettingContract: betCoreAddress,
          minOdds: typeof multiplier === 'string' ? (
            parseUnits(multiplier, ODDS_DECIMALS)
          ) : multiplier,
        },
      ],
      expiresAt: BigInt(expiredAt),
    },
  }
}
