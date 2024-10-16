import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    define: {
      REACT_APP_API_KEY: JSON.stringify(env.REACT_APP_API_KEY),
      REACT_APP_AUTH_DOMAIN: JSON.stringify(env.REACT_APP_AUTH_DOMAIN),
      REACT_APP_DATABASE_URL: JSON.stringify(env.REACT_APP_DATABASE_URL),
      REACT_APP_PROJECT_ID: JSON.stringify(env.REACT_APP_PROJECT_ID),
      REACT_APP_STORAGE_BUCKET: JSON.stringify(env.REACT_APP_STORAGE_BUCKET),
      REACT_APP_MESSAGING_SENDER_ID: JSON.stringify(
        env.REACT_APP_MESSAGING_SENDER_ID
      ),
      REACT_APP_APP_ID: JSON.stringify(env.REACT_APP_APP_ID),
      REACT_APP_MEASUREMENT_ID: JSON.stringify(env.REACT_APP_MEASUREMENT_ID),
    },
    plugins: [react()],
  };
});
