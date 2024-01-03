import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
function ShowGeneral({ heading, description, deleteFunc, showImg, chairManImg }) {
    console.log(deleteFunc)
    console.log("chairManImg",chairManImg)
    console.log("chairManImg",showImg)
    return (
        <>
            <Box>
                <Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Box>
                            {showImg && (
                                <Box>
                                    <img src={chairManImg} style={{ width: "30%" }} />    
                                </Box>

                            )}
                            <Typography sx={{ fontWeight: "bold", fontSize: 25 }}>
                                {heading ? heading : "Not Found"}
                            </Typography>
                        </Box>
                        <Box>
                            <Button color="error"
                                onClick={() => deleteFunc()}
                            >
                                <DeleteIcon />
                            </Button>
                        </Box>
                    </Box>

                    <Box sx={{ p: 1 }}>
                        <Typography>
                            {description ? description : "Not Found"}
                        </Typography>
                    </Box>
                </Box>
            </Box>

        </>
    )
}

export default ShowGeneral