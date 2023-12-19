import { Box, TextField, Button } from '@mui/material'
import React from 'react'

function Product1Form({ Product, setProduct, SellPro }) {
    const handleInputChange = (e) => {
        setProduct({ ...Product, [e.target.name]: e.target.value })
        console.log(Product)
    }
    return (
        <Box>

            <Box className="mainDetails supplier" >
                <h2>Supplier Details</h2>

                <TextField id="outline-basic" label="Supplier ID" variant="outlined" className='Inputs' onChange={!SellPro && handleInputChange} name="supId"
                    value={Product?.supId} />

                <TextField id="outline-basic" label="Supplier Name" variant="outlined" className='Inputs' onChange={!SellPro && handleInputChange} name="supName"
                    value={Product?.supName} />
            </Box>
        </Box>
    )
}

export default Product1Form
