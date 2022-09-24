import React, { useState, useEffect } from 'react'
import { Bar } from "react-chartjs-2";
import 'chartjs-plugin-dragdata'
import { width } from '@mui/system';
import '../../../App.css'

export default function BarChart2() {


    const [Data, setData] = useState([])
    const [dataisLoaded, setdataisLoaded] = useState(false)



    const [shouldRedraw] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);



    const buildDataSet = (data) => {


        let labels = data?.map(c => c.label);

        let options = {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Graph',
                        data: data?.map(c => c?.yValue),
                        fill: true,
                        tension: 0.4,
                        borderWidth: 1,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 205, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(201, 203, 207, 0.2)'
                        ],
                        borderColor: [
                            'rgb(255, 99, 132)',
                            'rgb(255, 159, 64)',
                            'rgb(255, 205, 86)',
                            'rgb(75, 192, 192)',
                            'rgb(54, 162, 235)',
                            'rgb(153, 102, 255)',
                            'rgb(201, 203, 207)'
                        ],
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

                        },
                        // Change while dragging 
                        onDrag: function (e, datasetIndex, index, value) {
                            e.target.style.cursor = 'grabbing'
                        },
                        // Only change when finished dragging 
                        onDragEnd: function (e, datasetIndex, index, value) {

                            e.target.style.cursor = 'default'

                            if (datasetIndex == 0) {
                                data[index].yValue = value
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

    /* ===================== Data grt =========  */
    useEffect(() => {
        fetch('https://intense-river-05869.herokuapp.com/api/v1/grap/singleBar', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setData(data?.data)
            })

    }, [dataisLoaded])

    /* ===================== Data Delete =========  */
    const [Delete, setDelete] = useState()
    if (Delete) {
        const id = Delete;
        fetch(`https://intense-river-05869.herokuapp.com/api/v1/grap/singleBar/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    setdataisLoaded(!dataisLoaded)
                }
            })
    }



    /* ===================== Data Post =========  */
    const [label, setlabel] = useState('')
    const [yValue, setaValue] = useState(0)
    const submitPost = (label, yValue) => {
        if (label && yValue) {
            const Data = { label: label, yValue: yValue }
            fetch('https://intense-river-05869.herokuapp.com/api/v1/grap/singleBar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Data),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data) {
                        setdataisLoaded(!dataisLoaded)
                    }
                })

        }
    }




    return (
        <div className=' h-full flex justify-center items-center'>
            <div className='   mx-10 w-10/12 '>

                <div className=' w-full'>
                    <div className=' md:flex items-center justify-between gap-6'>
                        <div className=' flex flex-col w-full my-10 md:my-0 md:w-[50%] p-5 bg-white rounded-md shadow-md xl:px-10'>
                            <h1 className=' text-purple-800 font-semibold '>Add Your Graph</h1>
                            <hr className='mb-4 mt-1 bg-purple-800 h-[1.5px] w-1/2 flex mx-auto' />
                            <input onBlur={(e) => setlabel(e.target.value)} type="text" placeholder='Names' className='bg-gray-100 px-3 py-1 rounded shadow-md' />

                            <input onBlur={(e) => setaValue(e.target.value)} type="number" placeholder='Number' className='bg-gray-100 mt-4 px-3 py-1 rounded shadow-md' />

                            <button onClick={() => submitPost(label, yValue)} type="button" class="inline-block px-3 py-2 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out  mx-auto mt-5">Submit</button>
                        </div>
                        {/* ============ ============= */}
                        <div className=' bg-white w-full md:w-[50%] h-[13rem] rounded-md shadow-md overflow-auto scroll py-5 px-5'>
                            {
                                Data.map(data => <div className=' bg-white mb-5 flex justify-between items-center px-5 py-1 rounded shadow-md ' key={data._id}>
                                    <p className=' font-medium'>{data.label}</p>
                                    <p>{data.yValue}</p>
                                    <p onClick={() => setDelete(data._id)} className='text-white cursor-pointer px-[6px] border-2 bg-red-400 rounded'>X</p>

                                </div>)
                            }
                        </div>
                    </div>
                    <div className=' w-full bg-white mt-8 md:p-5 p-1 mb-10 md:my-0 rounded-md shadow-md'>

                        {isLoaded &&
                            <Bar
                                redraw={shouldRedraw}
                                data={localOption.data}
                                options={localOption.options}
                                plugins={localOption.plugins}
                            />
                        }
                    </div>
                </div>
            </div>

        </div>
    );
}
