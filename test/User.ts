import { createConnection } from 'typeorm';
import { User } from '../src/entity/User';
createConnection().then(async connection => {
  // const user   = await connection.manager.findOne(User)
  // console.log(user)

})