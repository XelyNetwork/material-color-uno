import type { UserConfig } from '@unocss/core'
import { presetMaterialColor } from './src/preset.ts'
import {
  argbFromHex,
  themeFromSourceColor,
} from '@material/material-color-utilities'
import presetUno from '@unocss/preset-uno'

const theme = themeFromSourceColor(argbFromHex('#a00'), [
  {
    name: 'yellow',
    blend: true,
    value: argbFromHex('#ffff00'),
  },
])

export default {
  presets: [
    presetMaterialColor({ theme }),
    presetUno({}),
  ],
} satisfies UserConfig
