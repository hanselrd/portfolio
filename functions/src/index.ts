import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp(functions.config().firebase);

export const userCreated = functions.auth.user().onCreate(async user => {
  await admin
    .database()
    .ref('/users')
    .child(user.uid)
    .set({
      email: user.email,
      displayName: user.displayName ? user.displayName : 'Anonymous',
      provider:
        user.providerData.length > 0 ? user.providerData[0].providerId : null,
      createdAt: admin.database.ServerValue.TIMESTAMP
    });

  const readwriteRef = admin
    .database()
    .ref('/readwrite')
    .child(user.uid);

  await readwriteRef.child('/settings').set({
    showEmail: true
  });

  return;
});

export const settingsEditted = functions.database
  .ref('/readwrite/{uid}/settings')
  .onWrite(async (change, context) => {
    const uid = context.params.uid;
    const settings = change.after.val();
    const user = await admin.auth().getUser(uid);

    return admin
      .database()
      .ref('/users')
      .child(uid)
      .update({
        email: settings.showEmail ? user.email : null
      });
  });
