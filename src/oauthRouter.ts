import  * as Router from 'koa-router';
import KoaOauthServer from './controller/oauth/oauthServer';
import oauthModel from './controller/oauth/model';
export function oauthRouter(app){
  let _router = new Router({prefix:'/oauth'})

  app.oauth = new KoaOauthServer({
    model: oauthModel,
    useErrorHandler: true
  })
  _router.post('/login',login)
  
  _router.get('/authorize',checkLogin)

  _router.get('/authorize',app.oauth.authorize({
    authenticateHandler: authenticateHandler()
  }))
  _router.post('/token',app.oauth.token())
  _router.all('/*',async (ctx,next) => {
    console.log('-----oauth')
    let oauthState = ctx.state.oauth || {}
    if(oauthState.error){
      ctx.throw(oauthState.error)
      return
    }
    await next()
  })

  return _router;
}
async function login(ctx,next){
  console.log('----login')
  await next()
}
function checkLogin(){

}
function authenticateHandler(){
  return {
    handle: (request,response)=> {
      if(request.session.loginUser){
        return { username: request.session.loginUser.username}
      }
      return  null
    }
  }
}

export default {
  oauthRouter
}