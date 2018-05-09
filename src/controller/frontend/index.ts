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
    code: '2',
    name: '2.0',
    force_update:1,
    url_android:"http://www.baidu.com",
    info: 'test update'
  }
}
export default {
  HomePage,
  BlogPage,
  Version
}