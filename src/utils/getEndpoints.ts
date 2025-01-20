import { baseSepolia, chiliz, gnosis, polygon, polygonAmoy, spicy } from 'viem/chains'

import { isDevEnabled } from '../envs'
import { type ChainId } from '../config'


const endpointNameByChainId: Record<ChainId, string> = {
  [gnosis.id]: 'gnosis',
  [polygon.id]: 'polygon',
  [polygonAmoy.id]: 'polygon-amoy-preprod',
  [chiliz.id]: 'chiliz',
  [spicy.id]: 'chiliz-spicy-dev',
  [baseSepolia.id]: 'base-sepolia-dev',
}

if (isDevEnabled) {
  endpointNameByChainId[gnosis.id] = 'gnosis-dev'
  endpointNameByChainId[polygonAmoy.id] = 'polygon-amoy-dev'
}

const isDev = (chainId: ChainId) => {
  return isDevEnabled && (
    chainId === polygonAmoy.id ||
    chainId === gnosis.id ||
    chainId === spicy.id ||
    chainId === baseSepolia.id
  )
}

export const getPrematchGraphqlEndpoint = (chainId: ChainId) => `https://thegraph.azuro.org/subgraphs/name/azuro-protocol/azuro-api-${endpointNameByChainId[chainId]}-v3`

export const getLiveGraphqlEndpoint = (chainId: ChainId) => {
  if (isDev(chainId)) {
    return 'https://thegraph.azuro.org/subgraphs/name/azuro-protocol/azuro-api-live-data-feed-dev'
  }

  if (chainId === polygonAmoy.id) {
    return 'https://thegraph.azuro.org/subgraphs/name/azuro-protocol/azuro-api-live-data-feed-preprod'
  }

  return 'https://thegraph.azuro.org/subgraphs/name/azuro-protocol/azuro-api-live-data-feed'
}

export const getSocketEndpoint = (chainId: ChainId) => {
  if (isDev(chainId)) {
    return 'wss://dev-streams.azuro.org/v1/streams/conditions'
  }

  if (chainId === polygonAmoy.id) {
    return 'wss://preprod-streams.azuro.org/v1/streams/conditions'
  }

  return 'wss://streams.azuro.org/v1/streams/conditions'
}

export const getApiEndpoint = (chainId: ChainId) => {
  if (isDev(chainId)) {
    return 'https://dev-api.azuro.org/api/v1/public'
  }

  if (chainId === polygonAmoy.id) {
    return 'https://preprod-api.azuro.org/api/v1/public'
  }

  return 'https://api.azuro.org/api/v1/public'
}
