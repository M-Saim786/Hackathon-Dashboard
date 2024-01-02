import {
    Box,
} from "@mui/material";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import Charts from "react-apexcharts";
// import "./SalesChartCss.css";

export default function MyChart({ EduReq, moneyReq, clothsReq, medicalReq, title, series, labels }) {
    console.log("title", title)
    const chartData = {
        series: series,
        labels: labels,
        title: {
            text: title,
            style: {
                fontFamily: "Outfit",
                fontWeight: "600",
                fontSize: "18px",
                lineHeight: "26px",
            },
        },
        options: {

            chart: {
                type: 'donut',
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        },
    }

    return (

        <ReactApexChart
            options={chartData}
            series={chartData.series}
            type="donut"
            width="100%"
            height="350px"
        />

    );
};