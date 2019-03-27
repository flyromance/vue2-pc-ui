import Vue from "vue";
import router from "./router";
import App from "./app.vue";
import vuf from "../src/index";
import "../src/styles/index.less";

Vue.use(vuf);

new Vue({
  router,
  render: function (h) {
    // return h(App);
    return <App />
  }
}).$mount("#app");
