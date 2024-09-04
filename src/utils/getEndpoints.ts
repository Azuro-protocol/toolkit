import { chiliz, gnosis, polygon, polygonAmoy, spicy } from 'viem/chains'

import { type ChainId } from '../config'
import { Environment } from './envs'


interface Getter {
  (env: Environment): string
  /** @deprecated use `Environment` enum instead */
  (env: ChainId): string
  /** @deprecated use `Environment` enum instead */
  (env: ChainId | Environment): string
}

const endpointNameByChainId: Record<ChainId, string> = {
  [gnosis.id]: 'gnosis',
  [polygon.id]: 'polygon',
  [polygonAmoy.id]: 'polygon-amoy-preprod',
  [chiliz.id]: 'chiliz',
  [spicy.id]: 'chiliz-spicy-dev',
}

const endpointByEnv: Record<Environment, string> = {
  [Environment.GnosisXDAI]: 'gnosis',
  [Environment.GnosisDevXDAI]: 'gnosis-dev',
  [Environment.PolygonUSDT]: 'polygon',
  [Environment.PolygonAmoyAZUSD]: 'polygon-amoy-preprod',
  [Environment.PolygonAmoyUSDT]: 'polygon-amoy-dev',
  [Environment.ChilizWCHZ]: 'chiliz',
  [Environment.ChilizSpicyWCHZ]: 'chiliz-spicy-dev',
}

const isPreprod = (param: ChainId | Environment) => (
  param === polygonAmoy.id
  || param === Environment.PolygonAmoyAZUSD
)

const isDev = (param: ChainId | Environment) => (
  param === spicy.id
  || param === Environment.PolygonAmoyUSDT
  || param === Environment.GnosisDevXDAI
  || param === Environment.ChilizSpicyWCHZ
)

export const getPrematchGraphqlEndpoint: Getter = (param: ChainId | Environment) => {
  return `https://thegraph.azuro.org/subgraphs/name/azuro-protocol/azuro-api-${endpointNameByChainId[param as ChainId] || endpointByEnv[param as Environment]}-v3`
}

export const getLiveGraphqlEndpoint: Getter = (env: ChainId | Environment) => {
  if (isPreprod(env)) {
    return 'https://thegraph.azuro.org/subgraphs/name/azuro-protocol/azuro-api-live-data-feed-preprod'
  }

  if (isDev(env)) {
    return 'https://thegraph.azuro.org/subgraphs/name/azuro-protocol/azuro-api-live-data-feed-dev'
  }

  return 'https://thegraph.azuro.org/subgraphs/name/azuro-protocol/azuro-api-live-data-feed'
}

export const getSocketEndpoint: Getter = (env: ChainId | Environment) => {
  if (isPreprod(env)) {
    return 'wss://preprod-streams.azuro.org/v1/streams/conditions'
  }

  if (isDev(env)) {
    return 'wss://dev-streams.azuro.org/v1/streams/conditions'
  }

  return 'wss://streams.azuro.org/v1/streams/conditions'
}

export const getApiEndpoint: Getter = (env: ChainId | Environment) => {
  if (isPreprod(env)) {
    return 'https://preprod-api.azuro.org/api/v1/public'
  }

  if (isDev(env)) {
    return 'https://dev-api.azuro.org/api/v1/public'
  }

  return 'https://api.azuro.org/api/v1/public'
}
