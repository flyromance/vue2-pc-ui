import Vue from 'vue'
import Vuf from 'vuf'
import router from './router'
import App from './app.vue'

import 'vuf/style/index.less'

Vue.use(Vuf)

new Vue({
  router,
  render(h) {
    return h(App)
  }
}).$mount('#app')
