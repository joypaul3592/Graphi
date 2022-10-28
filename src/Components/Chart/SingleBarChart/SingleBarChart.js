import React, { useState, useEffect, useRef } from 'react'
import { Bar } from "react-chartjs-2";
import ReactToPrint from 'react-to-print';
import 'chartjs-plugin-dragdata'
import '../../../App.css'
import { BiCloudDownload } from "react-icons/bi";
import { useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import ShareData from '../ShareData';
import { DeleteData, GetData, PostData, UpdateData } from '../BackendDatahendel';
import { Settime } from '../Settimecontrol';
import SubmitAndDatashow from '../SubmitAndDatashow';

import io from 'socket.io-client';
const socket = io("http://localhost:5000")

export default function BarChart2({userIdentify }) {
    
    const [Delete, setDelete] = useState(0)
    const [user] = useAuthState(auth)
    const ref = useRef();
    const pathnme = useLocation()
    const [Data, setData] = useState([])
    const [back, setback] = useState({})
    const [dataisLoaded, setdataisLoaded] = useState(false)
    const [shouldRedraw] = useState(false);
    const [counter, setCounter] = useState(0)
    const [isLoaded, setIsLoaded] = useState(false);
    const pathlocation = 'singleBar'
   
    const BuildDataSet = ({ datas }) => {
        let labels = datas?.map(c => c?.label);
        let maxValues = datas?.map(c => c?.yValue);
        // var maxValue = 0;
        // if (datas) {
        //     maxValue = Math.floor(Math.max(...maxValues));
        // }

        let options = {
            type: 'line',
            exportEnabled: true,
            theme: "light1",
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Graph',
                        data: datas?.map(c => c?.yValue),
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
                            AutoDataHandel(index, value)
                            e.target.style.cursor = 'default'


                        },
                    }
                }
            }
        }

        return options;
    }
    let localOption = BuildDataSet({ datas: Data });

    /* ===================== Data Post =========  */
    const submitPost = (e) => {
        e.preventDefault()
        const label = e.target.names.value;
        const yValue = parseFloat(e.target.number.value);
        if (label && yValue) {
            const Data = { label: label, yValue: yValue }
            PostData(pathlocation, userIdentify, Data, setdataisLoaded, dataisLoaded, e)
            socket.emit('store_data')
        }
    }

    /* ===================== Data get =========  */
    useEffect(() => {
        if (userIdentify) {
            socket.on("get_data", () => {
                GetData(pathlocation, userIdentify, setData, setDelete)
            })
            GetData(pathlocation, userIdentify, setData, setDelete)
        }
        return () => {
            socket.off("get_data")
        }
    }, [socket, user, counter, dataisLoaded, back?.index, back?.value, back?.id])


    const AutoDataHandel = (index, value) => {
        UpdateData(index, pathlocation, value, setback)
        return setTimeout(() => {
            socket.emit('store_data')
        }, 1000);
    }
    /* ===================== Data Delete =========  */
    if (Delete) {
        DeleteData(Delete, pathlocation, counter, setCounter)
        socket.emit('store_data')
    }

    useEffect(() => {
        Settime(setIsLoaded)
    }, [])

    return (
        <div className=' h-full flex justify-center items-center'>
            <div className='   mx-10 w-10/12 '>
                <div className=' w-full'>
                    {
                        <SubmitAndDatashow pathnme={pathnme} pathLocation={'SingleBarChart'} Data={Data} setDelete={setDelete} submitPost={submitPost} />

                    }

                    <div className='relative  w-full bg-white mt-8 md:p-5 p-1 mb-10 md:my-0 md:mt-10 rounded-md shadow-md'>
                        {isLoaded && <div ref={ref}>
                            <Bar
                                redraw={shouldRedraw}
                                data={localOption.data}
                                options={localOption.options}
                                plugins={localOption.plugins}
                            />
                        </div>

                        }
                        {/* =================== copy and share link and Download ===================== */}
                        {
                            (user || pathnme?.search) && <div>
                                <ShareData userIdentify={userIdentify} pathLocation={'SingleBarChart'}  />
                                <div>
                                    <ReactToPrint
                                        trigger={() => <button className='absolute  left-10 -top-0 '><BiCloudDownload /></button>}
                                        content={() => ref.current}
                                    />
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
