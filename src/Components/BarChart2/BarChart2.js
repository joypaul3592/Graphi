import React, { useState, useEffect } from 'react'
import { Bar } from "react-chartjs-2";
import 'chartjs-plugin-dragdata'


export default function BarChart2({ Data }) {
    /* ================= input value  niye kaj kora hossce  vai  ===============  */

    const [Input_value, setInputValue] = useState()
    const [option_value, handleoption] = useState()


    const [shouldRedraw] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [filterData, setFilterData] = useState({})
    const submitButton = (Input_value, option_value) => {
        if (Input_value && option_value) {
            setFilterData({ Input_value: Input_value, option_value: option_value })
        }
    }
    const buildDataSet = (data) => {

        let labels = data?.map(c => c.label);

        let options = {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: '# of Pears',
                        data: data.map(c => c.label === filterData.option_value ? filterData.Input_value : c.aValue),
                        //datasetIndex: data.map(c => c.Id),c.label === option_value ? sumbitValue :
                        fill: true,
                        tension: 0.4,
                        borderWidth: 1,
                        borderColor: 'red',
                        backgroundColor: 'rgb(325, 130, 230)',
                        pointHitRadius: 25
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        min: 0,
                        max: 200
                    }
                },
                onHover: function (e) {
                    const point = e.chart.getElementsAtEventForMode(e, 'nearest', { intersect: true }, false)
                    if (point.length) e.native.target.style.cursor = 'grab'
                    else e.native.target.style.cursor = 'default'
                },
                plugins: {
                    dragData: {
                        round: 1,
                        showTooltip: true,
                        onDragStart: function (e, element) {
                            // console.log('On Drag Start ', element)
                        },
                        // Change while dragging 
                        onDrag: function (e, datasetIndex, index, value) {
                            e.target.style.cursor = 'grabbing'
                            // console.log('On Dragging ', datasetIndex, index, value)
                            // if(datasetIndex == 0) {
                            //   data[index].aValue = value
                            // }

                            // if(datasetIndex == 1) {
                            //   data[index].bValue = value
                            // }

                            // Data.onHandleChange(data);

                        },
                        // Only change when finished dragging 
                        onDragEnd: function (e, datasetIndex, index, value) {
                            // console.log('On Drag End ', datasetIndex, index, value)
                            e.target.style.cursor = 'default'

                            if (datasetIndex == 0) {
                                data[index].aValue = value
                            }

                            if (datasetIndex == 1) {
                                data[index].bValue = value
                            }

                            Data.onHandleChange(data);
                        },
                    }
                }
            }
        }

        return options;
    }


    let localOption = buildDataSet(Data);


    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true)
        }, 200);
    }, [])

    console.log(filterData)

    return (
        <div>
            {/* ==================== i try to empilimet data ============== */}
            <div className='text-left my-10 text-bold text-red-500'>
                <h1 className='text-xl'>Thsi is options value create </h1>
                <select onChange={(e) => handleoption(e.target.value)}>
                    <option value="none" selected disabled hidden>select</option>
                    {Data?.map((option) => (
                        <option key={option.label} value={option?.label}>{option?.label}</option>
                    ))}
                </select>
                <input onChange={(e) => setInputValue(e.target.value)} type="number" className='border-black border-2' />
                <button onClick={() => submitButton(Input_value, option_value)} type="button" class="inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out">Submit</button>
               

            </div>
            {isLoaded &&
                <Bar
                    redraw={shouldRedraw}
                    data={localOption.data}
                    options={localOption.options}
                    plugins={localOption.plugins}
                />
            }

        </div>
    );
}
