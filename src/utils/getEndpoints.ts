import { base, baseSepolia, chiliz, gnosis, polygon, polygonAmoy, spicy } from 'viem/chains'

import { type ChainId } from '../config'


const endpointNameByChainId: Record<ChainId, string> = {
  [gnosis.id]: 'gnosis',
  [polygon.id]: 'polygon',
  [polygonAmoy.id]: 'polygon-amoy-dev',
  [chiliz.id]: 'chiliz',
  [spicy.id]: 'chiliz-spicy-dev',
  [base.id]: 'base',
  [baseSepolia.id]: 'base-sepolia-dev',
}

// if (isDevEnabled) {
//   endpointNameByChainId[gnosis.id] = 'gnosis-dev'
//   endpointNameByChainId[polygonAmoy.id] = 'polygon-amoy-dev'
// }

const isDev = (chainId: ChainId) => {
  return (
    chainId === polygonAmoy.id ||
    chainId === spicy.id ||
    chainId === baseSepolia.id
  )
}

export const getFeedGraphqlEndpoint = (chainId: ChainId) => (
  `https://thegraph-1.onchainfeed.org/subgraphs/name/azuro-protocol/azuro-data-feed-${endpointNameByChainId[chainId]}`
)

export const getBetsGraphqlEndpoint = (chainId: ChainId) => (
  `https://thegraph.onchainfeed.org/subgraphs/name/azuro-protocol/azuro-api-${endpointNameByChainId[chainId]}-v3`
)

/**
 * @deprecated Only for v2 feed
 */
export const getLegacyLiveGraphqlEndpoint = (chainId: ChainId) => {
  if (isDev(chainId)) {
    return 'https://thegraph.azuro.org/subgraphs/name/azuro-protocol/azuro-api-live-data-feed-dev'
  }

  // if (chainId === polygonAmoy.id) {
  //   return 'https://thegraph.azuro.org/subgraphs/name/azuro-protocol/azuro-api-live-data-feed-preprod'
  // }

  return 'https://thegraph.azuro.org/subgraphs/name/azuro-protocol/azuro-api-live-data-feed'
}

export const getSocketEndpoint = (chainId: ChainId) => {
  if (isDev(chainId)) {
    return 'wss://dev-streams.onchainfeed.org/v1/streams'
  }

  // if (chainId === polygonAmoy.id) {
  //   return 'wss://preprod-streams.azuro.org/v1/streams'
  // }

  return 'wss://streams.onchainfeed.org/v1/streams'
}

export const getApiEndpoint = (chainId: ChainId) => {
  if (isDev(chainId)) {
    return 'https://dev-api.onchainfeed.org/api/v1/public'
  }

  // if (chainId === polygonAmoy.id) {
  //   return 'https://preprod-api.azuro.org/api/v1/public'
  // }

  return 'https://api.onchainfeed.org/api/v1/public'
}
