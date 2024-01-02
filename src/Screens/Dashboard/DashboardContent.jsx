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
import HowToRegIcon from '@mui/icons-material/HowToReg';
import SwipeLeftIcon from '@mui/icons-material/SwipeLeft';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import ReactApexChart from 'react-apexcharts'




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

    const [EduReq, setEduReq] = useState(0)
    const [moneyReq, setmoneyReq] = useState(0)
    const [clothsReq, setclothsReq] = useState(0)
    const [medicalReq, setmedicalReq] = useState(0)
    const [maleReq, setmaleReq] = useState(0)
    const [feMaleReqs, setfeMaleReqs] = useState(0)

    const [byTypeReq, setbyTypeReq] = useState([])
    const [genderArr, setbyGender] = useState([])



    useEffect(() => {
        const educationReq = requests.filter((req) => req?.mainType === "education")
        const MoneyReq = requests.filter((req) => req?.mainType === "money")
        const ClothsReq = requests.filter((req) => req?.mainType === "cloths")
        const MedicalReq = requests.filter((req) => req?.mainType === "medical")

        setEduReq(educationReq.length)
        setmoneyReq(MoneyReq.length)
        setclothsReq(ClothsReq.length)
        setmedicalReq(MedicalReq.length)

        const countsArray = [educationReq.length, MoneyReq.length, ClothsReq.length, MedicalReq.length];
        setbyTypeReq(countsArray)
        console.log(countsArray);



        // setbyTypeReq([educationReq?.length, MoneyReq?.length, ClothsReq?.length, MedicalReq?.length])
        // console.log("byTypeReq", byTypeReq)
        const MaleReq = requests.filter((req) => req?.gender === "male")
        const feMaleReq = requests.filter((req) => req?.gender === "feMale")
        console.log("feMaleReq.length", feMaleReq.length)

        const genderArr = [MaleReq.length, feMaleReq.length];
        setbyGender(genderArr)

        // console.log("MoneyReq.length", MoneyReq.length)
        // console.log("ClothsReq.length", ClothsReq.length)


        setmaleReq(MaleReq.length)
        setfeMaleReqs(feMaleReq.length)
    }, [requests])



    console.log("responsede req", RespondedReq)





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
                    <Grid item xs={12} sm={6} md={4} lg={3} sx={{ mx: { lg: 2, md: 2, sm: 0, xs: 0 }, my: 2, width: "100%" }}>
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
                                    <HowToVoteIcon />
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
                    <Grid item xs={12} sm={6} md={4} lg={3} sx={{ mx: { lg: 2, md: 2, sm: 0, xs: 0 }, my: 2, width: "100%" }}>
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
                                    <HowToRegIcon />
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
                    <Grid item xs={12} sm={6} md={4} lg={3} sx={{ mx: { lg: 2, md: 2, sm: 0, xs: 0 }, my: 2, width: "100%" }}>
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
                                    <SwipeLeftIcon />
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
                <Box padding={2}
                    sx={{
                        width: "100%",
                        borderRadius: "5px",
                        margin: "0px auto",
                        display: "flex",
                        justifyContent: "space-around",
                        flexDirection: { lg: "row", md: "row", sm: "column", xs: "column" },
                        height: "auto"
                    }}
                >
                    <Box
                        sx={{ width: { lg: "45%", md: "45%", sm: "100%", xs: "100%" }, border: "1px solid #E1e1e6", borderRadius: "5px", my: { lg: 0, md: 0, sm: 2, xs: 2 } }}>
                        <MyChart
                            title={"Request By Type"}
                            series={byTypeReq}
                            labels={['Education Request', 'Money Request', 'Cloths Request', 'Medical Request']} />
                    </Box>
                    <Box
                        sx={{ width: { lg: "45%", md: "45%", sm: "100%", xs: "100%" }, border: "1px solid #E1e1e6", borderRadius: "5px" }}>

                        <MyChart
                            series={genderArr}
                            title={"Request By Gender"}
                            labels={['Male Requests', 'Female Request']} />
                    </Box>
                </Box >
            </Box>
        </>

    )
}

export default DashboardContent