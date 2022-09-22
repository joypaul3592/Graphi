import './App.css';
import GraphChart from './Components/Chart/GraphChart/GraphChart';
import HorizontalBarChart from './Components/Chart/HorizontalBarChart/HorizontalBarChart';
import MultipleBarChart from './Components/Chart/MultipleBarChart/MultipleBarChart';
import SimpleLineChart from './Components/Chart/SimpleLineChart/SimpleLineChart';
import SimpleLineChart2 from './Components/Chart/SimpleLineChart2/SimpleLineChart2';
import SingleBarChart from './Components/Chart/SingleBarChart/SingleBarChart';
import Home from './Components/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import { Routes, Route } from "react-router-dom";

function App() {


  return (
    <div className="App">
      <div className=' lg:flex  h-screen max-w-7xl mx-auto px-10'>
        <div className=' lg:w-60 lg:h-full  flex justify-center items-center '>
          <Navbar></Navbar>
        </div>
        <hr className=' h-[80vh] my-auto w-[1px] bg-teal-700' />
        <div className=' h-full w-full'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/singleBarChart" element={<SingleBarChart />} />
            <Route path="/horizontalBarChart" element={<HorizontalBarChart />} />
            <Route path="/multipleBarChart" element={<MultipleBarChart />} />
            <Route path="/simpleLineChart" element={<SimpleLineChart />} />
            <Route path="/graphChart" element={<GraphChart />} />
     
          </Routes>

        </div>
      </div>

    </div>
  );
}

export default App;
