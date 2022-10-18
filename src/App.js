import './App.css';
import GraphChart from './Components/Chart/GraphChart/GraphChart';
import HorizontalBarChart from './Components/Chart/HorizontalBarChart/HorizontalBarChart';
import MultipleBarChart from './Components/Chart/MultipleBarChart/MultipleBarChart';
import SimpleLineChart from './Components/Chart/SimpleLineChart/SimpleLineChart';
import SimpleLineChart2 from './Components/Chart/SimpleLineChart2/SimpleLineChart2';
import SingleBarChart from './Components/Chart/SingleBarChart/SingleBarChart';
import Home from './Components/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import { Routes, Route, useLocation } from "react-router-dom";
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import auth from './firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useState } from 'react';


function App() {
  var userIdentify;
  const pathnme = useLocation()
  const [user] = useAuthState(auth)
  if (pathnme?.search) {
    userIdentify = pathnme.search.slice(6, 10000)
  }
  else if (user?.email) {
    userIdentify = user?.email
  } else {
    userIdentify = ''
  }

  return (

    <div className="App">
      <div className=' lg:flex  lg:h-screen xl:max-w-7xl lg:w-full mx-auto xl:px-10 lg:px-5'>
        <div className='lg:w-[20%] lg:h-screen  flex justify-center items-center my-10 lg:my-0'>
          <Navbar GetDaNewUrl={userIdentify} ></Navbar>
          <hr className=' hidden lg:block lg:h-[80vh] h-[1px] my-auto lg:w-[1px] bg-teal-700 w-full' />
        </div>
        <div className=' h-full lg:w-[77%] w-full '>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/singleBarChart" element={<SingleBarChart userIdentify={userIdentify} />} />
            <Route path="/horizontalBarChart" element={<HorizontalBarChart userIdentify={userIdentify}/>} />
            <Route path="/multipleBarChart" element={<MultipleBarChart userIdentify={userIdentify}/>} />
            <Route path="/simpleLineChart" element={<SimpleLineChart userIdentify={userIdentify}/>} />
            <Route path="/dualLineChart" element={<SimpleLineChart2 userIdentify={userIdentify} />} />
            <Route path="/graphChart" element={<GraphChart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>

        </div>
      </div>

    </div>
  );

}

export default App;
