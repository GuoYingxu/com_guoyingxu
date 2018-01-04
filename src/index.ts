import "reflect-metadata";
import {createConnection} from "typeorm";
import * as Koa from "koa";
import * as Router from "koa-router";
import * as bodyParser from "koa-bodyparser";
import * as views  from 'koa-views';
import * as Static from 'koa-static';
import * as Session from 'koa-session';
import * as logger from 'koa-logger';
import {AppRoutes} from "./routes";
import {oauthRouter} from './oauthRouter';
import oauthModel from './controller/oauth/model';
import koa2FallbackApiMiddleware  from './lib/koa2-history-api-fallback'
createConnection().then(async connection => {
  //create koa app
  const app = new Koa();
  const router = new Router();

  //session
  app.keys = ['some secret key']
  const CONFIG = {
    key: 'koa:sess',
    maxAge: 86400000,
    overwrite: true,
    httpOnly:true,
    signed: true
  }
  app.use(Session(CONFIG,app))

  //views
  app.use(views(`${__dirname}/views`,{
    extension: 'pug',
    map:{
      pug: 'pug'
    }
  }))

  
  //logger
  app.use(logger())
  app.use(bodyParser())

  
  //oauth router
  app.use(oauthRouter(app).routes())
  //admin oauth

  const adminOauthRouter = new Router()
  adminOauthRouter.all('/admin*',app.oauth.authenticate())
  adminOauthRouter.all('/admin*',async (ctx,next) => {
    console.log(ctx.url)
    if(ctx.state.oauth && ctx.state.oauth.error && ctx.url!='/admin/login'){
      // return ctx.body = {
      //   originUri: ctx.request.url
      // }
      ctx.redirect('/admin/login')
    }else{
      await next()
    } 
  })
  app.use(adminOauthRouter.routes())

  //rewrite
  app.use(koa2FallbackApiMiddleware({
    rewrites: [
      {
        from:/^\/admin\/*/,
        to: '/admin'
      },
      {
        from:/^\/blog\//,
        to:'/blog'
      }
    ],
    verbose: true
  }))
  //register all application routes
  AppRoutes.forEach(route=> router[route.method](route.path, route.action));
  app.use(router.routes());
  // static
  app.use(Static(`${__dirname}/public`));
  app.use(router.allowedMethods());
  app.listen(process.env["PORT"]||3000);
  console.log(`Koa application is up and running on port ${process.env["PORT"] || 3000}`)
     
}).catch(error => console.log(error));
