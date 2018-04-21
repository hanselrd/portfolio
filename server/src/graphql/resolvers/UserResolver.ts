import { Arg, ID, Query, Resolver } from 'type-graphql';
import { User } from '../../entities';

@Resolver(User)
export default class UserResolver {
  @Query(returns => User, { nullable: true })
  user(
    @Arg('id', type => ID)
    id: number
  ) {
    // return User.findOne(id);
    throw new Error('Not implemented');
  }
}
