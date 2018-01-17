import React from 'react';
import './LoginScreen.css';

class LoginScreen extends React.Component{
    constructor(){
        super()
        this.state={
            login: true
        }
    }
    login(){
        return(
            <div className = "login-box">
                <div className = "login-area">
                <h2 className = "login-text">
                    Login to your Account
                    </h2>
                    <form method = "POST" action = "/login">
                    Username<br/>
                    <input name = "username"/><br/>
                    Password<br/>
                    <input name = "password"/><br/>
                    <button type = "button" className="login-button">
                        Back!
                        </button>
                    <button type = "submit" className="login-button">
                        Login
                        </button><br/>
                        <a onClick = {()=>{this.setState({login: false})}} className = "login-text">New Account</a>
                        </form>
                    </div>
                </div>
        )
    }
    newUser(){
        return(
            <div className = "login-box">
                <div className = "login-area">
                <h2 className = "login-text">
                    Create your Account
                    </h2>
                    <form method = "POST" action = "/newUser">
                    Username<br/>
                    <input name = "username"/><br/>
                    Password<br/>
                    <input type = "password" name = "password"/><br/>
                    Confirm Password<br/>
                    <input type = "password" name = "confirmPassword"/><br/>
                    <button onClick = {()=>{this.setState({login: true})}} type = "button" className="login-button">
                        Back
                        </button>
                    <button type = "submit" className="login-button">
                        Create
                        </button>
                        </form>
                    </div>
                </div>
        )
    }
    render(){
        if(this.state.login){
            return this.login()
        }
        else if(!this.state.login){
            return this.newUser()
        }
    }
}

export default LoginScreen;