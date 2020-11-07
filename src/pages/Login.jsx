import React, { Component} from  'react';
import {Link} from 'react-router-dom';
import {login} from '../services/auth.service';
import {Redirect} from 'react-router-dom';
import '../styles/login.css';
class Login extends Component {
    constructor(props){
       super(props);
       this.submitHandler = this.submitHandler.bind(this);
    }
    state = {
        data: {
            email: '',
            password: ''
        },
        redirect: false
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }

    submitHandler(e){
        e.preventDefault();
        
        this.state.data.email = document.getElementById('email').value;
        this.state.data.password = document.getElementById('password').value;

        if(login(this.state.data.email, this.state.data.password)){
           this.setRedirect();
        }
    }
    render() { 
       if(this.state.redirect){
           return <Redirect to="board"/>
       }
        return (  
            <div className="container">
              <div className="formWrapper shadow">
                    <form onSubmit={this.submitHandler}>
                        <input type="email"  placeholder="Email" id="email"/>
                        <input  type="passwod" name="password" placeholder="Password" id="password" />

                        <button>Login</button>
                    </form>
                  <p>Have no account? <Link to="/signup"><span title="Regester"> Create account </span></Link></p>
                </div>
            </div>
        );
    }
}
 
export default Login;