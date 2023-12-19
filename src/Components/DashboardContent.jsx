import React, { useEffect, useState } from 'react'
// import './Dashboard.css'
import { ref } from 'firebase/database'
import { db } from '../Config/Firebase'
import { onValue } from 'firebase/database'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, Grid } from '@mui/material'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import Divider from '@mui/material/Divider';
// import { Chart } from 'react-charts'
import MyChart from './MyChart'
const cardS = [
    {
        title: "Total Sales",
        icon: <ShoppingCartOutlinedIcon />,
        bgColor: "#38a7ebc7",
        iconColor: "#1930df",
        value: "300"
    },
    {
        title: "Total Expense",
        icon: <AccountTreeOutlinedIcon />,
        bgColor: "#41f1b6",
        iconColor: "red",
        value: "300"

    },
    {
        title: "Total Income",
        icon: <TimelineOutlinedIcon />,
        bgColor: "#ff392dbf",
        iconColor: "#41f1b6",
        value: "300"

    },
]

function DashboardContent() {
    let Navigate = useNavigate()
    const [Product, setProduct] = useState([])
    // const [DATE, setDATE] = useState('')
    // const [Time, setTime] = useState('')
    // const [ProfImg, setProfImg] = useState('')
    useEffect(() => {

        let User_ID = localStorage.getItem("User_ID")
        if (!User_ID) {
            Navigate('/')
        }
        else {

            // const dbref = ref(db, 'Sales')
            // onValue(dbref, snapShot => {
            //     let data = snapShot.val()
            //     if (data) {
            //         let dataArr = Object.values(data)
            //         console.log(dataArr)
            //         let prodArr = []
            //         for (const i of dataArr) {
            //             if (i.userId === User_ID) {
            //                 prodArr.push(i?.pQty)
            //             }
            //         }
            //         setProduct(prodArr)
            //         // console.log(prodArr)
            //         console.log(Product)

            //     }
            // })


            
            // const dbref2 = ref(db, 'Users')
            // // let User_ID = localStorage.getItem("User_ID")
            // console.log(User_ID)
            // onValue(dbref2, (snapShot) => {
            //     let data1 = snapShot.val()
            //     data1 = Object.values(data1)
            //     console.log(data1)
            //     for (const i of data1) {
            //         if (i.User_ID === User_ID) {

            //             setProfImg(i.Profile_Img)
            //         }
            //     }

            // })

        }
    }, [Product])
    // --------------- Get Today Date -------------------
    // setInterval(() => {
    //     let date = new Date
    //     date = date.toString()
    //     setDATE(date.substring(3, 15))
    //     setTime(date.substring(16, 25))
    // },);
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
                    {cardS.map((card, index) => {
                        return (
                            <Grid key={index} item xs={12} sm={6} md={4} lg={3} sx={{ mx: 2, width: "100%" }}>
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
                                            {card?.icon}
                                        </Typography>
                                        {/* <img src= alt="" /> */}
                                        <Typography sx={{ paddingLeft: "15px", fontSize: "20px", fontWeight: "bold" }}>
                                            {card.title}
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
                                            }}
                                        >
                                            {card.value}
                                        </Typography>
                                        <Box componet={"div"}>
                                            {card.value > 0 ? (
                                                <BsArrowUp color={"#42C677"} />
                                            ) : (
                                                <BsArrowDown color={"#E75C62"} />
                                            )}
                                            {card.value > 0 ? (
                                                <Typography
                                                    variant={"p"}
                                                    sx={{
                                                        marginLeft: "10px",
                                                        marginTop: "10px",
                                                        fontFamily: "Outfit",
                                                        fontSize: "14px",
                                                        color: "#42C677",
                                                        lineHeight: "20px",
                                                        fontWeight: "500",
                                                    }}
                                                >
                                                    {card.value}%
                                                </Typography>
                                            ) : (
                                                <Typography
                                                    variant={"p"}
                                                    sx={{
                                                        marginLeft: "10px",
                                                        marginTop: "10px",
                                                        fontFamily: "Outfit",
                                                        fontSize: "14px",
                                                        color: "#E75C62",
                                                        lineHeight: "20px",
                                                        fontWeight: "500",
                                                    }}
                                                >
                                                    {card.value}%
                                                </Typography>
                                            )}
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>
                        )
                    }
                    )}

                </Box>
                <Divider sx={{ my: 2 }} />
                <MyChart sales={Product} />
            </Box>
        </>

    )
}

export default DashboardContent