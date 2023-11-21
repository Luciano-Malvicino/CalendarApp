import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
  },
  server: {
    watch: {
      usePolling: true,
      interval: 1000, // Adjust the interval as needed
    },
    host: '0.0.0.0',
    port: 3001,
  },
});