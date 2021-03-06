import React from 'react';
import '../SearchItem.css';

/*
check mark is 		&#10004;;
3) Confirmation of save shows up on screen
** Will need to fix position of dropdown as it pushes down page.


By end of next week:

3) Change API from google to amazon
4) Fix star bug. It gets rid of stars on filter.


Next step:
1) Add sliding out mobile menu with filters
2) Add logout button to bottom of this menu
3) Style login page

*/

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
            existingRecommended: [],
            //Checkmark Select.. Boolean based on index.
            checkCategories: [],
            checkTags: [],
            checkRecommended: []
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
            /*
                Nested for each functions ensure there are no duplicates. The data passed through
                the fetch request has categories for all books which inevitably have duplicates. If
                a duplicate is found, the checker function will go to false and the update will not be pushed
                to the existing[filter] state.
            */

            var splitCats = [];
            var splitRecs = [];
            var splitTags = [];
            var filters = [data.categories,data.recommended,data.tags]
            var stateFilters = [this.state.existingCategories, this.state.existingRecommended,this.state.existingTags]
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
                                var update = this.state.existingCategories;
                                update.push(y);
                                this.setState({existingCategories: update, 
                                              checkCategories: Array(update.length).fill(false)}) 
                            }
                            else if(i === 1){
                                var update = this.state.existingRecommended;
                                update.push(y);
                                this.setState({existingRecommended: update,
                                               checkRecommended: Array(update.length).fill(false)})
                            }
                            else if(i === 2){
                                var update = this.state.existingTags;
                                update.push(y);
                                this.setState({existingTags: update,
                                               checkTags: Array(update.length).fill(false)})
                            }
                         
                        } //End checker if
                    }) // End y forEach 
                    } //End Filteroutmultiples if statement
                }) // End x forEach
                } //Ends For Loop
        })               
        //Event Listeners => Event listeners control the background color. The css dropdown is a 
        //separate hover effect in the css file
        document.getElementById("newCat").addEventListener("mouseover",()=>{
            
            //document.getElementById("newCat").style.color = "#529179"; << This will turn clickable menu label to green
            document.querySelectorAll(".filters")[2].style.color = "grey";
            document.querySelectorAll(".filters")[4].style.color = "grey";
            document.getElementById('newTag').style.color = "grey";
        })

        document.getElementById("newCat").addEventListener("mouseout",()=>{
            
            //document.getElementById("newCat").style.color = "#529179"; << This will turn clickable menu label to green
            document.querySelectorAll(".filters")[2].style.color = "black";
            document.querySelectorAll(".filters")[4].style.color = "black";
            document.getElementById('newTag').style.color = "black";
        })

        document.getElementById("newRec").addEventListener("mouseover",()=>{
            
            //document.getElementById("newCat").style.color = "#529179"; << This will turn clickable menu label to green
            document.querySelectorAll(".filters")[0].style.color = "grey";
            document.querySelectorAll(".filters")[4].style.color = "grey";
            document.getElementById('newTag').style.color = "grey";
        })

        document.getElementById("newRec").addEventListener("mouseout",()=>{
            
            //document.getElementById("newCat").style.color = "#529179"; << This will turn clickable menu label to green
            document.querySelectorAll(".filters")[0].style.color = "black";
            document.querySelectorAll(".filters")[4].style.color = "black";
            document.getElementById('newTag').style.color = "black";
        })

        document.getElementById("newTag").addEventListener("mouseover",()=>{
            
            //document.getElementById("newCat").style.color = "#529179"; << This will turn clickable menu label to green
            document.querySelectorAll(".filters")[0].style.color = "grey";
            document.querySelectorAll(".filters")[2].style.color = "grey";
            document.getElementById('newTag').style.color = "grey";
        })

        document.getElementById("newTag").addEventListener("mouseout",()=>{
            
            //document.getElementById("newCat").style.color = "#529179"; << This will turn clickable menu label to green
            document.querySelectorAll(".filters")[0].style.color = "black";
            document.querySelectorAll(".filters")[2].style.color = "black";
            document.getElementById('newTag').style.color = "black";
        })

        //input event listeners to add new filters
        var catInput = document.getElementById('catInput')
        var recInput = document.getElementById('recInput')
        var tagInput = document.getElementById('tagInput')

        catInput.addEventListener('keypress', (e)=>{
            if(e.keyCode === 13 && catInput.value.length > 0){
                var newValue = catInput.value.trim();
                var update = this.state.existingCategories
                update.push(newValue)
                this.setState({existingCategories: update,
                               checkCategories: Array(update.length).fill(false)},()=>{
                    catInput.value = "";
                })
            }
        })
        recInput.addEventListener('keypress', (e)=>{
            if(e.keyCode === 13  && recInput.value.length > 0){
                var newValue = recInput.value.trim();
                var update = this.state.existingRecommended
                update.push(newValue)
                this.setState({existingRecommended: update,
                               checkRecommended: Array(update.length).fill(false)},()=>{
                    recInput.value = "";
                })
            }
        })
        tagInput.addEventListener('keypress', (e)=>{
            if(e.keyCode === 13 && tagInput.value.length > 0){
                var newValue = tagInput.value.trim();
                var update = this.state.existingTags
                update.push(newValue)
                this.setState({existingTags: update,
                               checkTags: Array(update.length).fill(false)},()=>{
                    tagInput.value = "";
                })
            }
        })

    }

    handleSubmit(passTitle,
                 passAuthor,
                 passImage,
                 passCategory,
                 passRecommended,
                 passTags){
        /*
        handleSubmit is a callback to the submit event listener which is at the top of the event listeners.
         The actual form data is at the bottom of this javasript page.

        All information must be pushed back up the tree from Adding.JS to SearchItem.JS
        to MyBook.JS because of autosave. This allows the new information to display 
        without a page reload.

        learning notes... attempted to pass props and states i..e title: this.props.title or category: this.state.category
        but would not work
        */
       
        var infoPackage = {
            title: passTitle,
            author: passAuthor,
            image: passImage,
            category: passCategory,
            recommended: passRecommended,
            tags: passTags
        }

        //callback
        
       this.props.intermediarySender(infoPackage);
       document.getElementById("send-to-db").submit().bind(this);
      
        //After submit, will post a file saved confirmation
        
    }
    newCategory(e, filter){
        /* newCategory comes from the select tags onChange event. 
        It gets the value of of the selected option, identifies action based on if statements
        and sets appropriate state.
        */
        
        //By using variables, the below function can switch out key terms for all three filter types(categories, recommend, and tags)
        var formFilter;
        var existingFilter;
        var checkFilter;
        var filterNameString;
        var filterCheckString;
        if(filter === "category"){
            formFilter = this.state.category;
            existingFilter = this.state.existingCategories;
            checkFilter = this.state.checkCategories;
            filterNameString = "category";
            filterCheckString = "checkCategories";
        }
        else if(filter === "recommended"){
            formFilter = this.state.newRecommended;
            existingFilter = this.state.existingRecommended;
            checkFilter = this.state.checkRecommended;
            filterNameString = "newRecommended";
            filterCheckString = "checkRecommended";
        }
        else if(filter === "tags"){
            formFilter = this.state.newTags;
            existingFilter = this.state.existingTags;
            checkFilter = this.state.checkTags;
            filterNameString = "newTags";
            filterCheckString = "checkTags";
        }
        //Each e.target.innerHTML is sliced here to remove potential checkmarks for else if statement below
        var targetLength = e.target.innerHTML.split("").length;
        var slicedTarget = e.target.innerHTML.slice(0, targetLength-2)
        //check index

        existingFilter.forEach((x,i)=>{
            //forEach statement is selected all dropdown elements rather than one
            if(x === e.target.innerHTML && checkFilter[i] === false){
                //Changes what will be pushed to form data via category state
                var updateData = formFilter;
                updateData.push( x);
                //Changes HTML
                e.target.innerHTML += "	&#10004;";
                var hold = checkFilter;
                hold[i] = true;
                //Set state for checking and filter state
                this.setState({filterCheckString: hold,
                               filterNameString: updateData});
            }
            //else if statement is currently wrong. Needs reworked.
            else if(x == slicedTarget && checkFilter[i] == true){
                //Change filter category to be sent for form data
                var cats = formFilter;
                cats.forEach((y,j)=>{
                    if(y === slicedTarget){
                        cats.splice(j,1);
                    }
                })
                //Changes HTML
                var updateState = checkFilter;
                updateState[i] = false;
                e.target.innerHTML = slicedTarget;
                //Set States
                this.setState({filterCheckString: updateState,
                               filterNameString: cats});
            }
        })
    }
   
    render(){
        //select tags will be switched out for css dropdown
        return(
            <div className = "item-search-box">
            <img className = "query-image" src = {this.props.image}/>
            <div className = "inline-text">
            <h4 className = "filters">
                Saved To
                </h4>
                <div id = "newCat" className = "filters">
                    Categories
                    <div className = "child-dropdown-wrapper">
                    {this.state.existingCategories.map((x)=>{
                        return(
                        <div onClick = {(e)=>{this.newCategory(e,"category")}}  className = "child-dropdown" value = {x}>
                        {x}
                        </div>)
                    })}
                
                    <input
                    //Two way data binding would be a nice touch with onChange eventually
                    id = "catInput"
                    className = "child-input"
                    placeholder = "New Category"/>
                        </div>
                    </div>
                    <br/>
                    
                    <h4 className = "filters">
                Recommended By
                </h4>
                <div onClick = {(e)=>{this.newCategory(e, "recommended")}} id = "newRec" className = "filters">
                    Recommended
                    <div className = "child-dropdown-wrapper">
                    {this.state.existingRecommended.map((x)=>{
                        return(<div className = "child-dropdown" value = {x}>
                        {x}
                        </div>)
                    })}
                    <input
                    id = "recInput"
                    className = "child-input"
                    placeholder = "Add Person"/>
                       </div>
                    </div>
                    <br/>
                    
                    <h4 className = "filters">
                        Tags
                        </h4>
                    <div onClick = {(e)=>{this.newCategory(e, "tags")}} id = "newTag" className = "filters">
                        Tags
                        <div className = "child-dropdown-wrapper">
                    {this.state.existingTags.map((x)=>{
                        return(<div className = "child-dropdown" value = {x}>
                        {x}
                        </div>)
                    })}
                    <input
                    id = "tagInput"
                    className = "child-input"
                    placeholder = "Add Tag"/>
                    
                        </div>
                    </div>
                    <br/>
                </div>

            <form id = "send-to-db" target = "uploader_iframe" className="inline-form" method="POST" action = "/addNewBook">
                    <input type ="hidden" name = "title" value = {this.props.title} />
                    <input type ="hidden" name = "author" value = {this.props.author} />
                    <input type ="hidden" name = "image" value = {this.props.image} />
                    <input type = "hidden" name = "category" value = {this.state.category}/>
                    <input type = "hidden" name = "recommendedBy" value = {this.state.newRecommended}/>
                    <input type = "hidden" name = "tags" value = {this.state.newTags}/>
                    <button type ="button" onClick = {
                this.handleSubmit.bind(this,
                this.props.title,
                this.props.author,
                this.props.image,
                this.state.category,
                this.state.newRecommended,
                this.state.newTags)} className = "checkmark">
                    	&#10004;
                    </button>
                    </form>

                    
                    </div>
        )
    }
}

export default Adding;