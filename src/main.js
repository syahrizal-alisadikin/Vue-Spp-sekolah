import { createApp } from "vue";
import App from "./App.vue";

//import router
import router from "./router";

//import store vuex
import storeVx from "./storeVuex";

const app = createApp(App);

app.use(storeVx);
app.use(router);

app.mount("#app");
