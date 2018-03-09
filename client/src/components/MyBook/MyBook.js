import React from 'react';
import './MyBook.css';

 
function filter(fil1,fil2,fil3,list1,list2,list3){
    var lock = [false,false,false];
    if(fil1.length>0){
        var testArr = []
        fil1.forEach((x)=>{
            list1.forEach((y)=>{
                y.split(",").forEach((z)=>{
                    if(x == z){
                        testArr.push("1")
                    }
                })
            })
            if(testArr.length == fil1.length){
                lock[0] = true;
            }
        })
    }
    
    if(fil2.length>0){
        var testArr = []
        fil2.forEach((x)=>{
            list2.forEach((y)=>{
                y.split(",").forEach((z)=>{
                    if(x == z){
                        testArr.push("1")
                    }
                })
            })
            if(testArr.length == fil2.length){
                lock[1] = true;
            }
        })
    }

    if(fil3.length>0){
        var testArr = [];
        fil3.forEach((x)=>{
            list3.forEach((y)=>{
                y.split(",").forEach((z)=>{
                    if(x == z){
                        testArr.push("1")
                    }
                })
            })
            if(testArr.length == fil3.length){
                lock[2] = true;
            }
        })
    }

    if(fil1.length == 0){
        lock[0] = true;
    }

    if(fil2.length == 0){
        lock[1] = true;
    }

    if(fil3.length == 0){
        lock[2] = true;
    }

    if(lock[0] == true && lock[1] == true && lock[2] == true){
        return true
    }
    return false;
}



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
            readCheck: 0,
            noBooks: false,
            pass: false,
            lock: [true,true,true],
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
                if(this.state.titles.length == 0){
                    this.setState({noBooks: true})
                }
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
    reloadStars(){
        this.state.ratings.forEach((r,i)=>{
            if(r>0){
             for(var j = 5-r; j < 5; j++){
              
document.getElementsByClassName("mybook-child-box")[i].querySelectorAll(".rating span")[j].innerHTML = "&#x2605";
             }
            }
        })
    }
    componentWillReceiveProps(newProps){
       
        if(newProps.catFilter !== undefined){
    
             this.setState({catFilter: newProps.catFilter,
                            filter: true},()=>{
                                this.reloadStars();
                            })

        }
        if(newProps.recFilter !== undefined){
           
            this.setState({recFilter: newProps.recFilter,
                           filter: true},()=>{
                            this.reloadStars();
                        })
        }
        if(newProps.tagFilter !== undefined){
           
            this.setState({tagFilter: newProps.tagFilter,
                           filter: true},()=>{
                            this.reloadStars();
                        })
        }
        //clear filter
        if(newProps.catFilter.length === 0 && newProps.recFilter.length === 0 && newProps.tagFilter.length === 0){
            
            this.setState({filter: false, catFilter:[],recFilter:[],tagFilter:[]},()=>{
                this.reloadStars();
            })
            
        }
        //update read or unread filter
        this.setState({readCheck: newProps.readCheckFilter})

        if(newProps.newBook.author.length > 0 && newProps.newBook.title !== this.state.titles[0]){

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
            var checker = true;
            this.state.titles.forEach((x)=>{
                if(x===newProps.newBook.title){
                     checker = false;
                }
            }, ()=>{
                if(checker){
            this.setState({
                authors: authors,
                images: images,
                titles: titles,
                categories: cats,
                recommendedBy: recommendedBy,
                tags: tags,
                ifRead: read,
                ratings: rating,
                noBooks: false
            },()=>{
                this.reloadStars();
            })
        }
        });
        }
    }
    shouldComponentUpdate(){
        return true;
    }
    rate(rating,index){
        var newRating = {
            rating: rating
        }
        fetch("/rate"+index,{
            method: "POST",
            body: JSON.stringify(newRating),
            headers: { "Content-Type": "application/json" }, 
            credentials: "same-origin"
        })
        var raters = this.state.ratings;
        raters[index] = rating
        this.setState({ratings: raters},()=>{
            this.reloadStars();
        })
        //for(var j = 5-rating; j < 5; j++){           
         //   document.getElementsByClassName("mybook-child-box")[index].querySelectorAll(".rating span")[j].innerHTML = "&#x2605";
       // }

    }
    markOrRate(x,index){
    
        if(x){
            return(
                <div>
                    <center>
                    <p className = "marked"> Marked as Read</p>
                    <div className ="rating">
<span onClick = {()=>{this.setState({rating: 5},()=>{
        this.rate(this.state.rating,index);
    })
}}>☆</span>
<span onClick = {()=>{this.setState({rating: 4},()=>{
       //document.getElementById('submitRate'+index).submit();
       this.rate(this.state.rating,index);
    })
}}>☆</span>
<span onClick = {()=>{this.setState({rating: 3},()=>{
        //document.getElementById('submitRate'+index).submit();
        this.rate(this.state.rating,index);
    })
}}>☆</span>
<span onClick = {()=>{this.setState({rating: 2},()=>{
       // document.getElementById('submitRate'+index).submit();
       this.rate(this.state.rating,index);
    })
}}>☆</span>
<span onClick = {()=>{this.setState({rating: 1},()=>{
       // document.getElementById('submitRate'+index).submit();
       this.rate(this.state.rating,index);
    })
}}>☆</span>
</div>
</center>
        </div>
            )
        }
        else if(!x){
            return(
            <div>
            <button className = "mark-button" onClick={()=>{ 
                    fetch("/markRead"+index,{
                        method: "POST",
                        headers: { "Content-Type": "application/json" }, 
                        credentials: "same-origin"
                    })
                    var rates=this.state.ifRead;
                    rates[index]=true;
                    this.setState({ifRead:rates})
                }}>
                    Mark as Read
                     </button>
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
                                    var tester;
                                    if(x === ""){
                                        tester = "No Categories"
                                        return <p className ="not-listed-organized-by">{tester}</p>
                                    }
                                    else{
                                        tester = x
                                        return <p className ="listed-organized-by">{tester}</p>
                                    }
                                   
                                })} 
                                <br/>

                         <h4 className = "organized-by">
                             Recommended By
                             </h4>
                            
                                 {this.state.recommendedBy[i].map((x)=>{
                                     var tester;
                                     if(x === ""){
                                         tester = "Not Recommended"
                                         return <span className ="not-listed-organized-by">
                                     {tester}
                                     </span>
                                     }
                                     else{
                                         tester = x
                                         return <span className ="listed-organized-by">
                                     {tester}
                                     </span>
                                     }
                                     
                                 })}
                                 
                                 <br/>
                         <h4 className = "organized-by">
                             Tags
                             </h4>      
                                 {this.state.tags[i].map((x)=>{
                                     var tester;
                                    
                                     if(x === ""){
                                         tester = "No Tags";
                                         return <span className ="not-listed-organized-by">
                                         {tester}
                                         </span>
                                     }
                                     else{
                                         tester = x
                                         return <span className ="listed-organized-by">
                                         {tester}
                                         </span>
                                     }
                                 })}
                                 
                        </div>

                 <div className = "read-or-stars"> 
                     {this.markOrRate(this.state.ifRead[i], i)}<br/>
                     <a target = "_blank" href = {"https://www.audible.com/search/ref=a_hp_tseft?advsearchKeywords="+this.state.titles[i]+" "+this.state.authors[i]+"&filterby=field-keywords"}>
                         <p className = "book-link">
                             Audible
                             </p></a>
                             <a target = "_blank" href ={"https://www.amazon.com/s/ref=nb_sb_noss_2/135-4088136-4578661?url=search-alias%3Dstripbooks&field-keywords="+this.state.authors[i]+" "+this.state.titles[i]}>
                             <p className = "book-link">
                             Amazon
                             </p></a>
                             
                     </div>
                </div>
        )
    }
    filtering(){
        return(
        <div className = "mybook-box">

    
               {this.state.titles.map((x,i)=>{
            
                    var y =  filter(this.state.catFilter,
                                    this.state.recFilter,
                                    this.state.tagFilter,
                                    this.state.categories[i],
                                    this.state.recommendedBy[i],
                                    this.state.tags[i]);

                    
                    if(this.state.readCheck === 0){
                        //no if read filter
                        if(y){
                            return this.bookTemplate(x,i);
                        }
                    }
                    else if(this.state.readCheck === 1){
                        //read only books
                        if(y){
                            if(this.state.ifRead[i]){
                            return this.bookTemplate(x,i);
                            }
                        }
                    }
                    else if(this.state.readCheck === 2){
                        //unread only books
                        if(y){
                            if(!this.state.ifRead[i]){
                                return this.bookTemplate(x,i);
                                }
                        }
                    }
                 
                   
                   
               })}
               </div>
        )

    }
    render(){
        if(!this.state.noBooks){
            return this.filtering()
        }
        else if(this.state.noBooks){
            return(
                <div className="no-books">
                    <h1>
                        You Have No Saved Books
                        </h1>
                    <h3>
                        Type a Book Name into the Search Field <br/> and Hit the Enter Key
                        </h3>
                    </div>
            )
        }
        
    }
}

export default MyBook;