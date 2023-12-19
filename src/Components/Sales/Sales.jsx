import { Box, Typography } from '@mui/material'
import React, {  useState } from 'react'
// import React, { useEffect, useState } from 'react'
// import { db } from '../../Config/Firebase'
// import { onValue, ref } from 'firebase/database'
// import ProductTable from '../Products/ProductTable'
import SalesTable from './SalesTable'
function Sales() {
    const [rows, setrows] = useState([])
    // useEffect(() => {
    //     const dbref = ref(db, 'Sales')
    //     onValue(dbref, async (snapShot) => {
    //         const data = snapShot.val()
    //         if (data) {
    //             let dataArr = Object.values(data)
    //             let prodArr = []
    //             console.log(dataArr)
    //             let User_ID = localStorage.getItem("User_ID")
    //             if (dataArr.length > 0) {
    //                 dataArr.forEach((obj, i) => {
    //                     if (obj.userId == User_ID) {
    //                         obj.id = i + 1
    //                         prodArr.push(obj)
    //                     }
    //                 })
    //                 setrows(prodArr)
    //             }
    //             // else {
    //             //     setrows(dataArr)
    //             // }
    //             // setProd(prodArr)
    //             console.log(rows)
    //         }
    //     })
    // }, [rows])

    return (
        <Box>
            <Box>
                <Typography sx={{ fontSize: "25px", color: "black", fotnWeight: "bolder", textAlign: "left" }}>
                    Sales
                </Typography>
            </Box>


            <Box border="1px solid #e1e1e6"
                p="10px 20px"
                borderRadius="8px">
                <SalesTable rows={rows} />
            </Box>
        </Box>
    )
}

export default Sales
