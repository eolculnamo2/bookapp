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
            readIndex: 0,
            readCheck: ["Unread & Read", "Read", "Unread"],
            query: ""
        }
        this.secondHandleCallback = this.secondHandleCallback.bind(this);
    }
    componentDidMount(){
        //componentDidMount houses event listener
      window.addEventListener("resize", ()=>{
          if(window.innerWidth > 1100){
              document.getElementById("hide-if-mobile").style.display = "block";
          }
          else if(window.innerWidth < 1100 && window.innerWidth > 700){
            document.getElementById("hide-if-mobile").style.display = "none";
            document.getElementById("dimmer").classList.remove('search-on');
          }
      })
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
    
    if(document.getElementById('hide-if-mobile').style.display == "block" && window.innerWidth < 1100){
        document.getElementById('hide-if-mobile').style.display = "none";
      }
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
    changeRead(){
        if(this.state.readIndex === 0) {
            this.setState({readIndex: 1},()=>{
                this.props.readToggle()
            })
        }
        else if(this.state.readIndex === 1) {
            this.setState({readIndex: 2},()=>{
                this.props.readToggle()
            })
        }
        else if(this.state.readIndex === 2) {
            this.setState({readIndex: 0},()=>{
                this.props.readToggle()
            })
        }
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
                <a><span onClick = {this.changeRead.bind(this)} className="unread-read">{this.state.readCheck[this.state.readIndex]}</span>
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