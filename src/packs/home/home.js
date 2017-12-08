import Vue from 'vue';
import iView from 'iview';
import App from './app.vue';
import 'iview/dist/styles/iview.css';

Vue.use(iView)

new Vue({
  el: "#app",
  render: h => h(App)
})