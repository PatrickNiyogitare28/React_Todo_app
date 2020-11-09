import firebase from 'firebase';
// require('dotenv').config();
const config = {
    apiKey: 'AIzaSyCFSeHOJUOiIBJrvkL255pcL7qjp09_Zs4',
    authDomain: 'todolistapp-10c3a.firebaseapp.com',
    databaseURL: 'https://todolistapp-10c3a.firebaseio.com',
    projectId: 'todolistapp-10c3a',
    storageBucket: 'todolistapp-10c3a.appspot.com',
    messagingSenderId: '950548787481'
}

const app = firebase.initializeApp(config);
export default app;