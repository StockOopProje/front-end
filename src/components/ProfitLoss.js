import { ArrowBackIos } from "@mui/icons-material"
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab"
import {makeStyles} from "@mui/styles"
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Button, Card, Container, Grid, TextField } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

// services
import ZreportService from "../services/zreport"


const useStyles = makeStyles({
    logo:{
        textAlign:"center",
        color:"white"
    },
    card:{
        margin:"10px 0",
    },
    icon:{
        height:"100%",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    }
})

const ProfitLoss = ()=>{

    const navigate = useNavigate()
    const classes = useStyles()
    const [values,setValues] = useState({start:new Date(),finish:new Date()})
    const [profitByDates,setProfitByDates] = useState({profit:0,purchases:[],sales:[]})
    const [daily,setDaily] = useState({profit:0})
    const [monthly,setMonthly] = useState({profit:0})

    const handleChange = (e)=>{
        const {name,value} = e.target
        setValues(prevValue=>{
            if(name === "start"){
                return ({...prevValue,start:value})
            }
            else if(name === "finish"){
                return ({...prevValue,finish:value})
            }
            
        })
    }

    useEffect(()=>{
        ZreportService.displayZReportDaily(new Date()).then(res=>{
            setDaily(res.data.data)
        })

        ZreportService.displayZReportMonthly(new Date()).then(res=>{
            setMonthly(res.data.data)
        })
    },[])

    const getByDates = ()=>{
        ZreportService.displayZReportByDates(values).then(res=>{
            setProfitByDates(res.data.data)
        })
    }

    return(
        <>
            <Button onClick={()=>navigate("/")}>
                <ArrowBackIos/>
                Back
            </Button>
            <Container>
                <h1>Profit Loss</h1>
                <Grid container spacing={2} sx={{p:1}}>
                    <Grid item xs={6}>
                        <Card sx={{p:2}}>
                            <h6>Daily</h6>
                            <h1>{daily.profit}$</h1>

                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card sx={{p:2}}>
                            <h6>Monthly</h6>
                            <h1>{monthly.profit}$</h1>
                        </Card>
                    </Grid>
                </Grid>
                <h2>Get Profit Loss by Date</h2>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                        label="Start Date"
                        inputFormat="MM/dd/yyyy"
                        value={values.start}
                        onChange={(value)=>handleChange({target:{name:"start",value}})}
                        renderInput={(params) => <TextField sx={{m:1}} {...params} />}
                    />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                        label="Finish Date"
                        inputFormat="MM/dd/yyyy"
                        value={values.finish}
                        onChange={(value)=>handleChange({target:{name:"finish",value}})}
                        renderInput={(params) => <TextField sx={{m:1}} {...params} />}
                    />
                </LocalizationProvider>
                <Button variant="contained" color="info" sx={{m:2}} onClick={getByDates}>Get</Button>
                <Grid container spacing={2} sx={{p:1}}>
                    <Grid item xs={4}>
                        <Card sx={{p:2}}>
                            <h6>Daily</h6>
                            <h1>{profitByDates.profit}$</h1>

                        </Card>
                    </Grid>
                </Grid>
                <h3>Purchases</h3>
                <Grid container spacing={2} sx={{p:1}}>
                    <Grid item xs={2}>
                        Product Name
                    </Grid>
                    <Grid item xs={2}>
                        Vendor Name
                    </Grid>
                    <Grid item xs={2}>
                        Purchase Quantity
                    </Grid>
                    <Grid item xs={2}>
                        Purchase Date
                    </Grid>
                    <Grid item xs={2}>
                        Purchase Price
                    </Grid>
                </Grid>
                {profitByDates.purchases.map(item=>(
                    <Card className={classes.card} key={item.id}>
                        <Grid container spacing={2} sx={{p:1}}>
                            <Grid item xs={2}>
                                {item.product.name}
                            </Grid>
                            <Grid item xs={2}>
                                {item.vendor.name}
                            </Grid>
                            <Grid item xs={2}>
                                {item.quantity}
                            </Grid>
                            <Grid item xs={2}>
                                {new Date(item.date).toDateString()}
                            </Grid>
                            <Grid item xs={2}>
                                {item.price}
                            </Grid>
                        </Grid>
                    </Card>
                ))}
                <h3>Sales</h3>
                <Grid container spacing={2} sx={{p:1}}>
                    <Grid item xs={2}>
                        Product Name
                    </Grid>
                    <Grid item xs={2}>
                        Customer Name
                    </Grid>
                    <Grid item xs={2}>
                        Sale Quantity
                    </Grid>
                    <Grid item xs={2}>
                        Sale Date
                    </Grid>
                    <Grid item xs={2}>
                        Sale Price
                    </Grid>
                </Grid>
                {profitByDates.sales.map(item=>(
                    <Card className={classes.card} key={item.id}>
                        <Grid container spacing={2} sx={{p:1}}>
                            <Grid item xs={2}>
                                {item.product.name}
                            </Grid>
                            <Grid item xs={2}>
                                {item.customer.name}
                            </Grid>
                            <Grid item xs={2}>
                                {item.quantity}
                            </Grid>
                            <Grid item xs={2}>
                                {new Date(item.date).toDateString()}
                            </Grid>
                            <Grid item xs={2}>
                                {item.price}
                            </Grid>
                        </Grid>
                    </Card>
                ))}
            </Container>
        </>
    )
}

export default ProfitLoss