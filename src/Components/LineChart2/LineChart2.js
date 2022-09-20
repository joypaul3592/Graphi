import React, { useState, useEffect } from 'react'
import { Bar, Line } from "react-chartjs-2";
import 'chartjs-plugin-dragdata'


export default function LineChart2(props) {
    const [shouldRedraw] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);


    const buildDataSet = () => {

        var options = {
            type: 'line',
            data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [{
                    label: '# Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    // borderColor: 'rgb(75, 192, 192)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 1,
                    pointHitRadius: 25,
                }
                ]
            },
            options: {
                scales: {
                    y: {
                        min: 0,
                        max: 20
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
                        onDragStart: function (e, datasetIndex, index, value) {
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
