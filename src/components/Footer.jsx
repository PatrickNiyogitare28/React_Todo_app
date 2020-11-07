import React, {Component} from 'react';
import '../styles/footer.css';

class Footer extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="footerContainer">
                 Copyright 2020, <a href="https://patrickniyo.netlify.app" target="_blank">PatrickNiyo</a>
            </div>
         );
    }
}
 
export default Footer;
