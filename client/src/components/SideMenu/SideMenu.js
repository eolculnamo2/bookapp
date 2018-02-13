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
                var filterOurMultiples = JSON.stringify(x).split(",").length;
                if(filterOurMultiples === 1){
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
            }
            })
            //End Categories
            data.tags.forEach((x)=>{
                var filterOurMultiples = JSON.stringify(x).split(",").length;
                if(filterOurMultiples === 1){
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
            }
            })
            //End Tags
            data.recommended.forEach((x)=>{
                var filterOurMultiples = JSON.stringify(x).split(",").length;
                if(filterOurMultiples === 1){
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
            } 
            })
        })
    }
    handleFilterCallback(e){
        this.props.filter(e.target.id, e.target.innerHTML);
    }
    handleClearFilter(){
       
        this.props.clearFilters();
    }
    render(){
        return(
        <div className = "menu-box">
            
            <div className = "corner-box">
                <h2 className = "corner-state-text">
                    Recommended
                    </h2>
                </div>
            <div className = "hide-if-mobile">
                <h1 className = "book-header">
                Books
                    </h1>
                <h4 className = "subheader">
                Categories
                    </h4>
                    {this.state.categories.map((x)=>{
                        return(<p id = "catSend" onClick = {this.handleFilterCallback.bind(this)} className = "item">{x}</p>)
                    })}
                <h4 className = "subheader">
                Recommended By
                    </h4>
                    {this.state.recommendedBy.map((x)=>{
                        return(<p id = "recSend" onClick = {this.handleFilterCallback.bind(this)} className = "item">{x}</p>)
                    })}
                <h4 className = "subheader">
                Tags
                    </h4>
                    {this.state.tags.map((x)=>{
                        return(<p id = "tagSend" onClick = {this.handleFilterCallback.bind(this)} className = "item">{x}</p>)
                    })}
                    <p className = "clear-filters" onClick = {this.handleClearFilter.bind(this)}>clear filters</p>
                    </div>
            </div>
        )
    }
}

export default SideMenu;