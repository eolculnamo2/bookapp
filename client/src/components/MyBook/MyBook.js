import React from 'react';
import './MyBook.css';

class MyBook extends React.Component{
    constructor(){
        super()
        //Caution: Do not confuse ratings and rating.
        this.state = {
            authors: [],
            titles: [],
            images: [],
            categories: [],
            recommendedBy: [],
            tags: [],
            ifRead: [],
            ratings: [],
            filter: false,
            catFilter: [],
            recFilter: [],
            tagFilter: [],
            rating: 0

        }
    }
    componentDidMount(){

      fetch("/bookData",
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
            var authorHold = []
            var titlesHold = []
            var imagesHold = []
            var recommendedByHold = []
            var categoriesHold = []
            var tagsHold = []
            var ifReadHold = []
            var ratingsHold = []

            data.forEach((x,i)=>{
                authorHold.push(x.author)
                titlesHold.push(x.title)
                imagesHold.push(x.image)
                ifReadHold.push(x.read)
                ratingsHold.push(x.rating);
                if(x.recommendedBy.length === 0){
                    recommendedByHold.push("n/a")
                }
                else if(x.recommendedBy.length>0){
                recommendedByHold.push(x.recommendedBy)
                }
                categoriesHold.push(x.categories)
                tagsHold.push(x.tags)
                
            })
            
            this.setState({
                authors: authorHold,
                titles: titlesHold,
                images: imagesHold,
                recommendedBy: recommendedByHold,
                categories: categoriesHold,
                tags: tagsHold,
                ifRead: ifReadHold,
                ratings: ratingsHold
            },()=>{
                //sets star rating from fetch request
           
               this.state.ratings.forEach((r,i)=>{
                   if(r>0){
                    for(var j = 5-r; j < 5; j++){
                     
     document.getElementsByClassName("mybook-child-box")[i].querySelectorAll(".rating span")[j].innerHTML = "&#x2605";
                    }
                   }
               })
            
        
            // Adds mouse over event to star rating which clears out current rating
               var rateClass = document.getElementsByClassName("rating");
            for(var i = 0; i < rateClass.length;i++){
                rateClass[i].addEventListener("mouseover",(e)=>{
                    for(var j = 0; j < 5; j++){
                        e.currentTarget.querySelectorAll("span")[j].innerHTML = "&#x2606";
                    }
                })

                //Resets on mouseout to current rating
                rateClass[i].addEventListener("mouseout",(e)=>{
                    this.state.ratings.forEach((r,i)=>{
                        if(r>0){
                         for(var j = 5-r; j < 5; j++){
                          
          document.getElementsByClassName("mybook-child-box")[i].querySelectorAll(".rating span")[j].innerHTML = "&#x2605";
                         }
                        }
                    })
                })

            }

            })
        })

        
        
    }
    componentWillReceiveProps(newProps){
        //resets ratings ... Need to recode
        /*
        this.state.ratings.forEach((r,i)=>{
            if(r>0){
             for(var j = 5-r; j < 5; j++){
              
document.getElementsByClassName("mybook-child-box")[i].querySelectorAll(".rating span")[j].innerHTML = "&#x2605";
             }
            }
        })
        */
    
        if(newProps.catFilter !== undefined){
            this.setState({catFilter: this.props.catFilter, filter: true})
        }
        if(newProps.recFilter !== undefined){
            this.setState({recFilter: this.props.recFilter, filter: true})
        }
        if(newProps.tagFilter !== undefined){
            this.setState({tagFilter: this.props.tagFilter, filter: true})
        }
        //clear filter
        if(newProps.catFilter.length === 0 && newProps.recFilter.length === 0 && newProps.tagFilter.length === 0){
            this.setState({filter: false})
        }

        if(newProps.newBook.author.length > 0){
            //import object and assign variables
            var newAuth = newProps.newBook.author;
            var newImg = newProps.newBook.image;
            var newTitle = newProps.newBook.title;
            var newCat = newProps.newBook.category;
            var newRec = newProps.newBook.recommended;
            var newTag = newProps.newBook.tags;
            //push new data so that added books appear on screen.
            var authors = this.state.authors;
            authors.unshift(newAuth);
            var images = this.state.images;
            images.unshift(newImg);
            var titles = this.state.titles;
            titles.unshift(newTitle);
            var cats = this.state.categories;
            cats.unshift(newCat);
            var recommendedBy = this.state.recommendedBy;
            recommendedBy.unshift(newRec);
            var tags = this.state.tags;
            tags.unshift(newTag);
            var read = this.state.ifRead;
            read.unshift(false);
            //ifRead
            var rating = this.state.ratings;
            rating.push(0);
        
            this.setState({
                authors: authors,
                images: images,
                titles: titles,
                categories: cats,
                recommendedBy: recommendedBy,
                tags: tags,
                ifRead: read,
                ratings: rating
            })
        }
    }
    markOrRate(x,index){
        
        if(x){
            return(
                <div>
                    <form id ={"submitRate"+index} method = "POST" action = {"/rate"+index}>
                    <input id = "ratingValue" name ="rating" type = "hidden" value = {this.state.rating}/>
                    <center>
                    <p className = "marked"> Marked as Read</p>
                    <div className ="rating">
<span onClick = {()=>{this.setState({rating: 5},()=>{
        //document.getElementById('ratingValue').value = 5;
        document.getElementById('submitRate'+index).submit();
    })
}}>☆</span>
<span onClick = {()=>{this.setState({rating: 4},()=>{
        document.getElementById('submitRate'+index).submit();
})
}}>☆</span>
<span onClick = {()=>{this.setState({rating: 3},()=>{
        document.getElementById('submitRate'+index).submit();
})
}}>☆</span>
<span onClick = {()=>{this.setState({rating: 2},()=>{
        document.getElementById('submitRate'+index).submit();
})
}}>☆</span>
<span onClick = {()=>{this.setState({rating: 1},()=>{
        document.getElementById('submitRate'+index).submit();
})
}}>☆</span>
</div>
</center>
                        </form>
                    </div>
            )
        }
        else if(!x){
            return(
            <div>
            <form method = "POST" action = {"/markRead"+index}>
                <button className = "mark-button">
                    Mark as Read
                     </button>
                </form>
                </div>
            )
        }
    }
    bookTemplate(x,i){
        return(
            <div className="mybook-child-box">
                <img className = "my-image" src = {this.state.images[i]}/>

                <div className = "my-book-info">
                <h2>
                    {x}
                    </h2>
                    <h5 className ="author">
                        By: {this.state.authors[i]}
                        </h5>
                        <hr className = "hr-divider"/>
                        <h4 className = "organized-by">
                            Categories
                            </h4>
                                {this.state.categories[i].map((x)=>{
                                    return <p className ="listed-organized-by">{x}</p>
                                })} 
                                <br/>

                         <h4 className = "organized-by">
                             Recommended By
                             </h4>
                             <span className ="listed-organized-by">
                                 {this.state.recommendedBy[i]}
                                 </span>
                                 <br/>
                         <h4 className = "organized-by">
                             Tags
                             </h4>      
                                 {this.state.tags[i].map((x)=>{
                                     var tester;
                                    
                                     if(x === ""){
                                         tester = "no tag";
                                     }
                                     else{
                                         tester = x
                                     }
                                     return <span className ="listed-organized-by">
                                     {tester}
                                     </span>
                                 })}
                                 
                        </div>

                 <div className = "read-or-stars"> 
                     {this.markOrRate(this.state.ifRead[i], i)}<br/>
                         <p className = "book-link">
                             Audible
                             </p>
                             <p className = "book-link">
                             Amazon
                             </p>
                             
                     </div>
                </div>
        )
    }
    render(){
       /*
       filter options:
       -> Sent through callback from SideMenu to App State
       -> Called through props to MyBook
       -> Display none OR if statement. Probably if statement?
       -> Further issue... Below maps titles, but not filters. Figure it out..
       ^^^ May need to load for books tags into state forEach like with images i.e. this.state.images[i]
       */
        return(
           <div className = "mybook-box">
               {this.state.titles.map((x,i)=>{
                   if(!this.state.filter){
                    return this.bookTemplate(x,i);
                   }
                   else if(this.state.filter){
                       var checker = false;
                       //filter categories
                       this.state.catFilter.forEach((x)=>{
                           this.state.categories[i].forEach((y)=>{
                               if(x == y){
                                   checker = true;
                               }
                           })
                       })
                       //filter recommendedBy.. Filter is treated as an array of strings
                       // not an array of arrays like other two(hence why they have[i])
                       this.state.recFilter.forEach((x)=>{
                       // this.state.recommendedBy[i].forEach((y)=>{
                            if(x === this.state.recommendedBy[i]){
                                checker = true;
                            }
                       // })
                    })
                        //filter tags
                        this.state.tagFilter.forEach((x)=>{
                            this.state.tags[i].forEach((y)=>{
                                if(x == y){
                                    
                                    checker = true;
                                }
                            })
                        })
                      
                        if(checker === true){
                            return this.bookTemplate(x,i);
                        }
                   }
                   
               })}
               </div>
        )
    }
}

export default MyBook;