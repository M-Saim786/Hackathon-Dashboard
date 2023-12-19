import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { StpperForm } from './AddPorduct'
import { Button, TextField } from '@mui/material';
import { getDownloadURL, ref as sRef, uploadBytes } from 'firebase/storage';
import { db, storage } from '../../Config/Firebase';
import { onValue, push, ref, set, update } from 'firebase/database';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import StepperForm from './StepperForm/SteperForm';
function EditProduct() {
    const Navigate = useNavigate()
    const { id } = useParams()
    console.log(id)


    let date = new Date
    date = date.toString()
    let Curr_date = date.substring(3, 15)
    // console.log(Curr_date)
    let Curr_Time = date.substring(16, 25)
    const [Product, setProduct] = useState({
        date: Curr_date,
        time: Curr_Time,
        // userId: id.slice(1, id.length)
    })

    const [Data, setData] = useState({})

    useEffect(() => {
        const dbref = ref(db, `Products/${id.slice(1, id.length)}`)
        onValue(dbref, (snapShot) => {
            let data = snapShot.val()
            console.log(data)
            setData(data)
            // setData({data})
            console.log(Data)

            // for (const key in data) {
            //     if (data.hasOwnProperty(key)) {
            //         console.log(`Key =>${key} , value=> ${data[key]}`);
            //         setProduct({
            //             ...Product,
            //             key: data[key]
            //         })
            //         console.log(Product)
            //     }
            // }
            // for (const i of data) {
            //     console.log(i)
            // }

            // // setProductID(data.Product_ID)
            // setProductName(data.ProductName)
            // let quantity = parseInt(data.ProductQuantity)
            // setOldQuantity(quantity)
            // setpQuantity(data.ProductQuantity)
            // // console.log(typeof(quantity))

            // setPPrice(data.Product_Price)
            // setCompanyName(data.CompanyName)
            // setSupplierID(data.Supplier_ID)
            // setsupplierName(data.SupplierName)
            // setOldUrl(data.Product_Image)
        })
    }, [])
    const [ImgUrl, setImgUrl] = useState('')
    const [OldUrl, setOldUrl] = useState('')
    const HandleImg = (e) => {
        //  --------------------------- Image Upload Code --------------------
        const StorageRef = sRef(storage, `Images/${e.target.files[0].name}`)
        uploadBytes(StorageRef, e.target.files[0])
            .then((snapShot) => {
                getDownloadURL(snapShot.ref)
                    .then(async (url) => {
                        toast.info('Uploading Image')
                        setImgUrl(url)
                        let imgUrl
                        imgUrl = await url
                        if (ImgUrl == '') {
                            setImgUrl(imgUrl)
                            console.log(imgUrl)
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



    const setItem = async () => {

        const EditPro = ({ ...Data, ...Product })
        console.log(EditPro)
        const dbref = ref(db, `Products/${id.slice(1, id.length)}`)
        await update((dbref), EditPro)
        // console.log(ImgUrl)
        // console.log(OldUrl)
        // let date = new Date
        // date = date.toString()
        // let Curr_date = date.substring(3, 15)
        // // console.log(Curr_date)
        // let Curr_Time = date.substring(16, 25)
        // set((dbref, key), {

        // })
        toast.success("Product added", {
            hideProgressBar: true
        })
        // await Navigate('/dashboard/prod')


    }

    const gotoAllPro = () => {
        // setTimeout(() => {
        Navigate("/dashboard/prod")
        setImgUrl("")
        // }, 2000);
    }


    return (
        <Box >
            <Box my={1}>
                <Typography sx={{ color: "black", fontSize: "20px", textAlign: "left", fontWeight: "bold" }}>
                    Edit Product...
                </Typography>
                <Typography sx={{ textAlign: "left",  }}>
                    Edit Product in your inventory
                </Typography>
            </Box>


            <Box sx={{ my: 2 }}>
                <StepperForm Product={Data} setProduct={setData} HandleImg={HandleImg} addItem={setItem} gotoAllPro={gotoAllPro} />
            </Box>

        </Box>
    )
}

export default EditProduct
