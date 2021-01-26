import { Target } from './types'
import { createHash } from 'crypto'

export const assetUrlQuotedRE = /"__IMAGESET__([a-z\d]{8})__(?:([.^"]*?)__)?"/g

export function transformId(id: string, target: Target) {
  const ordered = Object.keys(target)
    .sort()
    .reduce((obj, key) => {
      obj[key] = target[key]
      return obj
    }, {})
  return createHash('sha1').update(id).update(JSON.stringify(ordered)).digest('hex').substr(0, 16)
}

const queryRE = /\?.*$/
const hashRE = /#.*$/

export const cleanUrl = (url: string) => url.replace(hashRE, '').replace(queryRE, '')
