// import { onValue, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { db } from '../../Config/Firebase'
// import './Product.css'
import { Box,  } from "@mui/material"
import { useNavigate } from 'react-router-dom'
// import ProductTable from './RequestTable'
// import { useDispatch, useSelector } from 'react-redux'
// import { getAllProduct } from '../../Redux/actions'
import RequestTable from './RequestTable'
import { collection, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore'
import Header from '../../Components/Header/Header'




function Requests() {
  const [rows, setRows] = useState([])
  const [docId, setdocId] = useState(null)
  let Navigate = useNavigate()
  const getData = async () => {
    let User_ID = localStorage.getItem("User_ID")
    if (!User_ID) {
      Navigate('/')
    }
    else {
      await getDocs(collection(db, "Requests"))
        .then((querySnapshot) => {
          const newData = querySnapshot.docs
            .map((doc, i) => ({ ...doc.data(), id: ++i, postId: doc.id }));
          setRows(newData);
          console.log("request", newData);
        })
    }
  }


  useEffect(() => {
    getData()
  }, [docId])

  const acceptReq = async (id) => {
    console.log(id)
    setdocId(id)
    await updateDoc(doc(db, "Requests", id), {
      status: "approve"
    })
    // .then((res)=>{

    // })
    // localStorage.setItem('key', e.target.value)
    // Navigate(`/dashboard/EditPro/:${id}`)
  }
  const rejectReq = async (id) => {
    console.log(id)
    setdocId(id)
    await updateDoc(doc(db, "Requests", id), {
      status: "reject"
    })
    // console.log(e.target.value)
    // localStorage.setItem('key', e.target.value)
    // Navigate(`/dashboard/SellPro/:${id}`)
  }


  return (
    <Box>
      <Header heading={"All Requests"} />

      <Box border="1px solid #e1e1e6"
        p="10px 20px"
        borderRadius="8px"
      // height="70vh"
      >
        <RequestTable rows={rows} acceptReq={acceptReq} rejectReq={rejectReq} />
      </Box>
    </Box>
  )
}

export default Requests

