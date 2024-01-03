import { Box } from '@mui/material'
import React, { useState } from 'react'
import Header from '../../Components/Header/Header'
import ShowGeneral from '../../Components/Show_General/ShowGeneral'
import AddForm from '../../Components/AddForm/AddForm'
import { addDoc, collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore'
import { db } from '../../Config/Firebase'
import Swal from 'sweetalert2'

function About_Saylani() {
    const [edit, setEdit] = useState(false)
    const [Data, setData] = useState([]); // State for the original data
    const [DocId, setDocId] = useState(null)
    const getData = async () => {
        const querySnapshot = await getDocs(collection(db, "About"));
        const newData = querySnapshot.docs.map((doc, i) => {
            setData(doc?.data())
            setDocId(doc?.id)
            // console.log(doc.data())
        })
        console.log(DocId)
        console.log(Data)
    };
    React.useEffect(() => {
        getData();
    }, [edit]);

    // const [title, setTitle] = useState("")
    // const [desc, setDesc] = useState("")
    const [handleImg, setHandleImg] = useState([])
    const [ImgUrl, setImgUrl] = useState("")

    const publishAbout = async (title, desc) => {
        console.log(title, desc)
        console.log("publishPost")
        if (!title || !desc) {
            Swal.fire("Error", "Title & Desc can't be null", "error")
        } else {
            if (DocId !== null) {
                await setDoc(doc(db, "About", DocId), {
                    title: title,
                    desc: desc,
                    // PostImg: ImgUrl,
                    // status: "active",
                }).then(() => {
                    Swal.fire("Success", "About Updated...", "success")
                    setEdit(false)
                }).catch((err) => {
                    Swal.fire("Error", err.message, "error")
                })
            } else {
                await addDoc(collection(db, "About"), {
                    title: title,
                    desc: desc,
                    // PostImg: ImgUrl,
                    // status: "active",
                }).then(() => {
                    Swal.fire("Success", "About Added...", "success")
                    setEdit(false)
                }).catch((err) => {
                    Swal.fire("Error", err.message, "error")
                })

            }
        }
    }

    const deletePolicy = async () => {
        console.log("deltre")
        await deleteDoc(doc(db, "About", DocId)).then((res) => {
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
                    <Header btnTitle={DocId === null ? "Add About" : "Update About"} heading={"About Saylani"} setedit={setEdit} />
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
                        heading={"About Saylani"}
                        setEdit={setEdit}
                        btnTitle={DocId === null ? "Add About" : "Update About"}
                        publish={publishAbout}
                        showImgOpt={false}
                    />
                )
            }

        </>
    )
}

export default About_Saylani