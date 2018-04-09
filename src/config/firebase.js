import * as firebase from 'firebase';

// should go in a secret file
const config = {
    apiKey: "AIzaSyDZa-ytWpjNeSxU7207KbHb2u2mPwZDtpI",
    authDomain: "rmapp-1516262005209.firebaseapp.com",
    databaseURL: "https://rmapp-1516262005209.firebaseio.com",
    projectId: "rmapp-1516262005209",
    storageBucket: "",
    messagingSenderId: "1019637452944"
};
firebase.initializeApp(config);

export default firebase;