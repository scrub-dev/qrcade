import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// import { VitePluginFonts } from 'vite-plugin-fonts'


// https://vitejs.dev/config/
export default defineConfig({
  mode: "production", //"development | production"
  plugins: [
    react(),
    // VitePluginFonts({
    //   custom: {
    //     families : {
    //       "graffiti" : "E:/Projects/qrcade/frontend/public/fonts/Good_Brush.otf"
    //     }
    //   }
    // })
  ],
  publicDir: "./public",
  server: {
    port: 5000,
    host: "qrcade.xyz"
  }
})