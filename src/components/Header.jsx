import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';
import '../styles/header.css';  

import app from '../helper/firebase/Config';
import {useHistory} from 'react-router-dom'
const auth = app.auth();

export default function Header(propos) {
    const history = useHistory();
    const logout = () => {
        auth.signOut().then(()=>{
           history.push('/login')
        })
    }
    
     return (
            <div className="header-container">
                <ul>
                    {/* {currentUser ? (
                    <>
                    <li>list 1</li>
                    <li>list 2</li>
                    </>
                    ) : (
                    <>
                    <li>list 3</li>
                    <li>list 4</li>
                    <li>list 5</li>
                    </>

                    )} */}
                    {
                   propos ? (
                     <>
                     <li className="logout" onClick={logout}>Logout</li>
                     <li>{propos.email}</li>
                     <li className="profile">{propos.email[0].toUpperCase()}</li>
                   
                     </>
                    ):(
                        <li></li>
                    )
                    }
                  
                   
                </ul>
            </div>
         );
    
}
 