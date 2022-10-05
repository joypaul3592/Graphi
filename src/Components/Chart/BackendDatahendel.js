import { ChartDatapass, DataPassDekhi } from "./ChartDatapass"

const PostData = (pathlocation, userIdentify, Data, setdataisLoaded, dataisLoaded, e) => {
    fetch(`http://localhost:5000/api/v1/grap/${pathlocation}/?user=${userIdentify}`, {
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
                e.target.names.value = ''
                e.target.number.value = ''
                if (data.xValue) {
                    e.target.number2.value = ''
                }
            }
        })
}
const GetData = (pathlocation, userIdentify, setData) => {
    fetch(`http://localhost:5000/api/v1/grap/${pathlocation}/?user=${userIdentify}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then((response) => response.json())
        .then((data) => {
            ChartDatapass(data?.data)
            return setData(data?.data)
        })
}
const UpdateData = (index, pathlocation, value, setback) => {
    const id = DataPassDekhi[index]._id
    if (id) {
        fetch(`http://localhost:5000/api/v1/grap/${pathlocation}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ value: value }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    setback({ index, value, id })
                }
            })
    }
}
const DeleteData = (Delete, pathlocation, dataisLoaded, setdataisLoaded) => {
    const id = Delete;
    if (id) {
        fetch(`http://localhost:5000/api/v1/grap/${pathlocation}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    setdataisLoaded(true)
                }
            })
    }
}



export { GetData, DeleteData, PostData, UpdateData }