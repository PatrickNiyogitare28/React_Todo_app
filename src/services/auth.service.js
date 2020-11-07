import firebase from 'firebase';
import {Redirect} from 'react-router-dom';
import app from '../helper/firebase/Config';
const auth = app.auth();;

const signUp = async(email,password) => {
     auth.createUserWithEmailAndPassword(email,password).then(user => {
       return true
     }).catch(e => {
         alert("error")
         console.log("erro: "+e)
         return false;
     })
}

const login = async(email,password) => {
    auth.signInWithEmailAndPassword(email,password).then(user => {
        return true;
    })
    .catch(e => {
        alert(e);
        console.log(e);
    })
}

export {signUp, login};
