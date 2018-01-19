import React, { Component } from 'react';
import SideMenu from './components/SideMenu/SideMenu.js';
import Search from './components/Search/Search.js';
import LoginScreen from './components/LoginScreen/LoginScreen.js';
import MyBook from './components/MyBook/MyBook.js';
import './App.css';

class App extends Component {
  constructor(){
    super()
    this.state = {
      login: true
    }
  }
  //Home Screen
  home(){
    return (
      <div>
        <form method = "POST" action = "/logout">
      <button type = "submit" className = "login-button">
         Logout
         </button>
      </form>
        <SideMenu/>
        <div className="right-side">
        <Search/>
        <MyBook/>
          </div>
      </div>
    );
  }
  //renders login screen and uses unverified and verified to receive callbacks from fetch in loginscreen.js
  login(){
    return (
      <div>
        <LoginScreen unverified = {()=>{this.setState({login: true})}} verified = {()=>{this.setState({login: false})}}/>
      </div>
    );
  }
  render() {
    if(!this.state.login){
      return this.home();
    }
    else if(this.state.login){
      return this.login();
    }
  }
}

export default App;
