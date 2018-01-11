import React from 'react';
import './Search.css';

//Will call APIs and generated fixed window popup with 
//blacked out background.. Using JQuery UI for downward arrow in span. See ui-icon-carat-1-s
//Also, using older version JQuery UI.. May use newer version if needed for bigger arrow.
//JQuery cdn in index.html
class Search extends React.Component{
    
    search(){
        return(
            <div>
                <input placeholder= "&#x1F50D;  Search" className ="search-input"/>
                <br/><br/><br/>
                <a><span className="unread-read">Unread & Read</span>
                 <span className="down-arrow ui-icon ui-icon-carat-1-s"></span>
                </a>
                </div>
        )
    }
    render(){
        return this.search();
    }
}

export default Search;