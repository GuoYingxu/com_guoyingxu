import { UserRepository } from './../../repository/UserRepository';
import * as consolidate from 'consolidate'
import {getCustomRepository} from  'typeorm'


export async  function login(ctx,next) {
  let  {user_name, password } = ctx.request.body;
  const  userRepository = getCustomRepository(UserRepository)
  let user = await userRepository.find_by_user_name(user_name)
  console.log(user) 
  if(!user || user.password != password){
    ctx.state = 400;
    ctx.body = {
      message: '用户名密码错误！',
      error: '400'
    }
  }else{
    ctx.session.loginUser = user
    ctx.state = 200
    ctx.body = {
      success: 'ok',
      message: '登录成功！'
    }
  }
}

// export async function login(ctx,next){
//   let callbackUri = ctx.request.body.callback_uri,
//   {user_name, password} = ctx.request.body,
//   user;
//   // if(callback)
//   if(!callbackUri ){
//     callbackUri ='/admin'
//   }
//   if(!callbackUri || !user_name || !password){
//     return ctx.status = 400;
//   }
//   callbackUri = Buffer.from(callbackUri,'base64').toString('utf-8');
//   const  userRepository = getCustomRepository(UserRepository)
//   user = await userRepository.find_by_user_name(user_name)
//   console.log('login success') 
//   console.log(user)
//   if(!user || user.password !=password){
//     await forwardToLogin(ctx,callbackUri) 
//     return
//   }
  
//   //login success

//   // ctx.session.loginUser = { 'user_name': user_name}
//   console.log(ctx)
  



//   if(ctx.request.header.accept.indexOf('application/json') == 0){
//     return ctx.body = {
//       loginUser: user.user_name,
//       code: 200,
//       message: 'success',
//       callbackUri :  Buffer.from(callbackUri,'utf-8').toString('base64'),
//     }
//   }else{
//     ctx.redirect(callbackUri)
//   }
// }

// async function forwardToLogin(ctx,callbackUri){
//   await forwardToView(ctx,'/admin/login',{
//     'callbackUri': Buffer.from(callbackUri,'utf-8').toString('base64'),
//     'loginUrl': '/admin/login'
//   })
// }

// async function forwardToView(ctx,viewName,ViewModel) {
//    const renderer = consolidate['pug']
//    ctx.body= await renderer(viewName,ViewModel) 
// }