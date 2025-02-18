// algunos estilos con css para los formularios y cards a nivel general.
import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const app = createApp(App);

// Se utiliza Pinia como biblioteca de gestión de estados en Vue 3.
app.use(createPinia());
// Se utiliza vue-router como biblioteca para administrar las rutas en Vuejs.
app.use(router);
// Se utiliza vue-sweetalert2 para la gestión de ventanas o alertas.
app.use(VueSweetalert2);

app.mount("#app");
