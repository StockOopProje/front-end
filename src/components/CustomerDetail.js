import * as React from 'react';
import {SpeedDial,Button, Container,Card,Grid} from '@mui/material';
import {Add,ArrowBackIos} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import {makeStyles} from "@mui/styles"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// services
import CustomerService from "../services/customer"

// components
import Popup from "./Popup"
import CustomerEntry from "./CustomerEntry"

const useStyles = makeStyles({
    card:{
        margin:"10px 0",
    }
})

const CustomerDetail = ()=>{

    const navigate = useNavigate()
    const classes = useStyles()

    const [popup,setPopup] = React.useState(false)
    const [customers,setCustomers] = React.useState([])

    React.useEffect(()=>{
        CustomerService.getAll().then(res=>{
            setCustomers(res.data)
        })
    },[popup])


    return(
        <>
            <Button onClick={()=>navigate("/")}>
                <ArrowBackIos/>
                Back
            </Button>
            <Popup open={popup} setOpen={setPopup} title="Customer Entry">
                <CustomerEntry/>
            </Popup>
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'fixed', bottom: 32, right: 32 }}
                icon={<Add />}
                onClick={()=>setPopup(true)}
            >
            </SpeedDial>
            <Container>
                <h1>Customer Detail</h1>
                <Grid container spacing={2} sx={{p:1}}>
                    <Grid item xs={2}>
                        Name
                    </Grid>
                    <Grid item xs={2}>
                        Company Name
                    </Grid>
                    <Grid item xs={2}>
                        Address
                    </Grid>
                    <Grid item xs={2}>
                        Phone Number
                    </Grid>
                    <Grid item xs={2}>
                        Email
                    </Grid>
                    <Grid item xs={2}>
                        İşlemler
                    </Grid>
                </Grid>
                {customers.map(item=>(
                    <Card className={classes.card} key={item.id}>
                        <Grid container spacing={2} sx={{p:1}}>
                            <Grid item xs={2}>
                                {item.name}
                            </Grid>
                            <Grid item xs={2}>
                                {item.company_name}
                            </Grid>
                            <Grid item xs={2}>
                                {item.address}
                            </Grid>
                            <Grid item xs={2}>
                                {item.cell_phone}
                            </Grid>
                            <Grid item xs={2}>
                                {item.email}
                            </Grid>
                            <Grid item xs={2}>
                                <Button><EditIcon/></Button>
                                <Button color="error"><DeleteIcon/></Button>
                            </Grid>
                        </Grid>
                    </Card>
                ))}
                
            </Container>
        </>
    )
}

export default CustomerDetail