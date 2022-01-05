import * as React from 'react';
import {SpeedDial,Button, Container,Card,Grid} from '@mui/material';
import {Add,ArrowBackIos} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import {makeStyles} from "@mui/styles"
import DeleteIcon from '@mui/icons-material/Delete';

// services
import SaleService from "../services/sale"

// components
import Popup from "./Popup"
import SaleEntry from "./SaleEntry"

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

const SaleOrders = ()=>{

    const navigate = useNavigate()
    const classes = useStyles()

    const [popup,setPopup] = React.useState(false)
    const [sales,setSales] = React.useState([])

    React.useEffect(()=>{
        SaleService.getAll().then(res=>{
            setSales(res.data)
        })
    },[popup])

    const deleteSale =(sale)=>{
        SaleService.deleteSale(sale).then(res=>{
            setPopup(true)
            setPopup(false)
        })
    }


    return(
        <>
            <Button onClick={()=>navigate("/")}>
                <ArrowBackIos/>
                Back
            </Button>
            <Popup open={popup} setOpen={setPopup} title="Sale Entry">
                <SaleEntry/>
            </Popup>
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'fixed', bottom: 32, right: 32 }}
                icon={<Add />}
                onClick={()=>setPopup(true)}
            >
            </SpeedDial>
            <Container>
                <h1>Sale Orders</h1>
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
                    <Grid item xs={2}>
                        İşlemler
                    </Grid>
                </Grid>
                {sales.map(item=>(
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
                            <Grid item xs={2}>
                                <Button color="error" onClick={()=>deleteSale(item)}><DeleteIcon/></Button>
                            </Grid>
                        </Grid>
                    </Card>
                ))}
                
            </Container>
        </>
    )
}

export default SaleOrders