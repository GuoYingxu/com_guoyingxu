import {Context} from 'koa';
import {assets_path} from '../../env_config'
export async function HomePage(context: Context){
  await context.render('home/index',{asset_path:assets_path()})
}
export async function BlogPage(context: Context){
  console.log('--------blogpage')
  await context.render('blog/index',{asset_path:assets_path()})
}
export function Version(context: Context) {
  return  context.body= {
    "url":"http://www.guoyingxu.com:4000/download/App-debug.apk",
    "versionCode":4,
    "updateMessage":"1. 适配 Android 8.0\n2. 适配 Android 9.0\n3. 更新说明"
  }
}
export default {
  HomePage,
  BlogPage,
  Version
}