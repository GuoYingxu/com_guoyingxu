import axios from 'axios'

let util = {

}
const ajaxUrl = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:4000' : 'http://www.guoyingxu.com'

util.ajax = axios.create({
  baseURL: ajaxUrl,
  timeout: 30000
})

util.inOf = function(arr, targetArr) {
  let res = true;
  arr.map(item => {
    if (targetArr.indexOf(item) < 0) {
      res = res && false;
    }
  })
  return res
}

util.oneOf = function(ele, targetArr) {
  if (targetArr.indexOf(ele) >= 0) {
    return true
  } else {
    return false
  }
}

util.showThisRoute =function(itAccess,currentAccess){
  if(typeof itAccess === 'object' && Array.isArray(itAccess)){
    return util.oneOf(currentAccess,itAccess)
  }else{
    return itAccess === currentAccess
  }
}

util.getRouterObjByName = function(routers, name) {
  if(!name || !routers || !routes.length) {
    return null
  }

  let routerObj  = null ;
  for( let  item of routers) {
    if(item.name===name){
      return item;
    }
    routerObj = util.getRouterObjByName(item.children,name);
    if(routerObj){
      return routerObj;
    }
  }
  return null
}

util.handleTitle = function(vm,item) {
  return item.title
}

util.setCurrentPath = function(vm,name){
  let  title = '';
  let isOtherRouter = false;
  vm.$store.state.admin.routers.forEach(item => {
    if( item.children.length === 1){
      if(item.children[0].name === name) {
        title = util.handleTitle(vm, item);
        if(item.name === 'otherRouter') {
          isOtherRouter = true;
        }
      }
    }
  })
}
export default util;