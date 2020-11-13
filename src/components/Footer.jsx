import React, {Component} from 'react';
import ReactTooltip from 'react-tooltip';

import '../styles/footer.css';
import checkLogo from '../assets/images/check-icon.png';
import {Link} from 'react-router-dom';

export default function Footer(propos) {
  
   
        return ( 
            <div className="footerContainer">
                 <div className="container-fluid">
                    <div className="left-wrapper">
                       <ul>
                           <li>
                              <img src={checkLogo} alt="logo"/>
                              toDO
                           </li>
                           <li title="Go to Home">
                              <Link to="/" data-tip="Go Home">{propos.page}</Link> 
                           </li>
                       </ul>
                    </div>
                    <div className="right-wrapper">
                         <ul>
                             <li>
                               Copyright 2020, 
                               <a href="https://patrickniyo.netlify.app" target="_blank" data-tip="Visit Developer's official website">PatrickNiyo</a>
                               <ReactTooltip place="left" type="info" effect="solid"/>

                            </li>
                         </ul>
                    </div>
                 </div>
            </div>
         );
    
}
 
