

// import * as React from 'react';
import styled from '@emotion/styled';
import { Avatar } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography } from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SwipeRightIcon from '@mui/icons-material/SwipeRight';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import tableImg from "../../Assests/altImg.png"


const ParentBox = styled(Box)`
  height: 100px;
  width: 100%;
  box-shadow: 5px 5px 15px #aaaaaa;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "white",
    color: "rgba(0, 0, 0, 0.87)",
    // boxShadow: theme,
    fontSize: 11,
    minWidth: 110,
  },
}));
const CustomWidthTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 500,
  },
});



const StyledGrid = styled(DataGrid)(({ theme }) => ({
  "& .css-17jjc08-MuiDataGrid-footerContainer": {
    display: "none",
  },
  boxShadow: "none",
  border: "none",
  borderColor: "green",
  color: "black",
  fontWeight: "bold",
  "& .MuiDataGrid-cell:focus": {
    outline: "none",
    color: "#1A1824",
    border: "1px solid transparent !important",
  },
  "& .MuiDataGrid-iconButtonContainer": {
    marginLeft: "2px",
    visibility: "visible !important",
    width: "auto !important",
  },
  "& .css-gl260s-MuiDataGrid-columnHeadersInner": {
    color: "#9EA3AE",
  },
}))


export default function RequestTable({ rows, acceptReq, rejectReq }) {


  const columns = [
    { field: 'id', headerName: '#', width: 70 },
    { field: 'mainType', headerName: "Request Title", width: 150 },
    {
      field: 'requestImg', headerName: 'Req Image', width: 150, type: "image",
      renderCell: (params) => {
        return (
          <Avatar
            alt="Product Image"
            src={params?.value !== null ? params?.value : tableImg}
            sx={{
              width: "60%", height: "7.5vh",
              borderRadius: "0px",
              backgroundImage: "contain"

            }}

          />
        );
      },
    },
    { field: 'name', headerName: 'Applicant Name', width: 150 },
    { field: 'gender', headerName: 'Applicant Gender', width: 150 },
    { field: 'Cnic', headerName: 'Applicant CNIC', width: 150 },
    { field: 'Phone', headerName: 'Applicant Phone', width: 170 },
    {
      field: 'createdAt', headerName: 'Date', width: 100,
      renderCell: (params) => {
        const { value } = params
        console.log("params", params.value)
        return (
          // <Box > 
          <Typography sx={{ border: "1px solid #bbbbbb", borderRadius: "5px", padding: "2px 5px" }}>
            {params?.value}
            {/* {params?.value.slice(0, 8)} */}
          </Typography>
          // </Box>
        );
      }
    },

    { field: 'type', headerName: 'Req Types', width: 170 },
    {
      field: 'status', headerName: 'Req Status', width: 170,
      renderCell: (params) => {
        const { value } = params
        console.log("status :", value)
        return (
          <Typography sx={{
            color: `${value !== "request" ? value === "approve" ? "#30A15F" : "red" : "#0A81C5"
              }`,
            border: `1px solid ${value !== "request" ? value === "approve" ? "#30A15F" : "red" : "#0A81C5"
              }`,
            width: "80px",
            textAlign: "center",
            borderRadius: "5px",
            fontWeight: "bold",
            padding: "1px"
          }}>
            {value}
          </Typography>

        )
      }
    },
    // { field: 'date', headerName: 'Date', width: 170 },
    {
      field: 'action',
      headerName: 'Action',
      // description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 100,
      // type: "image",
      renderCell: (params) => {
        return (
          <LightTooltip
            placement='bottom-end'
            sx={{ minWidth: 20 }}
            title={
              <>
                <Box>
                  <Box
                    sx={{
                      padding: "4px 5px",
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      "&:hover": {
                        borderLeft: "4px solid blue",
                        borderRight: "4px solid blue",
                      },
                    }}
                    onClick={() => acceptReq(params.row.postId)}
                  >
                    <SwipeRightIcon sx={{ fontSize: "18px" }} />
                    <Typography
                      sx={{
                        padding: "0 5px",
                        fontSize: "12px",
                        cursor: "pointer",
                      }}
                    >
                      Approve
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      padding: "4px 5px",
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      "&:hover": {
                        borderLeft: "4px solid rgb(231, 92, 98)",
                        borderRight: "4px solid rgb(231, 92, 98)",
                      },
                    }}
                    onClick={() => rejectReq(params.row.postId)}
                  >
                    {/* <Typography > */}
                    <ThumbDownAltIcon sx={{ fontSize: "18px" }} />
                    {/* </Typography> */}
                    <Typography
                      sx={{
                        padding: "0 5px",
                        fontSize: "12px",
                        cursor: "pointer",
                      }}
                    >
                      Reject
                    </Typography>
                  </Box>
                </Box>
              </>
            }
          >
            <Box
              sx={{
                border: "1px solid rgb(137, 138, 154)",
                height: "30px",
                width: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                borderRadius: "6px"
              }}
            //   onClick={handleMenuClick}
            >
              <MoreHorizIcon
                sx={{ fontSize: "16px", p: 0 }}
              />
            </Box>
          </LightTooltip>

        );
      },
      // valueGetter: (params) =>
      //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
  ];
  return (
    <div style={{ height: "70vh", width: '100%' }}>
      <StyledGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection={false}
      />
    </div>
  );
}
