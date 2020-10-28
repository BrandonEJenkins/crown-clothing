import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCEneMx7KtUmcVq0XgzFCaT4J76zNl7gdY",
    authDomain: "crown-db-21622.firebaseapp.com",
    databaseURL: "https://crown-db-21622.firebaseio.com",
    projectId: "crown-db-21622",
    storageBucket: "crown-db-21622.appspot.com",
    messagingSenderId: "547819112603",
    appId: "1:547819112603:web:8f7805fafcaeea506c1e3e",
    measurementId: "G-YENZCVVBP8"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;