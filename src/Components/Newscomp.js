import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import InfiniteScroll from "react-infinite-scroll-component";

export class Newscomp extends Component {

  static defaultProps = {
    country: "in",
    pageSize: 8,
    category:'genral',
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  constructor(props){
    super(props);
    this.state={
      articles:[],
      loading:false,
      page:1,
      totalResults: 0
    }
    document.title=`${this.capitalizeFirstLetter(this.props.category)} - NewsZone`;
  }

  async updatenews(){
    this.props.setProgress(10)
    const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7a293d476cee45aab7c6980858cc9509&page=${this.state.page}&pagesize=${this.props.pageSize}`
    this.setState({loading:true})
    let data=await fetch(url);
    this.props.setProgress(30)
    let parsedata= await data.json();
    this.props.setProgress(70)
    this.setState({articles: parsedata.articles,
      totalResults:parsedata.totalResults,
      loading:false})
      this.props.setProgress(100)
  }

  async componentDidMount(){
    this.updatenews();
  }

  fetchMoreData = async() => {
    this.setState({page: this.state.page + 1})
    const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7a293d476cee45aab7c6980858cc9509&page=${this.state.page+1}&pagesize=${this.props.pageSize}`
    let data=await fetch(url);
    let parsedata= await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedata.articles),
      totalResults:parsedata.totalResults
    }) 
  };

  //  handlenxtbtn= async()=>{
  //   this.setState({page: this.state.page+1});
  //   this.updatenews(); 

  // }

  // handleprebtn= async()=>{
  //  this.setState({page: this.state.page-1})
  //  this.updatenews();
  // }

  render() {
    return (
      <>
        <h1 className='text-center'>NewsZone  -Top headlines</h1>
         {this.state.loading && <Spinner/>} 
            <InfiniteScroll
              dataLength={this.state.articles.length}
              next={this.fetchMoreData}
              hasMore={this.state.articles.length !== this.state.totalResults}
              loader={<Spinner/>}>

             <div className="container">
               <div className="row">
                {this.state.articles.map((element)=>{
                  return <div className="col-md-4" key={element.url}>
                  <Newsitem  title={element.title} description={element.description?element.description.slice(0,88):""}  imgurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} src={element.source.name}/>
                  </div>
                })}
               </div>
              </div>
            </InfiniteScroll>
        {/* <div className="button d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handleprebtn}>&larr; Previous</button>
        <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handlenxtbtn}>Next &rarr;</button>
        </div> */}
      </>
    )
  }
}

export default Newscomp