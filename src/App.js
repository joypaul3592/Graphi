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
      <div className=' lg:flex  h-screen xl:max-w-7xl lg:w-full mx-auto px-10'>
        <div className=' xl:w-60 lg:w-72 lg:h-full  flex justify-center items-center '>
          <Navbar></Navbar>
        </div>
        <hr className=' hidden lg:block lg:h-[80vh] h-[1px] my-auto lg:w-[1px] bg-teal-700 w-full' />
        <div className=' h-full w-full'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/singleBarChart" element={<SingleBarChart />} />
            <Route path="/horizontalBarChart" element={<HorizontalBarChart />} />
            <Route path="/multipleBarChart" element={<MultipleBarChart />} />
            <Route path="/simpleLineChart" element={<SimpleLineChart />} />
            <Route path="/dualLineChart" element={<SimpleLineChart2 />} />
            <Route path="/graphChart" element={<GraphChart />} />
          </Routes>

        </div>
      </div>

    </div>
  );
}

export default App;
