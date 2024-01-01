// import React, { useState } from 'react'
// // import '../LoginPage.css'
// import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
// import { Link, useNavigate } from 'react-router-dom'
// import { ToastContainer, toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css';
// // import { push, ref, set } from 'firebase/database'
// import { db } from '../../Config/Firebase'
// import { BsFillPersonFill } from "react-icons/bs"
// import { MdEmail } from "react-icons/md"
// import { Box, Button, Typography } from '@mui/material'
// import IconButton from '@mui/material/IconButton';
// // import Input from '@mui/material/Input';
// // import FilledInput from '@mui/material/FilledInput';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputLabel from '@mui/material/InputLabel';
// import InputAdornment from '@mui/material/InputAdornment';
// // import FormHelperText from '@mui/material/FormHelperText';
// import FormControl from '@mui/material/FormControl';
// // import TextField from '@mui/material/TextField';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import {  doc, setDoc } from 'firebase/firestore';

// export default function LoginPage() {

//     const [showPassword, setShowPassword] = React.useState(false);

//     const handleClickShowPassword = () => setShowPassword((show) => !show);

//     const handleMouseDownPassword = (event) => {
//         event.preventDefault();
//     };


//     const Navigate = useNavigate()
//     const [Name, setName] = useState('')
//     const [Email, setEmail] = useState('')
//     const [Password, setPassword] = useState('')


//     // const handleName = (e) => {
//     //     setName(e.target.value)
//     // }
//     // const handleEmail = (e) => {
//     //     setEmail(e.target.value)
//     // }
//     // const handlePassword = (e) => {
//     //     setPassword(e.target.value)
//     // }
//     const createAccount = async (e) => {
//         e.preventDefault()

//         const auth = getAuth()
//         if (Name === '' || Email === '' || Password === '') {
//             toast.error('Please Enter Email and Password', {
//                 hideProgressBar: true
//             })
//         } else {
//             try {
//                 const user = await createUserWithEmailAndPassword(auth, Email, Password)
//                 localStorage.setItem('User_ID', user.user.uid)
//                 // const dbref = doc(db, 'Users')
//                 // const Key = doc(dbref)
//                 // console.log(Key.key)
//                 // await setDoc(doc(db, 'Users'), {
//                 //     // await setDoc(doc((dbref)), {
//                 //     Name: Name,
//                 //     Email: Email,
//                 //     Password: Password,
//                 //     User_ID: user.user.uid,
//                 //     Ref_Key: Key.key
//                 // })
//                 await setDoc(doc(db, "cities", "LA"), {
//                     name: "Los Angeles",
//                     state: "CA",
//                     country: "USA"
//                 });
//                 // const key =push(dbref)
//                 // console.log(user.user.uid)

//                 toast.success('User created successfully', {
//                     hideProgressBar: true,
//                     pauseOnHover: false,
//                 })
//                 Navigate('/dashboard')
//             }
//             catch (err) {
//                 console.log(err)
//                 let errMess = err.message.slice(22, err.message.length - 2)
//                 toast.error(errMess.charAt(0).toUpperCase() + errMess.slice(1, errMess.length))
//             }
//         }
//     }

//     React.useEffect(() => {
//         if (!localStorage.getItem("User_ID")) {
//             Navigate("/")
//         }
//         else {
//             Navigate("/dashboard")
//         }
//     }, [Navigate])
//     return (
//         <>
//             <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                 <Box sx={{ width: "47%", }}>

