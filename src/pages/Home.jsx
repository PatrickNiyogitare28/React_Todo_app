import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import '../styles/home.css';
import imageURL from '../assets/images/home-img.svg'

class Home extends Component {
    
    render() { 
      
        return (  
            <div className="container">
                <div className="leftWrapper">
                    <h1>ToDo Application  <small>Schedule your tasks</small></h1>
                   
                   <Link to='/login'> <button> Get Started</button></Link> 
                </div>
                <div className="rightWrapper">
                   <img src={imageURL} alt="image"/>
                </div>
            </div>
        );
    }
}
 
export default Home;