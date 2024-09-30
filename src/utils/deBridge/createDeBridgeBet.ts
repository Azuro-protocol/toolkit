import { encodeFunctionData, parseUnits, type Address, type Hex } from 'viem'

import { type Selection } from '../../global'
import { type ChainId, chainsData, deBridgeUrl, ODDS_DECIMALS } from '../../config'
import { calcMindOdds } from '../calcMindOdds'
import { getPrematchBetDataBytes } from '../getPrematchBetDataBytes'
import { deBridgeChainIdByOriginalChainId } from './getDeBridgeSupportedChains'


export type DeBridgeCreateTxResponse = {
  orderId: Hex
  estimation: {
    srcChainTokenIn: {
      address: Address
      name: string
      symbol: string
      decimals: number
      amount: string
      approximateOperatingExpense: string
      mutatedWithOperatingExpense: boolean
    },
    srcChainTokenOut: {
      address: Address
      name: string
      symbol: string
      decimals: number
      amount: string
      maxRefundAmount: string
    }
    dstChainTokenOut: {
      address: Address
      name: string
      symbol: string
      decimals: number
      amount: string
      recommendedAmount: string
      withoutAdditionalTakerRewardsAmount: string
      maxTheoreticalAmount: string
    },
    recommendedSlippage: number
    costsDetails: [ string ]
  }
  tx: {
    to: Address
    data: Hex
    value: bigint
  }
  order: {
    approximateFulfillmentDelay: number
  },
  prependedOperatingExpenseCost: string
  fixFee: string
  userPoints: number
  integratorPoints: number
}

type Props = {
  account: Address
  betAmount: string
  dstChainId: ChainId
  srcChainId: number
  srcChainTokenIn: string
  selections: Selection[]
  totalOdds: number
  slippage: number
  affiliate: Address
  referralCode: number
  deadline?: number
}

export const DE_BRIDGE_DEFAULT_DEADLINE = 300 // 5 min

export const createDeBridgeBet = async (props: Props) => {
  const {
    account, betAmount, dstChainId, selections, totalOdds, slippage,
    srcChainId, srcChainTokenIn, affiliate, referralCode, deadline,
  } = props

  const { betToken, contracts } = chainsData[dstChainId]
  const fixedAmount = parseFloat(betAmount).toFixed(betToken.decimals)
  const fixedMinOdds = calcMindOdds({ odds: totalOdds, slippage })
  const coreAddress = selections.length > 1 ? contracts.prematchComboCore.address : contracts.prematchCore.address
  const betData = getPrematchBetDataBytes(selections)

  const rawAmount = parseUnits(fixedAmount, betToken.decimals)
  const rawMinOdds = parseUnits(fixedMinOdds, ODDS_DECIMALS)
  const rawDeadline = BigInt(Math.floor(Date.now() / 1000) + (deadline || DE_BRIDGE_DEFAULT_DEADLINE))

  const params = new URLSearchParams({
    dstChainId: String(deBridgeChainIdByOriginalChainId[dstChainId] || dstChainId),
    srcChainOrderAuthorityAddress: account as string,
    prependOperatingExpenses: 'false',
    srcChainId: String(deBridgeChainIdByOriginalChainId[srcChainId] || srcChainId),
    srcChainTokenIn,
    srcChainTokenInAmount: 'auto',
    dstChainTokenOut: betToken.address as string,
    dstChainTokenOutAmount: String(rawAmount),
    dstChainTokenOutRecipient: account as string,
    dstChainOrderAuthorityAddress: account as string,
    externalCall: JSON.stringify({
      version: 'evm_1',
      fields: {
        to: contracts.lp.address,
        data: encodeFunctionData({
          abi: contracts.lp.abi,
          functionName: 'betFor',
          args: [
            account!,
            coreAddress,
            rawAmount,
            rawDeadline,
            {
              affiliate,
              minOdds: rawMinOdds,
              data: betData,
            },
          ],
        }),
      },
    }),
    referralCode: String(referralCode),
  })

  const response = await fetch(`${deBridgeUrl}/dln/order/create-tx?${params}`)

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error(`Status ${response.status}: ${response.statusText}`)
  }

  const data: DeBridgeCreateTxResponse = await response.json()

  return data
}
