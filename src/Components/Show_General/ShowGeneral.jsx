import { Box, Typography } from '@mui/material'
import React from 'react'

function ShowGeneral({ heading, description }) {
    return (
        <>
            <Box>
                <Box>
                    <Box>
                        <Typography sx={{ fontWeight: "bold", fontSize: 25 }}>
                            {heading ? heading : "no data"}
                        </Typography>
                    </Box>

                    <Box sx={{ p: 1 }}>
                        <Typography>
                            {description ? description : "no data"}
                        </Typography>
                    </Box>
                </Box>
            </Box>

        </>
    )
}

export default ShowGeneral