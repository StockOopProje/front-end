import React from "react"
import { Container,Card, Grid } from "@mui/material"
import {makeStyles} from "@mui/styles"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import pages from "../pages"
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
    logo:{
        textAlign:"center",
        color:"white"
    },
    card:{
        cursor:"pointer",
        margin:"10px 0",
        textAlign:"center",
        "&:hover":{
            opacity:0.5
        }
    },
    icon:{
        height:"100%",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    }
})

const Main = ()=>{

    const classes = useStyles()
    const navigate = useNavigate()

    return(
        <Container>
            <Card sx={{ minHeight:80,backgroundColor:"black",margin:"2em 0" }}>
                <h1 className={classes.logo}>Stock Managment System</h1>
            </Card>
            {pages.map(item=>(
                <Card key={item.name} className={classes.card} onClick={()=>navigate(item.path)}>
                    <Grid container spacing={2}>
                        <Grid item xs={2}>
                            <div className={classes.icon}>
                                {item.icon}
                            </div>
                        </Grid>
                        <Grid item xs={8}>
                            <h3>{item.title}</h3>
                        </Grid>
                        <Grid item xs={2}>
                            <div className={classes.icon}>
                                <ArrowForwardIosIcon/>
                            </div>
                        </Grid>
                    </Grid>
                </Card>
            ))}
        </Container>
    )
}

export default Main