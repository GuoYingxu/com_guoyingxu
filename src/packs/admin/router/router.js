import Main from '../components/Main.vue'

export const loginRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: 'Login - 登录'
  },
  component: resolve => { require(['../components/login.vue'], resolve) }
}

export const page404 = {
  path: '/*',
  name: 'error-404',
  meta: {
    title: '404 - 页面不存在'
  },
  component: resolve => { require(['../components/page404.vue'], resolve) }
}

export const page403 = {
  path: '/403',
  meta: {
    title: '403 - 权限不足'
  },
  name: 'error-403',
  component: resolve => { require(['../components/page403.vue'], resolve) }
}

export const page500 = {
  path: '/500',
  name: 'error - 500',
  meta: {
    title: '500 -服务端错误'
  },
  component: resolve => {
    require(['../components/page500.vue'], resolve)
  }
}

export const preview = {
  path: '/preview',
  name: 'preview',
  component: resolve => {
    require(['../components/form/preview.vue'], resolve)
  }
}

export const locking = {
  path: '/locking',
  name: 'locking',
  component: resolve => {
    require(['../components/lockscreen/locking-page.vue'], resolve)
  }
}

export const adminRouter = [{
  path: '/userInfo',
  name: 'userInfo',
  component: resolve => {
    require(['../components/userInfo/userInfo.vue'], resolve)
  }
}]


export const otherRouter = {
  path: '/',
  name: 'otherRouter',
  redirect: '/home',
  component: Main,
  children: [
    {
      path:'/home',
      name: 'home_index',
      component: resolve => { 
        require(['../components/home/home.vue'],resolve)
      }
    }
  ]
}

export const routers = [
  loginRouter,
  preview,
  locking,
  ...adminRouter,
  otherRouter,
  page500,
  page403,
  // page404
]