import React from 'react';
import '../SearchItem.css';

class NotAdded extends React.Component{
    handleCallback(){
        this.props.changeStatus("adding")
    }
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
                    <button type = "button" onClick = {this.handleCallback.bind(this)} className = "add-box">
                        ADD
                        </button>
                    
                </div>
            )
    }
}

export default NotAdded;