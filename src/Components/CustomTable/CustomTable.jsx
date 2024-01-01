import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    Typography,
    OutlinedInput,
    Select,
    MenuItem,
    FormControl,
    InputAdornment,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    // TablePagination,
    Pagination,
    Stack,
} from "@mui/material";

import {
    AiOutlineClose,
    AiOutlineRight,
    AiOutlineCheckCircle,
    AiOutlineSearch,
    AiOutlineDown,
} from "react-icons/ai";
import tableImg from "../../Assests/altImg.png";
import { db } from "../../Config/Firebase";
import styled from "@emotion/styled";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
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


function CustomTable({ Data }) {

    const [SelectValue, setSelectValue] = useState("Name");
    // const { data: allDishes, isLoading } = useGetAllDishesQuery();
    // const user = JSON.parse(localStorage.getItem("user"));

    const [displayedData, setDisplayedData] = useState([]); // State for the displayed data
    const [page, setPage] = useState(1);

    const handleChange = (event, value) => {
        setPage(value);
    };


    const updateDisplayedData = () => {
        let startIndex = page * 6 - 6;
        let endIndex = startIndex + 6;
        console.log(startIndex, endIndex);
        console.log(`page ${page}`);

        let data = Data?.slice(startIndex, endIndex > Data?.length ? Data?.length : endIndex);
        setDisplayedData(data);
        console.log(data);
    };


    useEffect(() => {
        updateDisplayedData();
    }, [page, Data]);


    // Sorting Code
    const handleSelectChange = (event) => {
        setSelectValue(event.target.value);
        console.log(SelectValue);
    };

    return (
        <>
            <Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <OutlinedInput
                        fullWidth
                        endAdornment={
                            <InputAdornment position="end">
                                <AiOutlineSearch />
                            </InputAdornment>
                        }
                        placeholder="Search your Posts"
                        // onChange={handleSearch}
                        // value={search}
                        sx={{
                            backgroundColor: "#F6F6F6",
                            height: "45px",
                            maxWidth: "350px",
                            outlineColor: "red !important",
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#80B3B0",
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#80B3B0",
                            },
                        }}
                    />
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Typography color="text.secondary" sx={{ fontSize: 12, mr: 1 }}>
                            Sort By :
                        </Typography>
                        <FormControl>
                            <Select
                                align="left"
                                size="small"
                                value={SelectValue}
                                onChange={(e) => setSelectValue(e.target.value)}
                                IconComponent={AiOutlineDown}
                                // MenuProps={{
                                //     getContentAnchorEl: null,
                                //     anchorOrigin: {
                                //       vertical: 'bottom',
                                //       horizontal: 'left',
                                //     },
                                //     transformOrigin: {
                                //       vertical: 'top',
                                //       horizontal: 'left',
                                //     },
                                //     style: isSelectOpen ? { minWidth: '150px',backgroundColor:'red' } : {},
                                // style:  { minWidth: '150px',backgroundColor:'red' },
                                //   }}
                                sx={{
                                    backgroundColor: "#F6F6F6",
                                    height: "20px",
                                    width: "90px",
                                    outlineColor: "red !important",
                                    boxShadow: "none !important",
                                    fontSize: "12px",
                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#80B3B0",
                                    },
                                    "&:hover .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#80B3B0",
                                    },
                                }}
                            >
                                <MenuItem
                                    value="Name"
                                    selected={true}
                                    PaperProps={{
                                        className: "custom-menu-list",
                                    }}
                                    classes={{ paper: "custom-menu-paper" }}
                                    sx={
                                        SelectValue === "Name"
                                            ? {
                                                backgroundColor: "inherit !important",
                                                color: "black",
                                                fontWeight: "bold",
                                                display: "inline-block",
                                                width: "90%",
                                                minWidth: "150px",
                                                fontSize: "12px",
                                            }
                                            : { color: "#9EA3AE", fontSize: "12px" }
                                    }
                                >
                                    Name
                                </MenuItem>
                                {SelectValue === "Name" ? (
                                    <AiOutlineCheckCircle
                                        style={{
                                            // alignSelf: "end",
                                            // alignItems: "end",
                                            pr: 3,
                                            color: "#2B817B",
                                        }}
                                    />
                                ) : (
                                    ""
                                )}

                                <MenuItem
                                    value="Number"
                                    sx={
                                        SelectValue === "Number"
                                            ? {
                                                backgroundColor: "inherit !important",
                                                color: "black",
                                                fontWeight: "bold",
                                                display: "inline-block",
                                                width: "90%",
                                                minWidth: "150px",
                                                fontSize: "12px",
                                            }
                                            : { color: "#9EA3AE", fontSize: "12px" }
                                    }
                                >
                                    Number
                                </MenuItem>
                                {SelectValue === "Number" ? (
                                    <AiOutlineCheckCircle
                                        style={{
                                            alignSelf: "end",
                                            alignItems: "end",
                                            color: "#2B817B",
                                        }}
                                    />
                                ) : (
                                    ""
                                )}

                                <MenuItem
                                    value="A - Z"
                                    sx={
                                        SelectValue === "A - Z"
                                            ? {
                                                backgroundColor: "inherit !important",
                                                color: "black",
                                                fontWeight: "bold",
                                                display: "inline-block",
                                                width: "90%",
                                                minWidth: "150px",
                                                fontSize: "12px",
                                            }
                                            : { color: "#9EA3AE", fontSize: "12px" }
                                    }
                                >
                                    A - Z
                                </MenuItem>
                                {SelectValue === "A - Z" ? (
                                    <AiOutlineCheckCircle
                                        style={{
                                            alignSelf: "end",
                                            alignItems: "end",
                                            color: "#2B817B",
                                        }}
                                    />
                                ) : (
                                    ""
                                )}
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
                <Box sx={{ border: 1, borderRadius: 2, borderColor: "divider", mt: 2 }}>
                    <TableContainer
                        component={Paper}
                        sx={{ boxShadow: "none !important", borderRadius: "8px" }}
                    >
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow sx={{}}>
                                    <TableCell
                                        sx={{
                                            color: "#9EA3AE !important",
                                            borderBottom: "none !important",
                                            py: 1,
                                            px: 0,
                                            pr: 1,
                                            pl: 2,
                                        }}
                                    >
                                        #
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            color: "#9EA3AE !important",
                                            borderBottom: "none !important",
                                            py: 1,
                                            px: 0,
                                            pr: 1,
                                        }}
                                    >
                                        Photo
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            color: "#9EA3AE !important",
                                            borderBottom: "none !important",
                                            py: 1,
                                            px: 0,
                                            pr: 1,
                                        }}
                                    >
                                        Post Title
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            color: "#9EA3AE !important",
                                            borderBottom: "none !important",
                                            py: 1,
                                            px: 0,
                                            pr: 1,
                                        }}
                                    >
                                        Post Desc
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            color: "#9EA3AE !important",
                                            borderBottom: "none !important",
                                            py: 1,
                                            px: 0,
                                            pr: 1,
                                        }}
                                    >
                                        Post Date
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            color: "#9EA3AE !important",
                                            borderBottom: "none !important",
                                            py: 1,
                                            px: 0,
                                            pr: 1,
                                        }}
                                    >
                                        Post Status
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            color: "#9EA3AE !important",
                                            borderBottom: "none !important",
                                            py: 1,
                                            px: 0,
                                            pr: 1,
                                        }}
                                    >
                                        Action
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {displayedData?.map(
                                    (v, i) => {
                                        return (
                                            // v.owner === user._id && (
                                            <>
                                                <TableRow key={i}>
                                                    <TableCell
                                                        sx={{
                                                            fontSize: "14px",
                                                            borderBottom: "none",
                                                            py: 1,
                                                            px: 0,
                                                            pr: 1,
                                                            pl: 2,
                                                            // border:"1px solid red"
                                                        }}
                                                    >
                                                        {++i}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{
                                                            fontSize: "14px",
                                                            borderBottom: "none",
                                                            py: 1,
                                                            px: 0,
                                                            pr: 1,
                                                        }}
                                                    >
                                                        <img
                                                            src={v?.postImg ? v?.postImg : tableImg}
                                                            alt="card"
                                                            style={{ maxWidth: "40px", height: "40px" }}
                                                        />
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{
                                                            fontSize: "14px",
                                                            borderBottom: "none",
                                                            py: 1,
                                                            px: 0,
                                                            pr: 1,
                                                        }}
                                                    >
                                                        {v?.title?.length > 10 ? v?.title.slice(0, 10) + "..." : v?.title}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{
                                                            fontSize: "14px",
                                                            borderBottom: "none",
                                                            py: 1,
                                                            px: 0,
                                                            pr: 1,
                                                        }}

                                                    >
                                                        {v?.desc?.length > 10 ? v?.desc.slice(0, 10) + "..." : v?.desc}
                                                        {/* {getSubCuisine(v.subCuisine)} */}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{
                                                            fontSize: "14px",
                                                            borderBottom: "none",
                                                            py: 1,
                                                            px: 0,
                                                            pr: 1,
                                                        }}
                                                    >
                                                        {v?.date}
                                                        {/* {getMealplan(v.menuName)} */}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{
                                                            fontSize: "14px",
                                                            borderBottom: "none",
                                                            p: 2,
                                                            width: "160px",
                                                        }}
                                                    >
                                                        <Typography sx={{
                                                            color: `${v?.status === "active" ? "#30A15F  " : "#FF8D85"
                                                                }`,
                                                            border: `1px solid ${v?.status === "active" ? "#30A15F  " : "#FF8D85"
                                                                }`,
                                                            width: "60px",
                                                            textAlign: "center",
                                                            borderRadius: "5px",
                                                            fontWeight: "bold"
                                                        }}>
                                                            {v?.status}
                                                        </Typography>
                                                    </TableCell>

                                                    <TableCell
                                                        sx={{
                                                            fontSize: "14px",
                                                            borderBottom: "none",
                                                            py: 1,
                                                            px: 0,
                                                            pr: 1,
                                                        }}
                                                    >
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
                                                                        // onClick={() => EditUser(row._id)}
                                                                        >
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
                                                                                    borderLeft: "4px solid red",
                                                                                    borderRight: "4px solid red",
                                                                                },
                                                                            }}
                                                                        // onClick={() => handleDeleteUser(row._id)}
                                                                        >
                                                                            <Typography
                                                                                sx={{
                                                                                    padding: "0 5px",
                                                                                    fontSize: "12px",
                                                                                    cursor: "pointer",
                                                                                }}
                                                                            >
                                                                                Delete
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
                                                    </TableCell>
                                                </TableRow >
                                            </>
                                            // )
                                        )
                                    }
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Box sx={{ display: "flex", justifyContent: "space-between", m: 2 }}>
                        <Typography color="text.secondary" fontSize="14px">
                            Show 1-6 of {Data?.length} entries
                        </Typography>

                        <Stack spacing={2}>
                            <Pagination
                                variant="outlined"
                                shape="rounded"
                                // defaultPage={1}
                                page={page}
                                onChange={handleChange}
                                count={Math.ceil(Data.length / 6)}
                                sx={{
                                    "& .MuiPaginationItem-root": {
                                        backgroundColor: "inherit",
                                        color: "#2B817B !important",
                                        borderRadius: 2,
                                    },
                                    "& .MuiPaginationItem-root.Mui-selected": {
                                        backgroundColor: "#2B817B !important",
                                        color: "white !important",
                                        border: "none",
                                    },
                                }}
                            />
                        </Stack>
                    </Box>
                </Box>
            </Box >

        </>)
}

export default CustomTable