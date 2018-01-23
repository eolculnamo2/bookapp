import React from 'react';
import './SideMenu.css';

class SideMenu extends React.Component{
    constructor(){
        super()
        this.state = {
            categories: [],
            recommendedBy: [],
            tags: []
        }
    }
    componentDidMount(){
        fetch("/userData",
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
    
            data.categories.forEach((x)=>{
                x.forEach((y)=>{
                    var checker = true;
                    this.state.categories.forEach((z)=>{
                        if(y == z){
                            
                            checker = false;
                        }
                    })
                    if(checker){
                        var update = this.state.categories
                        update.push(y)
                        this.setState({categories: update})
                    }
                }) 
            })
            //End Categories
            data.tags.forEach((x)=>{
                x.forEach((y)=>{
                    var checker = true;
                    this.state.tags.forEach((z)=>{
                        if(y == z){
                            
                            checker = false;
                        }
                    })
                    if(checker){
                        var update = this.state.tags
                        update.push(y)
                        this.setState({tags: update})
                    }
                }) 
            })
            //End Tags
            data.recommended.forEach((x)=>{
                x.forEach((y)=>{
                    var checker = true;
                    this.state.recommendedBy.forEach((z)=>{
                        if(y == z){
                            
                            checker = false;
                        }
                    })
                    if(checker){
                        var update = this.state.recommendedBy
                        update.push(y)
                        this.setState({recommendedBy: update})
                    }
                }) 
            })
        })
    }
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
                    {this.state.categories.map((x)=>{
                        return(<p className = "item">{x}</p>)
                    })}
                <h4 className = "subheader">
                Recommended By
                    </h4>
                    {this.state.recommendedBy.map((x)=>{
                        return(<p className = "item">{x}</p>)
                    })}
                <h4 className = "subheader">
                Tags
                    </h4>
                    {this.state.tags.map((x)=>{
                        return(<p className = "item">{x}</p>)
                    })}

            </div>
        )
    }
}

export default SideMenu;