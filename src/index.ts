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

  //register all application routes
  AppRoutes.forEach(route=> router[route.method](route.path,route.action));
  
  //logger
  app.use(logger())
  //run app
  app.use(bodyParser())
  app.use(router.routes());
  // static
  app.use(Static(`${__dirname}/public`));
  app.use(router.allowedMethods());
  app.listen(process.env["PORT"]||3000);
  console.log(`Koa application is up and running on port ${process.env["PORT"] || 3000}`)
     
}).catch(error => console.log(error));
