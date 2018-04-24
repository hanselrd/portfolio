import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp(functions.config().firebase);

export const userCreated = functions.auth.user().onCreate(user => {
  return admin
    .database()
    .ref('/users')
    .child(user.uid)
    .set({
      displayName: user.displayName,
      createdAt: admin.database.ServerValue.TIMESTAMP
    });
});
