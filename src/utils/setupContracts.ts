import { type Address, erc721Abi } from 'viem'

import { liveCoreAbi, lpAbi, prematchComboCoreAbi, prematchCoreAbi, proxyFrontAbi } from '../abis'


export type Contracts = {
  lp: {
    address: Address
    abi: typeof lpAbi
  }
  prematchCore: {
    address: Address
    abi: typeof prematchCoreAbi
  }
  prematchComboCore: {
    address: Address
    abi: typeof prematchComboCoreAbi
  }
  proxyFront: {
    address: Address
    abi: typeof proxyFrontAbi
  }
  azuroBet: {
    address: Address
    abi: typeof erc721Abi
  },
  cashout?: {
    address: Address
  }
  liveRelayer?: {
    address: Address
  }
  liveCore?: {
    address: Address
    abi: typeof liveCoreAbi
  }
}

type Props = {
  lp: Address
  prematchCore: Address
  prematchComboCore: Address
  proxyFront: Address
  azuroBet: Address
  cashout?: Address
  liveRelayer?: Address
  liveCore?: Address
}

export const setupContracts = ({
  lp, prematchCore, prematchComboCore, proxyFront, azuroBet, cashout, liveRelayer, liveCore,
}: Props): Contracts => {
  const contracts: Contracts = {
    lp: {
      address: lp,
      abi: lpAbi,
    },
    prematchCore: {
      address: prematchCore,
      abi: prematchCoreAbi,
    },
    prematchComboCore: {
      address: prematchComboCore,
      abi: prematchComboCoreAbi,
    },
    proxyFront: {
      address: proxyFront,
      abi: proxyFrontAbi,
    },
    azuroBet: {
      address: azuroBet,
      abi: erc721Abi,
    },
  }

  if (liveRelayer) {
    contracts.liveRelayer = {
      address: liveRelayer,
    }
  }

  if (cashout) {
    contracts.cashout = {
      address: cashout,
    }
  }

  if (liveCore) {
    contracts.liveCore = {
      address: liveCore,
      abi: liveCoreAbi,
    }
  }

  return contracts
}
