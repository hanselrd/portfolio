import { Query, Resolver } from 'type-graphql';
import { firebase } from '../../core';
import { UserRecord } from '../types';

@Resolver(UserRecord)
export default class UserResolver {
  @Query(returns => [UserRecord])
  users(id: number) {
    return firebase
      .auth()
      .listUsers()
      .then(result => {
        return result.users;
      });
  }
}
