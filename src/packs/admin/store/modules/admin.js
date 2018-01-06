import {otherRouter,adminRouter} from '../../router/router';
import * as util from '../../../libs/util';
export default {
  state: {
    opendSubmenuArr:[],
    pageOpendList: [{
      title: '首页',
      path: '',
      name: 'home_index'
    }],
    currentPageName: '',
    currentPath: [
      {
        title: '首页',
        path: '',
        name: 'home_index'
      }
    ],
    menuList: [],
    routers: [
      otherRouter,
      ...adminRouter
    ],
  },
  mutations: {
    updateMeneList(state){
      // let menuList =[];
      // appRouter.forEach((item,index)=>{
      //   if(item.access !== undefined){
      //     if (util.showThisRoute(item.access,accessCode)){
            
      //     }
      //   }
      // })
    }
  }

}