import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

const routes = [
  {
    path: "/",
    component: () => import("./routes/index.vue")
  },
  {
    path: "/icon",
    component: () => import("./routes/icon.vue")
  },
  {
    path: "/button",
    component: () => import("./routes/button.vue")
  },
  {
    path: "/grid",
    component: () => import("./routes/grid.vue")
  },
  {
    path: "/layout",
    component: () => import("./routes/layout.vue")
  },
  {
    path: "/card",
    component: () => import("./routes/card.vue")
  },
  {
    path: "/collapse",
    component: () => import("./routes/collapse.vue")
  },
  {
    path: "/switch",
    component: () => import("./routes/switch.vue")
  },
  {
    path: "/input",
    component: () => import("./routes/input.vue")
  },
  {
    path: "/checkbox",
    component: () => import("./routes/checkbox.vue")
  },
  {
    path: "/form",
    component: () => import("./routes/form.vue")
  },
  {
    path: "/alert",
    component: () => import("./routes/alert.vue")
  },
  {
    path: "/table-render",
    component: () => import("./routes/table-render.vue")
  },
  {
    path: "/table-slot",
    component: () => import("./routes/table-slot.vue")
  },
  {
    path: "/tree",
    component: () => import("./routes/tree.vue")
  },
  {
    path: "*",
    component: () => import("./routes/index.vue")
  }
];

export default new Router({
  routes
});
