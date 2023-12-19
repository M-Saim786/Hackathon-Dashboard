import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
// import { StpperForm } from './AddPorduct'
import { Button, TextField } from '@mui/material';
import { getDownloadURL, ref as sRef, uploadBytes } from 'firebase/storage';
import { db, storage } from '../../Config/Firebase';
import { onValue, push, ref, set, update } from 'firebase/database';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import StepperForm from '../Products/StepperForm/SteperForm';
// import StepperForm from './StepperForm/SteperForm';
function SellProducts() {
    const Navigate = useNavigate()
    const { id } = useParams()
    // console.log(id)


    let date = new Date
    date = date.toString()
    let Curr_date = date.substring(3, 15)
    // console.log(Curr_date)
    let Curr_Time = date.substring(16, 25)
    // const [Product, setProduct] = useState({
    //     date: Curr_date,
    //     time: Curr_Time,
    //     // userId: id.slice(1, id.length)
    // })

    const [Data, setData] = useState({})

    useEffect(() => {
        const dbref = ref(db, `Products/${id.slice(1, id.length)}`)
        onValue(dbref, (snapShot) => {
            let data = snapShot.val()
            // console.log(data)
            setData(data)
            // setData({data})
            console.log(Data)

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



    const sellItem = async () => {
        console.log(P_p_Qty)
        console.log(Data?.pQty - P_p_Qty?.pQty)
        const obj = {
            pQty: Data?.pQty - P_p_Qty?.pQty,
            // pPrice: P_p_Qty?.pPrice
        }
        // console.log(obj)
        console.log(Data)
        const EditPro = { ...Data, ["pQty"]: Data?.pQty - P_p_Qty?.pQty }
        console.log(`New Removed => ${{ ...Data, ["pQty"]: Data?.pQty - P_p_Qty?.pQty }}`)
        console.log(`New Removed => ${JSON.stringify(EditPro)}`)
        const dbref = ref(db, `Products/${id.slice(1, id.length)}`)
        await update((dbref), EditPro)

        const dateTime = {
            date: Curr_date,
            time: Curr_Time,
            pPrice: P_p_Qty?.pPrice,
            pQty: P_p_Qty?.pQty
        }
        const saleObj = { ...Data, ...dateTime }
        console.log(JSON.stringify(saleObj))

        const saleRef = ref(db, `Sales/${id.slice(1, id.length)}`)
        await set((saleRef), saleObj)
        // console.log(ImgUrl)
        // console.log(OldUrl)
        // let date = new Date
        // date = date.toString()
        // let Curr_date = date.substring(3, 15)
        // // console.log(Curr_date)
        // let Curr_Time = date.substring(16, 25)
        // set((dbref, key), {

        // })
        toast.success("Sale Successfull..!", {
            hideProgressBar: true
        })
        // await Navigate('/dashboard/prod')
    }

    const gotoAllPro = () => {
        // setTimeout(() => {
        Navigate("/dashboard/prod")
        // }, 2000);
    }
    const [SellPro, setSellPro] = useState(true)
    const [P_p_Qty, setP_p_Qty] = useState({})
    return (
        <Box >
            <Box my={1}>
                <Typography sx={{ color: "black", fontSize: "20px", textAlign: "left", fontWeight: "bold" }}>
                    Sale Product...
                </Typography>
                <Typography sx={{ textAlign: "left",  }}>
                    Sale Product in your inventory
                </Typography>
            </Box>


            <Box sx={{ my: 2 }}>
                <StepperForm Product={Data} setProduct={setData} P_p_Qty={P_p_Qty} setP_p_Qty={setP_p_Qty} addItem={sellItem} gotoAllPro={gotoAllPro} SellPro={SellPro} />
            </Box>

        </Box>
    )
}

export default SellProducts
