
import React, { Component } from 'react'
import Navbar from './Components/Navbar'
import Newscomp from './Components/Newscomp'
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


export default class App extends Component {
  pageSize=6;
  apikey=process.env.REACT_APP_NEWS_API

  state = {
    progress:10
  }

  setProgress=(progress)=>{
    this.setState({progress: progress})
  }

  render() {
    return (
      <>
        <Router>
        <Navbar/>
        <LoadingBar
        height={3}
        color='#f11946'
        progress={this.state.progress}/>
        <div>
          <Routes>
            <Route exact path="/" element={<Newscomp setProgress={this.setProgress} apikey={this.apikey} key="general"  pageSize={this.pageSize} country="in" category="general"/>}/>
            <Route exact path="/general" element={<Newscomp setProgress={this.setProgress} apikey={this.apikey} key="general"  pageSize={this.pageSize} country="in" category="general"/>}/>
            <Route exact path="/business" element={<Newscomp setProgress={this.setProgress} apikey={this.apikey} key="business"  pageSize={this.pageSize} country="in" category="business"/>}/>
            <Route exact path="/entertainment" element={<Newscomp setProgress={this.setProgress} apikey={this.apikey} key="entertainment"  pageSize={this.pageSize} country="in" category="entertainment"/>}/>
            <Route exact path="/health" element={<Newscomp setProgress={this.setProgress} apikey={this.apikey} key="health"  pageSize={this.pageSize} country="in" category="health"/>}/>
            <Route exact path="/science" element={<Newscomp setProgress={this.setProgress} apikey={this.apikey}  key="science" pageSize={this.pageSize} country="in" category="science"/>}/>
            <Route exact path="/sports" element={<Newscomp setProgress={this.setProgress} apikey={this.apikey} key="sports"  pageSize={this.pageSize} country="in" category="sports"/>} />
            <Route exact path="/technology" element={<Newscomp setProgress={this.setProgress} apikey={this.apikey} key="technology"  pageSize={this.pageSize} country="in" category="technology"/>}/>
          </Routes>
        </div>
        </Router>
      </>
    )
  }
}
