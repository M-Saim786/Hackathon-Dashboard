import React from "react";
import {
  Box,
  Button,
  Typography,

} from "@mui/material";
function Header({ setedit, btnTitle, heading }) {
  return (
    <Box sx={{ m: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography fontWeight="bold" fontSize={20}>{heading && heading}</Typography>
        {btnTitle &&
          (<Button
            variant="contained"
            //   disabled={input.name.length < 3}
            onClick={() => setedit(true)}
            sx={{
              // color:'#2B817B',
              backgroundColor: "#0072BB",
              borderColor: "#2B817B",
              fontSize: "16px",
              "&:hover": { backgroundColor: "#0072BB" },
              "&.Mui-disabled": { backgroundColor: "#D5E6E5" },
              textTransform: "capitalize",
              fontWeight: "bold"
            }}
          >
            + {btnTitle}
          </Button>)}
      </Box>

    </Box>
  )
}

export default Header