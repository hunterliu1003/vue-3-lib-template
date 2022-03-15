import path from 'path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { pascalCase } from 'change-case'
import dts from 'vite-plugin-dts'
import libInjectCss from './scripts/libInjectCss'

const fileName = 'the-component'
const libName = pascalCase(fileName)
module.exports = defineConfig({
  plugins: [vue(), dts(), libInjectCss()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: libName,
      fileName: format => `${fileName}.${format}.js`,
    },
    rollupOptions: {
      external: ['vue', '@vueuse/core'],
      output: {
        globals: { 'vue': 'Vue', '@vueuse/core': 'VueUse' },
      },
    },
  },
})
