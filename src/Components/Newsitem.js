import React, { Component } from 'react'

export class Newsitem extends Component {
  render() {
    let {title, description, imgurl, newsurl, author, date, src}=this.props;
    return (
      <>
        <div className="card my-4" >
            <img src={!imgurl?"https://cdn.benzinga.com/files/images/story/2022/12/02/cryptocurrency-g70f735c0a_1920.jpg?width=1200&height=800&fit=crop":imgurl} className="card-img-top" alt="..." title={title}/>
            <div className="card-body">
              <span className="badge text-bg-danger mb-2 p-2">{src}</span>
              <h5 className="card-title">{title?title.slice(0,45):""}...</h5>
              <p className="card-text">{description}...</p>
              <p className="card-text"><small className="text-muted">By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
              <a href={newsurl}  className="btn btn-sm btn-dark">Read more</a>
            </div>
        </div>
        
      </>
    )
  }
}

export default Newsitem