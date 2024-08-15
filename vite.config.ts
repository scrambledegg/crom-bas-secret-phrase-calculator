import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import licensePlugin from 'rollup-plugin-license';

// https://vitejs.dev/config/
export default defineConfig({
  base: 'crom-bas-secret-phrase-calculator',
  plugins: [
    react(),
    vanillaExtractPlugin(),
    licensePlugin({
      thirdParty: {
        output: path.join(__dirname, 'dist', 'third-party-licenses.txt'),
      },
    }),
  ],
});
