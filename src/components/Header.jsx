import React,{Component} from 'react';
import '../styles/header.css';  

import app from '../helper/firebase/Config';
const auth = app.auth();

export default function Header() {
    const currentUser = auth.currentUser;
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
                   currentUser ? (
                     <>
                     <li>{currentUser.email}</li>
                   <li className="profile">{currentUser.email[0].toUpperCase()}</li>
                   
                     </>
                    ):(
                        <li></li>
                    )
                    }
                  
                   
                </ul>
            </div>
         );
    
}
 