//                     <img src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?w=2000" alt="Login Screen" style={{ width: "100%" }} />
//                 </Box>
//                 {/* <!-- Sign Up DIV --> */}
//                 <Box width="53%" sx={{ p: 2, textAlign: "center" }}>
//                     <Typography sx={{ fontWeight: "bold", fontSize: "25px", color: "black" }}>Create New Account</Typography>
//                     <Typography sx={{ my: 2 }}>Please Create Account...!</Typography>
//                     <Box >
//                         <Box sx={{ my: 1, mt: 2 }}>
//                             <FormControl sx={{ m: 1, width: '90%', height: "7vh", }} variant="outlined">
//                                 <InputLabel htmlFor="outlined-adornment-name" sx={{ mt: -0.5 }}>Name</InputLabel>
//                                 <OutlinedInput
//                                     id="outlined-adornment-name"
//                                     type={'text'}
//                                     endAdornment={
//                                         <InputAdornment position="end">
//                                             <IconButton
//                                                 aria-label="toggle password visibility"
//                                                 edge="end"
//                                             >
//                                                 <BsFillPersonFill />
//                                             </IconButton>
//                                         </InputAdornment>
//                                     }
//                                     label="Name"
//                                     sx={{ height: "7vh", fontWeight: "bold" }}
//                                     onChange={(e) => setName(e.target.value)}
//                                 />
//                             </FormControl>
//                         </Box>
//                         <Box sx={{ my: 1, mt: 2 }}>
//                             <FormControl sx={{ m: 1, width: '90%' }} variant="outlined">
//                                 <InputLabel htmlFor="outlined-adornment-email" sx={{ mt: -0.5 }}>Email</InputLabel>
//                                 <OutlinedInput
//                                     id="outlined-adornment-email"
//                                     type={'email'}
//                                     endAdornment={
//                                         <InputAdornment position="end">
//                                             <IconButton
//                                                 aria-label="toggle password visibility"
//                                                 edge="end"
//                                             >
//                                                 <MdEmail />
//                                             </IconButton>
//                                         </InputAdornment>
//                                     }
//                                     label="Email"
//                                     sx={{ height: "7vh", fontWeight: "bold" }}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                 />
//                             </FormControl>
//                         </Box>
//                         <Box sx={{ my: 1, mt: 2 }}>
//                             <FormControl sx={{ m: 1, width: '90%' }} variant="outlined">
//                                 <InputLabel htmlFor="outlined-adornment-password" sx={{ mt: -0.5 }}>Password</InputLabel>
//                                 <OutlinedInput
//                                     id="outlined-adornment-password"
//                                     type={showPassword ? 'text' : 'password'}
//                                     endAdornment={
//                                         <InputAdornment position="end">
//                                             <IconButton
//                                                 aria-label="toggle password visibility"
//                                                 onClick={handleClickShowPassword}
//                                                 onMouseDown={handleMouseDownPassword}
//                                                 edge="end"
//                                             >
//                                                 {showPassword ? <VisibilityOff /> : <Visibility />}
//                                             </IconButton>
//                                         </InputAdornment>
//                                     }
//                                     label="Password"
//                                     sx={{ height: "7vh", fontWeight: "bold" }}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                 />
//                             </FormControl>
//                         </Box>

//                         {/* 
//                         <label htmlFor="name" className="">Name</label>
//                         <input type="text" name="" id="name" className="name" autoFocus onChange={handleName} />
//                         <BsFillPersonFill />
//                         <label htmlFor="email" className="">Email</label>

//                         <input type="email" name="" id="email" className="name" required onChange={handleEmail} />
//                         <i class="fa-regular fa-envelope icons"></i>
//                         <label htmlFor="password" className="">Password</label>
//                         <input type="password" name="" id="password" className="name" onChange={handlePassword} />
//                         <i className="fa-regular fa-eye icons" id='show_pass'></i> */}

//                         <button className="sign_btn" id="signUp_btn" onClick={createAccount} >Sign Up</button>
//                     </Box>

//                     <Typography sx={{ my: 1, mx: 1, fontWeight: "bold" }}>Already Have Account??
//                         <Link to='/gotoLogin' sx={{ ml: 1, border: "1px solid green" }}>
//                             Sign In
//                         </Link>
//                     </Typography>

//                     <Box>
//                         <hr />
//                         <Typography>Or Sign Up With</Typography>
//                         <hr />
//                     </Box>
//                     {/* Google and Facebook SignUp */}
//                     <Box sx={{ justifyContent: "space-evenly", display: "flex", mt: 2 }}>
//                         <Button startIcon={<img src="https://img.icons8.com/color/48/null/google-logo.png" style={{ width: "70%" }} alt="logo" />} sx={{
//                             textTransform: "capitalize", fontSize: "16px", border: "1px solid black", "&:hover": {
//                                 backgroundColor: "#2b6de3",
//                                 color: "white"
//                             }, color: "black"
//                         }} >SignUp Using Google</Button>
//                         <Button
//                             startIcon={<img src="https://img.icons8.com/color/48/null/facebook-new.png" alt='logo' style={{ width: "70%" }} />}
//                             sx={{
//                                 textTransform: "capitalize",
//                                 fontSize: "16px",
//                                 border: "1px solid black",
//                                 "&:hover": {
//                                     backgroundColor: "#2b6de3",
//                                     color: "white"
//                                 },
//                                 color: "black"
//                             }}  >SignUp Using Facebook</Button>
//                     </Box>
//                 </Box>

//             </Box>
//             <ToastContainer />
//         </>
//     )
// }
