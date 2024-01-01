import React from 'react'
import './Dashboard.css'
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
