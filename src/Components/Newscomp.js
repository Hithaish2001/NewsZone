import React, { useEffect ,useState} from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import InfiniteScroll from "react-infinite-scroll-component";

const Newscomp =(props)=> {
  const [articles, setarticles] = useState([])
  const [loading, setloading] = useState(true)
  const [page, setpage] = useState(1)
  const [totalResults, settotalResults] = useState(0)

  // document.title=`${this.capitalizeFirstLetter(props.category)} - NewsZone`;
  
  const capitalizeFirstLetter=(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


 
    


   const updatenews = async()=>{
    props.setProgress(10)
    const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pagesize=${props.pageSize}`
    setloading(true)
    let data=await fetch(url);
    props.setProgress(30)
    let parsedata= await data.json();
    props.setProgress(70)
    setarticles(parsedata.articles)
    settotalResults(parsedata.totalResults)
    setloading(false)
    props.setProgress(100)

    document.title=`${capitalizeFirstLetter(props.category)} - NewsZone`
  }

   useEffect(() => {
    updatenews();
   }, [])
   
  

  const fetchMoreData = async() => {
    const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pagesize=${props.pageSize}`
    setpage(page+1)
    let data=await fetch(url);
    let parsedata= await data.json();
    setarticles(articles.concat(parsedata.articles))
    settotalResults(parsedata.totalResults)
  };

  //  handlenxtbtn= async()=>{
  //   this.setState({page: this.state.page+1});
  //   this.updatenews(); 

  // }

  // handleprebtn= async()=>{
  //  this.setState({page: this.state.page-1})
  //  this.updatenews();
  // }

  
    return (
      <>
        <h1 className='text-center' style={{margin:"35px 0px", marginTop:"90px"}}>NewsZone  -Top {props.category} headlines</h1>
         {loading && <Spinner/>} 
            <InfiniteScroll
              dataLength={articles.length}
              next={fetchMoreData}
              hasMore={articles.length !== totalResults}
              loader={<Spinner/>}>

             <div className="container">
               <div className="row">
                {articles.map((element)=>{
                  return <div className="col-md-4" key={element.url}>
                  <Newsitem  title={element.title} description={element.description?element.description.slice(0,88):""}  imgurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} src={element.source.name}/>
                  </div>
                })}
               </div>
              </div>
            </InfiniteScroll>
        {/* <div className="button d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handleprebtn}>&larr; Previous</button>
        <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={this.handlenxtbtn}>Next &rarr;</button>
        </div> */}
      </>
    )
  }



Newscomp.defaultProps = {
  country: "in",
  pageSize: 8,
  category:'genral',
}

export default Newscomp