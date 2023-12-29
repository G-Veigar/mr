import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import postcssPxToViewport from 'postcss-px-to-viewport-8-plugin'
import postcssPresetEnv from 'postcss-preset-env'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig({
  // base: '/mr',
  plugins: [
    vue(),
    nodePolyfills({
      // To add only specific polyfills, add them here. If no option is passed, adds all polyfills
      include: ['path'],
      // To exclude specific polyfills, add them to this list. Note: if include is provided, this has no effect
      exclude: [
        'http', // Excludes the polyfill for `http` and `node:http`.
      ],
      // Whether to polyfill specific globals.
      globals: {
        Buffer: true, // can also be 'build', 'dev', or false
        global: true,
        process: true,
      },
      // Override the default polyfills for specific modules.
      overrides: {
        // Since `fs` is not supported in browsers, we can use the `memfs` package to polyfill it.
        fs: 'memfs',
      },
      // Whether to polyfill `node:` protocol imports.
      protocolImports: true,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'node-fetch': 'isomorphic-fetch',
      // '@coral-xyz/anchor': '@coral-xyz/anchor/dist/browser/index.js'
    }
  },
  css: {
    postcss: {
      plugins: [
        postcssPresetEnv({
          features: {
            'nesting-rules': true
          }
        }),
        postcssPxToViewport({
          viewportWidth: 390, // (Number) 设计稿的视口宽度
          unitPrecision: 5, // (Number) 单位转换后保留的精度
          viewportUnit: 'vw', // (String) 希望使用的视口单位
          fontViewportUnit: 'vw', // (String) 字体使用的视口单位
          exclude: /\/node_modules/,
          selectorBlackList: ['.px-ignore', '.hairlines'], // (Array) 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
          minPixelValue: 1, // (Number) 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
          mediaQuery: false // (Boolean) 媒体查询里的单位是否需要转换单位
        })
      ]
    }
  }
})
