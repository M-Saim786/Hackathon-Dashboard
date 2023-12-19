import React from "react"
import { Box, TextField, Typography } from "@mui/material"


export default function Product0Form({ Product, setProduct, HandleImg, SellPro, P_p_Qty, setP_p_Qty }) {
    const handleInputChange = (e) => {
        setProduct({ ...Product, [e.target.name]: e.target.value })
        console.log(Product)
    }
    const handleP_p_Qty = (e) => {
        setP_p_Qty({ ...P_p_Qty, [e.target.name]: e.target.value })
        // console.log(Product?.pQty)
        console.log(P_p_Qty?.pPrice)
        // console.log(Product?.pQty)
        // console.log(P_p_Qty?.pQty)

    }
    return (
        <Box className="mainDetails">

            <Box>
                <Typography sx={{ fontSize: "25px", fontWeight: "bold" }}>
                    Product Details
                </Typography>
            </Box>


            <TextField
                id="outline-basic"
                // label={Product?.product_Id ? "" : "Enter Product ID"} // Static label
                label={"Enter Product ID"} // Static label
                variant="outlined"
                className='Inputs'
                onChange={!SellPro && handleInputChange}
                name="product_Id"
                value={Product?.product_Id}
            />


            <TextField id="outline-basic" label={"Product Name"} variant="outlined" className='Inputs' name="pName"
                value={Product?.pName}
                onChange={!SellPro && handleInputChange}
            />
            <TextField id="outline-basic" label="Product Quantity" variant="outlined" className='Inputs' type='number' name="pQty" value={SellPro ? P_p_Qty?.pQty : Product?.pQty}
                onChange={SellPro ? handleP_p_Qty : handleInputChange}
                helperText={(P_p_Qty?.pQty !== undefined) > Product?.pQty ? "Value is Greater than quantity present in Inventory" : ""}
                error={(P_p_Qty?.pQty !== undefined) > Product?.pQty && true}
            />
            <TextField id="outline-basic" label="Prodcut Price" variant="outlined" className='Inputs' name="pPrice" value={SellPro ? P_p_Qty?.pPrice : Product?.pPrice}
                onChange={SellPro ? handleP_p_Qty : handleInputChange}
            />
            <TextField id="outline-basic" type='file' variant="outlined" className='Inputs' name="pImg" value={Product?.pImg}
                onChange={HandleImg}
            />
            <TextField id="outline-basic" label="Company Name" variant="outlined" className='Inputs' name="cName" value={Product?.cName}
                onChange={!SellPro && handleInputChange}
            />
        </Box>
    )
}