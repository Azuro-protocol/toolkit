import { type SignTypedDataParameters, type Address, type TypedDataDomain } from 'viem'

import {
  COMBO_BET_DATA_TYPES,
  TYPED_DATA_DOMAIN_NAME,
  TYPED_DATA_DOMAIN_VERSION,
} from '../config'
import { type BetClientData } from '../global'


type Props = {
  account: Address
  minOdds: string | bigint
  amount: string | bigint
  nonce: string | bigint
  clientData: BetClientData
  bet: {
    conditionId: string | bigint
    outcomeId: string | bigint
  }
}

export const getComboBetTypedData = (props: Props): SignTypedDataParameters<typeof COMBO_BET_DATA_TYPES> => {
  const { account, amount, minOdds, nonce, clientData, bet } = props
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
      },
      comboParts: [
        {
          conditionId: BigInt(bet.conditionId),
          outcomeId: BigInt(bet.outcomeId),
        },
      ],
    },
  }
}
