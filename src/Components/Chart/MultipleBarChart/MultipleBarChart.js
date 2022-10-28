import React, { useState, useEffect, useRef } from 'react'
import { Bar } from "react-chartjs-2";
import 'chartjs-plugin-dragdata'
import ReactToPrint from 'react-to-print';
import '../../../App.css'
import { BiCloudDownload } from "react-icons/bi";
import { useLocation, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import { DataPassDekhi } from '../ChartDatapass';
import { Settime } from '../Settimecontrol';
import { DeleteData, GetData, PostData } from '../BackendDatahendel';
import SubmitAndDatashow from '../SubmitAndDatashow';
import ShareData from '../ShareData';
import io from 'socket.io-client';

const socket = io("http://localhost:5000")


export default function MultipleBarChart({userIdentify}) {
    const [Delete, setDelete] = useState()
    const pathlocation = "multipleBar"
    const [user] = useAuthState(auth)
    const ref = useRef()
    const pathnme = useLocation()
    var [counter, setCounter] = useState(0)
    const [Data, setData] = useState([])
    const [back, setback] = useState({})
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
                            const id = DataPassDekhi[index]._id
                            if (id) {
                                fetch(` http://localhost:5000/api/v1/grap/multipleBar/${id}`, {
                                    method: 'PATCH',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({ value: value, datasetIndex: datasetIndex }),
                                })
                                    .then((response) => response.json())
                                    .then((data) => {
                                        if (data) {
                                            setback({ index, datasetIndex, value, id })
                                            return setTimeout(() => {
                                                socket.emit('store_data')
                                            }, 1000);
                                        }
                                    })
                            }

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
        const label = e.target.names.value;
        const yValue = e.target.number.value;
        const xValue = e.target.number2.value;
        if (label && yValue && xValue) {
            const Data = { label: label, yValue: yValue, xValue: xValue }
            PostData(pathlocation, userIdentify, Data, setdataisLoaded, dataisLoaded, e)
            socket.emit('store_data')
        }
        e.preventDefault()
    }
    /* ===================== Data grt =========  */
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
    }, [socket, user, counter, dataisLoaded, back?.index, back?.value, back?.id, back.datasetIndex])
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
                        <SubmitAndDatashow pathnme={pathnme} pathLocation={'multipleBarChart'} Data={Data} setDelete={setDelete} submitPost={submitPost} />

                    }
                    <div className='relative  w-full bg-white mt-8 md:p-5 p-1 mb-10 md:my-0 md:mt-10 rounded-md shadow-md'>
                        {isLoaded && <div  ref={ref}>
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
                                <ShareData userIdentify={userIdentify} pathLocation={'multipleBarChart'} />
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
