const CONDITION_PROVIDER_LENGTH = 3

export const getProviderFromId = (id: string) => {
  return +(id.slice(1, 1 + CONDITION_PROVIDER_LENGTH))
}
