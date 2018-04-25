import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp(functions.config().firebase);

export const userCreated = functions.auth.user().onCreate(async user => {
  await admin
    .database()
    .ref('/users')
    .child(user.uid)
    .set({
      displayName: user.displayName ? user.displayName : 'Anonymous',
      photoURL: user.photoURL ? user.photoURL : null
    });

  await admin
    .database()
    .ref('/protected')
    .child(user.uid)
    .set({
      email: user.email,
      provider:
        user.providerData.length > 0 ? user.providerData[0].providerId : null,
      createdAt: admin.database.ServerValue.TIMESTAMP
    });

  return;
});

export const newChatMessage = functions.database
  .ref('/private/{uid}/writeable/chat/message')
  .onWrite(async (change, context) => {
    const uid = context.params.uid;
    const data = change.after.val();

    if (data) {
      return admin
        .database()
        .ref('/chat/messages')
        .push()
        .set({
          user: uid,
          text: data,
          createdAt: admin.database.ServerValue.TIMESTAMP
        });
    }

    return;
  });
