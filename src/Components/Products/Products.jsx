import { onValue, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { db } from '../../Config/Firebase'
// import './Product.css'
import { Box, Typography, styled } from "@mui/material"
import { useNavigate } from 'react-router-dom'
import ProductTable from './ProductTable'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProduct } from '../../Redux/actions'




function Products() {
  const dispatch = useDispatch()
  const [rows, setRows] = useState([])
  const product = useSelector((state) => state.counter)
  console.log(product)
  let Navigate = useNavigate()
  // useEffect(() => {
  //  //  ----------- Call getProductData Function -----------
  //  const dbref = ref(db, 'Products')
  //  onValue(dbref, async (snapShot) => {
  //    const data = snapShot.val()
  //    console.log(data)
  //    if (data) {
  //      let dataArr = Object.values(data)
  //      let prodArr = []
  //      let User_ID = localStorage.getItem("User_ID")
  //      // let index = 0
  //      dataArr.forEach((obj, i) => {
  //        if (obj.userId == User_ID) {
  //          obj.id = i + 1
  //          prodArr.push(obj)
  //        }
  //      })
  //      // console.log(dataArr)
  //      // for (const i of dataArr) {

  //      console.log(prodArr)
  //      // }
  //      setRows(prodArr)

  //    }
  //    // setProductData(ProductData)

  //  })
  //   // Example array of objects
  //   // const objects = [{ name: 'Object 1' }, { name: 'Object 2' }, { name: 'Object 3' }];

  //   // Using forEach to iterate and add 'id' field
  //   // objects.forEach((obj, index) => {
  //   //   obj.id = index + 1;
  //   // });

  //   // Log the updated objects
  //   // console.log(objects);


  // }, [])


  const getKey = (id) => {
    // console.log(e.target.value)
    // localStorage.setItem('key', e.target.value)
    Navigate(`/dashboard/EditPro/:${id}`)
  }
  const SellPro = (id) => {
    // console.log(e.target.value)
    // localStorage.setItem('key', e.target.value)
    Navigate(`/dashboard/SellPro/:${id}`)
  }


  return (
    <Box>
      <Box>
        <Typography sx={{ fontSize: "25px", color: "black", fotnWeight: "bolder", textAlign: "left" }}>
          Products
        </Typography>
      </Box>

      <Box border="1px solid #e1e1e6"
        p="10px 20px"
        borderRadius="8px">
        <ProductTable rows={rows} EditPro={getKey} SellPro={SellPro} />
      </Box>
    </Box>
  )
}

export default Products

