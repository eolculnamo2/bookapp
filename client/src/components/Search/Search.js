import React from 'react';
import SearchItem from '../SearchItem/SearchItem.js';
import './Search.css';

class Search extends React.Component{
    constructor(){
        super()
        this.state = {
            titles: [],
            authors: [],
            imageArr: [],
            query: ""
        }
        this.secondHandleCallback = this.secondHandleCallback.bind(this);
    }
    componentDidMount(){
        //componentDidMount houses event listener
      document.getElementById("searchInput").addEventListener("keyup", function(event) {
      event.preventDefault();
      if (event.keyCode === 13) {
          var search = document.getElementById("searchInput").value;
          //dimmer is an empty div found in the search function in his component
          document.getElementById("dimmer").classList.add('search-on');
          document.getElementById("searchInput").style.backgroundColor = "white";
          this.setState({query: search})
          this.runSearch();
      }
      
  }.bind(this));

  document.getElementById("dimmer").addEventListener("click",()=>{
    document.getElementById("dimmer").classList.remove('search-on');
    document.getElementById("searchInput").style.backgroundColor = "#f2f2f2";
    this.setState({
        titles: [],
        authors: [],
        imageArr: [],
        query: ""});
  });
      }
    runSearch(){
        //fetch("https://www.googleapis.com/books/v1/volumes?q="+this.state.query)
        fetch("https://www.googleapis.com/books/v1/volumes?q="+this.state.query)
        .then((response)=>{
            return response.json();
        })
        .then((data)=>{
            // to get title data.items[i].volumeInfo.title
            // Will likely need to add more pushes from states below 
            // to ensure all desired user stories are accomplished.
            if(data.items !== undefined){
            var titleArr = [];
            var authorArr = [];
            var imageArr = [];
            data.items.forEach((x,i)=>{
               
                titleArr.push(x.volumeInfo.title);
    
                if(x.volumeInfo.authors){
                x.volumeInfo.authors.forEach((y,j)=>{
                    authorArr.push(" "+x.volumeInfo.authors);
                })
                }
                else if(!x.volumeInfo.authors){
                    authorArr.push(["No Authors"])
                }

                if(x.volumeInfo.imageLinks !== undefined){
                    imageArr.push(x.volumeInfo.imageLinks.smallThumbnail);
                }
                else if(!x.volumeInfo.imageLinks === undefined){
                    //May add link to broken image icon
                    imageArr.push("No Image")
                }
            });
            //End data.items.forEach
            this.setState({
                titles: titleArr,
                authors: authorArr,
                images: imageArr
            })
        }
        })
    }
    /*
    twoWayBindSearch(event){
        this.setState({query: event.target.value},()=>{
            this.runSearch();
        });
    }
    */
  
    secondHandleCallback(x){

      
        //from SearchItem
        //Below would open new tab without a callback function in the setState
       
        this.props.finalCallback(x)
            document.getElementById("dimmer").classList.remove('search-on');
            document.getElementById("searchInput").style.backgroundColor = "#f2f2f2";
            this.setState({
                titles: [],
                authors: [],
                imageArr: [],
                query: ""})
    }

    search(){
        return(
            <div>
                <div id = "searchWrap">
                <input id = "searchInput" placeholder= "&#x1F50D;  Search" className ="search-input"/>
                {this.state.titles.map((x,i)=>{
                    if(this.state.titles.length > 0 && i <=5){
                   return <SearchItem  secondCallback = {this.secondHandleCallback} author = {this.state.authors[i]} image = {this.state.images[i]} title = {x}/>
                    }
                })}
                </div>
                <br/><br/><br/>
                <a><span className="unread-read">Unread & Read</span>
                 <span className="down-arrow ui-icon ui-icon-carat-1-s"></span>
                </a>
                <div id = "dimmer">
                    </div>
                </div>
        )
    }
    render(){
        return this.search();
    }
}

export default Search;