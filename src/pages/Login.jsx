import React, { Component, useState} from  'react';
import {Link} from 'react-router-dom';
import {login} from '../services/auth.service';
import {useHistory} from 'react-router-dom';
import '../styles/login.css';
import app from '../helper/firebase/Config';
const auth = app.auth();;


export default function Login(){
    const history = useHistory()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const submitHandler =   async (e) => {
        e.preventDefault();
     try {
            await auth.signInWithEmailAndPassword(email,password)
            history.push('/board')
        } catch (error) {
            console.log("error ",error)
        }

    }
    return (
        <div className="container">
        <div className="formWrapper shadow">
              <form onSubmit={submitHandler}>
                  <input type="email"  placeholder="Email" id="email" value={email} onChange={e => setEmail(e.target.value)}/>
                  <input  type="password" name="password" placeholder="Password" id="password" value={password} onChange={e => setPassword(e.target.value)}/>
                  <button>Login</button>
              </form>
            <p>Have no account? <Link to="/signup"><span title="Regester"> Create account </span></Link></p>
          </div>
      </div>  
    )
}