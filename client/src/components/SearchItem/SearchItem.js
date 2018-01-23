import React from 'react';
import NotAdded from './subcomponents/NotAdded';
import Adding from './subcomponents/Adding';
import InLibrary from './subcomponents/InLibrary';
import './SearchItem.css';

class SearchItem extends React.Component{
    constructor(){
        super()
        this.state = {
            // status is notadded, adding, or in-library. Status state controls which subcomponent is rendered
            status: "not-added"
        }
        this.changeStatus = this.changeStatus.bind(this)
    }
    componentDidMount(){
        //Fetch request to see if book is already in library in order properly initialize state;
        fetch("/bookData",
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
            data.forEach((x)=>{
                if(x.image == this.props.image){
                    this.setState({status: "in-library"})
                }
            })
        })
    }   
    changeStatus(x){
        //callback from subcomponents via props. x is the updated status.
        this.setState({status: x})
    }
    render(){
         /*
        NOTADDED, ADDING, INLIBRARY
        In order to add categories, the add book button will NOT immediately 
        use /addNewBook form. Instead, it will render filter options.
        */
        if(this.state.status == "not-added"){
            return <NotAdded changeStatus = {this.changeStatus}
                             title = {this.props.title}
                             author = {this.props.author}
                             image = {this.props.image}/>
        }
        else if(this.state.status == "adding"){
            return <Adding changeStatus = {this.changeStatus}
                           title = {this.props.title}
                           author = {this.props.author}
                           image = {this.props.image}/>
        }
        else if(this.state.status == "in-library"){
            return <InLibrary changeStatue = {this.changeStatus}
                              title = {this.props.title}
                              author = {this.props.author}
                              image = {this.props.image}/>
       }
    }
}

export default SearchItem;