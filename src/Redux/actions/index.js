import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../Config/Firebase";
import { onValue, ref } from "firebase/database";

// let value = 0;
let value = 0
export const Increment = createAsyncThunk("Increment", async () => {
    return value = value + 1;
});
export const getAllProduct = createAsyncThunk("getAllProduct", async () => {
    //  ----------- Call getProductData Function -----------
    const dbref = ref(db, 'Products')
    onValue(dbref, async (snapShot) => {
        const data = snapShot.val()
        console.log(data)
        if (data) {
            return data
            // let dataArr = Object.values(data)
            // let prodArr = []
            // let User_ID = localStorage.getItem("User_ID")
            // // let index = 0
            // Object.values(data).forEach((obj, i) => {
            //     if (obj.userId == User_ID) {
            //         obj.id = i + 1
            //         prodArr.push(obj)
            //     }
            // })


            // console.log(prodArr)
            // for (const i of dataArr) {

            //  console.log(prodArr)
            //  // }
            //  setRows(prodArr)

        }
        // setProductData(ProductData)

    })
})