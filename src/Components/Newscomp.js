import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'

export class Newscomp extends Component {

  static defaultProps = {
    country: "in",
    pageSize: 8,
    category:'genral',
  }

  


  constructor(){
    super();
    this.state={
      articles:[],
      loading:false,
      page:1
    }
  }

  async updatenews(){
    const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7a293d476cee45aab7c6980858cc9509&page=${this.state.page}&pagesize=${this.props.pageSize}`
    this.setState({loading:true})
    let data=await fetch(url);
    let parsedata= await data.json();
    console.log(parsedata);
    this.setState({articles: parsedata.articles,
      totalResults:parsedata.totalResults,
      loading:false})
  }

  async componentDidMount(){
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7a293d476cee45aab7c6980858cc9509&page=1&pagesize=${this.props.pageSize}`
    this.setState({loading:true})
    let data=await fetch(url);
    let parsedata= await data.json();
    console.log(parsedata);
    this.setState({articles: parsedata.articles,
      totalResults:parsedata.totalResults,
      loading:false})
  }

   handlenxtbtn= async()=>{
    // if (!(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize))) {
    //     let url=` https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7a293d476cee45aab7c6980858cc9509&page=${this.state.page+1}&pagesize=${this.props.pageSize}`;
    //     this.setState({loading:true})
    //     let data=await fetch(url);
    //   let parsedata= await data.json();
    //   this.setState({
    //     page:this.state.page+1,
    //     articles: parsedata.articles,
    //     loading:false
    //   })
    // }
    this.setState({page: this.state.page+1});
    this.updatenews(); 

  }

  handleprebtn= async()=>{
  //   let url=` https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7a293d476cee45aab7c6980858cc9509&page=${this.state.page-1}&pagesize=${this.props.pageSize}`;
  //   this.setState({loading:true})
  //   let data=await fetch(url);
  //   let parsedata= await data.json();
  //   console.log(parsedata);
  //   this.setState({
  //     page:this.state.page-1,
  //     articles: parsedata.articles,
  //     loading:false
  //  })
   this.setState({page: this.state.page-1})
   this.updatenews();
  }

  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center'>NewsZone  -Top headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
            <Newsitem  title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""}  imgurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} src={element.source.name}/>
            </div>
          })}
          
        </div>
        <div className="button d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handleprebtn}>&larr; Previous</button>
        <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handlenxtbtn}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default Newscomp