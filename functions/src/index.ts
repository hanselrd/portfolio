import * as Filter from 'bad-words';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp(functions.config().firebase);

export const userCreated = functions.auth.user().onCreate(async user => {
  await admin
    .database()
    .ref('users')
    .child(user.uid)
    .set({
      displayName: user.displayName ? user.displayName : 'Anonymous',
      photoUrl: user.photoURL,
      // email: user.email,
      provider:
        user.providerData.length > 0 ? user.providerData[0].providerId : null,
      role: 0,
      created: admin.database.ServerValue.TIMESTAMP
    });

  await admin
    .database()
    .ref('userOwned/settings')
    .child(user.uid)
    .set({
      showEmail: false
    });

  return;
});

export const userDeleted = functions.auth.user().onDelete(async user => {
  await admin
    .database()
    .ref('users')
    .child(user.uid)
    .remove();

  await admin
    .database()
    .ref('queue/chat/messages')
    .child(user.uid)
    .remove();

  await admin
    .database()
    .ref('userWriteable/updateUser')
    .child(user.uid)
    .remove();

  await admin
    .database()
    .ref('userOwned/settings')
    .child(user.uid)
    .remove();

  return;
});

export const queueChatMessages = functions.database
  .ref('queue/chat/messages/{uid}/{pushid}')
  .onCreate(async (snapshot, context) => {
    const uid = context.params.uid;
    const filter = new Filter();

    await admin
      .database()
      .ref('chat/messages')
      .push()
      .set({
        uid,
        text: filter.clean(snapshot.val()),
        created: admin.database.ServerValue.TIMESTAMP
      });

    return snapshot.ref.remove();
  });

export const userWriteableUpdateUser = functions.database
  .ref('userWriteable/updateUser/{uid}')
  .onWrite((change, context) => {
    const uid = context.params.uid;

    return admin
      .database()
      .ref('users')
      .child(uid)
      .update(change.after.val());
  });

export const userOwnedSettings = functions.database
  .ref('userOwned/settings/{uid}')
  .onWrite(async (change, context) => {
    const uid = context.params.uid;
    const settings = change.after.val();
    const user = await admin.auth().getUser(uid);

    await admin
      .database()
      .ref('users')
      .child(uid)
      .update({
        email: settings.showEmail ? user.email : null
      });

    return;
  });
