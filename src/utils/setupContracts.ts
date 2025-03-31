import { type Address } from 'viem'

import { lpAbi, coreAbi, azuroBetAbi, relayerAbi, cashoutAbi } from '../abis'


export type Contracts = {
  lp: {
    address: Address
    abi: typeof lpAbi
  }
  core: {
    address: Address
    abi: typeof coreAbi
  }
  relayer: {
    address: Address
    abi: typeof relayerAbi
  }
  azuroBet: {
    address: Address
    abi: typeof azuroBetAbi
  },
  cashout?: {
    address: Address
    abi: typeof cashoutAbi
  }
}

type Props = {
  lp: Address
  core: Address
  relayer: Address
  azuroBet: Address
  cashout?: Address
}

export const setupContracts = ({
  lp, core, relayer, azuroBet, cashout,
}: Props): Contracts => {
  const contracts: Contracts = {
    lp: {
      address: lp,
      abi: lpAbi,
    },
    core: {
      address: core,
      abi: coreAbi,
    },
    relayer: {
      address: core,
      abi: relayerAbi,
    },
    azuroBet: {
      address: azuroBet,
      abi: azuroBetAbi,
    },
  }

  if (cashout) {
    contracts.cashout = {
      address: cashout,
      abi: cashoutAbi,
    }
  }

  return contracts
}
