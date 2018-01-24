import React from 'react';
import './MyBook.css';

class MyBook extends React.Component{
    constructor(){
        super()
        this.state = {
            authors: [],
            titles: [],
            images: [],
            categories: [],
            recommendedBy: [],
            tags: [],
            ifRead: [],
            filter: false,
            catFilter: [],
            recFilter: [],
            tagFilter: []

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

            data.forEach((x,i)=>{
                authorHold.push(x.author)
                titlesHold.push(x.title)
                imagesHold.push(x.image)
                ifReadHold.push(x.read)
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
                ifRead: ifReadHold
            })
        })
    }
    componentWillReceiveProps(newProps){
        
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
    }
    markOrRate(x,index){
        // The form data for rating is going to be a pain in the ass.
        if(x){
            return(
                <div>
                    <form id ="submitRate" method = "POST" action = {"/rate"+index}>
                    <center>
                    <p className = "marked"> Marked as Read</p>
                    <div className ="rating">
<span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
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