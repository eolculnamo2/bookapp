import React from 'react';
import profile from './assets/profile.svg';
import key from './assets/key.svg';
import './LoginScreen.css';

//Houses both login and registration. The two options
//are controlled by the boolean login state.


class LoginScreen extends React.Component{
    constructor(){
        super()
        this.state = {
            registration: false
        }
    }
    componentDidMount(){
        fetch("/checkLogin",
        {
            method: "get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Cache': 'no-cache'
              },
              credentials: 'same-origin'
        })
        .then((response)=>{
            return response.json();
        })
        .then((data)=>{
            console.log("checking login data")
            console.log(data[0].verified)
            if(data[0].verified){
                console.log("!")
                this.props.verified();
            }
            else if(!data[0].verified){
                this.props.unverified()
            }
        })
    }
    credentials(){
        return(
            <div>
                <div id = "login-header"></div>
                <center>
            <div className = "cred-box">
            <div className = "box-header-and-footer"></div>
            <div className = "wrapper-padding">
                <form method = "POST" action = "/login">
                    <h4>
                        Login
                        </h4>
                    <img className = "login-icon" src = {profile}/>
                    <input className = "login-input" name = "username"/><br/>
                    <h4>
                        Password
                        </h4>
                        <img className = "login-icon" src = {key}/>
                    <input className = "login-input" name = "password" type = "password"/><br/>
                    <button className = "cred-button" type = "button" onClick = {()=>{this.setState({registration: true})}}>
                        New User
                        </button>
                    <button className = "cred-button" type = "submit">
                        Login
                        </button>
                    </form>
                    </div>
                    <div className = "box-header-and-footer"></div>
                </div>
                </center>
            </div>
        )
    }
    register(){
        return(
        <div>
            <div id = "login-header"></div>
            <center>
            <div className = "cred-box">
            <div className = "box-header-and-footer"></div>
            <div className = "wrapper-padding">
                <form method = "POST" action = "/newUser">
                    <h4>
                        Login
                        </h4>
                    <input className = "login-input" name = "username"/><br/>
                    <h4>
                        Password
                        </h4>
                    <input className = "login-input"  name = "password" type = "password"/><br/>
                    <h4>
                        Confirm Password
                        </h4>
                        <input className = "login-input"  name = "confirmPassword" type = "password"/><br/>
                        <button className = "cred-button" type = "button" onClick = {()=>{this.setState({registration: false})}}>
                            Back
                            </button>
                        <button className = "cred-button" type = "submit">
                            Register
                            </button>
                    </form>
                    </div>
                    <div className = "box-header-and-footer"></div>
                </div>
                </center>
            </div>
        )
    }
    render(){
        if(!this.state.registration){
            return this.credentials();
        }
        else if(this.state.registration){
            return this.register();
        }
    }
}

export default LoginScreen;