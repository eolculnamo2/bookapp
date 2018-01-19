import React from 'react';
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
                <form method = "POST" action = "/login">
                    <h4>
                        Login
                        </h4>
                    <input name = "username"/><br/>
                    <h4>
                        Password
                        </h4>
                    <input name = "password" type = "password"/><br/>
                    <button type = "button" onClick = {()=>{this.setState({registration: true})}}>
                        New User
                        </button>
                    <button type = "submit">
                        Login
                        </button>
                    </form>
                </div>
        )
    }
    register(){
        return(
            <div>
                <form method = "POST" action = "/newUser">
                    <h4>
                        Login
                        </h4>
                    <input name = "username"/><br/>
                    <h4>
                        Password
                        </h4>
                    <input name = "password" type = "password"/><br/>
                    <h4>
                        Confirm Password
                        </h4>
                        <input name = "confirmPassword" type = "password"/><br/>
                        <button type = "button" onClick = {()=>{this.setState({registration: false})}}>
                            Back
                            </button>
                        <button type = "submit">
                            Register
                            </button>
                    </form>
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