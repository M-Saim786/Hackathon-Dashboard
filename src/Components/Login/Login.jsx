import React, { useEffect, useState } from 'react'
import '../LoginPage.css'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { MdEmail } from "react-icons/md"
import { Box, Button, Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
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
                const user = await signInWithEmailAndPassword(auth, Email, Password)
                await toast.success('Login Success', {
                    hideProgressBar: true,
                    pauseOnHover: false,
                })


                // console.log(user.user.uid)
                localStorage.setItem('User_ID', user.user.uid)
                Navigate('/dashboard')
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
            Navigate("/gotoLogin")
        }
        else {
            Navigate("/dashboard")
        }

    }, [])

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box sx={{ width: "47%", }}>

                    <img src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?w=2000" alt="Login Screen" style={{ width: "100%" }} />
                </Box>
                {/* <!-- Sign Up DIV --> */}
                <Box width="53%" sx={{ p: 2, textAlign: "center" }}>
                    <Typography sx={{ fontWeight: "bold", fontSize: "25px", color: "black" }}>Login to Your Account</Typography>
                    <Typography sx={{ my: 2 }}>Please Login To Your Account..!</Typography>
                    <Box >

                        <Box sx={{ my: 1, mt: 2 }}>
                            <FormControl sx={{ m: 1, width: '90%' }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-email" sx={{ mt: -0.5 }}>Email</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-email"
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
                                    sx={{ height: "7vh", fontWeight: "bold" }}
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


                        <button className="sign_btn" id="signUp_btn" onClick={LoginFunc} >Login</button>
                    </Box>

                    <Typography sx={{ my: 1, mx: 1, fontWeight: "bold" }}>Dont't have account??
                        <Link to='/' sx={{ ml: 1, border: "1px solid green" }}>
                            Sign Up
                        </Link>
                    </Typography>

                    <Box>
                        <hr />
                        <Typography>Or Sign Up With</Typography>
                        <hr />
                    </Box>
                    {/* Google and Facebook SignUp */}
                    <Box sx={{ justifyContent: "space-evenly", display: "flex", mt: 2 }}>
                        <Button startIcon={<img src="https://img.icons8.com/color/48/null/google-logo.png" style={{ width: "70%" }} />} sx={{
                            textTransform: "capitalize", fontSize: "16px", border: "1px solid black", "&:hover": {
                                backgroundColor: "#2b6de3",
                                color: "white"
                            }, color: "black"
                        }} >SignUp Using Google</Button>
                        <Button
                            startIcon={<img src="https://img.icons8.com/color/48/null/facebook-new.png" style={{ width: "70%" }} />}
                            sx={{
                                textTransform: "capitalize",
                                fontSize: "16px",
                                border: "1px solid black",
                                "&:hover": {
                                    backgroundColor: "#2b6de3",
                                    color: "white"
                                },
                                color: "black"
                            }}  >SignUp Using Facebook</Button>
                    </Box>
                </Box>

            </Box>
            {/* <div className="container">

                <img src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?w=2000" alt=""
                    id="img" />


                <div className="login_div signUp_div" id="login_div">
                    <h2 className="heading">Login to Your Account</h2>
                    <p>Please Login To Your Account</p>

                    <form action="">
                        <label htmlFor="lemail" className="my-2">Email</label>
                        <input type="email" name="" id="lemail" className="name" onChange={HandleEmail} />
                        <i className="fa-solid fa-paper-plane icons"></i>

                        <label htmlFor="lpassword" className="my-2">Password</label>
                        <input type="password" name="" id="lpassword" className="name" onChange={HandlePassword} />
                        <i className="fa-regular fa-eye icons" id='show_passlas'></i>

                        <button className="sign_btn" id="login_btn" type='submit' onClick={LoginFunc} >Login</button>

                    </form>

                    <p>Don't Have Account??
                        <Link to='/gotoSignUp'>
                            SignUp
                        </Link>
                    </p>
                    <div id="or_sign_div">
                        <hr />
                        <p>Or Sign Up With</p>
                        <hr />
                    </div>

                    <div className="more_sign ">
                        <button className="signUp_Other" id="google_signUp" >
                            <img src="https://img.icons8.com/color/48/null/google-logo.png" className="brands_logo" />
                            Sign Up Using Google</button>

                    </div>
                </div>


            </div> */}
            <ToastContainer />
        </>
    )
}

export default Login
