import Vue from 'vue';
import iView from 'iview';
import App from './app.vue';
import 'iview/dist/styles/iview.css';
import store from './store/index'

Vue.use(iView)

new Vue({
  el: "#app",
  store,
  render: h => h(App)
})