import React, { useState, useEffect } from 'react'
import { Bar, Line } from "react-chartjs-2";
import 'chartjs-plugin-dragdata'


export default function SimpleLineChart(props) {
    const [shouldRedraw] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);


    const buildDataSet = () => {

        var options = {
            type: 'line',
            data: {
                labels: ['1', '2', '3', '4', '5'],
                borderColor: "#fffff",
                datasets: [{
                    label: 'A',
                    yAxisID: 'y',
                    borderColor: 'rgb(75, 192, 192)',
                    data: [90, 76, 54, 36, 10],
                    pointHitRadius: 25
                }]
            },
            backgroundColor: "rgba(75,99,132)",
            options: {
                scales: {
                    y: {
                        type: 'linear',
                        position: 'left',
                        max: 100,
                        min: 0
                    },
                    y2: {
                        type: 'linear',
                        position: 'right',
                        max: 1,
                        min: 0
                    }
                },
                onHover: function (e) {
                    const point = e.chart.getElementsAtEventForMode(e, 'nearest', { intersect: true }, false)
                    if (point.length) e.native.target.style.cursor = 'grab'
                    else e.native.target.style.cursor = 'default'
                },
                plugins: {
                    backgroundImage: {
                        url: 'https://i.imgur.com/bQcg21b.jpg'
                    },
                    dragData: {
                        backgroundImage: {
                            url: 'https://i.imgur.com/bQcg21b.jpg'
                        },
                        round: 2,
                        showTooltip: true,
                        onDragStart: function (e) {
                            // console.log(e)
                        },
                        onDrag: function (e, datasetIndex, index, value) {
                            e.target.style.cursor = 'grabbing'
                            // console.log(e, datasetIndex, index, value)
                        },
                        onDragEnd: function (e, datasetIndex, index, value) {
                            e.target.style.cursor = 'default'
                            // console.log(datasetIndex, index, value)
                        },
                    }
                }
            }
        }
        return options;
    }
    

    let localOption = buildDataSet(props.data);


    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true)
        }, 200);
    }, [])

    return (
        <div>
            {isLoaded &&
                <Line
                    redraw={shouldRedraw}
                    data={localOption.data}
                    options={localOption.options}
                    plugins={localOption.plugins}
                    fillStyle='lightGreen'
                />
            }

        </div >
    );
}
