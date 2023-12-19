import React, { useState } from 'react'
import '../AddProduct.css'
// import  from '@mui/material/TextField';
import { Button, TextField, Box, Typography, styled, StepLabel } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import StepperForm from './StepperForm/SteperForm';
import { getDownloadURL, ref as sRef, uploadBytes } from 'firebase/storage';
import { db, storage } from '../../Config/Firebase';
import { push, ref, set } from 'firebase/database';
// import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function AddPorduct() {
  // ------------------------ State Variables --------------S

  let Navigate = useNavigate()
  let date = new Date
  date = date.toString()
  let Curr_date = date.substring(3, 15)
  // console.log(Curr_date)
  let Curr_Time = date.substring(16, 25)

  const User_ID = localStorage.getItem("User_ID")

  const [Product, setProduct] = useState({
    // data: {
    date: Curr_date,
    time: Curr_Time,
    userId: User_ID
    // }
  })


  let imgUrl = ''
  const [ImgUrl, setImgUrl] = useState('')
  const HandleImg = (e) => {
    const StorageRef = sRef(storage, `Images/${e.target.files[0].name}`)

    uploadBytes(StorageRef, e.target.files[0])
      .then((snapShot) => {
        getDownloadURL(snapShot.ref)
          .then(async (url) => {
            toast.info("Uploading Image")
            setImgUrl(url)
            let imgUrl
            imgUrl = url
            if (ImgUrl == '') {
              setProduct({ ...Product, ["imgUrl"]: imgUrl })
              setImgUrl(imgUrl)
              console.log(imgUrl)
              console.log(ImgUrl)
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
  const dbref = ref(db, 'Products')
  const key = push(dbref)

  const addItem = () => {
    console.log(Product)
    let randomKey = key.key

    const obj = ({ ...Product, ["prodKey"]: randomKey })
    if (Object.values(obj).length > 11) {
      set((dbref, key), obj)

      // setProduct(Product)
      // console.log("product", obj)

    }
  }
  const gotoAllPro = () => {
    // setTimeout(() => {
    Navigate("/dashboard/prod")
    setImgUrl("")
    // }, 2000);
  }



  return (
    <>
      <ToastContainer />
      <Box
      // border="1px solid red"
      >
        <Box my={1}>
          <Typography sx={{ color: "black", fontSize: "25px", textAlign: "left", fontWeight: "bold" }}>
            Add Products...
          </Typography>
          <Typography sx={{ textAlign: "left", }}>
            Add Product in your inventory
          </Typography>
        </Box>


        <Box sx={{ my: 3, }}>
          <StepperForm Product={Product} setProduct={setProduct} HandleImg={HandleImg} addItem={addItem} gotoAllPro={gotoAllPro} />
        </Box>

      </Box>


    </>
  )
}

export default AddPorduct

