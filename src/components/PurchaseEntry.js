import React, { useEffect, useState } from "react"
import { Container,FormControl,InputLabel,OutlinedInput,TextField,MenuItem, Button,InputAdornment,Snackbar,Alert,CircularProgress } from "@mui/material"
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {makeStyles} from "@mui/styles"

// services
import ProductService from "../services/product"
import VendorService from "../services/vendor"
import PurchaseService from "../services/purchase"


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


const PurchaseEntry = ()=>{

    const classes = useStyles()
    const [progress,setProgress] = useState(0)
    const [values,setValues] = useState({product:{},vendor:{},date:new Date(),quantity:0,price:0})
    const [products,setProducts] = useState([])
    const [vendors,setVendors] = useState([])

    useEffect(()=>{
        ProductService.getAll().then(res=>{
            setProducts(res.data)
            setValues(prevValue=>({...prevValue,product:res.data[0]}))
        })
        VendorService.getAll().then(res=>{
            setVendors(res.data)
            setValues(prevValue=>({...prevValue,vendor:res.data[0]}))
        })
    },[])

    const handleChange=(e)=>{
        const {name,value} = e.target
        setValues(prevValue=>{
            if(name === "product"){
                return ({...prevValue,product:value})
            }
            else if(name === "vendor"){
                return ({...prevValue,vendor:value})
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
        PurchaseService.purchaseProduct(values)
        .then(item=>{
            setProgress(2)
        })
        .catch(err=>{
            setProgress(0)
            console.log(err)
        })
    }

    return(
    <>
        <Snackbar
                open={progress===2}
                autoHideDuration={5000}
                onClose={()=>setProgress(0)}
            >
                <Alert onClose={()=>setProgress(0)} severity="success">Purchase entry taked!</Alert>
        </Snackbar>
        <Container>
            <h1>Purchase Entry</h1>
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
                label="Vendor Name"
                value={values.vendor}
                name="vendor"
                onChange={handleChange}
                >
                {vendors.map((option) => (
                    <MenuItem key={option.id} value={option}>
                    {option.name}
                    </MenuItem>
                ))}
            </TextField>
            <FormControl fullWidth sx={{ m: 2 }}>
                <InputLabel htmlFor="outlined-adornment-amount">Purchase Quantity</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    name="quantity"
                    value={values.quantity}
                    onChange={handleChange}
                    label="Purchase Quantity"
                    startAdornment={<InputAdornment position="start">-</InputAdornment>}
                />
            </FormControl>
            <div className={classes.date}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                        label="Purchase Date"
                        inputFormat="MM/dd/yyyy"
                        value={values.date}
                        onChange={(value)=>handleChange({target:{name:"date",value}})}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </div>
            <FormControl fullWidth sx={{ m: 2 }}>
                <InputLabel htmlFor="outlined-adornment-amount">Purchase Price</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    name="price"
                    value={values.price}
                    onChange={handleChange}
                    label="Purchase Price"
                    startAdornment={<InputAdornment position="start">-</InputAdornment>}
                />
            </FormControl>
            <div className={classes.btnDiv}>
                <Button variant="contained" className={classes.btn} onClick={submit}>
                    {progress === 1 ? <CircularProgress size={26} />:"Submit"}
                </Button>
            </div>
        </Container>
    </>
    )
}

export default PurchaseEntry