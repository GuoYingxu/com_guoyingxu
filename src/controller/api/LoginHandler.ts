import { UserRepository } from './../../repository/UserRepository';

import {getCustomRepository} from  'typeorm'
export async function login(ctx,next){
  let callbackUri = ctx.request.body.callback_uri,
  {username, password} = ctx.request.body,
  user;

  if(!callbackUri || !username || !password){
    return ctx.status = 400;
  }
  callbackUri = Buffer.from(callbackUri,'base64').toString('utf-8');
  const  userRepository = getCustomRepository(UserRepository)
  user = await userRepository.find_by_user_name(username)
  
  if(!user || user.password !=password){
    await forwardToLogin(ctx,callbackUri) 
    return
  }

  //login success

  ctx.session.loginUser = { 'user_name': username}
  ctx.redirect(callbackUri)
}

async function forwardToLogin(ctx,callbaclUri){
  await forwardToView(ctx,'login',{
    'callbackUri': Buffer.from(callbaclUri,'utf-8').toString('base64'),
    'loginUrl': '/oauth/login'
  })
}

async function forwardToView(ctx,viewName,ViewModel) {
   ctx.body={'view':'viewName'} 
}