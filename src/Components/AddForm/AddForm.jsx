import styled from '@emotion/styled';
import { Box, Button, CardMedia, Grid, InputLabel, OutlinedInput, Typography } from '@mui/material'
// import { Button } from 'bootstrap'
import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import AddIcon from "@mui/icons-material/Add";
import postIcon from "../../Assests/Icons/postIcon.png";
import { db, storage } from '../../Config/Firebase';
import {
    ref,
    uploadBytesResumable,
    getDownloadURL
} from "firebase/storage";
import Swal from 'sweetalert2';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
const Typo1 = styled("div")(({ theme }) => ({
    // padding: theme.spacing(0, 2),
    fontFamily: "outfit",
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "20px",
    color: "#9EA3AE",
}));



function AddForm({ btnTitle, setEdit, publish,
    // title, desc, setDesc, setTitle,
    heading, showImgOpt }) {
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [handleImg, setHandleImg] = useState([])
    const [Percent, setPercent] = useState(0)
    const [ImgUrl, setImgUrl] = useState("")
    const [ImgType, setImgType] = useState(null)
    // console.log(handleImg)
    const HandleImage = async () => {
        console.log(handleImg)
        console.log(handleImg?.type)
        if (handleImg && handleImg?.size < 1024 * 1024) {
            setImgType(handleImg?.type)
            const storageRef = ref(storage, `/PostImage/${handleImg.name}`)
            const uploadTask = uploadBytesResumable(storageRef, handleImg);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const percent = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );

                    // update progress
                    setPercent(percent);
                },
                (err) => console.log(err),
                () => {
                    // download url
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        setImgUrl(url)
                        console.log(url);
                    });
                }
            );
        }
        else if (handleImg?.size > 1024 * 1024) {
            Swal.fire("Error", "Image too big ", "error")
        } else {
            Swal.fire("Error", "upload image first ", "error")

        }
    }
    useEffect(() => {
        if (handleImg?.size) {
            HandleImage();
        }

    }, [handleImg])
    const handleDesc = (e) => {

        if (showImgOpt && desc.length < 100) {
            setDesc(e.target.value)
        }
        else if (!showImgOpt && desc.length < 500) {
            setDesc(e.target.value)
        } else {
            Swal.fire("Error", "Desc is too big", "error")
        }
    }
    return (
        <>
            <Box>
                <Box sx={{ display: "flex", }}>

                    <Box align="left">
                        <Button align="left" onClick={() => setEdit(false)} color="error" sx={{
                            zIndex: '2',
                            //  border: "1px solid red" 
                        }}>
                            <AiOutlineClose fontSize={17} />
                        </Button>
                    </Box>
                    <Box margin="0px auto" >
                        <Typography sx={{ fontSize: 20, textAlign: "center", fontWeight: "bold" }}>
                            Add {heading && heading}
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", }}>
                    <Grid item width="40%" >
                        {showImgOpt && <Grid>
                            <Box sx={{ ml: "29px", display: "flex", alignItems: "flex-end" }}>
                                <CardMedia
                                    component="img"
                                    // style={{ width: "120px"}}
                                    src={Percent === 100 ? ImgUrl : postIcon}
                                    alt="Image"
                                    sx={{
                                        width: "130px",
                                        backgroundColor: "#F6F6F6",
                                        padding: 2,
                                        m: 1,
                                        borderRadius: 2,
                                        border: "1px soldi red"
                                    }}
                                />
                                <Box>
                                    <Box>
                                        <Typo1 sx={{ maxWidth: "230px", pb: "18px" }}>
                                            *uploaded photos in maximum size of 1 mb
                                        </Typo1>
                                    </Box>
                                    <Box>
                                        <Button
                                            sx={{ textTransform: "capitalize" }}
                                            variant="text"
                                            component="label"
                                            startIcon={<AddIcon />}
                                        >
                                            add photo
                                            <input
                                                hidden
                                                accept="image/*"
                                                name="image"
                                                multiple
                                                type="file"
                                                id="image"
                                                image="image"
                                                onChange={(e) => setHandleImg(e.target.files[0])}
                                            />
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>}
                        <Grid>
                            <Box>
                                <InputLabel
                                    align="left"
                                    htmlFor="first-select"
                                    sx={{
                                        mb: 1,
                                        mt: 2,
                                        color: "black",
                                        fontWeight: "bold",
                                        fontSize: "14px",
                                    }}
                                >
                                    {heading && heading} Title
                                </InputLabel>
                                <OutlinedInput
                                    fullWidth
                                    name='title'
                                    placeholder="Enter title"
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={title && title}
                                    sx={{
                                        backgroundColor: "#F6F6F6",
                                        height: "45px",
                                        outlineColor: "red !important",
                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#80B3B0",
                                        },
                                        "&:hover .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#80B3B0",
                                        },
                                    }}
                                />
                            </Box>
                        </Grid>
                        <Grid>
                            <Box>
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

                                    <InputLabel
                                        align="left"
                                        htmlFor="first-select"
                                        sx={{
                                            mb: 1,
                                            mt: 2,
                                            color: "black",
                                            fontWeight: "bold",
                                            fontSize: "14px",
                                        }}
                                    >
                                        {heading && heading} Desc
                                    </InputLabel>
                                    <Typography sx={{ fontWeight: "bold" }}>
                                        {showImgOpt ? desc.length + "/100" : desc.length + "/500"}
                                    </Typography>
                                </Box>

                                <OutlinedInput
                                    fullWidth
                                    name={"desc"}
                                    placeholder="Enter Desc"
                                    onChange={handleDesc}
                                    value={desc && desc}
                                    multiline
                                    maxRows={6}
                                    sx={{
                                        backgroundColor: "#F6F6F6",
                                        // height: "5px",
                                        outlineColor: "red !important",
                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#80B3B0",
                                        },
                                        "&:hover .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#80B3B0",
                                        },
                                    }}
                                />
                            </Box>
                        </Grid>
                        <Grid>
                            <Box sx={{ mt: 5, textAlign: "right" }}>
                                <Button sx={{
                                    backgroundColor: "#006EB5", color: "white", textTransform: "capitalize", fontSize: 14, fontWeight: "bold", "&:hover": {
                                        backgroundColor: "#006EB5"
                                    },
                                    width: "30%",
                                }}
                                    onClick={() => publish(title, desc, ImgUrl, ImgType)}
                                >
                                    {btnTitle && btnTitle}
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>

                </Box>
            </Box>

        </>
    )
}

export default AddForm