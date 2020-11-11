import React, { Component, useState} from  'react';
import {Link} from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import '../styles/login.css';
import app from '../helper/firebase/Config';
import Toaster from '../components/Toaster';
import Footer from '../components/Footer';
import loadingGif from '../assets/icons/loading-icon.jpg';


const auth = app.auth();;


export default function Signup(){
    const history = useHistory()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmation,setConfirmation] = useState('')
    const [isSendingData, setIsSendingData] = useState(false);


    const submitHandler =   async (e) => {
        setIsSendingData(true)
        e.preventDefault();
        
        if(confirmation !== password){
            setIsSendingData(false)
            return Toaster('error','Wrong password confirmation');
        }
     try {
            await auth.createUserWithEmailAndPassword(email,password).then(() =>{
             setIsSendingData(false)
            })
            localStorage.setItem('userId',auth.currentUser.uid);
            localStorage.setItem('userEmail',auth.currentUser.email);
            history.push('/board')
        } catch (error) {
            setIsSendingData(false);
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
                    
                    {
                        !isSendingData ?
                        <button>Signup</button>
                        :
                        <button className="sendig-data" disabled>
                            <img src={loadingGif} alt="loading"/>
                        </button>
                       }
                </form>
                <p>Have an account? <Link to="/login"><span title="Regester"> Login </span></Link></p>
            </div>
        </div>  
        <Footer page={"Home"} />
        </div>
      
    )
}