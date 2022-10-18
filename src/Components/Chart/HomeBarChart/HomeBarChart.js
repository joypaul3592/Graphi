import React, { useState, useEffect } from 'react'
import { Bar } from "react-chartjs-2";
import 'chartjs-plugin-dragdata'
import { width } from '@mui/system';


export default function HomeBarChart() {


    const [Data, setData] = useState([])
    const [dataisLoaded, setdataisLoaded] = useState(false)



    const [shouldRedraw] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);



    const buildDataSet = (data) => {


        // let labels = data?.map(c => c.label);

        let options = {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                datasets: [
                    {
                        data: [65, 59, 80, 81, 56, 55, 40, 78, 45],
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
                        fill: true,
                        tension: 0.4,
                        borderWidth: 1,
                        pointHitRadius: 25
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        min: 0,
                        max: 90
                    }
                },
                onHover: function (e) {
                    const point = e.chart.getElementsAtEventForMode(e, 'nearest', { intersect: true }, false)
                    if (point.length) e.native.target.style.cursor = 'grab'
                    else e.native.target.style.cursor = 'default'
                },
                plugins: {
                    legend: {
                        display: false
                    },
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
        fetch(' https://blooming-meadow-86067.herokuapp.com/api/v1/grap', {
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
        fetch(` https://blooming-meadow-86067.herokuapp.com/api/v1/grap/${id}`, {
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
            fetch(' https://blooming-meadow-86067.herokuapp.com/api/v1/grap', {
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
            {/* ============ ============= */}

            {isLoaded &&
                <Bar

                    className=' w-2/3 h-80 '
                    redraw={shouldRedraw}
                    data={localOption.data}
                    options={localOption.options}
                    plugins={localOption.plugins}
                />
            }

        </div>
    );
}
