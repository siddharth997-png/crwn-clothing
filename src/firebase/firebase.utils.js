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

export const createUserProfileDocument = async (userAuth,additionalProps) => {
  if(!userAuth) return;

  console.log('create UserProfile Document');
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const userSnap = await userRef.get();

  if(!userSnap.exists) {
    console.log('user dosent exists so creating one');
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try{
      userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalProps
      })
    } catch(e) {
      console.log(e.message);
    }
  }

  return userRef;
}

export const addCollectionsAndDocuments = async (
  collectionKey,
  objectsArray
  ) => {
  const collectionsRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsArray.forEach(collection => {
    const newCollectionRef = collectionsRef.doc();
    batch.set(newCollectionRef, collection);
  })

  return await batch.commit();
}

export const convertCollectionsSnapShotToMap = collections => {
  const transFormedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return{
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }

  })
  return transFormedCollection.reduce((acc,collection) => {
    acc[collection.title.toLowerCase()] = collection;
    return acc;
  },{});
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const getCurrentUser = () => {
  return new Promise((resolve,reject)=> {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  })
}

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt : 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;