import { PATHS } from './paths'

const { appSrc, sharedDir, stories } = PATHS

export const alias = {
  '@': appSrc,
  '%': sharedDir,
  _stories: stories,
}
