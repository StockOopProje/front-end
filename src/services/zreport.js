import axios from "axios"

const url = process.env.REACT_APP_API_URL+"zreport/" 

const displayZReportDaily = async (date) =>{
    return axios.post(url+"displayZReportDaily",date)
}

const displayZReportMonthly = async (date)=>{
    return axios.post(url+"displayZReportMonthly",date)
}

const displayZReportByDates = async (values)=>{
    return axios.post(url+"displayZReportByDates",values)
}

const service = {displayZReportDaily,displayZReportMonthly,displayZReportByDates}

export default service