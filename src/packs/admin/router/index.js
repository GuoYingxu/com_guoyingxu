import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import { routers } from './router'

Vue.use(VueRouter)

//路由配置

const RouterConfig = {
  mode: 'history',
  base:'/admin/',
  routes: routers
}
export const router = new VueRouter(RouterConfig);

router.beforeEach((to,from,next)=>{
  iView.LoadingBar.start();
  
  // 判断登录
  console.log('未登录')

  next()
})
router.afterEach( (to)=>{
  iView.LoadingBar.finish();
  window.scrollTo(0,0)
})