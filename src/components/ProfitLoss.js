import React, { useEffect } from "react"

// services
import ZreportService from "../services/zreport"

const ProfitLoss = ()=>{

    useEffect(()=>{
        ZreportService.displayZReportDaily(new Date()).then(res=>{
            console.log(res.data)
        })

        ZreportService.displayZReportMonthly(new Date()).then(res=>{
            console.log(res.data)
        })
    },[])

    return(
        <div>
            ProfitLoss
        </div>
    )
}

export default ProfitLoss