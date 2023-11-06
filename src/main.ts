import "@/assets/styles/index.scss";
import "@/assets/fonts/font.scss";
import { createApp } from "vue";
import { createPinia } from "pinia";
import "virtual:svg-icons-register";
import SvgIcon from "@/components/SvgIcon/index.vue";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "element-plus/theme-chalk/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import App from "./App.vue";
import router from "./router";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
const app = createApp(App);

//引入element-plus icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
// pinia持久化
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(router);
app.component("svg-icon", SvgIcon);
app.mount("#app");
