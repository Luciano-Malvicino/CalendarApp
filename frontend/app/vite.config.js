import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3001,
  },
  build: {
    rollupOptions: {
      input: 'src/main.jsx', // Specify the correct path to your entry file
    },
  },
});
