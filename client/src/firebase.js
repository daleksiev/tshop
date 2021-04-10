import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCy-8-d-BYSBu1c_I-xZ3JlBxJt6HJQmCE",
    authDomain: "t-shop-e1948.firebaseapp.com",
    projectId: "t-shop-e1948",
    storageBucket: "gs://t-shop-e1948.appspot.com",
    messagingSenderId: "747028323294",
    appId: "1:747028323294:web:ae9a6d4ba0b2e034c29b4f",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
export const auth = firebase.auth;
export const storage = firebase.storage();