/**
 * Returns an error describing an invalid value for a transform directive,
 * quoting the offending value and stating what was expected.
 */
export function invalidDirectiveValue(directive: string, value: string, expected: string): Error {
  return new Error(`Invalid ${directive} value: ${JSON.stringify(value)}, expected ${expected}`)
}

/**
 * Appends a description of the universal `"false"` no-op to an expected-value
 * description, so error messages tell users they can disable a directive.
 */
export function orFalseToDisable(expected: string): string {
  return `${expected}, or "false" to disable`
}

/**
 * Quotes a list of values for use in an error message, joining them with
 * commas and a final "or", e.g. `"cover", "contain" or "fill"`.
 */
export function formatExpected(values: readonly string[]): string {
  const quoted = values.map((value) => JSON.stringify(value))
  return quoted.length === 1 ? quoted[0] : `${quoted.slice(0, -1).join(', ')} or ${quoted[quoted.length - 1]}`
}

/**
 * Parses a boolean-capable directive value. A bare directive (`""`) or
 * `"true"` enables it, `"false"` disables it and `undefined` leaves it
 * untouched. Throws for any other value.
 */
export function parseBooleanDirective(directive: string, value: string | undefined): boolean | undefined {
  if (value === undefined) return undefined
  if (value === '' || value === 'true') return true
  if (value === 'false') return false
  throw invalidDirectiveValue(directive, value, `"true", "false" or a bare "${directive}" directive`)
}

/**
 * Parses a directive value as an integer. Returns `undefined` when the
 * directive is absent or disabled with `"false"`, and throws for anything that
 * is not an integer.
 */
export function parseIntegerDirective(
  directive: string,
  value: string | undefined,
  expected: string
): number | undefined {
  if (value === undefined || value === '' || value === 'false') return undefined
  const parsed = Number(value)
  if (!Number.isInteger(parsed)) throw invalidDirectiveValue(directive, value, expected)
  return parsed
}

/**
 * Parses a directive value as a number. Returns `undefined` when the
 * directive is absent or disabled with `"false"`, and throws for anything that
 * is not a finite number.
 */
export function parseFloatDirective(
  directive: string,
  value: string | undefined,
  expected: string
): number | undefined {
  if (value === undefined || value === '' || value === 'false') return undefined
  const parsed = Number(value)
  if (!Number.isFinite(parsed)) throw invalidDirectiveValue(directive, value, expected)
  return parsed
}

/**
 * Parses a directive value as a positive integer, e.g. a width or height in
 * pixels. Returns `undefined` when the directive is absent or disabled with
 * `"false"`, and throws for anything that is not a positive integer.
 */
export function parsePositiveIntegerDirective(
  directive: string,
  value: string | undefined,
  expected: string
): number | undefined {
  if (value === undefined || value === '' || value === 'false') return undefined
  const parsed = Number(value)
  if (!Number.isInteger(parsed) || parsed <= 0) throw invalidDirectiveValue(directive, value, expected)
  return parsed
}
