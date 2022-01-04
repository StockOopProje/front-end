import React, { useState } from "react"
import { Container,FormControl,InputLabel,OutlinedInput, Button,InputAdornment,Snackbar,Alert,CircularProgress } from "@mui/material"
import {makeStyles} from "@mui/styles"

// services
import VendorService from "../services/vendor"


const useStyles = makeStyles({
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


const VendorEntry = ()=>{

    const classes = useStyles()
    const [progress,setProgress] = useState(0)
    const [values,setValues] = useState({name:"",company_name:"",address:"",cell_phone:"",email:""})

    const handleChange=(e)=>{
        const {name,value} = e.target
        setValues(prevValue=>{
            if(name === "name"){
                return ({...prevValue,name:value})
            }
            else if(name === "company_name"){
                return ({...prevValue,company_name:value})
            }
            else if(name === "address"){
                return ({...prevValue,address:value})
            }
            else if(name === "cell_phone"){
                return ({...prevValue,cell_phone:value})
            }
            else if(name === "email"){
                return ({...prevValue,email:value})
            }
            
        })
    }

    const submit = ()=>{
        setProgress(1)
        VendorService.addVendor(values)
        .then(res=>{
            if(res.data.success){
                setProgress(2)
            }
            else{
                setProgress(0)
            }
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
                <Alert onClose={()=>setProgress(0)} severity="success">Vendor entry taked!</Alert>
        </Snackbar>
        <Container>
            <h1>Vendor Entry</h1>
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
                <InputLabel htmlFor="outlined-adornment-amount">Company Name</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    name="company_name"
                    value={values.company_name}
                    onChange={handleChange}
                    label="Company Name"
                    startAdornment={<InputAdornment position="start">-</InputAdornment>}
                />
            </FormControl>
            <FormControl fullWidth sx={{ m: 2 }}>
                <InputLabel htmlFor="outlined-adornment-amount">Address</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    name="address"
                    value={values.address}
                    onChange={handleChange}
                    label="Address"
                    startAdornment={<InputAdornment position="start">-</InputAdornment>}
                />
            </FormControl>
            <FormControl fullWidth sx={{ m: 2 }}>
                <InputLabel htmlFor="outlined-adornment-amount">Phone Number</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    name="cell_phone"
                    value={values.cell_phone}
                    onChange={handleChange}
                    label="Phone Number"
                    startAdornment={<InputAdornment position="start">-</InputAdornment>}
                />
            </FormControl>
            <FormControl fullWidth sx={{ m: 2 }}>
                <InputLabel htmlFor="outlined-adornment-amount">Email</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    label="Email"
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

export default VendorEntry