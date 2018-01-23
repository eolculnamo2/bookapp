import React from 'react';
import '../SearchItem.css';

//In clean up phase, more than one filter will be selectable with a css dropdown.

class Adding extends React.Component{
    constructor(){
        super()
        this.state = {
            //New
            category: [],
            newTags: [],
            newRecommended: [],
            //Existing
            existingCategories: [],
            existingTags: [],
            existingRecommended: []
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
            //STOPPING POINT FOR NIGHT 
            data.categories.forEach((x)=>{
                x.forEach((y)=>{
                    var checker = true;
                    this.state.existingCategories.forEach((z)=>{
                        if(y == z){
                            
                            checker = false;
                        }
                    })
                    if(checker){
                        var update = this.state.existingCategories
                        update.push(y)
                        this.setState({existingCategories: update})
                    }
                }) 
            })
            //End Categories
            data.tags.forEach((x)=>{
                x.forEach((y)=>{
                    var checker = true;
                    this.state.existingTags.forEach((z)=>{
                        if(y == z){
                            
                            checker = false;
                        }
                    })
                    if(checker){
                        var update = this.state.existingTags
                        update.push(y)
                        this.setState({existingTags: update})
                    }
                }) 
            })
            //End Tags
            data.recommended.forEach((x)=>{
                x.forEach((y)=>{
                    var checker = true;
                    this.state.existingRecommended.forEach((z)=>{
                        if(y == z){
                            
                            checker = false;
                        }
                    })
                    if(checker){
                        var update = this.state.existingRecommended
                        update.push(y)
                        this.setState({existingRecommended: update})
                    }
                }) 
            })
        })
    }
    newCategory(){
        /* newCategory comes from the select tags onChange event. 
        It gets the value of of the selected option, identifies action based on if statements
        and sets appropriate state.
        */
        var selectedCategory = document.getElementById("newCat").value;
        if(selectedCategory == "new-category"){
            var newCat = prompt("Enter New Category")
            var currentCat = this.state.category
            currentCat.push(newCat)
            this.setState({category: currentCat})
        }
        else{
            this.setState({category: selectedCategory})
        }
        
    }
    newRecommended(){
        var selectedCategory = document.getElementById("newRec").value;
        if(selectedCategory == "new-recommended"){
            var newRec = prompt("Who Recommended this Book?")
            var currentRec = this.state.newRecommended
            currentRec.push(newRec)
            this.setState({newRecommended: currentRec})
        }
        else{
            this.setState({newRecommended: selectedCategory})
        }
        
    }
    newTags(){
        var selectedCategory = document.getElementById("newTag").value;
        if(selectedCategory == "new-tag"){
            var newTag = prompt("Enter New Tag")
            var currentTag = this.state.newTags
            currentTag.push(newTag)
            this.setState({newTags: currentTag})
        }
        else{
            this.setState({newTags: selectedCategory})
        }
        
    }
    render(){
        return(
            <div className = "item-search-box">
            <img className = "query-image" src = {this.props.image}/>
            <div className = "inline-text">
            <h4 className = "filters">
                Saved To
                </h4>
                <select onChange = {this.newCategory.bind(this)} id = "newCat" className = "filters">
                <option>
                    </option>
                    {this.state.existingCategories.map((x)=>{
                        return(<option value = {x}>{x}</option>)
                    })}
                    <option value = "new-category" onSelect = {this.newCategory.bind(this)}>
                        New Category
                        </option>
                    </select>
                    <br/>
                    
                    <h4 className = "filters">
                Recommended By
                </h4>
                <select onChange = {this.newRecommended.bind(this)} id = "newRec" className = "filters">
                <option>
                    </option>
                    {this.state.existingRecommended.map((x)=>{
                        return(<option value = {x}>{x}</option>)
                    })}
                    <option value = "new-recommended" onSelect = {this.newCategory.bind(this)}>
                        Add New
                        </option>
                    </select>
                    <br/>
                    
                    <h4 className = "filters">
                        Tags
                        </h4>
                    <select onChange = {this.newTags.bind(this)} id = "newTag" className = "filters">
                <option>
                    </option>
                    {this.state.existingTags.map((x)=>{
                        return(<option value = {x}>{x}</option>)
                    })}
                    <option value = "new-tag" onSelect = {this.newCategory.bind(this)}>
                        New Tag
                        </option>
                    </select>
                    <br/>
                </div>
            <form className="inline-form" method="POST" action = "/addNewBook">
                    <input type ="hidden" name = "title" value = {this.props.title} />
                    <input type ="hidden" name = "author" value = {this.props.author} />
                    <input type ="hidden" name = "image" value = {this.props.image} />
                    <input type = "hidden" name = "category" value = {this.state.category}/>
                    <input type = "hidden" name = "recommendedBy" value = {this.state.newRecommended}/>
                    <input type = "hidden" name = "tags" value = {this.state.newTags}/>
                    <button type ="submit" className = "checkmark">
                    &#10004;
                    </button>
                    </form>
                    </div>
        )
    }
}

export default Adding;