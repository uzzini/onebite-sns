import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // vite가 server 폴더 아래에 있는 모든 파일을 감지하지 않아 해당 파일에 어떠한 변화가 생겨도 리액트 엡을 리렌더링하지 않음
  server: {
    watch: {
      ignored: ["**/server/**"],
    },
  },
});
