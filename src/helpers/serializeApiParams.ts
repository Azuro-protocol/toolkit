type Primitive = bigint | string | number | boolean | null | undefined

/** Serialize an object to URLSearchParams, filtering undefined values, and handling arrays to the expected format */
export function serializeApiParams(struct: Record<string, Primitive | Primitive[]>) {
  const params = new URLSearchParams()

  const append = (key: string, value: Primitive) => {
    if (value !== undefined) {
      params.append(key, String(value))
    }
  }

  Object.entries(struct).forEach(([ key, value ]) => {
    if (Array.isArray(value)) {
      return value.forEach(subValue => {
        append(key, subValue)
      })
    }

    append(key, value)
  })

  return params
}
