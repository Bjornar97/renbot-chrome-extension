// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///home/bjornar97/github/renbot-chrome-extension/node_modules/vite/dist/node/index.js";
import vue from "file:///home/bjornar97/github/renbot-chrome-extension/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { crx } from "file:///home/bjornar97/github/renbot-chrome-extension/node_modules/@crxjs/vite-plugin/dist/index.mjs";

// manifest.json
var manifest_default = {
  name: "Renbot Moderator Assistant",
  version: "1.0.0",
  description: "An assistant to make moderating on rendogtv on twitch easier.",
  manifest_version: 3,
  author: "Bjornar97",
  action: {
    default_popup: "index.html",
    default_title: "Renbot Assistant"
  },
  background: {
    service_worker: "background.js",
    type: "module"
  },
  externally_connectable: {
    matches: ["http://localhost/*", "https://renbot.net/*"]
  },
  permissions: [
    "storage",
    "tabs",
    "webRequest",
    "webRequestBlocking",
    "https://renbot.net/*",
    "http://localhost/*"
  ]
};

// vite.config.ts
var __vite_injected_original_import_meta_url = "file:///home/bjornar97/github/renbot-chrome-extension/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [vue(), crx({ manifest: manifest_default })],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAibWFuaWZlc3QuanNvbiJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ob21lL2Jqb3JuYXI5Ny9naXRodWIvcmVuYm90LWNocm9tZS1leHRlbnNpb25cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL2Jqb3JuYXI5Ny9naXRodWIvcmVuYm90LWNocm9tZS1leHRlbnNpb24vdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvYmpvcm5hcjk3L2dpdGh1Yi9yZW5ib3QtY2hyb21lLWV4dGVuc2lvbi92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGZpbGVVUkxUb1BhdGgsIFVSTCB9IGZyb20gXCJub2RlOnVybFwiO1xuXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XG5cbmltcG9ydCB7IGNyeCB9IGZyb20gXCJAY3J4anMvdml0ZS1wbHVnaW5cIjtcbmltcG9ydCBtYW5pZmVzdCBmcm9tIFwiLi9tYW5pZmVzdC5qc29uXCIgYXNzZXJ0IHsgdHlwZTogXCJqc29uXCIgfTsgLy8gTm9kZSA+PTE3XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbdnVlKCksIGNyeCh7IG1hbmlmZXN0IH0pXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICBcIkBcIjogZmlsZVVSTFRvUGF0aChuZXcgVVJMKFwiLi9zcmNcIiwgaW1wb3J0Lm1ldGEudXJsKSksXG4gICAgfSxcbiAgfSxcbn0pO1xuIiwgIntcclxuICBcIm5hbWVcIjogXCJSZW5ib3QgTW9kZXJhdG9yIEFzc2lzdGFudFwiLFxyXG4gIFwidmVyc2lvblwiOiBcIjEuMC4wXCIsXHJcbiAgXCJkZXNjcmlwdGlvblwiOiBcIkFuIGFzc2lzdGFudCB0byBtYWtlIG1vZGVyYXRpbmcgb24gcmVuZG9ndHYgb24gdHdpdGNoIGVhc2llci5cIixcclxuICBcIm1hbmlmZXN0X3ZlcnNpb25cIjogMyxcclxuICBcImF1dGhvclwiOiBcIkJqb3JuYXI5N1wiLFxyXG4gIFwiYWN0aW9uXCI6IHtcclxuICAgIFwiZGVmYXVsdF9wb3B1cFwiOiBcImluZGV4Lmh0bWxcIixcclxuICAgIFwiZGVmYXVsdF90aXRsZVwiOiBcIlJlbmJvdCBBc3Npc3RhbnRcIlxyXG4gIH0sXHJcbiAgXCJiYWNrZ3JvdW5kXCI6IHtcclxuICAgIFwic2VydmljZV93b3JrZXJcIjogXCJiYWNrZ3JvdW5kLmpzXCIsXHJcbiAgICBcInR5cGVcIjogXCJtb2R1bGVcIlxyXG4gIH0sXHJcbiAgXCJleHRlcm5hbGx5X2Nvbm5lY3RhYmxlXCI6IHtcclxuICAgIFwibWF0Y2hlc1wiOiBbXCJodHRwOi8vbG9jYWxob3N0LypcIiwgXCJodHRwczovL3JlbmJvdC5uZXQvKlwiXVxyXG4gIH0sXHJcbiAgXCJwZXJtaXNzaW9uc1wiOiBbXHJcbiAgICBcInN0b3JhZ2VcIixcclxuICAgIFwidGFic1wiLFxyXG4gICAgXCJ3ZWJSZXF1ZXN0XCIsXHJcbiAgICBcIndlYlJlcXVlc3RCbG9ja2luZ1wiLFxyXG4gICAgXCJodHRwczovL3JlbmJvdC5uZXQvKlwiLFxyXG4gICAgXCJodHRwOi8vbG9jYWxob3N0LypcIlxyXG4gIF1cclxufVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTRULFNBQVMsZUFBZSxXQUFXO0FBRS9WLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUVoQixTQUFTLFdBQVc7OztBQ0xwQjtBQUFBLEVBQ0UsTUFBUTtBQUFBLEVBQ1IsU0FBVztBQUFBLEVBQ1gsYUFBZTtBQUFBLEVBQ2Ysa0JBQW9CO0FBQUEsRUFDcEIsUUFBVTtBQUFBLEVBQ1YsUUFBVTtBQUFBLElBQ1IsZUFBaUI7QUFBQSxJQUNqQixlQUFpQjtBQUFBLEVBQ25CO0FBQUEsRUFDQSxZQUFjO0FBQUEsSUFDWixnQkFBa0I7QUFBQSxJQUNsQixNQUFRO0FBQUEsRUFDVjtBQUFBLEVBQ0Esd0JBQTBCO0FBQUEsSUFDeEIsU0FBVyxDQUFDLHNCQUFzQixzQkFBc0I7QUFBQSxFQUMxRDtBQUFBLEVBQ0EsYUFBZTtBQUFBLElBQ2I7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7QUFDRjs7O0FEekJvTSxJQUFNLDJDQUEyQztBQVNyUCxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsSUFBSSxHQUFHLElBQUksRUFBRSwyQkFBUyxDQUFDLENBQUM7QUFBQSxFQUNsQyxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLElBQ3REO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
