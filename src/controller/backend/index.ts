import {Context} from 'koa';

export async function AdminPage(context: Context){
  await context.render('admin/index',{asset_path:'http://localhost:8080/assets/packs'})
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