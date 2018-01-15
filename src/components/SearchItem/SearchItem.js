import React from 'react';
import './SearchItem.css';

class SearchItem extends React.Component{
    render(){
        return(
        <div className = "item-search-box">
            <img className = "query-image" src = {this.props.image}/>
            <div className = "inline-text">
            <h2>
                {this.props.title}
                </h2>
                <p className ="author-text">
                    By {this.props.author}
                    </p>
                </div>
                <button className = "add-box">
                ADD
                </button>
            </div>
        )
    }
}

export default SearchItem;