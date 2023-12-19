

// import * as React from 'react';
import styled from '@emotion/styled';
import { Avatar } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography } from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

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


// const rows = [
//     { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//     { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//     { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//     { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//     { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//     { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//     { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//     { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

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


export default function ProductTable({ rows, EditPro, SellPro }) {


  const columns = [
    { field: 'id', headerName: '#', width: 70 },
    { field: 'pName', headerName: 'Product Name', width: 150 },
    {
      field: 'imgUrl', headerName: 'Product Image', width: 150, type: "image",
      renderCell: (params) => {
        return (
          <Avatar
            alt="Product Image"
            src={params.value}
            sx={{
              width: "60%", height: "7.5vh",
              borderRadius: "0px"

            }}

          />
        );
      },
    },
    { field: 'pQty', headerName: 'Product Quantity', width: 150 },
    { field: 'pPrice', headerName: 'Product Price', width: 170 },

    { field: 'cName', headerName: 'Company Name', width: 170 },
    { field: 'date', headerName: 'Date', width: 170 },
    {
      field: 'action',
      headerName: 'Action',
      // description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 100,
      type: "image",
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
                    onClick={() => EditPro(params.row.prodKey)}
                  >
                    <DriveFileRenameOutlineIcon sx={{ fontSize: "18px" }} />
                    <Typography
                      sx={{
                        padding: "0 5px",
                        fontSize: "12px",
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      padding: "4px 5px",
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      "&:hover": {
                        borderLeft: "4px solid green",
                        borderRight: "4px solid green",
                      },
                    }}
                    onClick={() => SellPro(params.row.prodKey)}
                  >
                    {/* <Typography > */}
                    <AttachMoneyIcon sx={{ fontSize: "18px" }} />
                    {/* </Typography> */}
                    <Typography
                      sx={{
                        padding: "0 5px",
                        fontSize: "12px",
                        cursor: "pointer",
                      }}
                    >
                      Sale
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
    <div style={{ height: 400, width: '100%' }}>
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
