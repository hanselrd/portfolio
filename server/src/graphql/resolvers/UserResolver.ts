import { Arg, Authorized, Ctx, ID, Query, Resolver } from 'type-graphql';
import firebase from '../../core/firebase';
import { UserRecord } from '../types';

@Resolver(UserRecord)
export default class UserResolver {
  @Query(returns => [UserRecord])
  users() {
    return firebase
      .auth()
      .listUsers()
      .then(result => {
        return result.users;
      });
  }

  @Query(returns => UserRecord)
  user(
    @Arg('id', type => ID)
    id: string
  ) {
    return firebase.auth().getUser(id);
  }

  @Authorized()
  @Query(returns => UserRecord)
  currentUser(@Ctx() { user }: any) {
    return user;
  }
}
