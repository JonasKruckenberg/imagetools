import { createHash } from 'node:crypto'
import type { ImageConfig } from 'imagetools-core'

export const createBasePath = (base?: string) => {
  return (base?.replace(/\/$/, '') || '') + '/@imagetools/'
}

export function generateImageID(config: ImageConfig, imageHash: string) {
  return hash([JSON.stringify(config), imageHash])
}

export function hash(keyParts: Array<string | NodeJS.ArrayBufferView>) {
  let hash = createHash('sha1')
  for (const keyPart of keyParts) {
    hash = hash.update(keyPart)
  }
  return hash.digest('hex')
}

/**
 * Releases a mutex that was acquired via {@link AcquireMutex}. The release is
 * idempotent so calling it more than once is a no-op.
 */
type ReleaseMutex = () => void

/**
 * Requests exclusive access for the provided string key. The returned promise
 * resolves once the caller owns the mutex and yields the corresponding
 * {@link ReleaseMutex}.
 */
type AcquireMutex = (key: string) => Promise<ReleaseMutex>

/**
 * Internal bookkeeping for a single key. When `active` is `true` a caller is
 * inside the critical section, while `queue` holds pending callbacks waiting
 * to enter.
 */
type MutexState = {
  active: boolean
  queue: (() => void)[]
}

/**
 * Creates a keyed async mutex. Every unique key acquires an independent lock
 * so different keys can proceed concurrently, while repeated calls with the
 * same key execute in strict FIFO order. The release function returned to the
 * caller *must* be invoked once the critical section completes to wake the
 * next waiter (mirroring the usage in the caching tests and plugin).
 *
 * The factory is primarily used by the Vite plugin to serialize cache access
 * for identical image transformations, preventing concurrent reads/writes from
 * corrupting cache files while still allowing unrelated images to process in
 * parallel.
 */
export function createMutexFactory(): AcquireMutex {
  // Holds per-key state. Keys are removed once no callers are waiting so the
  // map stays bounded by the number of active or queued mutexes.
  const mutexStateMap = new Map<string, MutexState>()

  return async function acquireMutex(key: string): Promise<ReleaseMutex> {
    // Obtain (or lazily create) the tracking state for the requested key.
    const state = getOrCreateState(key)

    if (!state.active) {
      // Nobody owns the mutex yet, so claim it immediately.
      state.active = true
      return createReleaseMutexFactory(key, state)
    }

    return new Promise<ReleaseMutex>((resolve) => {
      // Another caller already holds the lock. Queue a callback that will be
      // invoked once the mutex becomes available.
      state.queue.push(() => {
        state.active = true
        resolve(createReleaseMutexFactory(key, state))
      })
    })
  }

  function getOrCreateState(key: string): MutexState {
    let state = mutexStateMap.get(key)
    if (!state) {
      // Lazily initialize the state when the first caller arrives.
      state = { active: false, queue: [] }
      mutexStateMap.set(key, state)
    }

    return state
  }

  function createReleaseMutexFactory(key: string, state: MutexState): ReleaseMutex {
    // Ensure the release callback is idempotent, matching the expectations in
    // the tests (double release is safe).
    let released = false

    return () => {
      if (released) {
        return
      }

      released = true
      const next = state.queue.shift()

      if (next) {
        // Wake the next waiter in FIFO order.
        next()
        return
      }

      state.active = false
      // No waiting callers remain, so drop the state to keep the map lean.
      mutexStateMap.delete(key)
    }
  }
}
