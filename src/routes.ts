
import Index from './controller/frontend/index';
import Admin from './controller/backend/index';
import {login} from './controller/api/LoginHandler';
export  const AppRoutes = [
  {
    path:'/version',
    method:'get',
    action: Index.Version
  },
  {
    path:['/',"/index"],
    method: 'get',
    action: Index.HomePage
  },
  {
    path:'/blog',
    method:'get',
    action: Index.BlogPage
  },
  // {
  //   path:'/admin/*',
  //   method:'all',
  //   action: 'oauth'
  // },
  // {
  //   path:'/admin/*',
  //   method:'all',
  //   action: Admin.oauthError
  // },
  {
    path: '/admin',
    method: 'get',
    action: Admin.AdminPage
  },
  {
    path:'/api/login',
    method:'post',
    action:login 
  }

]