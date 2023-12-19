import {
    Box,
} from "@mui/material";
import React from "react";
import Charts from "react-apexcharts";
// import "./SalesChartCss.css";

export default function MyChart({ sales }) {
    var options = {
        title: {
            text: "Sales Charts",
            align: "left",
            style: {
                fontFamily: "Outfit",
                fontWeight: "600",
                fontSize: "18px",
                lineHeight: "26px",
            },
        },
        markers: {
            colors: "#6A82CF",
            strokeColors: "#6A82CF",
            strokeWidth: 0,
            strokeOpacity: 0.9,
            strokeDashArray: 0,
            fillOpacity: 1,
        },
        chart: {
            height: 380,
            width: "100%",
            type: "line",
            zoom: false,
            toolbar: {
                tools: {
                    download: false, //disable burgerMenu
                },
            },
        },
        // to set thickness of chart line
        stroke: {
            show: true,
            curve: "straight",
            width: 1.5,
        },
        //for chart shoswing tooltip
        dataLabels: {
            enabled: true,
            style: {
                fontSize: "8px",
            },
            background: {
                enabled: true,
                foreColor: "#6A82CF",
                padding: 0,
                borderRadius: 10,
                borderWidth: 0,
                borderColor: "#6A82CF",
                opacity: 1,
            },
            textAnchor: "middle",
            offsetX: 0,
            offsetY: 0,
        },
        series: [
            {
                name: "Sales",
                data: [0, ...sales],
                style: {
                    fontSize: "8px ",
                    fontFamily: "Outfit",
                    background: "red",
                },
            },
        ],
        xaxis: {
            type: "category",
            categories: [
                "Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6",
                "Day 7", "Day 8", "Day 9", "Day 10", "Day 11", "Day 12",
                "Day 13", "Day 14", "Day 15", "Day 16", "Day 17", "Day 18", "Day 19", "Day 20", "Day 21", "Day 22", "Day 23", "Day 24", "Day 25", "Day 26", "Day 27", "Day 28", "Day 29", "Day 30",
            ],
        }
    }
    console.log(sales)



    return (
        <Box padding={2} sx={{ border: "1px solid #E1e1e6", width: "70%", borderRadius: "5px" }} >

            <Charts
                options={options}
                series={options.series}
                type="line"
                width="100%"
                height="350px"
            // style={{ border: "1px solid red" }}
            />
        </Box >
    );
};
