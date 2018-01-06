import * as InvalidArgumentError from 'oauth2-server/lib/errors/invalid-argument-error'
import * as NodeOAuthServer from 'oauth2-server'
import * as TPromise from 'bluebird'
import {Request, Response} from 'oauth2-server'

import * as UnauthorizedRequestError from 'oauth2-server/lib/errors/unauthorized-request-error'

// export interface KoaOauthServerOptions{
//   model: any,

// }


export default class KoaOauthServer extends NodeOAuthServer{
  public useErrorHandler:boolean =false
  public continueMiddleware:boolean = false
  constructor(options){
    super(options)
    if(!options || !options.model) {
      throw new InvalidArgumentError('Missing parameter:`model`')
    }
    this.useErrorHandler = !!options.useErrorHandler
    this.continueMiddleware = !!options.continueMiddleware
  }


  /**
   *  Authentication Middleware
   * 
   *  Returns a middleware that will validate a token
   */

  public authenticate(options){
    return async (ctx,next)=>{
      const request = new Request(ctx.request)
      const response = new Response(ctx.response)
      let token
      console.log('----authenticate')
      try{
        token = await super.authenticate(request,response,options)
        ctx.state.oauth = {
          token: token
        }
      }catch(e){
        await this.handleError(e,ctx,null,next)
        return
      }
      await next()
    }
  }

  /**
   *  Authorization Middleware
   * 
   *  Returns a middleware that will authorize a client to request tokens
   */
  public authorize(options){
    return async (ctx,next) => {
      const request = new Request(ctx.request)
      const response = new Response(ctx.response)
      let code
      try{
        code = await super.authorize(request,response,options)
        ctx.state.oauth = {
          code: code
        }
      }catch(e){
        await this.handleError(e,ctx,response,next)
        return
      }
      if(this.continueMiddleware){
        await next()
      }

      await this.handleResponse(ctx,response)
    }
  }

  /**
   *  Grant Middleware
   * 
   *  Returns middleware that will grant tokens to valid requests
   */

  public token(options) {
    return async (ctx,next) => {
      const request = new Request(ctx.request)
      const response = new Response(ctx.response)
      let token
      try{
        token = await super.token(request, response, options)
        ctx.state.oauth = {
          token: token
        }
      }catch(e) {
        await this.handleError.call(this,ctx,response)
        return
      }

      await this.handleResponse.call(this,ctx, response)
    }
  }

  /**
   * handle response
   */
  public async handleResponse(ctx, response) {
    if(response.status === 302) {
      const location =  response.headers.location
      delete response.headers.location
      ctx.set(response.headers)
      ctx.redirect(location)
    }else {
      ctx.set(response.headers)
      ctx.status = response.status
      ctx.body = response.body
    }
  }

  /**
   *  handle error
   */
  public async handleError(e,ctx,response, next) { 
    if(this.useErrorHandler === true) { 
      ctx.state.oauth= {error:e}
      console.log('-----handlerError next')
      await next()
    }else 
    {
      if(response) {
         ctx.set(response.headers)
      }
      ctx.status = e.code;
      if(e instanceof UnauthorizedRequestError){
        ctx.body = ''
        return 
      }
      ctx.body = {error : e, error_description: e.message}
    }
  }
}