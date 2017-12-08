import {Context} from 'koa';

export async function HomePage(context: Context){
  await context.render('home/index',{asset_path:'http://localhost:8080/assets/packs'})
}

export default {
  HomePage
}