import { fileURLToPath } from 'node:url';
import { mergeConfig, defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/*'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      transformMode: {
        web: [/\.[jt]sx$/]
      },
      testFiles: [
        // Agrega aquí la dirección de tus archivos de prueba
        '../src/components/__tests__/TheStudents.spec.js'
      ]
    }
  })
);
