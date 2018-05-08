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
    version: '1.0',
    description: 'test update'
  }
}
export default {
  HomePage,
  BlogPage,
  Version
}