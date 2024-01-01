import React from 'react'

import { Box, Typography, Grid } from '@mui/material'
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
function Cards({ card }) {
    return (
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
                            border: "1px solid red"
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
        </Grid>)
}

export default Cards