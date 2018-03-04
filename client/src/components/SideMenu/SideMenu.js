import React from 'react';
import mobile from './mobile.svg'
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
            // first task is to fully separate string data into arrays if more than one filter

            var splitCats = [];
            var splitRecs = [];
            var splitTags = [];
            var filters = [data.categories,data.recommended,data.tags]
            var stateFilters = [this.state.categories, this.state.recommendedBy,this.state.tags]
            var newFilters = [splitCats,splitRecs,splitTags]

            //for statement ends in approximately 50 lines and is commented
            for(var i = 0; i<filters.length; i++){
            filters[i].forEach((x)=>{
        
                    x.forEach((y)=>{
                        var ySplit = y.split(",")
                        if(ySplit.length > 0){
                            ySplit.forEach((z)=>{
                                newFilters[i].push([z])
                            })
                        }
                        else{
                            newFilters[i].push(y)
                        }       
                    })
            })

         
        //check for duplicates for each
            newFilters[i].forEach((x)=>{
                var filterOurMultiples = JSON.stringify(x).split(",").length;
                if(filterOurMultiples === 1){
                x.forEach((y)=>{
                    
                    var checker = true;
                    stateFilters[i].forEach((z)=>{
                        if(y == z){
                            
                            checker = false;
                        }
                    })
                    if(checker){
                    
                        if(i === 0){
                            var update = this.state.categories;
                            update.push(y);
                            this.setState({categories: update}) 
                        }
                        else if(i === 1){
                            var update = this.state.recommendedBy;
                            update.push(y);
                            this.setState({recommendedBy: update})
                        }
                        else if(i === 2){
                            var update = this.state.tags;
                            update.push(y);
                            this.setState({tags: update})
                        }
                     
                    } //End checker if
                }) // End y forEach 
                } //End Filteroutmultiples if statement
            }) // End x forEach
            } //Ends For Loop
        })
    
    } // End componentDidMount
    handleFilterCallback(e){

        //Toggle checkmark.. currently only adds
        var checkMark = RegExp("✔");
  
       var test = checkMark.test(e.target.innerHTML)
       

        var filters = document.querySelectorAll("p");
        if(!test){
        for(var filter of filters){
            var numberedItem = filter.className.split(" ")[1]
            var targetNumbered = e.target.className.split(" ")[1]
            
            if(numberedItem == targetNumbered && filter.innerHTML == e.target.innerHTML){
                //sends filter information
                this.props.filter(e.target.id, e.target.innerHTML);
                e.target.innerHTML += " &#10004;";
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
    toggleMobileMenu(){
        var menu = document.getElementById("hide-if-mobile");

        
       if (menu.style.display == "none"){
            menu.style.display = "block"
            document.getElementById("dimmer").classList.add('search-on')
        } 
        else{
            menu.style.display = "none";   
            document.getElementById("dimmer").classList.remove('search-on');
        } 

          
        
    }
    render(){
        return(
        <div className = "menu-box">
            
            <div className = "corner-box">
            <img onClick={this.toggleMobileMenu.bind(this)} className = "mobile-menu" src = {mobile}/>
                <h2 className = "corner-state-text">
                    Recommended
                    </h2>
                </div>
            <div id = "hide-if-mobile">
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