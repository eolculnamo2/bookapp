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
      login: false
    }
  }
  //default screen
  home(){
    return (
      <div>
      <button onClick = {()=>{this.setState({login: true})}} className = "login-button">
      Login
    </button>
        <SideMenu/>
        <div className="right-side">
        <Search/>
        <MyBook/>
          </div>
      </div>
    );
  }
  login(){
    //Will include login screen.. LOGIN SCREEN WILL CHANGE AND BE FIRST SCREEN VIEWED BEFORE UI.
    return (
      <div>
        <LoginScreen/>
      <button class = "login-button">
      Login
    </button>
        <SideMenu/>
        <div className="right-side">
        <Search/>

          </div>
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
