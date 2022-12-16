
import React, { Component } from 'react'
import Navbar from './Components/Navbar'
import Newscomp from './Components/Newscomp'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


export default class App extends Component {
  pageSize=6;
  render() {
    return (
      <>
        <Router>
        <Navbar/>
        <div>
          <Routes>
            <Route exact path="/" element={<Newscomp key="general"  pageSize={this.pageSize} country="in" category="general"/>}/>
            <Route exact path="/general" element={<Newscomp key="general"  pageSize={this.pageSize} country="in" category="general"/>}/>
            <Route exact path="/business" element={<Newscomp key="business"  pageSize={this.pageSize} country="in" category="business"/>}/>
            <Route exact path="/entertainment" element={<Newscomp key="entertainment"  pageSize={this.pageSize} country="in" category="entertainment"/>}/>
            <Route exact path="/health" element={<Newscomp key="health"  pageSize={this.pageSize} country="in" category="health"/>}/>
            <Route exact path="/science" element={<Newscomp  key="science" pageSize={this.pageSize} country="in" category="science"/>}/>
            <Route exact path="/sports" element={<Newscomp key="sports"  pageSize={this.pageSize} country="in" category="sports"/>} />
            <Route exact path="/technology" element={<Newscomp key="technology"  pageSize={this.pageSize} country="in" category="technology"/>}/>
          </Routes>
        </div>
        </Router>
      </>
    )
  }
}
