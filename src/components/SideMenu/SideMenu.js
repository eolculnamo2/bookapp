import React from 'react';
import './SideMenu.css';

class SideMenu extends React.Component{
    render(){
        return(
        <div className = "menu-box">
            
            <div className = "corner-box">
                <h2 className = "corner-state-text">
                    Recommended
                    </h2>
                </div>

                <h1 className = "book-header">
                Books
                    </h1>
                <h4 className = "subheader">
                Categories
                    </h4>
                <h4 className = "subheader">
                Recommended By
                    </h4>
                <h4 className = "subheader">
                Tags
                    </h4>

            </div>
        )
    }
}

export default SideMenu;