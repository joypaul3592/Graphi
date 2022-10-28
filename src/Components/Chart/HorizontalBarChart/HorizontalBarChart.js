import React, { useState, useEffect, useRef } from 'react'
import { Bar } from "react-chartjs-2";
import 'chartjs-plugin-dragdata'
import ReactToPrint from 'react-to-print';
import '../../../App.css';
import { BiCloudDownload } from "react-icons/bi";
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { Settime } from '../Settimecontrol';
import { DeleteData, GetData, PostData, UpdateData } from '../BackendDatahendel';
import ShareData from '../ShareData';
import SubmitAndDatashow from '../SubmitAndDatashow';

import io from 'socket.io-client';

const socket = io("https://blooming-meadow-86067.herokuapp.com")

export default function HorizentalBar({userIdentify}) {

    const [Delete, setDelete] = useState()
    const [user] = useAuthState(auth)
    const ref = useRef()
    const [Data, setData] = useState([])
    var [counter, setCounter] = useState(0)
    const [dataisLoaded, setdataisLoaded] = useState(false)
    const [back, setback] = useState({})
    const pathnme = useLocation()
    const [shouldRedraw] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const pathlocation = 'horizentalBar'


    const buildDataSet = (data) => {
        let labels = data?.map(c => c.label);
        var options = {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "Graph",
                        backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                        data: data?.map(c => c?.yValue),
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
                        },
                        onDrag: function (e, datasetIndex, index, value) {
                            e.target.style.cursor = 'grabbing'
                        },
                        onDragEnd: function (e, datasetIndex, index, value) {
                            AutoUpdateData(index, value)
                            e.target.style.cursor = 'default'
                        },
                    }
                },
                scales: {
                    x: {
                        min: 0,
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
                GetData(pathlocation, userIdentify, setData, setDelete)
            })
            GetData(pathlocation, userIdentify, setData, setDelete)
        }
        return () => {
            socket.off("get_data")
        }
    }, [socket, user, counter, dataisLoaded, back?.index, back?.value, back?.id])
    /* ===================== update data  =========  */
    const AutoUpdateData = (index, value) => {
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
                        <SubmitAndDatashow pathnme={pathnme} pathLocation={'horizontalBarChart'} Data={Data} setDelete={setDelete} submitPost={submitPost} />

                    }
                    <div ref={ref} className=' relative  w-full bg-white mt-8 md:p-5 p-1 mb-10 md:my-0 md:mt-10 rounded-md shadow-md'>
                        {isLoaded && <div ref={ref}>
                            <Bar
                                redraw={shouldRedraw}
                                data={localOption.data}
                                options={localOption.options}
                                plugins={localOption.plugins}
                                fillStyle='lightGreen'
                            />
                        </div>


                        }

                        {/* =================== copy and share link and Download ===================== */}
                        {
                            (user || pathnme?.search) && <div>
                                <ShareData userIdentify={userIdentify} pathLocation={'horizontalBarChart'} />
                                <div>
                                    <ReactToPrint
                                        trigger={() => <button className='absolute left-10 -top-0 '><BiCloudDownload /></button>}
                                        content={() => ref.current}
                                    />
                                </div>
                            </div>
                        }
                    </div >
                </div>



            </div>

        </div>
    );
}


