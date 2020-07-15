import dotenv from 'dotenv'

/**
 * Load the environment configuration before importing our other modules
 * so that the evaluated variables are included.
 *
 * Link: https://12factor.net/config
 *
 * @export
 * @returns
 */
export function initializeEnv() {
  const result = dotenv.config()

  // Throw an error if it exists.
  if (result.error) {
    throw result.error
  }
  return result
}
