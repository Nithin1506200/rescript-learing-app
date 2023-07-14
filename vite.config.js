import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import createReScriptPlugin from "@jihchi/vite-plugin-rescript";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), createReScriptPlugin()],
});
