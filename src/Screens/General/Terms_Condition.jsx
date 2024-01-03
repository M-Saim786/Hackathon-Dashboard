import { Box } from '@mui/material'
import React, { useState } from 'react'
import Header from '../../Components/Header/Header'
import ShowGeneral from '../../Components/Show_General/ShowGeneral'
import AddForm from '../../Components/AddForm/AddForm'
import { addDoc, collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore'
import { db } from '../../Config/Firebase'
import Swal from 'sweetalert2'

function Terms_Condition() {
    const [edit, setEdit] = useState(false)
    const [Data, setData] = useState([]); // State for the original data
    const [DocId, setDocId] = useState(null)
    const getData = async () => {
        const querySnapshot = await getDocs(collection(db, "Terms_Condition"));
        const newData = querySnapshot.docs.map((doc, i) => {
            setData(doc?.data())
            setDocId(doc?.id)
            console.log(doc.data())
        })
        console.log(DocId)
        console.log(Data)
    };
    React.useEffect(() => {
        getData();
    }, [edit]);

    // const [title, setTitle] = useState("")
    // const [desc, setDesc] = useState("")
    // const [handleImg, setHandleImg] = useState([])
    // const [ImgUrl, setImgUrl] = useState("")

    const publishTerms = async (title, desc) => {
        console.log(title, desc)
        console.log("publishPost")
        if (!title || !desc) {
            Swal.fire("Error", "Title & Desc can't be null", "error")
        } else {
            if (DocId !== null) {
                await setDoc(doc(db, "Terms_Condition", DocId), {
                    title: title,
                    desc: desc,
                    // PostImg: ImgUrl,
                    // status: "active",
                }).then(() => {
                    Swal.fire("Success", "Terms Updated...", "success")
                    setEdit(false)
                }).catch((err) => {
                    Swal.fire("Error", err.message, "error")
                })
            } else {
                await addDoc(collection(db, "Terms_Condition"), {
                    title: title,
                    desc: desc,
                    // PostImg: ImgUrl,
                    // status: "active",
                }).then(() => {
                    Swal.fire("Success", "Terms Added...", "success")
                    setEdit(false)
                }).catch((err) => {
                    Swal.fire("Error", err.message, "error")
                })

            }
        }
    }
    const deletePolicy = async () => {
        console.log("deltre")
        await deleteDoc(doc(db, "Terms_Condition", DocId)).then((res) => {
            setData(null)
            Swal.fire("Success", "Deleted Successfully...", "success")
            window.location.reload();
        }).catch((err) => {
            console.log(err.message)
            Swal.fire(err.message, "success")

        })
    }

    return (
        <>{
            !edit && (
                <Box>
                    <Header btnTitle={DocId === null ? "Add Terms" : "Update Terms"} heading={"Terms and Condtions"} setedit={setEdit} />
                    <ShowGeneral
                        heading={Data?.title}
                        description={Data?.desc}
                        deleteFunc={deletePolicy}
                    />
                </Box>
            )
        }
            {
                edit && (
                    <AddForm
                        heading={"Terms and Conditon"}
                        setEdit={setEdit}
                        btnTitle={DocId === null ? "Add Terms" : "Update Terms"}
                        publish={publishTerms}
                        showImgOpt={false}
                    />
                )
            }

        </>
    )
}

export default Terms_Condition