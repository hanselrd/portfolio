import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp(functions.config().firebase);

export const userCreated = functions.auth.user().onCreate(async user => {
  await admin
    .database()
    .ref('/users')
    .child(user.uid)
    .set({
      name: user.displayName ? user.displayName : 'Anonymous',
      photoURL: user.photoURL ? user.photoURL : null
    });

  await admin
    .database()
    .ref('/metadata/users')
    .child(user.uid)
    .set({
      provider:
        user.providerData.length > 0 ? user.providerData[0].providerId : null,
      created: admin.database.ServerValue.TIMESTAMP
    });

  await admin
    .database()
    .ref('/settings')
    .child(user.uid)
    .set({
      showEmail: false
    });

  return;
});

export const settingsEditted = functions.database
  .ref('/settings/{userid}')
  .onWrite(async (change, context) => {
    const userid = context.params.userid;
    const settings = change.after.val();
    const user = await admin.auth().getUser(userid);

    await admin
      .database()
      .ref('/metadata/users')
      .child(userid)
      .update({
        email: settings.showEmail ? user.email : null
      });

    return;
  });
