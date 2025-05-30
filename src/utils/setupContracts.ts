import { type Address } from 'viem'

import { lpAbi, coreAbi, azuroBetAbi, relayerAbi, cashoutAbi, vaultAbi, paymasterAbi } from '../abis'


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
  }
  vault: {
    address: Address
    abi: typeof vaultAbi
  }
  paymaster: {
    address: Address
    abi: typeof paymasterAbi
  }
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
  vault: Address
  paymaster: Address
  cashout?: Address
}

export const setupContracts = ({
  lp, core, relayer, azuroBet, vault, paymaster, cashout,
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
      address: relayer,
      abi: relayerAbi,
    },
    azuroBet: {
      address: azuroBet,
      abi: azuroBetAbi,
    },
    vault: {
      address: vault,
      abi: vaultAbi,
    },
    paymaster: {
      address: paymaster,
      abi: paymasterAbi,
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
