import * as React from 'react';
import {SpeedDial,Button, Container,Card,Grid} from '@mui/material';
import {Add,ArrowBackIos} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import {makeStyles} from "@mui/styles"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Barcode from 'react-barcode';

// services
import ProductService from "../services/product"

// components
import Popup from "./Popup"
import ProductEntry from "./ProductEntry"

const useStyles = makeStyles({
    card:{
        margin:"10px 0",
    }
})

const ProductList = ()=>{

    const navigate = useNavigate()
    const classes = useStyles()

    const [popup,setPopup] = React.useState(false)
    const [products,setProducts] = React.useState([])

    React.useEffect(()=>{
        ProductService.getAll().then(res=>{
            setProducts(res.data)
        })
    },[popup])


    return(
        <>
            <Button onClick={()=>navigate("/")}>
                <ArrowBackIos/>
                Back
            </Button>
            <Popup open={popup} setOpen={setPopup} title="Product Entry">
                <ProductEntry/>
            </Popup>
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'fixed', bottom: 32, right: 32 }}
                icon={<Add />}
                onClick={()=>setPopup(true)}
            >
            </SpeedDial>
            <Container>
                <h1>Product List</h1>
                <Grid container spacing={2} sx={{p:1}}>
                    <Grid item xs={2}>
                        Type
                    </Grid>
                    <Grid item xs={2}>
                        Name
                    </Grid>
                    <Grid item xs={2}>
                        Stock Quantity
                    </Grid>
                    <Grid item xs={2}>
                        Barcode
                    </Grid>
                    <Grid item xs={2}>
                        Description
                    </Grid>
                    <Grid item xs={2}>
                        İşlemler
                    </Grid>
                </Grid>
                {products.map(item=>(
                    <Card className={classes.card} key={item.id}>
                        <Grid container spacing={2} sx={{p:1}}>
                            <Grid item xs={2}>
                                {item.product_type}
                            </Grid>
                            <Grid item xs={2}>
                                {item.name}
                            </Grid>
                            <Grid item xs={2}>
                                {item.stock_quantity}
                            </Grid>
                            <Grid item xs={2}>
                                <Barcode height={25} displayValue={false} value={"10"} />
                            </Grid>
                            <Grid item xs={2}>
                                {item.description}
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

export default ProductList