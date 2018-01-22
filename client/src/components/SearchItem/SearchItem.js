import React from 'react';
import NotAdded from './subcomponents/NotAdded';
import './SearchItem.css';

class SearchItem extends React.Component{
    render(){
        return <NotAdded title = {this.props.title} author = {this.props.author} image = {this.props.image}/>
        /*
        PROPS NOT SHOWING!
        In order to add categories, the add book button will NOT immediately 
        use /addNewBook form. Instead, it will render filter options.
        */
       
    }
}

export default SearchItem;