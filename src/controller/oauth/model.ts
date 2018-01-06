import * as redis from 'redis';
import * as bluebird from 'bluebird';

import {format as fmt} from 'util'

bluebird.promisifyAll(redis.RedisClient.prototype);
const db = redis.createClient();
// db.on('ready',()=>{
//   console.log('ready')
// })
// db.on('connect', ()=>{
//   console.log('connect')
// })
// db.on('error' , ()=> {
//   console.log('error')
// })
// db.set('key','abc',redis.print)
// const res = db.get('key',redis.print)
// console.log(res)
// console.log(client.getAsync('key'))

var formats = {
  client: 'clients:%s',
  token: 'token:%s',
  user: 'users:%s'
};

/** get AccessToken */
export async function getAccessToken(bearerToken){
  const token = await db.hgetall(fmt(formats.token,bearerToken))
  if(!token) {
    return;
  }
  return {
    accessToken: token.accessToken,
    clientId: token.clientId,
    expires: token.accessTokenExpiresOn,
    userId: token.userId
  }
}
/** get Client */
export async function getClient(clientId,clientSecret){
  const client = await db.hgetall(fmt(formats.client,clientId))
  if(!client || client.clientSecret !== clientSecret){
    return ;
  }
  return {
    clientId: client.clientId,
    clientSecret: client.clientSecret
  }
}


/**
 * get refresh  token
 */
export async function getRefreshToken(bearerToken){
  const token = await db.hgetall(fmt(formats.token,bearerToken));
  
  if(!token) {
    return;
  }
  return {
    clientId:token.clientId,
    expires: token.refreshTokenExpiresOn,
    refreshToken: token.accessToken,
    userId: token.userId
  }
}

/** get user */
export async function getUser(username,password){
  const user = await db.hgetall(fmt(formats.user,username))

  if(!user|| password !==user.password){
    return
  }
  return {
    id:username
  }
}
/**save token */

export async function saveToken(token,client,user){
  const data ={
    accessToken: token.accessToken,
    accessTokenExpiresAt: token.accessTokenExpiresAt,
    clientId: client.id,
    refreshToken:token.refreshTokenExpiresOn,
    refreshTokenExpiresAt: token.refreshTokenExpiresAt,
    userId: user.id
  }
  await db.hmset(fmt(formats.token,token.accessToken),data)
  await db.hmset(fmt(formats.token,token.refreshToken),data)
  return data
}

export default {
  saveToken,
  getAccessToken,
  getUser,
  getRefreshToken,
  getClient
}