import { type SignTypedDataParameters, type Address, type TypedDataDomain } from 'viem'

import {
  type ChainId,
  chainsData,
  LIVE_BET_DATA_TYPES,
  LIVE_TYPED_DATA_DOMAIN_NAME,
  LIVE_TYPED_DATA_DOMAIN_VERSION,
} from '../config'
import { type LiveBet } from '../global'


type Props = {
  chainId: ChainId
  account: Address
  bet: LiveBet
}

export const getLiveBetTypedData = ({ account, chainId, bet }: Props): SignTypedDataParameters<typeof LIVE_BET_DATA_TYPES> => {
  const { contracts } = chainsData[chainId]

  if (!contracts.liveCore) {
    throw new Error('provided chainId is not supported for live bet')
  }

  const EIP712Domain: TypedDataDomain = {
    name: LIVE_TYPED_DATA_DOMAIN_NAME,
    version: LIVE_TYPED_DATA_DOMAIN_VERSION,
    chainId,
    verifyingContract: contracts.liveCore!.address,
  }

  return {
    account: account,
    domain: EIP712Domain,
    primaryType: 'ClientBetData',
    types: LIVE_BET_DATA_TYPES,
    message: {
      attention: bet.attention,
      affiliate: bet.affiliate,
      core: bet.core,
      amount: BigInt(bet.amount),
      nonce: BigInt(bet.nonce),
      conditionId: BigInt(bet.conditionId),
      outcomeId: BigInt(bet.outcomeId),
      minOdds: BigInt(bet.minOdds),
      expiresAt: BigInt(bet.expiresAt),
      chainId: BigInt(bet.chainId),
      relayerFeeAmount: BigInt(bet.relayerFeeAmount),
    },
  }
}
