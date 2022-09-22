import React, { useState, useEffect } from 'react'
import { Bar } from "react-chartjs-2";
import 'chartjs-plugin-dragdata'
import { width } from '@mui/system';


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
                        label: '# of Pears',
                        data: data?.map(c => c?.yValue),
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
        <div>

            <div>
                <input onBlur={(e) => setlabel(e.target.value)} type="text" placeholder='Names' className='border-4' />
                <input onBlur={(e) => setaValue(e.target.value)} type="number" placeholder='Number' className='border-4' />
                <button onClick={() => submitPost(label, yValue)} type="button" class="inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out">Submit</button>
            </div>
            {/* ============ ============= */}
            <div className='grid grid-cols-3'>
                {
                    Data.map(data => <div key={data._id}>
                        <div className='flex gap-10'>
                            <p>{data.label}</p>
                            <p>{data.yValue}</p>
                            <p onClick={() => setDelete(data._id)} className='text-red-500 cursor-pointer border-2 bg-black'>X</p>
                        </div>
                    </div>)
                }
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
