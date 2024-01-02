import React, { useEffect, useState } from 'react'
// import '../LoginPage.css'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { MdEmail } from "react-icons/md"
import { Box, Button, TextField, Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import logoImg from "../../Assests/logo.png"
import Swal from 'sweetalert2';

function Login() {

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const Navigate = useNavigate()
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')

    const LoginFunc = async (e) => {
        e.preventDefault()
        // console.log("create account")
        // console.log( Email, Password)

        const auth = getAuth()
        if (Email == '' || Password == '') {
            toast.error('Please Enter Email and Password', {
                hideProgressBar: true
            })
        } else {
            try {
                await signInWithEmailAndPassword(auth, Email, Password).then((user) => {
                    Swal.fire("Login Success", "", "success")
                    // console.log(user.user.uid)
                    localStorage.setItem('User_ID', user.user.uid)
                    Navigate('/dashboard')
                })
            }
            catch (err) {
                console.log(err)
                let errMess = err.message.slice(22, err.message.length - 2)
                toast.error(errMess.charAt(0).toUpperCase() + errMess.slice(1, errMess.length))
            }
        }
    }
    useEffect(() => {
        if (!localStorage.getItem("User_ID")) {
            Navigate("/")
        }
        else {
            Navigate("/dashboard")
        }

    }, [])

    return (
        <>
            <Box sx={{
                // border: "1px solid red",
                display: "flex",
                justifyContent: "center", alignItems: "center",
                height: "100vh",
            }}>
                <Box sx={{
                    width: { lg: "60%" }, boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", padding: "20px",
                    borderRadius: "5px"

                }}>

                    <Box sx={{ textAlign: "center" }}>

                        <img src={logoImg} style={{ width: "40%" }} />
                        <Box sx={{ display: "flex", textAlign: "center", justifyContent: "center" }}>
                            <Typography sx={{ fontWeight: "bold", color: "#006EB5", mr: 1 }}>
                                Donation
                            </Typography>
                            <Typography sx={{ fontWeight: "bold", color: "#86BE3F" }}>
                                Dashboard
                            </Typography>

                        </Box>
                    </Box>


                    <Box width="100%" sx={{ p: 2, textAlign: "center", }}>
                        <Typography sx={{ fontWeight: "bold", fontSize: "25px", color: "black" }}>Welcome back !</Typography>
                        <Typography sx={{ my: 2 }}>Enter your credential to access your account.</Typography>
                        <Box >

                            <Box sx={{ my: 1, mt: 2 }}>
                                <FormControl sx={{ m: 1, width: '90%' }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-email" sx={{ mt: -0.5 }}>Email</InputLabel>
                                    <OutlinedInput
                                        // sx={{
                                        //     mt: 1,
                                        //     mb: 2,
                                        //     background: "#F6F6F6",
                                        //     height: "40px",
                                        //     "&:focus": { borderRadius: "6px", border: "1px solid #E1E1E6" },
                                        //     border: "1px solid #E1E1E6",
                                        //     borderRadius: "6px",
                                        // }}
                                        // id="outlined-adornment-email"
                                        type={'email'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    edge="end"
                                                >
                                                    <MdEmail />
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Email"
                                        sx={{
                                            height: "7vh", fontWeight: "bold",
                                            // "&:focus": { borderRadius: "6px", border: "1px solid red" }, 
                                        }}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </FormControl>
                            </Box>
                            <Box sx={{ my: 1, mt: 2 }}>
                                <FormControl sx={{ m: 1, width: '90%' }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password" sx={{ mt: -0.5 }}>Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                        sx={{ height: "7vh", fontWeight: "bold" }}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </FormControl>
                            </Box>


                            <Button sx={{
                                backgroundColor: "#86C046",
                                "&:hover": {
                                    backgroundColor: "#1B7E11"
                                },
                                textTransform: "capitalize",
                                color: "white",
                                // fontSize: 20,
                                mt: 2,
                                width: "40%",
                                height: "5vh"

                            }} onClick={LoginFunc} >Login</Button>
                        </Box>

                    </Box>
                </Box>

            </Box>

            <ToastContainer />
        </>
    )
}

export default Login
