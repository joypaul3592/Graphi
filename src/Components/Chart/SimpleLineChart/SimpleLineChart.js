import React, { useState, useEffect, useRef } from 'react'
import { Line } from "react-chartjs-2";
import 'chartjs-plugin-dragdata'
import ReactToPrint from 'react-to-print';
import { BiCloudDownload } from "react-icons/bi";
import '../../../App.css'
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { useLocation } from 'react-router-dom';
import { Settime } from '../Settimecontrol';
import { DeleteData, GetData, PostData, UpdateData } from '../BackendDatahendel';
import ShareData from '../ShareData';
import SubmitAndDatashow from '../SubmitAndDatashow';
import io from 'socket.io-client';
const socket = io("https://blooming-meadow-86067.herokuapp.com")
export default function SimpleLineChart({userIdentify}) {
    const [Delete, setDelete] = useState()
    const pathlocation = "simpleLine";
    const ref = useRef()
    const [Data, setData] = useState([])
    var [counter, setCounter] = useState(0)
    const [dataisLoaded, setdataisLoaded] = useState(false)
    const [back, setback] = useState({})
    const [user] = useAuthState(auth)
    const pathnme = useLocation()
    const [shouldRedraw] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);


    const buildDataSet = (data) => {
        let labels = data?.map(c => c.label);
        var options = {
            type: labels,
            data: {
                labels: labels,
                borderColor: "#fffff",
                datasets: [{
                    label: 'Graph',
                    yAxisID: 'y',
                    borderColor: 'rgb(75, 192, 192)',
                    data: data?.map(c => c.yValue),
                    pointHitRadius: 25
                }]
            },
            backgroundColor: "rgba(75,99,132)",
            options: {
                scales: {
                    y: {
                        max: 500,
                        type: 'linear',
                        position: 'left',
                        min: 0
                    },
                    y2: {
                        max: 500,
                        type: 'linear',
                        position: 'right',
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
                            AutoDataHandel(index, value)
                            e.target.style.cursor = 'default'

                        },
                    }
                }
            }
        }
        return options;
    }


    let localOption = buildDataSet(Data);


    /* ===================== Data Post =========  */

    const submitPost = (e) => {
        e.preventDefault()
        const label = e.target.names.value;
        const yValue = e.target.number.value;
        if (label && yValue) {
            const Data = { label: label, yValue: yValue }
            PostData(pathlocation, userIdentify, Data, setdataisLoaded, dataisLoaded, e)
            socket.emit('store_data')
        }
    }
    /* ===================== Data grt =========  */
    useEffect(() => {
        if (userIdentify) {
            socket.on("get_data", () => {
                GetData(pathlocation, userIdentify, setData, setCounter)
            })
            GetData(pathlocation, userIdentify, setData, setCounter)
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
                        <SubmitAndDatashow pathnme={pathnme} pathLocation={'simpleLineChart'} Data={Data} setDelete={setDelete} submitPost={submitPost} />

                    }
                    <div  className='relative  w-full bg-white mt-8 md:p-5 p-1 mb-10 md:my-0 md:mt-10 rounded-md shadow-md'>
                        {isLoaded && <div ref={ref}>
                            <Line
                                redraw={shouldRedraw}
                                data={localOption.data}
                                options={localOption.options}
                                plugins={localOption.plugins}
                                fillStyle='lightGreen'
                            />
                        </div>
                        }
                        {/* =================== copy and share link and Download ===================== */}
                        {/* =================== copy and share link and Download ===================== */}
                        {
                            (user || pathnme?.search) && <div>
                                <ShareData userIdentify={userIdentify} pathLocation={'simpleLineChart'} />
                                <div>
                                    <ReactToPrint
                                        trigger={() => <button className='absolute left-10 -top-0 '><BiCloudDownload /></button>}
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
