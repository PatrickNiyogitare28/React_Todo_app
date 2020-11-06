import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../styles/pageNotFound.css';

class PageNotFound extends Component {
    state = {  }
    render() { 
        return (  
            <div className="container">
                <div className="contentWrapper">
                    <h1>404 <small>Page Not Found</small></h1>
                   <Link to="/"><button>Home</button></Link>  
                </div>
            </div>
        );
    }
}
 
export default PageNotFound;