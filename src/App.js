import './App.css';
import BarChart2 from './Components/BarChart2/BarChart2';
import HorizentalBar from './Components/HorizentalBar/HorizentalBar';
import LineChart from './Components/LineChart/LineChart';
import LineChart2 from './Components/LineChart2/LineChart2';
import ReactGraph from './Components/ReactGraph/ReactGraph';

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
      <h1>Hello</h1>
      <div className=' w-1/2 mx-auto mt-40'> <BarChart2 /></div>
      <div className=' w-1/2 mx-auto mt-40 '> <HorizentalBar data={rawData} /></div>
      <div className=' w-1/2 mx-auto my-40  p-2'><ReactGraph></ReactGraph></div>
      <div className=' w-1/2 mx-auto my-40  p-2 '><LineChart></LineChart></div>
      <div className=' w-1/2 mx-auto my-40  p-2 '><LineChart2></LineChart2></div>
    </div>
  );
}

export default App;
