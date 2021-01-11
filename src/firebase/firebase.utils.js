import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyB0sbTjsUQAjfbBOdyv8DoYEIwVJpj7-C4",
  authDomain: "crwn-clothing-6abc7.firebaseapp.com",
  projectId: "crwn-clothing-6abc7",
  storageBucket: "crwn-clothing-6abc7.appspot.com",
  messagingSenderId: "853342731974",
  appId: "1:853342731974:web:ee6a834c364f4a8f62a1c7",
  measurementId: "G-DET7C7D8QY"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt : 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;