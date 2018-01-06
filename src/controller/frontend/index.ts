import {Context} from 'koa';

export async function HomePage(context: Context){
  await context.render('home/index',{asset_path:'http://127.0.0.1:8080/assets/packs'})
}
export async function BlogPage(context: Context){
  console.log('--------blogpage')
  await context.render('blog/index',{asset_path:'http://127.0.0.1:8080/assets/packs'})
}
export default {
  HomePage,
  BlogPage
}