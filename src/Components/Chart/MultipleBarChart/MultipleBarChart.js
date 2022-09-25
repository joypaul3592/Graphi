import React, { useState, useEffect, useRef } from 'react'
import { Bar } from "react-chartjs-2";
import 'chartjs-plugin-dragdata'
import ReactToPrint from 'react-to-print';
import '../../../App.css'
import { BiCloudDownload } from "react-icons/bi";

export default function MultipleBarChart() {
    const ref = useRef()
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
                        label: 'Graph 1',
                        data: data?.map(c => c.yValue),
                        fill: true,
                        tension: 0.4,
                        borderWidth: 1,
                        borderColor: 'white',
                        backgroundColor: 'rgb(255, 230, 230)',
                        pointHitRadius: 25
                    },
                    {
                        label: 'Graph 2',
                        data: data?.map(c => c.xValue),
                        fill: true,
                        tension: 0.4,
                        borderWidth: 1,
                        borderColor: 'darkblue',
                        backgroundColor: 'rgb(230, 230, 255)',
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

    /* ===================== Data grt =========  */
    useEffect(() => {
        fetch('https://intense-river-05869.herokuapp.com/api/v1/grap/multipleBar', {
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
        fetch(`https://intense-river-05869.herokuapp.com/api/v1/grap/multipleBar/${id}`, {
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
    const [xValue, setxValue] = useState(0)
    const submitPost = (e) => {
        const label = e.target.names.value;
        const yValue = e.target.number.value;
        const xValue = e.target.number2.value;
        if (label && yValue && xValue) {
            const Data = { label: label, yValue: yValue, xValue: xValue }
            fetch('https://intense-river-05869.herokuapp.com/api/v1/grap/multipleBar', {
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
                        e.target.names.value = ''
                        e.target.number.value = ''
                        e.target.number2.value = ''
                    }
                })

        }
    }

    return (
        <div className=' h-full flex justify-center items-center'>
            <div className='   mx-10 w-10/12 '>

                <div className=' w-full'>
                    <div className=' md:flex items-center justify-between gap-6'>
                        <div className='flex flex-col w-full my-10 md:my-0 md:w-[50%] p-5 rounded-md shadow-md xl:px-10'>
                            <h1 className=' text-purple-800 font-semibold '>Add Your Graph</h1>
                            <hr className='mb-4 mt-1 bg-purple-800 h-[1.5px] w-1/2 flex mx-auto' />
                            <form onSubmit={submitPost} className='flex flex-col'>
                                <input type="text" placeholder='Names' name='names' className='bg-gray-100 px-3 py-1 rounded shadow-md' />

                                <input type="number" placeholder='Number' name='number' className='bg-gray-100 mt-4 px-3 py-1 rounded shadow-md' />
                                <input type="number" placeholder='Number' name='number2' className='bg-gray-100 mt-4 px-3 py-1 rounded shadow-md' />

                                <button type="submit" class="inline-block px-3 py-2 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out  mx-auto mt-5">Submit</button>
                            </form>
                        </div>
                        {/* ============ ============= */}
                        <div className=' bg-white w-full md:w-[50%]  h-[13rem] rounded-md shadow-md overflow-auto scroll py-5 px-5'>
                            {
                                Data.map(data => <div className=' bg-white mb-5 flex justify-between items-center px-5 py-1 rounded shadow-md ' key={data._id}>
                                    <p className=' font-medium'>{data.label}</p>
                                    <p>{data.yValue}</p>
                                    <p onClick={() => setDelete(data._id)} className='text-white cursor-pointer px-[6px] border-2 bg-red-400 rounded'>X</p>

                                </div>)
                            }
                        </div>
                    </div>
                    <div ref={ref} className='relative  w-full bg-white mt-8 md:p-5 p-1 mb-10 md:my-0 md:mt-10 rounded-md shadow-md'>
                        {isLoaded &&
                            <Bar
                                redraw={shouldRedraw}
                                data={localOption.data}
                                options={localOption.options}
                                plugins={localOption.plugins}
                            />
                        }
                        <div className=' absolute -top-10 right-2'>
                            <ReactToPrint
                                trigger={() => <button className='text-xl px-1 border-3 text-black font-bold rounded-md shadow-lg  my-10'><BiCloudDownload /></button>}
                                content={() => ref.current}
                            />
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}
