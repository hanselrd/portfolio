import * as firebase from 'firebase';

if (process.env.REACT_APP_STAGE === 'production') {
  firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_PROD_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_PROD_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_PROD_DATABASE_URL,
    messagingSenderId: process.env.REACT_APP_FIREBASE_PROD_MESSAGING_SENDER_ID,
    projectId: process.env.REACT_APP_FIREBASE_PROD_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_PROD_STORAGE_BUCKET
  });
} else if (process.env.REACT_APP_STAGE === 'development') {
  firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_DEV_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_DEV_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DEV_DATABASE_URL,
    messagingSenderId: process.env.REACT_APP_FIREBASE_DEV_MESSAGING_SENDER_ID,
    projectId: process.env.REACT_APP_FIREBASE_DEV_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_DEV_STORAGE_BUCKET
  });
}

export default firebase;
