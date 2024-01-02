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
import { ToastContainer, toast } from 'react-toastify';
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
    // const toastId = React.useRef(null);
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [handleImg, setHandleImg] = useState([])
    const [Percent, setPercent] = useState(0)
    const [ImgUrl, setImgUrl] = useState("")
    const [ImgType, setImgType] = useState(null)
    // const [, set] = useState(second)
    // console.log(handleImg)
    const HandleImage = async () => {
        console.log(handleImg)
        console.log(handleImg?.type)
        if (handleImg?.type === "image/png") {
            if (handleImg && handleImg?.size < 1024 * 1024) {
                toast.info("Uploading Image..", { autoClose: 8000, });
                setImgType(handleImg?.type)
                const storageRef = ref(storage, `/PostImage/${handleImg.name}`)
                const uploadTask = uploadBytesResumable(storageRef, handleImg);
                // toast.info("Uploading Video")
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
                            toast.info("Image Uploaded", {
                                autoClose: 1000, hideProgressBar: true
                            });
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
        } else if (handleImg?.type === "video/mp4") {
            if (handleImg && handleImg?.size < 1024 * 1024 * 5) {
                toast.info("Uploading Video..", { autoClose: 10000 });
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
                            toast.info("Video Uploaded", { autoClose: 1000, hideProgressBar: true });
                            console.log(url);
                        });
                    }
                );
            }
            else if (handleImg?.size > 1024 * 1024) {
                Swal.fire("Error", "Video Size is too big ", "error")
            } else {
                Swal.fire("Error", "upload Video first ", "error")

            }
        }
    }
    useEffect(() => {
        if (handleImg?.size) {
            HandleImage();
        }

    }, [handleImg])
    const handleDesc = (e) => {
        const trimDesc = desc.trim()
        const Desc = trimDesc.split(/\s+/).length
        // setDesc(e.target.value)
        console.log("Desc words", Desc)
        if (showImgOpt && Desc < 100) {
            setDesc(e.target.value)

        }
        else if (!showImgOpt && Desc < 500) {
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

                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 5 }}>
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
                                        <Typo1>
                                            *uploaded videos in maximum size of 5 mb
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
                                                // accept="image/*"
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
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>

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
                                        {showImgOpt ? desc.trim().split(/\s+/).length + "/100" : desc.trim().split(/\s+/).length + "/500"}
                                    </Typography>
                                </Box>

                                <OutlinedInput
                                    fullWidth
                                    name={"desc"}
                                    placeholder="Enter Desc"
                                    onChange={handleDesc}
                                    value={desc && desc}
                                    // name="description"
                                    // fullWidth
                                    // placeholder="Description"
                                    rows={7}
                                    multiline
                                    sx={{
                                        backgroundColor: "#F6F6F6",
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
                                    disabled={Percent == 0 || Percent == 100 ? false : true}
                                >
                                    {btnTitle && btnTitle}
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                    <ToastContainer />
                </Box>
            </Box>

        </>
    )
}

export default AddForm