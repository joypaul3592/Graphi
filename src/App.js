import './App.css';
import GraphChart from './Components/Chart/GraphChart/GraphChart';
import HorizontalBarChart from './Components/Chart/HorizontalBarChart/HorizontalBarChart';
import MultipleBarChart from './Components/Chart/MultipleBarChart/MultipleBarChart';
import SimpleLineChart from './Components/Chart/SimpleLineChart/SimpleLineChart';
import SimpleLineChart2 from './Components/Chart/SimpleLineChart2/SimpleLineChart2';
import SingleBarChart from './Components/Chart/SingleBarChart/SingleBarChart';
import Home from './Components/Home/Home';
import Navbar from './Components/Navbar/Navbar';


function App() {

  const rawData = [
    { label: 'Mon', aValue: 100},
    { label: 'Tue', aValue: 14},
    { label: 'Wed', aValue: 22},
    { label: 'Thu', aValue: 43},
    { label: 'Fri', aValue: 33},
    { label: 'Mon', aValue: 200},
    { label: 'Tue', aValue: 14}
  ];

  return (
    <div className="App">
      <div className=' lg:flex  h-screen max-w-7xl mx-auto px-10'>
        <div className=' lg:w-60 lg:h-full  flex justify-center items-center '>
          <Navbar></Navbar>
        </div>
        <hr className=' h-[80vh] my-auto w-[1px] bg-teal-700' />
        <div className=' h-full w-full'>
          <Home></Home>
        </div>
      </div>

      {/* <div className=' w-1/2 mx-auto mt-40'> <SingleBarChart data={rawData} /></div>
      <div className=' w-1/2 mx-auto mt-40'> <MultipleBarChart data={rawData} /></div>
      <div className=' w-1/2 mx-auto mt-40'> <HorizontalBarChart data={rawData} /></div>
      <div className=' w-1/2 mx-auto my-40'><SimpleLineChart></SimpleLineChart></div>
      <div className=' w-1/2 mx-auto my-40'><SimpleLineChart2></SimpleLineChart2></div>
      <div className=' w-1/2 mx-auto my-40'><GraphChart></GraphChart></div> */}
    </div>
  );
}

export default App;
