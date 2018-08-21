// A store holds the whole state tree of your application.
// The only way to change the state inside it is to dispatch an action on it.

// A store is not a class. It's just an object with a few methods on it.
// To create it, pass your root reducing function to createStore.

import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';

// Reducers
// @ todo

// Config from firebase site /database "Add firebase to your web app"
const firebaseConfig = {
  apiKey: 'AIzaSyCT7Xxc7__kAJ0r5eX0i6zJZcg47gc_V04',
  authDomain: 'checkmate-2bef9.firebaseapp.com',
  databaseURL: 'https://checkmate-2bef9.firebaseio.com',
  projectId: 'checkmate-2bef9',
  storageBucket: 'checkmate-2bef9.appspot.com',
  messagingSenderId: '1058687826444'
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// Initalize firebase instance
// Created above (const firebaseConfig = {})
firebase.initializeApp(firebaseConfig);

// Initalize firestore
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase)
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

// Create Inital state
const initalState = {};

// Create store
const store = createStoreWithFirebase(
  rootReducer,
  initalState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
