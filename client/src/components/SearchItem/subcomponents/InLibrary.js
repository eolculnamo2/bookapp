import React from 'react';
import '../SearchItem.css';

class InLibrary extends React.Component{
    //Utlimately, the in library component will be a button that will link
    //to Adding to make adjustments to filters.

    // In Library should also keep user from adding same book twice.

    //Currently checks by image match in fetch request. At some point should be updated to book ID
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
                    <button className = "in-library">
                        IN LIBRARY
                        </button>
                    
                </div>
        )
    }
}

export default InLibrary;