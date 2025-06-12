import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Generar sourcemaps para mejor debugging
    sourcemap: true,
    // Configuración de rollup para el manejo de archivos
    rollupOptions: {
      output: {
        // Añadir hash a los nombres de archivos para cache busting
        entryFileNames: `assets/[name].[hash].js`,
        chunkFileNames: `assets/[name].[hash].js`,
        assetFileNames: `assets/[name].[hash].[ext]`,
        // Optimizar el tamaño del bundle
        manualChunks: {
          vendor: ["react", "react-dom"],
          // Puedes añadir más chunks manuales según necesites
        },
      },
    },
    // Optimizaciones de build
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true, // Eliminar console.logs en producción
        drop_debugger: true,
      },
    },
  },
  // Configuración del servidor de desarrollo
  server: {
    // Forzar recarga en cambios de archivos
    hmr: {
      overlay: true,
    },
  },
});
