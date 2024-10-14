/**
 * Exports preset.
 * @module
 */

import {
  hexFromArgb,
  type Theme as MaterialTheme,
} from '@material/material-color-utilities'
import type { Preset } from '@unocss/core'
import type { Theme as PresetMiniTheme } from '@unocss/preset-mini'

/**
 * Options
 */
export interface MaterialColorUnoOptions {
  theme: MaterialTheme
}

type Colors = Exclude<PresetMiniTheme['colors'], undefined>
/**
 * Material Color for UnoCSS
 */
export const presetMaterialColor = (
  opts: MaterialColorUnoOptions,
): Preset<PresetMiniTheme> => {
  const colors: Colors = {}

  for (const [name, palette] of Object.entries(opts.theme.palettes)) {
    const thisColor: Colors = colors[name] = {}
    for (let i = 0; i <= 100; i += 5) {
      thisColor[i.toString()] = hexFromArgb(palette.tone(i))
    }
  }
  for (const [mode, scheme] of Object.entries(opts.theme.schemes)) {
    const thisMode: Colors = colors[mode] = {}
    for (const [name, color] of Object.entries(scheme.toJSON())) {
      thisMode[name] = hexFromArgb(color)
    }
  }
  for (const customColor of opts.theme.customColors) {
    const thisColor: Colors = colors[customColor.color.name] = {}
    thisColor.value = hexFromArgb(customColor.value)
    for (const mode of ['light', 'dark'] as const) {
      const thisMode: Colors = thisColor[mode] = {}
      for (const [name, color] of Object.entries(customColor[mode])) {
        thisMode[name] = hexFromArgb(color)
      }
    }
  }

  return {
    name: '@xely/material-color-uno/preset',
    theme: {
      colors,
    },
  }
}
