import React, { useState, useEffect, useRef } from 'react'
import { Bar, Line } from "react-chartjs-2";
import 'chartjs-plugin-dragdata'
import ReactToPrint from 'react-to-print';
import '../../../App.css'
import { BiCloudDownload } from "react-icons/bi";
import auth from '../../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useLocation } from 'react-router-dom';
import { Settime } from '../Settimecontrol';
import { DeleteData, GetData, PostData, UpdateData } from '../BackendDatahendel';
import SubmitAndDatashow from '../SubmitAndDatashow';
import ShareData from '../ShareData';

export default function SimpleLineChart2() {
    var userIdentify;
    const [Delete, setDelete] = useState()
    const pathlocation = "dualLine";
    const ref = useRef()
    var [counter, setCounter] = useState(0)
    const [Data, setData] = useState([])
    const [dataisLoaded, setdataisLoaded] = useState(false)
    const [back, setback] = useState({})
    const [user] = useAuthState(auth)
    const pathnme = useLocation()
    const [shouldRedraw] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
 
    if (pathnme?.search) {
        userIdentify = pathnme.search.slice(6, 10000)
    }
    else if (user?.email) {
        userIdentify = user?.email
    }

    const buildDataSet = (data) => {
        // console.log(data, value, index)
        let labels = data?.map(c => c.label);
        var options = {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Graph',
                    data: data?.map(c => c.yValue),
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
                            AutoDataHandel(index, value)
                            e.target.style.cursor = 'default'
                        }

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
        }

    }

    useEffect(() => {
        if (userIdentify) {
            GetData(pathlocation, userIdentify, setData, setDelete)
        }

    }, [user, counter, dataisLoaded, back?.index, back?.value, back?.id])

    const AutoDataHandel = (index, value) => {
        UpdateData(index, pathlocation, value, setback)
    }
    /* ===================== Data Delete =========  */
    if (Delete) {
        DeleteData(Delete, pathlocation, counter, setCounter)
    }

    useEffect(() => {
        Settime(setIsLoaded)
    }, [])
    return (
        <div className=' h-full flex justify-center items-center'>
            <div className='   mx-10 w-10/12 '>

                <div className=' w-full'>
                    {
                        <SubmitAndDatashow pathnme={pathnme} pathLocation={'dualLineChart'} Data={Data} setDelete={setDelete} submitPost={submitPost} />

                    }
                    <div ref={ref} className=' relative  w-full bg-white mt-8 md:p-5 p-1 mb-10 md:my-0 md:mt-10 rounded-md shadow-md'>
                        {isLoaded &&
                            <Line
                                redraw={shouldRedraw}
                                data={localOption.data}
                                options={localOption.options}
                                plugins={localOption.plugins}
                                fillStyle='lightGreen'
                            />
                        }
                        {/* =================== copy and share link and Download ===================== */}
                        {
                            (user || pathnme?.search) && <div>
                                <ShareData userIdentify={userIdentify} pathLocation={'dualLineChart'} />
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

