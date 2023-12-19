import React from 'react'
import './Dashboard.css'
// import { Box } from '@mui/material';
// import { Route, Routes } from "react-router-dom";
// import Sidebar from './Sidebar'
// import Products from "./Products/Products";
// import DashboardContent from './DashboardContent';
// import AddPorduct from './Products/AddPorduct';
// import Settings from './Settings';
// // import Sales from './Sales/Sales';
// import EditProduct from './EditProduct';
// import SellProduct from './SellProduct';
// import PersistentDrawerLeft from './Drawer';
import ResponsiveDrawer from './ResponsiveDrawer';
export default function Dashboard(props) {
    const { Component } = props;
    return (
        <>
            {/* <Box> */}
            <ResponsiveDrawer>
                <Component />
            </ResponsiveDrawer>
        </>
    )
}
