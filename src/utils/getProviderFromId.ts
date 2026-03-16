const CONDITION_PROVIDER_LENGTH = 3

/**
 * Extracts the provider ID from a condition ID string.
 * The provider ID is encoded in characters 2-4 of the condition ID.
 * */
export const getProviderFromId = (id: string) => {
  return +(id.slice(1, 1 + CONDITION_PROVIDER_LENGTH))
}
