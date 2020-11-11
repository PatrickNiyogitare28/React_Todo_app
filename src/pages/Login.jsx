import React, { Component, useState} from  'react';
import {Link} from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import '../styles/login.css';
import app from '../helper/firebase/Config';
import Toaster from '../components/Toaster';
import Footer from '../components/Footer';
import loadingGif from '../assets/icons/loading-icon.jpg';


const auth = app.auth();;


export default function Login(){
    const history = useHistory()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [isSendingData, setIsSendingData] = useState(false);
    const submitHandler =   async (e) => {
        e.preventDefault();
     try {  
            setIsSendingData(true)
            await auth.signInWithEmailAndPassword(email,password).then(()=> {
                setIsSendingData(false);
            })
            localStorage.setItem('userId',auth.currentUser.uid);
            localStorage.setItem('userEmail',auth.currentUser.email);
            history.push('/board')
        } catch (error) {
            setIsSendingData(false)
            Toaster('error','Invalid email or password');
            console.log("error ",error)
        }

    }
    return (
        <div className="containerFluid">
             <div className="container">
             <div className="formWrapper shadow">
                <form onSubmit={submitHandler}>
                    <input type="email"  placeholder="Email" id="email" value={email} onChange={e => setEmail(e.target.value)}/>
                    <input  type="password" name="password" placeholder="Password" id="password" value={password} onChange={e => setPassword(e.target.value)}/>
                    {
                        !isSendingData ?
                        <button>Login</button>
                        :
                        <button className="sendig-data" disabled>
                            <img src={loadingGif} alt="loading"/>
                        </button>
                       }
                     </form>
                <p>Have no account? <Link to="/signup"><span title="Regester"> Create account </span></Link></p>
            </div>
        </div>
       
          <Footer page={"Home"} />
      </div>  
    )
}