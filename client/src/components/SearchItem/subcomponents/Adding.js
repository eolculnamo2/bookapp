import React from 'react';
import '../SearchItem.css';

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
            alert(JSON.stringify(data))
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
        })
        alert("existing..."+this.state.existingCategories)
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
                    <option value = "new-category" onSelect = {this.newCategory.bind(this)}>
                        New Category
                        </option>
                    </select>
                    <br/>
                    <h4 className = "filters">
                Recommended By
                </h4>
                <select className = "filters">
                    <option>
                        a
                        </option>
                    <option>
                        b
                        </option>
                    </select>
                    <br/>
                    <h4 className = "filters">
                Tags
                </h4>
                <select className = "filters">
                    <option>
                        a
                        </option>
                    <option>
                        b
                        </option>
                    </select>
                    <br/>
                </div>
            <form className="inline-form" method="POST" action = "/addNewBook">
                    <input type ="hidden" name = "title" value = {this.props.title} />
                    <input type ="hidden" name = "author" value = {this.props.author} />
                    <input type ="hidden" name = "image" value = {this.props.image} />
                    <input type = "hidden" name = "category" value = {this.state.category}/>
                    <button type ="submit" className = "checkmark">
                    &#10004;
                    </button>
                    </form>
                    </div>
        )
    }
}

export default Adding;