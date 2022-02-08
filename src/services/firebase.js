import * as firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyAw1O971oEkesQXzuKFUHu8uzJE0Wfftns",
    authDomain: "chat-app-d47ca.firebaseapp.com",
    projectId: "chat-app-d47ca",
    storageBucket: "chat-app-d47ca.appspot.com",
    messagingSenderId: "504382490290",
    appId: "1:504382490290:web:3a65894ff78c781f082bab"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;