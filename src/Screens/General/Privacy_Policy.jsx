import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import Header from '../../Components/Header/Header'
// import CustomTable from '../CustomTable/CustomTable'
import { db } from '../../Config/Firebase'
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import AddForm from '../../Components/AddForm/AddForm'
import Swal from 'sweetalert2'
import ShowGeneral from '../../Components/Show_General/ShowGeneral'

function Privacy_Policy() {
    const [edit, setEdit] = useState(false);
    const [Data, setData] = useState([]); // State for the original data
    const [DocId, setDocId] = useState(null)
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
    }, [edit]);

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
            if (DocId !== null) {
                await setDoc(doc(db, "Privacy_Policy", DocId), {
                    title: title,
                    desc: desc,
                    // PostImg: ImgUrl,
                    // status: "active",
                }).then(() => {
                    Swal.fire("Success", "Policy Updated...", "success")
                    setEdit(false)
                }).catch((err) => {
                    Swal.fire("Error", err.message, "error")
                })
            } else {
                await addDoc(collection(db, "Privacy_Policy"), {
                    title: title,
                    desc: desc,
                    // PostImg: ImgUrl,
                    // status: "active",
                }).then(() => {
                    Swal.fire("Success", "Policy Added...", "success")
                    setEdit(false)
                }).catch((err) => {
                    Swal.fire("Error", err.message, "error")
                })

            }
        }
    }

    const deletePolicy = async () => {
        console.log("deltre")
        await deleteDoc(doc(db, "Privacy_Policy", DocId)).then((res) => {
            setData(null)
            Swal.fire("Success", "Deleted Successfully...", "success")
            window.location.reload();
        }).catch((err) => {
            console.log(err.message)
            Swal.fire(err.message, "success")

        })
    }

    return (
        <>
            {!edit && (<Box>
                <Header btnTitle={DocId === null ? "Add Policy" : "Update Policy"} heading={"Privacy Policy"} setedit={setEdit} />
                <ShowGeneral
                    heading={Data?.title}
                    description={Data?.desc}
                    deleteFunc={deletePolicy}
                // Ensure deletePolicy is passed correctly
                />
                {/* <CustomTable Data={Data} /> */}
            </Box>)
            }
            {edit && (
                <>
                    <AddForm
                        heading={"Policy"}
                        setEdit={setEdit}
                        btnTitle={DocId === null ? "Add Policy" : "Update Policy"}
                        publish={publishPolicy}
                        showImgOpt={false}
                    // Title={DocId !== null && Data?.title}
                    // Desc={DocId !== null && Data?.desc}
                    />
                </>
            )}
        </>
    )
}

export default Privacy_Policy