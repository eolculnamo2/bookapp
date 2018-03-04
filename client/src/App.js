import React, { Component } from 'react';
import SideMenu from './components/SideMenu/SideMenu.js';
import Search from './components/Search/Search.js';
import LoginScreen from './components/LoginScreen/LoginScreen.js';
import MyBook from './components/MyBook/MyBook.js';
import './App.css';

/*
The Filtering system can be a bit complex. Essentially, it uses callbacks between states and props
to communicate data from SideMenu.js to App.js's state which sends via props to MyBook.js to filter
in the render section with a series of if statements. (props enter via componenetWillReceiveProps())
*/

class App extends Component {
  constructor(){
    super()
    this.state = {
      // in order to keep login from flashing after each update, will need a fetch request
      // to know whether or not user is logged in. This will dictate if login is set to true or false
      login: true,
      catFilter: [],
      tagFilter: [],
      recFilter: [],
      ifRead: 0
    }
    this.filters = this.filters.bind(this);
    this.clearFilters = this.clearFilters.bind(this)
    this.finalHandleCallback = this.finalHandleCallback.bind(this)
    this.toggleRead = this.toggleRead.bind(this)
  }
  filters(type, name){
    if(type === "catSend"){
      var x = this.state.catFilter
      x.push(name);
      this.setState({catFilter: x})
    }
    else if(type === "recSend"){
      var x = this.state.recFilter
      x.push(name);
      this.setState({recFilter: x})
    }
    else if(type === "tagSend"){
      var x = this.state.tagFilter
      x.push(name);
      this.setState({tagFilter: x})
    }
  }
  clearFilters(){
    this.setState({
      catFilter:[],
      tagFilter:[],
      recFilter:[],
      newBook: {}
    })
  }

  finalHandleCallback(x){
    //from Search
    this.setState({newBook: x})

  
    var banner = document.getElementById("saved-banner");
      banner.style.display = "block";

      setTimeout(()=>{
        banner.style.display = "none";
      },2000)
   
  }

  toggleRead(){
    if(this.state.ifRead === 0){
      this.setState({ifRead: 1})
    }
    else if(this.state.ifRead === 1){
      this.setState({ifRead: 2})
    }
    else if(this.state.ifRead === 2){
      this.setState({ifRead: 0})
    }
  }
  //Home Screen
  home(){
    return (
      <div>
        <iframe id="uploader_iframe" name="uploader_iframe"/>
        <div id = "saved-banner">
          Book Saved
          </div>
        <form method = "POST" action = "/logout">
      <button type = "submit" className = "login-button">
         Logout
         </button>
      </form>
        <SideMenu clearFilters = {this.clearFilters} filter = {this.filters} />
        <div className="right-side">
        <Search readToggle = {this.toggleRead} finalCallback = {this.finalHandleCallback}/>
        <MyBook catFilter = {this.state.catFilter}
                tagFilter = {this.state.tagFilter}
                recFilter = {this.state.recFilter}
                readCheckFilter = {this.state.ifRead}
                newBook = {this.state.newBook}/>
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
