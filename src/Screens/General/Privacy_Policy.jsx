import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import Header from '../../Components/Header/Header'
// import CustomTable from '../CustomTable/CustomTable'
import { db } from '../../Config/Firebase'
import { addDoc, collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import AddForm from '../../Components/AddForm/AddForm'
import Swal from 'sweetalert2'
import ShowGeneral from '../../Components/Show_General/ShowGeneral'

function Privacy_Policy() {
    const [edit, setEdit] = useState(false);
    const [Data, setData] = useState([]); // State for the original data
    const [DocId, setDocId] = useState("")
    const getData = async () => {
        const querySnapshot = await getDocs(collection(db, "Privacy_Policy"));
        const newData = querySnapshot.docs.map((doc, i) => {
            setData(doc?.data())
            setDocId(doc?.id)
            // console.log(doc.data())
        })
        console.log(DocId)
    };
    React.useEffect(() => {
        getData();
    }, []);

    // const [title, setTitle] = useState("")
    // const [desc, setDesc] = useState("")
    const [handleImg, setHandleImg] = useState([])
    const [ImgUrl, setImgUrl] = useState("")

    const publishPolicy = async (title, desc) => {
        console.log(title, desc)
        // console.log("publishPost")
        if (!title || !desc) {
            Swal.fire("Error", "Title & Desc can't be null", "error")
        } else {
            await setDoc(doc(db, "Privacy_Policy", DocId), {
                title: title,
                desc: desc,
                // status: "active",
            }).then(() => {
                Swal.fire("Success", "Policy Added...", "success")
                setEdit(false)
            }).catch((err) => {
                Swal.fire("Error", err.message, "error")
            })
        }
    }

    return (
        <>
            {!edit && (<Box>
                <Header btnTitle={"Add Policy"} heading={"Privacy Policy"} setedit={setEdit} />
                <ShowGeneral heading={Data.title} description={Data.desc} />
                {/* <CustomTable Data={Data} /> */}
            </Box>)
            }
            {edit && (
                <>
                    <AddForm
                        heading={"Policy"}
                        setEdit={setEdit}
                        input2Name={"Desc"}
                        input2PlaceHolder={"Enter Desc"}
                        btnTitle={"Add Policy"}
                        publish={publishPolicy}
                        setHandleImg={setHandleImg}
                        handleImg={handleImg}
                        ImgUrl={ImgUrl}
                        setImgUrl={setImgUrl}
                        showImgOpt={false}
                    />
                </>
            )}
        </>
    )
}

export default Privacy_Policy