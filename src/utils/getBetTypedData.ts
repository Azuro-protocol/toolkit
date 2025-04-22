import { type SignTypedDataParameters, type Address, type TypedDataDomain } from 'viem'

import {
  BET_DATA_TYPES,
  TYPED_DATA_DOMAIN_NAME,
  TYPED_DATA_DOMAIN_VERSION,
} from '../config'
import { type BetClientData } from '../global'


type Props = {
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

export const getBetTypedData = (props: Props): SignTypedDataParameters<typeof BET_DATA_TYPES> => {
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
