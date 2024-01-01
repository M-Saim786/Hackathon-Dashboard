import React, { useEffect, useState } from 'react'
// import './Dashboard.css'
import { ref } from 'firebase/database'
import { db } from '../../Config/Firebase'
import { onValue } from 'firebase/database'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, Grid } from '@mui/material'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import Divider from '@mui/material/Divider';
// import { Chart } from 'react-charts'
import MyChart from '../../Components/Chart/MyChart'
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import Cards from '../../Components/Card/Cards'
const cardS = [
    {
        title: "Total Request",
        icon: <ShoppingCartOutlinedIcon />,
        bgColor: "#38a7ebc7",
        iconColor: "#1930df",
        value: "300"
    },
    {
        title: "Response",
        icon: <AccountTreeOutlinedIcon />,
        bgColor: "#41f1b6",
        iconColor: "red",
        value: "300"

    },
    {
        title: "Remaining Request",
        icon: <TimelineOutlinedIcon />,
        bgColor: "#ff392dbf",
        iconColor: "#41f1b6",
        value: "300"

    },
]

function DashboardContent() {
    let Navigate = useNavigate()
    const [Product, setProduct] = useState([])
    const [requests, setRequests] = useState([])
    const [RespondedReq, setRespondedReq] = useState(null)
    const [remainingReq, setremainingReq] = useState(null)
    // const [DATE, setDATE] = useState('')
    // const [Time, setTime] = useState('')
    // const [ProfImg, setProfImg] = useState('')
    useEffect(() => {
        getData()
    }, [])
    const getData = async () => {
        let User_ID = localStorage.getItem("User_ID")
        if (!User_ID) {
            Navigate('/')
        }
        else {

            await getDocs(collection(db, "Requests"))
                .then((querySnapshot) => {
                    const newData = querySnapshot.docs
                        .map((doc) => ({ ...doc.data(), id: doc.id }));
                    setRequests(newData);
                    console.log("data", newData);
                }).catch((err) => {
                    console.log("err", err)
                })

        }

    }

    useEffect(() => {
        const respondedReq = requests.filter((req) => req.status !== "request")
        const remainReq = requests.filter((req) => req.status == "request")
        setRespondedReq(respondedReq.length)
        // console.log(respondedReq)
        setremainingReq(remainReq.length)

    }, [requests])


    return (
        <>
            <Box sx={{
                // border: "1px solid red", 
                width: "100%",
                height: { lg: "90vh", md: '50vh', sm: 'auto', xs: 'auto' },

            }}>
                <Box sx={{
                    // border: "1px solid red",
                    display: "flex",
                    flexDirection: { lg: "row", md: "row", sm: "column", xs: "column" },
                    justifyContent: "center"
                    // flexDirection: "row"
                }}>
                    <Grid item xs={12} sm={6} md={4} lg={3} sx={{ mx: 2, width: "100%" }}>
                        <Box
                            component={"div"}
                            sx={{
                                padding: "15px",
                                height: "150px",
                                width: "100%",
                                background: "#fff",
                                border: "1px solid #E1E1E6",
                                borderRadius: "6px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                            }}
                        >
                            <Box
                                component={"div"}
                                display={"flex"}
                                alignItems={"center"}
                                justifyContent={"start"}
                            >
                                <Typography sx={{ color: "#007bff" }}>
                                    icon
                                </Typography>
                                {/* <img src= alt="" /> */}
                                <Typography sx={{ paddingLeft: "15px", fontSize: "20px", fontWeight: "bold" }}>
                                    Total Request
                                </Typography>
                            </Box>
                            <Box
                                componet={"div"}
                                display={"flex"}
                                alignItems={"center"}
                                justifyContent={"space-between"}
                            >
                                <Typography
                                    variant="p"
                                    sx={{
                                        fontFamily: "Outfit",
                                        fontSize: "20px",
                                        color: "#1A1B24",
                                        lineHeight: "32px",
                                        fontWeight: "600",
                                        // border: "1px solid red"
                                    }}
                                >
                                    {requests.length}
                                </Typography>

                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3} sx={{ mx: 2, width: "100%" }}>
                        <Box
                            component={"div"}
                            sx={{
                                padding: "15px",
                                height: "150px",
                                width: "100%",
                                background: "#fff",
                                border: "1px solid #E1E1E6",
                                borderRadius: "6px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                            }}
                        >
                            <Box
                                component={"div"}
                                display={"flex"}
                                alignItems={"center"}
                                justifyContent={"start"}
                            >
                                <Typography sx={{ color: "#007bff" }}>
                                    icon
                                </Typography>
                                {/* <img src= alt="" /> */}
                                <Typography sx={{ paddingLeft: "15px", fontSize: "20px", fontWeight: "bold" }}>
                                    Total Response
                                </Typography>
                            </Box>
                            <Box
                                componet={"div"}
                                display={"flex"}
                                alignItems={"center"}
                                justifyContent={"space-between"}
                            >
                                <Typography
                                    variant="p"
                                    sx={{
                                        fontFamily: "Outfit",
                                        fontSize: "20px",
                                        color: "#1A1B24",
                                        lineHeight: "32px",
                                        fontWeight: "600",
                                        // border: "1px solid red"
                                    }}
                                >
                                    {RespondedReq}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3} sx={{ mx: 2, width: "100%" }}>
                        <Box
                            component={"div"}
                            sx={{
                                padding: "15px",
                                height: "150px",
                                width: "100%",
                                background: "#fff",
                                border: "1px solid #E1E1E6",
                                borderRadius: "6px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                            }}
                        >
                            <Box
                                component={"div"}
                                display={"flex"}
                                alignItems={"center"}
                                justifyContent={"start"}
                            >
                                <Typography sx={{ color: "#007bff" }}>
                                    icon
                                </Typography>
                                {/* <img src= alt="" /> */}
                                <Typography sx={{ paddingLeft: "15px", fontSize: "20px", fontWeight: "bold" }}>
                                    Remaining Requests
                                </Typography>
                            </Box>
                            <Box
                                componet={"div"}
                                display={"flex"}
                                alignItems={"center"}
                                justifyContent={"space-between"}
                            >
                                <Typography
                                    variant="p"
                                    sx={{
                                        fontFamily: "Outfit",
                                        fontSize: "20px",
                                        color: "#1A1B24",
                                        lineHeight: "32px",
                                        fontWeight: "600",
                                        // border: "1px solid red"  
                                    }}
                                >
                                    {remainingReq}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>

                </Box>
                <Divider sx={{ my: 2 }} />
                <MyChart sales={requests} />
            </Box>
        </>

    )
}

export default DashboardContent