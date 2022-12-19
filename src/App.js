
import React,{useState} from 'react'
import Navbar from './Components/Navbar'
import Newscomp from './Components/Newscomp'
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


const App =()=> {
  const pageSize=6;
  const apikey=process.env.REACT_APP_NEWS_API

  const [progress, setprogress] = useState(10)

    return (
      <>
        <Router>
        <Navbar/>
        <LoadingBar
        height={3}
        color='#f11946'
        progress={progress}/>
        <div>
          <Routes>
            <Route exact path="/" element={<Newscomp setProgress={setprogress} apikey={apikey} key="general"  pageSize={pageSize} country="in" category="general"/>}/>
            <Route exact path="/general" element={<Newscomp setProgress={setprogress} apikey={apikey} key="general"  pageSize={pageSize} country="in" category="general"/>}/>
            <Route exact path="/business" element={<Newscomp setProgress={setprogress} apikey={apikey} key="business"  pageSize={pageSize} country="in" category="business"/>}/>
            <Route exact path="/entertainment" element={<Newscomp setProgress={setprogress} apikey={apikey} key="entertainment"  pageSize={pageSize} country="in" category="entertainment"/>}/>
            <Route exact path="/health" element={<Newscomp setProgress={setprogress} apikey={apikey} key="health"  pageSize={pageSize} country="in" category="health"/>}/>
            <Route exact path="/science" element={<Newscomp setProgress={setprogress} apikey={apikey}  key="science" pageSize={pageSize} country="in" category="science"/>}/>
            <Route exact path="/sports" element={<Newscomp setProgress={setprogress} apikey={apikey} key="sports"  pageSize={pageSize} country="in" category="sports"/>} />
            <Route exact path="/technology" element={<Newscomp setProgress={setprogress} apikey={apikey} key="technology"  pageSize={pageSize} country="in" category="technology"/>}/>
          </Routes>
        </div>
        </Router>
      </>
    )
  }
  export default App

