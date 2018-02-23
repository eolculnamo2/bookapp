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

        //Toggle checkmark.. currently only adds
        var checkMark = RegExp("✔");
  
       var test = checkMark.test(e.target.innerHTML)
       

        var filters = document.querySelectorAll("p");
        if(!test){
        for(var filter of filters){
            var numberedItem = filter.className.split(" ")[1]
            var targetNumbered = e.target.className.split(" ")[1]
            
            if(numberedItem == targetNumbered && filter.innerHTML == e.target.innerHTML){
                e.target.innerHTML += " &#10004";
            }
        }
     }

    }
    handleClearFilter(){
       
        this.props.clearFilters();

        //remove checkmarks
        var filters = document.querySelectorAll("p");
        var checkMark = RegExp("✔");
        for(var filter of filters){
            var test = checkMark.test(filter.innerHTML)
          
            if(test === true){
                
                filter.innerHTML = filter.innerHTML.slice(0,filter.innerHTML.length-2)
               
            }
        }
       
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
                    {this.state.categories.map((x,i)=>{
                        return(<p id = "catSend" onClick = {this.handleFilterCallback.bind(this)} className ={"item item"+i}>{x}</p>)
                    })}
                <h4 className = "subheader">
                Recommended By
                    </h4>
                    {this.state.recommendedBy.map((x,i)=>{
                        return(<p id = "recSend" onClick = {this.handleFilterCallback.bind(this)} className = {"item item"+i}>{x}</p>)
                    })}
                <h4 className = "subheader">
                Tags
                    </h4>
                    {this.state.tags.map((x,i)=>{
                        return(<p id = "tagSend" onClick = {this.handleFilterCallback.bind(this)} className = {"item item"+i}>{x}</p>)
                    })}
                    <p className = "clear-filters" onClick = {this.handleClearFilter.bind(this)}>clear filters</p>
                    </div>
            </div>
        )
    }
}

export default SideMenu;