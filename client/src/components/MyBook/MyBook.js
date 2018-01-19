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
            tags: []

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
            console.log("data started...")
            var authorHold = []
            var titlesHold = []
            var imagesHold = []
            var recommendedByHold = []
            var categoriesHold = []
            var tagsHold = []

            data.forEach((x,i)=>{
                authorHold.push(x.author)
                titlesHold.push(x.title)
                imagesHold.push(x.image)
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
                tags: tagsHold
            })
        })
        
    }
    render(){
        return(
           <div className = "mybook-box">
               {this.state.titles.map((x,i)=>{
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
                                <button className = "mark-button">
                                    Mark as Read
                                    </button><br/>
                                    <p className = "book-link">
                                        Audible
                                        </p>
                                        <p className = "book-link">
                                        Amazon
                                        </p>
                                </div>
                           </div>
                   )
               })}
               </div>
        )
    }
}

export default MyBook;