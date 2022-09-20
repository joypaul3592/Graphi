import React, { useEffect, useState } from 'react'
import Chart from "react-apexcharts";
const PieChart = () => {

    const [stdudentSubject, setStudentsubject] = useState([]);
    const [studentMarks, setStudentMarks] = useState([]);

    useEffect(() => {
        const sSubject = [];
        const sMarks = [];
        const getStudentdata = async () => {
            const reqData = await fetch("marks.json");
            const resData = await reqData.json();
            for (let i = 0; i < resData.length; i++) {
                sSubject.push(resData[i].subject);
                sMarks.push(parseInt(resData[i].marks));
            }
            setStudentsubject(sSubject);
            setStudentMarks(sMarks);
            //console.log(resData); 
        }

        getStudentdata();

    }, []);
    return (
        <div>
            <React.Fragment>
                <div className="container-fluid mb-3">
                    <h3 className="mt-3 text-red-500">How Much Water Do We Use?</h3>
                    <Chart
                        type="pie"
                        width={1349}
                        height={550}
                        series={studentMarks}

                        options={{
                            noData: { text: "Empty Data" },
                            // colors:["#f90000","#f0f"],
                            labels: stdudentSubject

                        }}
                    >
                    </Chart>
                </div>
            </React.Fragment>
        </div>
    )
}

export default PieChart;