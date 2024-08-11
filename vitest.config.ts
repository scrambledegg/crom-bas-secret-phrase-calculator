import { defineConfig } from 'vitest/config';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

export default defineConfig({
  plugins: [vanillaExtractPlugin()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./vitest.setup.ts'],

    server: {
      deps: {
        inline: ['@adobe/react-spectrum', '@react-spectrum', '@spectrum-icons'],
      },
    },
  },
});
