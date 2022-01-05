import React, { useState } from "react"
import { Container,FormControl,InputLabel,OutlinedInput,TextField,MenuItem, Button,InputAdornment,Snackbar,Alert,CircularProgress } from "@mui/material"
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {makeStyles} from "@mui/styles"

// services
import ProductService from "../services/product"


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

const types = ["Food","Fashion","Book","Electronic","Clothing","ShoeAccessory","Other","Furniture"]

const ProductEntry = ()=>{

    const classes = useStyles()
    const [progress,setProgress] = useState(0)
    const [values,setValues] = useState({
        product_type:"Food",
        name:"",
        min_quantity:0,
        stock_quantity:0,
        barcode:"",
        description:"",
        pages:0,
        author:"",
        genre:"",
        fabric_type:"",
        warranty:new Date(),
        area_of_usage:"",
        type:"",
        gender:"",
        size:"",
        concept:"",
        unit:"",
        weight:0.0,
        expiration_date:new Date(),
        production_date:new Date(),
        quantity:0.0
    })

    const handleChange=(e)=>{
        const {name,value} = e.target
        setValues(prevValue=>{
            if(name === "product_type"){
                return ({...prevValue,product_type:value})
            }
            else if(name === "name"){
                return ({...prevValue,name:value})
            }
            else if(name === "min_quantity"){
                return ({...prevValue,min_quantity:Number(value) || value === "" ? Number(value) : prevValue.min_quantity})
            }
            else if(name === "stock_quantity"){
                return ({...prevValue,stock_quantity:Number(value) || value === "" ? Number(value) : prevValue.stock_quantity})
            }
            else if(name === "barcode"){
                return ({...prevValue,barcode:value})
            }
            else if(name === "description"){
                return ({...prevValue,description:value})
            }
            else if(name === "pages"){
                return ({...prevValue,pages:Number(value) || value === "" ? Number(value) : prevValue.pages})
            }
            else if(name === "author"){
                return ({...prevValue,author:value})
            }
            else if(name === "genre"){
                return ({...prevValue,genre:value})
            }
            else if(name === "fabric_type"){
                return ({...prevValue,fabric_type:value})
            }
            else if(name === "warranty"){
                return ({...prevValue,warranty:value})
            }
            else if(name === "area_of_usage"){
                return ({...prevValue,area_of_usage:value})
            }
            else if(name === "type"){
                return ({...prevValue,type:value})
            }
            else if(name === "gender"){
                return ({...prevValue,gender:value})
            }
            else if(name === "size"){
                return ({...prevValue,size:value})
            }
            else if(name === "concept"){
                return ({...prevValue,concept:value})
            }
            else if(name === "unit"){
                return ({...prevValue,unit:value})
            }
            else if(name === "weight"){
                return ({...prevValue,weight:Number(value) || value === "" ? Number(value) : prevValue.weight})
            }
            else if(name === "expiration_date"){
                return ({...prevValue,expiration_date:value})
            }
            else if(name === "production_date"){
                return ({...prevValue,production_date:value})
            }
            else if(name === "quantity"){
                return ({...prevValue,quantity:Number(value) || value === "" ? Number(value) : prevValue.quantity})
            }
            
        })
    }

    const submit = ()=>{
        setProgress(1)
        ProductService.addProduct(values)
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
                <Alert onClose={()=>setProgress(0)} severity="success">Product entry taked!</Alert>
        </Snackbar>
        <Container>
            <h1>Product Entry</h1>
            <TextField
                id="outlined-select-currency"
                sx={{ m: 2 }}
                fullWidth
                select
                label="Type"
                value={values.product_type}
                name="product_type"
                onChange={handleChange}
                >
                {types.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </TextField>
            <FormControl fullWidth sx={{ m: 2 }}>
                <InputLabel htmlFor="outlined-adornment-amount">Name</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    label="Name"
                    startAdornment={<InputAdornment position="start">-</InputAdornment>}
                />
            </FormControl>
            <FormControl fullWidth sx={{ m: 2 }}>
                <InputLabel htmlFor="outlined-adornment-amount">Min Quantity</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    name="min_quantity"
                    value={values.min_quantity}
                    onChange={handleChange}
                    label="Min Quantity"
                    startAdornment={<InputAdornment position="start">-</InputAdornment>}
                />
            </FormControl>
            <FormControl fullWidth sx={{ m: 2 }}>
                <InputLabel htmlFor="outlined-adornment-amount">Stock Quantity</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    name="stock_quantity"
                    value={values.stock_quantity}
                    onChange={handleChange}
                    label="Stock Quantity"
                    startAdornment={<InputAdornment position="start">-</InputAdornment>}
                />
            </FormControl>
            <FormControl fullWidth sx={{ m: 2 }}>
                <InputLabel htmlFor="outlined-adornment-amount">Barcode</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    name="barcode"
                    value={values.barcode}
                    onChange={handleChange}
                    label="Barcode"
                    startAdornment={<InputAdornment position="start">-</InputAdornment>}
                />
            </FormControl>
            <FormControl fullWidth sx={{ m: 2 }}>
                <InputLabel htmlFor="outlined-adornment-amount">Description</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    label="Description"
                    startAdornment={<InputAdornment position="start">-</InputAdornment>}
                />
            </FormControl>
            {values.product_type === "Book" && <FormControl fullWidth sx={{ m: 2 }}>
                <InputLabel htmlFor="outlined-adornment-amount">Pages</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    name="pages"
                    value={values.pages}
                    onChange={handleChange}
                    label="Pages"
                    startAdornment={<InputAdornment position="start">-</InputAdornment>}
                />
            </FormControl>}
            {values.product_type === "Book" && <FormControl fullWidth sx={{ m: 2 }}>
                <InputLabel htmlFor="outlined-adornment-amount">Author</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    name="author"
                    value={values.author}
                    onChange={handleChange}
                    label="Author"
                    startAdornment={<InputAdornment position="start">-</InputAdornment>}
                />
            </FormControl>}
            {values.product_type === "Book" && <FormControl fullWidth sx={{ m: 2 }}>
                <InputLabel htmlFor="outlined-adornment-amount">Genre</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    name="genre"
                    value={values.genre}
                    onChange={handleChange}
                    label="Genre"
                    startAdornment={<InputAdornment position="start">-</InputAdornment>}
                />
            </FormControl>}
            {values.product_type === "Clothing" && <FormControl fullWidth sx={{ m: 2 }}>
                <InputLabel htmlFor="outlined-adornment-amount">Fabric Type</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    name="fabric_type"
                    value={values.fabric_type}
                    onChange={handleChange}
                    label="Fabric Type"
                    startAdornment={<InputAdornment position="start">-</InputAdornment>}
                />
            </FormControl>}
            {(values.product_type === "Electronic" || values.product_type === "Furniture") && <div className={classes.date}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                        label="Warranty"
                        inputFormat="MM/dd/yyyy"
                        value={values.warranty}
                        onChange={(value)=>handleChange({target:{name:"warranty",value}})}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </div>}
            {values.product_type === "Electronic" && <FormControl fullWidth sx={{ m: 2 }}>
                <InputLabel htmlFor="outlined-adornment-amount">Area of Usage</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    name="area_of_usage"
                    value={values.area_of_usage}
                    onChange={handleChange}
                    label="Area of Usage"
                    startAdornment={<InputAdornment position="start">-</InputAdornment>}
                />
            </FormControl>}
            {(values.product_type === "Electronic" || values.product_type === "Fashion") && <FormControl fullWidth sx={{ m: 2 }}>
                <InputLabel htmlFor="outlined-adornment-amount">Type</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    name="type"
                    value={values.type}
                    onChange={handleChange}
                    label="Type"
                    startAdornment={<InputAdornment position="start">-</InputAdornment>}
                />
            </FormControl>}
            {values.product_type === "Fashion" && <FormControl fullWidth sx={{ m: 2 }}>
                <InputLabel htmlFor="outlined-adornment-amount">Gender</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    name="gender"
                    value={values.gender}
                    onChange={handleChange}
                    label="Gender"
                    startAdornment={<InputAdornment position="start">-</InputAdornment>}
                />
            </FormControl>}
            {values.product_type === "Fashion" && <FormControl fullWidth sx={{ m: 2 }}>
                <InputLabel htmlFor="outlined-adornment-amount">Size</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    name="size"
                    value={values.size}
                    onChange={handleChange}
                    label="Size"
                    startAdornment={<InputAdornment position="start">-</InputAdornment>}
                />
            </FormControl>}
            {values.product_type === "Furniture" && <FormControl fullWidth sx={{ m: 2 }}>
                <InputLabel htmlFor="outlined-adornment-amount">Concept</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    name="concept"
                    value={values.concept}
                    onChange={handleChange}
                    label="Concept"
                    startAdornment={<InputAdornment position="start">-</InputAdornment>}
                />
            </FormControl>}
            {(values.product_type === "Furniture" || values.product_type === "Food") && <FormControl fullWidth sx={{ m: 2 }}>
                <InputLabel htmlFor="outlined-adornment-amount">Unit</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    name="unit"
                    value={values.unit}
                    onChange={handleChange}
                    label="Unit"
                    startAdornment={<InputAdornment position="start">-</InputAdornment>}
                />
            </FormControl>}
            {values.product_type === "Furniture" && <FormControl fullWidth sx={{ m: 2 }}>
                <InputLabel htmlFor="outlined-adornment-amount">Weight</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    name="weight"
                    value={values.weight}
                    onChange={handleChange}
                    label="Weight"
                    startAdornment={<InputAdornment position="start">-</InputAdornment>}
                />
            </FormControl>}
            {values.product_type === "Food" && <div className={classes.date}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                        label="Production Date"
                        inputFormat="MM/dd/yyyy"
                        value={values.production_date}
                        onChange={(value)=>handleChange({target:{name:"production_date",value}})}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </div>}
            {values.product_type === "Food" && <div className={classes.date}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                        label="Expiration Date"
                        inputFormat="MM/dd/yyyy"
                        value={values.expiration_date}
                        onChange={(value)=>handleChange({target:{name:"expiration_date",value}})}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </div>}
            {values.product_type === "Food" && <FormControl fullWidth sx={{ m: 2 }}>
                <InputLabel htmlFor="outlined-adornment-amount">Quantity</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    name="quantity"
                    value={values.quantity}
                    onChange={handleChange}
                    label="Quantity"
                    startAdornment={<InputAdornment position="start">-</InputAdornment>}
                />
            </FormControl>}
            <div className={classes.btnDiv}>
                <Button variant="contained" disabled={progress === 1} className={classes.btn} onClick={submit}>
                    {progress === 1 ? <CircularProgress size={26} />:"Submit"}
                </Button>
            </div>
        </Container>
    </>
    )
}

export default ProductEntry