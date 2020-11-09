import firebase from 'firebase';
import {Redirect} from 'react-router-dom';
import app from '../helper/firebase/Config';
const auth = app.auth();;

const signUp = async(email,password) => {
     auth.createUserWithEmailAndPassword(email,password).then(response => {
       sessionStorage.setItem("user",response.user);  
       return true
     }).catch(e => {
         alert("error")
         console.log("erro: "+e)
         return false;
     })
}

const login = async (email,password) => {
    //  auth.signInWithEmailAndPassword(email,password).then(response => {
    //     // let userObj = {
    //         console.log(response)
    //     // }
    //     sessionStorage.setItem("user");  
    //    return true;
    // })
    // .catch(e => {
    //     return false;
    // })
    try {
    const resp = await auth.signInWithEmailAndPassword(email,password)
    sessionStorage.setItem("user",resp.user); 
    if(resp.user){
       <Redirect to="/board"/>
    }
    } catch (error) {
      return false  
    }
}

const getCurrentUser = async() => {
    console.log("here: "+auth.currentUser.uid);
    return auth.currentUser.uid;
}
export {signUp, login, getCurrentUser};
