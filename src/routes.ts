
import Index from './controller/frontend/index';
export  const AppRoutes = [
  {
    path:['/',"/index"],
    method: 'get',
    action: Index.HomePage
  },
  {
    path:'/blog',
    method:'get',
    action: Index.BlogPage
  }
]