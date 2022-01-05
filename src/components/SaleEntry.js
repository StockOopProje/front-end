import React, { useEffect, useState } from "react"
import { Container,FormControl,InputLabel,OutlinedInput,TextField,MenuItem, Button,InputAdornment,Snackbar,Alert,CircularProgress } from "@mui/material"
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {makeStyles} from "@mui/styles"

// services
import ProductService from "../services/product"
import CustomerService from "../services/customer"
import SaleService from "../services/sale"


const useStyles = makeStyles({
    date:{
        "& > div":{
            margin:"1em",
            width:"100%",
        }
    },
    btnDiv:{
        display:"flex",
        justifyContent:"flex-end",
        margin:"1em",
        width:"100%"

    },
    btn:{
        borderRadius:"10em!important",
        backgroundColor:"black!important",
        width:"100px!important",
        height:"45px!important",
        "&:hover":{
            opacity:0.7
        }
    }
})


const SaleEntry = ()=>{

    const classes = useStyles()
    const [progress,setProgress] = useState(0)
    const [values,setValues] = useState({product:{},customer:{},date:new Date(),quantity:0,price:0})
    const [products,setProducts] = useState([])
    const [customers,setCustomers] = useState([])

    useEffect(()=>{
        ProductService.getAll().then(res=>{
            setProducts(res.data)
            setValues(prevValue=>({...prevValue,product:res.data[0]}))
        })
        CustomerService.getAll().then(res=>{
            setCustomers(res.data)
            setValues(prevValue=>({...prevValue,customer:res.data[0]}))
        })
    },[])

    const handleChange=(e)=>{
        const {name,value} = e.target
        setValues(prevValue=>{
            if(name === "product"){
                return ({...prevValue,product:value})
            }
            else if(name === "customer"){
                return ({...prevValue,customer:value})
            }
            else if(name === "date"){
                return ({...prevValue,date:value})
            }
            else if(name === "quantity"){
                return ({...prevValue,quantity:Number(value) || value === "" ? Number(value) : prevValue.quantity})
            }
            else if(name === "price"){
                return ({...prevValue,price:Number(value) || value === "" ? Number(value) : prevValue.price})
            }
            
        })
    }

    const submit = ()=>{
        setProgress(1)
        SaleService.saleProduct(values)
        .then(res=>{
            if(res.data.success){
                if (res.data.message)
                    setProgress(4);
                else
                    setProgress(2)
            }
            else{
                setProgress(3)
            }
        })
        .catch(err=>{
            setProgress(0)
        })
    }

    return(
    <>
        <Snackbar
                open={progress===2}
                autoHideDuration={1000}
                onClose={()=>setProgress(0)}
            >
                <Alert onClose={()=>setProgress(0)} severity="success">Sale entry taken!</Alert>
        </Snackbar>
        <Snackbar
                open={progress===3}
                autoHideDuration={1000}
                onClose={()=>setProgress(0)}
            >
                <Alert onClose={()=>setProgress(0)} severity="error">Not enough stock!</Alert>
        </Snackbar>
        <Snackbar
            open={progress===4}
            autoHideDuration={1000}
            onClose={()=>setProgress(0)}
        >
            <Alert onClose={()=>setProgress(0)} severity="warning">Minimum stock limit has reached.</Alert>
        </Snackbar>
        <Container>
            <h1>Sale Entry</h1>
            <TextField
                id="outlined-select-currency"
                sx={{ m: 2 }}
                fullWidth
                select
                label="Product Name"
                value={values.product}
                name="product"
                onChange={handleChange}
                >
                {products.map((option) => (
                    <MenuItem key={option.id} value={option}>
                    {option.name}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                id="outlined-select-currency"
                sx={{ m: 2 }}
                fullWidth
                select
                label="Customer Name"
                value={values.customer}
                name="customer"
                onChange={handleChange}
                >
                {customers.map((option) => (
                    <MenuItem key={option.id} value={option}>
                    {option.name}
                    </MenuItem>
                ))}
            </TextField>
            <FormControl fullWidth sx={{ m: 2 }}>
                <InputLabel htmlFor="outlined-adornment-amount">Sale Quantity</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    name="quantity"
                    value={values.quantity}
                    onChange={handleChange}
                    label="Sale Quantity"
                    startAdornment={<InputAdornment position="start">-</InputAdornment>}
                />
            </FormControl>
            <div className={classes.date}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                        label="Sale Date"
                        inputFormat="MM/dd/yyyy"
                        value={values.date}
                        onChange={(value)=>handleChange({target:{name:"date",value}})}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </div>
            <FormControl fullWidth sx={{ m: 2 }}>
                <InputLabel htmlFor="outlined-adornment-amount">Sale Price</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    name="price"
                    value={values.price}
                    onChange={handleChange}
                    label="Sale Price"
                    startAdornment={<InputAdornment position="start">-</InputAdornment>}
                />
            </FormControl>
            <div className={classes.btnDiv}>
                <Button variant="contained" disabled={progress === 1} className={classes.btn} onClick={submit}>
                    {progress === 1 ? <CircularProgress color="primary" size={26} />:"Submit"}
                </Button>
            </div>
        </Container>
    </>
    )
}

export default SaleEntry