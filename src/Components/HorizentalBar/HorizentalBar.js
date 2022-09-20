import React, { useState, useEffect } from 'react'
import { Bar, Line } from "react-chartjs-2";
import 'chartjs-plugin-dragdata'


export default function HorizentalBar(props) {
    const [shouldRedraw] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);


    const buildDataSet = () => {

        var options = {
            type: 'bar',
            data: {
                labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
                datasets: [
                    {
                        label: "Population (millions)",
                        backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                        data: [2478, 5267, 734, 784, 433]
                    }
                ]
            },
            options: {
                indexAxis: 'y',
                onHover: function (e) {
                    const point = e.chart.getElementsAtEventForMode(e, 'nearest', { intersect: true }, false)
                    if (point.length) e.native.target.style.cursor = 'grab'
                    else e.native.target.style.cursor = 'default'
                },
                plugins: {
                    dragData: {
                        round: 1,
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
                },
                scales: {
                    x: {
                        max: 6000,
                        min: 0
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
                <Bar
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
