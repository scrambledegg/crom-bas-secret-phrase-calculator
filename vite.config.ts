import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import licensePlugin from 'rollup-plugin-license';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    licensePlugin({
      thirdParty: {
        output: path.join(__dirname, 'dist', 'third-party-licenses.txt'),
      },
    }),
  ],
});
