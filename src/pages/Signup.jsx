import React, { Component, useState} from  'react';
import {Link} from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import '../styles/login.css';
import app from '../helper/firebase/Config';
import Toaster from '../components/Toaster';
import Footer from '../components/Footer';


const auth = app.auth();;


export default function Signup(){
    const history = useHistory()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmation,setConfirmation] = useState('')

    const submitHandler =   async (e) => {
        e.preventDefault();

        if(confirmation !== password){
            return Toaster('error','Wrong password confirmation');
        }
     try {
           await auth.createUserWithEmailAndPassword(email,password);
            localStorage.setItem('userId',auth.currentUser.uid);
            localStorage.setItem('userEmail',auth.currentUser.email);
            history.push('/board')
        } catch (error) {
            Toaster('error',error.message);
            console.log("error ",error.message)
        }

    }
    return (
        <div className="containerFluid">
              <div className="container">
            <div className="formWrapper signup-wrapper shadow">
                <form onSubmit={submitHandler}>
                    <input type="email"  placeholder="Email" id="email" value={email} onChange={e => setEmail(e.target.value)}/>
                    <input  type="password" name="password" placeholder="Password" id="password" value={password} onChange={e => setPassword(e.target.value)}/>
                    <input  type="password" name="confirmation" placeholder="Confirm password" id="confirmation" value={confirmation} onChange={e => setConfirmation(e.target.value)}/>
                    
                    <button className="signupButton">Signup</button>
                </form>
                <p>Have an account? <Link to="/login"><span title="Regester"> Login </span></Link></p>
            </div>
        </div>  
        <Footer page={"Home"} />
        </div>
      
    )
}