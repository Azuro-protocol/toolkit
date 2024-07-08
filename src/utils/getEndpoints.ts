import { chiliz, gnosis, polygon, polygonAmoy, spicy } from 'viem/chains'

import { type ChainId } from '../config'


const endpointNameByChainId: Record<ChainId, string> = {
  [gnosis.id]: 'gnosis',
  [polygon.id]: 'polygon',
  [polygonAmoy.id]: 'polygon-amoy-preprod',
  [chiliz.id]: 'chiliz',
  [spicy.id]: 'chiliz-spicy-dev',
}

export const getGraphqlPrematchEndpoint = (chainId: ChainId) => `https://thegraph.azuro.org/subgraphs/name/azuro-protocol/azuro-api-${endpointNameByChainId[chainId]}-v3`

export const getGraphqlLiveEndpoint = (chainId: number) => {
  if (chainId === polygonAmoy.id) {
    return 'https://thegraph.azuro.org/subgraphs/name/azuro-protocol/azuro-api-live-data-feed-preprod'
  }

  if (chainId === spicy.id) {
    return 'https://thegraph.azuro.org/subgraphs/name/azuro-protocol/azuro-api-live-data-feed-dev'
  }

  return 'https://thegraph.azuro.org/subgraphs/name/azuro-protocol/azuro-api-live-data-feed'
}

export const getSocketEndpoint = (chainId: number) => {
  if (chainId === polygonAmoy.id) {
    return 'wss://preprod-streams.azuro.org/v1/streams/conditions'
  }

  if (chainId === spicy.id) {
    return 'wss://dev-streams.azuro.org/v1/streams/conditions'
  }

  return 'wss://streams.azuro.org/v1/streams/conditions'
}

export const getApiEndpoint = (chainId: ChainId) => {
  if (chainId === polygonAmoy.id) {
    return 'https://preprod-api.azuro.org/api/v1/public'
  }

  if (chainId === spicy.id) {
    return 'https://dev-api.azuro.org/api/v1/public'
  }

  return 'https://api.azuro.org/api/v1/public'
}
