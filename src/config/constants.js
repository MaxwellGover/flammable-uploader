import firebase from 'firebase';

firebase.initializeApp({
  apiKey: "AIzaSyDln_5ZT7CUiw82MQSQv-JssJW9CXsPWqg",
  authDomain: "flammable-30fa1.firebaseapp.com",
  databaseURL: "https://flammable-30fa1.firebaseio.com",
  projectId: "flammable-30fa1",
  storageBucket: "flammable-30fa1.appspot.com",
  messagingSenderId: "373658489583"
});

const db = firebase.database();
const fbAuth = firebase.auth();
const storage = firebase.storage();
const storageRef = storage.ref();

export { db, fbAuth, storageRef };
