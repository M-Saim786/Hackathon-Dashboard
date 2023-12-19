import React, { useEffect, useState, useRef } from 'react'
// import '../Setting.css'
import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import { onValue, ref, update } from 'firebase/database'
import { db, storage } from '../../Config/Firebase'
import { getDownloadURL, ref as sRef, uploadBytes } from 'firebase/storage'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import styles from "./Profile.module.css";
import PreviewImage from './PreviewImage'

const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
}));




function Profile() {
    const avatarFileRef = useRef(null);
    const [Name, setName] = useState('')
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [ImgUrl, setImgUrl] = useState('')
    const [Ref_ID, setRef_ID] = useState('')
    const [OldImg, setOldImg] = useState('')
    const [NewAvatar, setNewAvatar] = useState("")
    let Recent_ID = localStorage.getItem('User_ID')

    // useEffect(() => {
    //     const dbref = ref(db, 'Users')
    //     onValue((dbref), (snapShot) => {
    //         let data = snapShot.val()
    //         data = Object.values(data)
    //         for (const i of data) {
    //             if (i.User_ID === Recent_ID) {
    //                 setName(i.Name)
    //                 setEmail(i.Email)
    //                 setPassword(i.Password)
    //                 setRef_ID(i.Ref_Key)
    //                 setOldImg(i.Profile_Img)
    //             }
    //         }
    //         // console.log(data)
    //     })
    // }, [])
    const HandleName = (e) => {
        setName(e.target.value)
    }
    const HandleImg = (e) => {
        const storageRef = sRef(storage, `Images/${e.target.files[0].name}`)
        uploadBytes(storageRef, e.target.files[0])
            .then((snapShot) => {
                toast.info('Uploading Image')
                getDownloadURL(snapShot.ref)
                    .then((url) => {
                        if (url) {
                            setImgUrl(url)
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            })
            .catch((error) => {
                console.log(error)
            })
    }
    //  --------------------- Saving Profile Data to Firebase ---------------
    const SaveSetting = () => {
        const dbref = ref(db, `Users/${Ref_ID}`)
        update((dbref), {
            Email: Email,
            Profile_Img: ImgUrl == '' ? OldImg : ImgUrl,
            Name: Name,
            Password: Password
        })
        toast.success('Saved Successfully...!', {
            hideProgressBar: true
        })
    }
    return (
        <>
            <ToastContainer />
            <Box >
                <Box >
                    <Typography sx={{ fontSize: "25px", fontWeight: "bold", color: "black" }}>
                        Profile
                    </Typography>
                    <Typography sx={{ mb: 1 }}>
                        Manage Your Profile Here
                    </Typography>
                </Box>
                <Box sx={{
                    display: "flex", justifyContent: "space-evenly",
                    // border: "1px solid red",
                    width: "80%", margin: "0px auto"
                }}>
                    <Box
                        // border="1px solid red"
                        className={styles.avatarImgWrapper}>
                        {NewAvatar ? (
                            <PreviewImage
                                file={NewAvatar}
                                alt="avatar_img"
                                className={styles.Img}
                            />
                        ) : (
                            <img
                                src={OldImg}
                                alt="avatar_img"
                                className={styles.Img}
                            />
                        )}
                        <Box className={styles.pencilIconWrapper}>
                            <input
                                ref={avatarFileRef}
                                hidden
                                type="file"
                                accept="image/*"
                                onChange={HandleImg}
                            />
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi_YH6eTSAC2OaAvnn_QPAUSJNNtqm1fzziA&usqp=CAU"
                                alt="cant load image"
                                onClick={() => avatarFileRef.current.click()}
                                className={styles.Img2}
                            />
                        </Box>
                    </Box>
                    <Box
                    // border="1px solid red"
                    >
                        <Grid sx={{ my: 5 }}>
                            <TextField variant='outlined' value={Name} label='Your Name' onChange={HandleName} />
                        </Grid>
                        <Grid sx={{ my: 5 }}>
                            <TextField variant='outlined' label='Your Email' value={Email} />
                        </Grid>
                        <Grid sx={{ my: 5 }}>

                            <TextField variant='outlined' label='Your Password' value={Password} />
                        </Grid>
                    </Box>
                </Box>
                <Box textAlign={"center"}>

                    <Button variant='contained' onClick={SaveSetting} sx={{ textTransform: "capitalize", my: 2 }} >
                        Save Settings
                    </Button>
                </Box>
            </Box>

        </>
    )
}

export default Profile
