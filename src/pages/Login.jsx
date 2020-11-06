import React, { Component} from  'react';
import {Link} from 'react-router-dom';
import '../styles/login.css';
class Login extends Component {
    
    render() { 
       
        return (  
            <div className="container">
              <div className="formWrapper shadow">
                    <form>
                        <input type="email"  placeholder="Email"/>
                        <input  type="passwod" name="password" placeholder="Password" />

                        <button>Login</button>
                    </form>
                  <p>Have no account? <Link to="/signup"><span title="Regester"> Create account </span></Link></p>
                </div>
            </div>
        );
    }
}
 
export default Login;