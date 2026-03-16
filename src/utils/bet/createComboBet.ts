import { type Address, type Hex } from 'viem'

import { chainsData } from '../../config'
import { type CreateBetResponse, type BetClientData } from '../../global'


export type CreateComboBetParams = {
  account: Address
  amount: string | bigint
  minOdds: string | bigint
  nonce: string | number | bigint
  clientData: BetClientData
  bets: {
    conditionId: string | bigint
    outcomeId: string | number | bigint
  }[]
  signature: Hex
  bonusId?: string
}

export type CreateComboBetResult = CreateBetResponse

/**
 * Creates a combo (parlay) bet by submitting signed bet data to the Azuro API.
 * This function sends the combo bet order to the relayer which will then place the bet on-chain.
 *
 * - Docs: https://gem.azuro.org/hub/apps/toolkit/bet/createComboBet
 *
 * @example
 * import { createComboBet } from '@azuro-org/toolkit'
 *
 * const account = '0x...'
 * const clientData = { chainId: 137, core: '0x...', ... }
 * const bets = [
 *   { conditionId: '1', outcomeId: '1' },
 *   { conditionId: '2', outcomeId: '2' },
 * ]
 * const signature = '0x...'
 *
 * const result = await createComboBet({
 *   account,
 *   clientData,
 *   bets,
 *   amount: '1000000',
 *   minOdds: '3000000000000',
 *   nonce: '1',
 *   signature,
 * })
 * */
export const createComboBet = async (props: CreateComboBetParams): Promise<CreateComboBetResult> => {
  const { account, amount, minOdds, nonce, clientData, bets, signature, bonusId } = props

  const { chainId } = clientData
  const { api, environment } = chainsData[chainId]

  const signedBet = {
    environment,
    bonusId,
    bettor: account.toLowerCase(),
    betOwner: account.toLowerCase(),
    clientBetData: {
      clientData,
      amount: String(amount),
      minOdds: String(minOdds),
      nonce: String(nonce),
      bets: bets.map(bet => ({
        conditionId: String(bet.conditionId),
        outcomeId: Number(bet.outcomeId),
      })),
    },
    bettorSignature: signature,
  }

  const response = await fetch(`${api}/bet/orders/combo`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(signedBet),
  })

  const data: CreateBetResponse = await response.json()

  if (!response.ok) {
    const error = new Error(data?.errorMessage || `Status: ${response.status}`)

    if (data?.error) {
      error.cause = new Error(data.error)
    }

    throw error
  }

  return data
}
