import React, { Component} from  'react';
import {Link, Redirect} from 'react-router-dom';
import '../styles/login.css';
import signUp from '../services/auth.service';


class Signup extends Component {
    constructor(props){
        super(props);
        this.submitHandler = this.submitHandler.bind(this);
    }
    state = {
        data: {
        email: '',
        password: '',
        confirmation: ''
       },
       isRegistered: false,
       redirect: false
    }
    
    setRedirect = () => {
        this.setState({
          redirect: true
        })
     }

    async submitHandler(e){
        e.preventDefault();
        
        this.state.data.email = document.getElementById('email').value;
        this.state.data.password = document.getElementById('password').value;
        this.state.data.confirmation = document.getElementById('confirmation').value;
   
        if(signUp(this.state.data.email, this.state.data.password)){
          this.setRedirect();
      }
       
    }
    render() { 
        if(this.state.redirect){
            return <Redirect to="/board" />
         }
        return (  
            <div className="container">
              <div className="formWrapper shadow">
                    <form onSubmit={this.submitHandler}> 
                        <input type="email"  placeholder="Email" id="email"/>
                        <input  type="password" name="password" placeholder="Password" id="password"/>
                        <input  type="password" name="password" placeholder="Confirm password" id="confirmation"/>

                        <button>Signup</button>
                    </form>
                  <p>Aready have account? <Link to="/login"><span title="Login">Login here</span></Link></p>
                </div>
            </div>

           
        );
    }
}
 
export default Signup;