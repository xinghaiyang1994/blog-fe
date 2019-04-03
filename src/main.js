import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';

import './style/variables.scss'
import './style/base.css'

Vue.use(ElementUI);

Vue.config.productionTip = false

let vueInstance = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

export default vueInstance