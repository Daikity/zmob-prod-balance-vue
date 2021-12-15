import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import regComponents from "./components/base";
import VueGoogleMaps from "@fawmi/vue-google-maps";
import "bulma/css/bulma.min.css";
import FontAwesomeIcon from "./utilities/icons.js";

const app = createApp(App);

app.config.warnHandler = () => {};

app.component("font-awesome-icon", FontAwesomeIcon);

regComponents.forEach((comp) => {
  app.component(comp.name, comp.component);
});

app
  .use(store)
  .use(router)
  .use(VueGoogleMaps, {
    load: {
      key: "AIzaSyAbraAO0WcxK8LAZoj0rIPqXOGXwCU1E0Q",
    },
  })
  .mount("#app");
