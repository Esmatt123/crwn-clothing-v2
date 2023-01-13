import { initializeApp } from "firebase/app";
import {
  getAuth, //*Returns the Auth instance associated with the provided @firebase/app#FirebaseApp. If no instance exists, initializes an Auth instance with platform-specific default dependencies.
  signInWithRedirect, //* Authenticates a Firebase client using a full-page redirect flow.
  signInWithPopup, //* Authenticates a Firebase client using a popup-based OAuth authentication flow.
  GoogleAuthProvider, //* Provider for generating an an OAuthCredential for ProviderId.GOOGLE.
  createUserWithEmailAndPassword, //* Creates a new user account associated with the specified email address and password.
  signInWithEmailAndPassword, //* Asynchronously signs in using an email and password.
  signOut, //* Signs out the current user.
  onAuthStateChanged, //*Adds an observer for changes to the user's sign-in state.
} from "firebase/auth";
import {
  getFirestore, //* Returns the existing default Firestore instance that is associated with the provided @firebase/app#FirebaseApp. If no instance exists, initializes a new instance with default settings.
  doc, //* Gets a DocumentReference instance that refers to the document at the specified absolute path.
  getDoc, //*Reads the document referred to by this DocumentReference.
  setDoc, //*Writes to the document referred to by this DocumentReference. If the document does not yet exist, it will be created.
  collection, //* Gets a CollectionReference instance that refers to the collection at the specified absolute path.
  writeBatch, //* Creates a write batch, used for performing multiple writes as a single atomic operation. The maximum number of writes allowed in a single WriteBatch is 500.
  query, //* Creates a new immutable instance of Query that is extended to also include additional query constraints.
  getDocs, //* Executes the query and returns the results as a QuerySnapshot.
} from "firebase/firestore";

const firebaseConfig = {
  //* Configuration object for which specific firebase account/database is being referred to.
  apiKey: "AIzaSyCarozmDBtlcvYAxa8j21eEKKDVMPdpwnE",
  authDomain: "crwn-clothing-db-61fd8.firebaseapp.com",
  projectId: "crwn-clothing-db-61fd8",
  storageBucket: "crwn-clothing-db-61fd8.appspot.com",
  messagingSenderId: "790878577233",
  appId: "1:790878577233:web:7ab1097cbd6abf7bdf8e70",
};

//const firebaseApp =
initializeApp(firebaseConfig); //* Initializes Firebase app based on the configs above

const googleProvider = new GoogleAuthProvider(); //* makes the google popup when signing in
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth(); //* This is the user

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider); //* this is the sign in function, creates a google pop up
export const signInWithGoogleRedirect = () =>
  //* signs in the user but with google redirect
  signInWithRedirect(auth, googleProvider);
export const db = getFirestore(); //*this is the firestore database

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey); //* this gets the specific database collection, the name gets written in as an argument
  const batch = writeBatch(db); //* I guess this is everything contained within the collection in text form

  objectsToAdd.forEach((object) => {
    //* this loops over the objecttoadd param and sets the writebatch
    const docRef = doc(collectionRef, object.title.toLowerCase()); //*the docref is whats inside the database as well as the lowercase title of that database collection
    batch.set(docRef, object); //*makes a text verion of it I guess
  });

  await batch.commit(); //*Commits what has been written
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories"); //*this is a different collectionref, it refers to the "categories" collection
  const q = query(collectionRef); //*this specific collectionref gets converted into a query

  const querySnapSHot = await getDocs(q); //*this is a querysnapshot of this collectionref, it gets returned from the getdocs function
  return querySnapSHot.docs.map((docSnapShot) => docSnapShot.data()); //*this then returns all the fields in the snapshot as an object
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  const userDocRef = doc(db, "users", userAuth.uid); //*Points to where the userdocref can be created

  const userSnapShot = await getDoc(userDocRef); //* fetches the docref from the database

  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth; //*If user doesnt already exist, create it.
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        //* this setDoc creates the user with displayname, email and time of creation, as well as additional info
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userSnapShot;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  //*this creates user with email and password but returns if there is no email or password
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

export const getCurrentUser = () => {
  //* this listens to whether the user is logged in or not.
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      unsubscribe(); //* This removes the listener as soon as it gets a value, whatever it is
      resolve(userAuth); //*this finishes the promise of getting a logged in or logged out listener value. userAuth param is the value
    });
  });
};
