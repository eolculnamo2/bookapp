import React from 'react';
import '../SearchItem.css';

class NotAdded extends React.Component{
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
                    <form className="inline-form" method="POST" action = "/addNewBook">
                    <input type ="hidden" name = "title" value = {this.props.title} />
                    <input type ="hidden" name = "author" value = {this.props.author} />
                    <input type ="hidden" name = "image" value = {this.props.image} />
                    <button type ="submit" className = "add-box">
                    ADD
                    </button>
                    </form>
                </div>
            )
    }
}

export default NotAdded;