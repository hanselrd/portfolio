import { AuthChecker } from 'type-graphql';
import firebase from '../core/firebase';

const authChecker: AuthChecker<{ user?: firebase.auth.UserRecord }> = (
  { root, context: { user } },
  roles
) => {
  if (user) {
    if (roles.length === 0) {
      return true;
    }
    // } else if (roles.length === 1 && roles[0] === 'private') {
    //   if (user.uid === root.id) {
    //     return true;
    //   }
    //   return false;
    // } else if (
    //   // need to test
    //   user.customClaims &&
    //   (user.customClaims as string[]).some(role =>
    //     (user.customClaims as string[]).includes(role)
    //   )
    // ) {
    //   return true;
    // }
  }
  return false;
};

export default authChecker;
