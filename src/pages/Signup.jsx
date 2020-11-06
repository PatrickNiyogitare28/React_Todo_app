import React, { Component} from  'react';
import {Link} from 'react-router-dom';
import '../styles/login.css';
class Signup extends Component {
    
    render() { 
       
        return (  
            <div className="container">
              <div className="formWrapper shadow">
                    <form>
                        <input type="email"  placeholder="Email"/>
                        <input  type="passwod" name="password" placeholder="Password" />

                        <button>Signup</button>
                    </form>
                  <p>Aready have account? <Link to="/login"><span title="Login">Login here</span></Link></p>
                </div>
            </div>
        );
    }
}
 
export default Signup;