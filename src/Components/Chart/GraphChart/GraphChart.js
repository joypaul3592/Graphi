import React from 'react';
import Geogebra from 'react-geogebra';
import './GraphChart.css'
const GraphChart = () => {
    return (
        <div className='  h-full flex justify-center items-center mb-10 md:mb-0 '>
            <Geogebra />
        </div>
    );
};

export default GraphChart;