import {EntityRepository, AbstractRepository} from 'typeorm'
import {User} from '../entity/User'

@EntityRepository(User)
export class UserRepository extends AbstractRepository<User> { 
  create(user_name: string, password?:string){
    const user  = new User();
    user.user_name = user_name;
    if(password) {
       user.password = password;
    }
    return user
  }
  save(user:User){
    return this.manager.save(user);
  }
  find_by_user_name(user_name:string){
    return this.manager.findOne(User,{"user_name": user_name })
  }
}