import {Context} from 'koa';
import {assets_path} from '../../env_config'

export async function AdminPage(ctx: Context){
  if(!ctx.session.loginUser){
    console.log('---去登陆')
   
  }
  await ctx.render('admin/index',{asset_path:assets_path()})
}
export async function oauthError(ctx: Context,next) {

  console.log(ctx.request)
  console.log(ctx.url)
  if(ctx.state.oauth && ctx.state.oauth.error ){
    console.log('-----error')
    // return ctx.body = {
    //   originUri: ctx.request.url
    // }
    // ctx.redirect('/admin/login')
  }else{
    await next()
  } 
}
export default {
  AdminPage,
  oauthError
}