import React from 'react';
import './MyBook.css';

class MyBook extends React.Component{
    constructor(){
        super()
        this.state = {
            authors: [],
            titles: [],
            images: []
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
            data.forEach((x,i)=>{
                authorHold.push(x.author)
                titlesHold.push(x.title)
                imagesHold.push(x.image)
            })
            this.setState({
                authors: authorHold,
                titles: titlesHold,
                images: imagesHold
            })
        })
        
    }
    render(){
        return(
           <div>
               {this.state.titles.map((x,i)=>{
                   return(
                       <div>
                           <img src = {this.state.images[i]}/>
                           <h2>
                               {x}
                               </h2>
                               <h4>
                                   {this.state.authors[i]}
                                   </h4>
                           </div>
                   )
               })}
               </div>
        )
    }
}

export default MyBook;