import {Context} from 'koa';

export async function HomePage(context: Context){
  await context.render('home/index')
}

export default {
  HomePage
}