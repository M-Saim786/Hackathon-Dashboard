import { Box } from '@mui/material'
import React, { useState } from 'react'
import Header from '../../Components/Header/Header'
import ShowGeneral from '../../Components/Show_General/ShowGeneral'
import AddForm from '../../Components/AddForm/AddForm'
import { addDoc, collection, doc, getDocs, setDoc } from 'firebase/firestore'
import { db } from '../../Config/Firebase'
import Swal from 'sweetalert2'


function ChairManMessage() {
    const [edit, setEdit] = useState(false)
    const [Data, setData] = useState([]); // State for the original data
    const [DocId, setDocId] = useState(null)
    const getData = async () => {
        const querySnapshot = await getDocs(collection(db, "Chairman_Message"));
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
                await setDoc(doc(db, "Chairman_Message", DocId), {
                    title: title,
                    desc: desc,
                    // PostImg: ImgUrl,
                    // status: "active",
                }).then(() => {
                    Swal.fire("Success", "Message Updated...", "success")
                    setEdit(false)
                }).catch((err) => {
                    Swal.fire("Error", err.message, "error")
                })
            } else {
                await addDoc(collection(db, "Chairman_Message"), {
                    title: title,
                    desc: desc,
                    // PostImg: ImgUrl,
                    // status: "active",
                }).then(() => {
                    Swal.fire("Success", "Message Added...", "success")
                    setEdit(false)
                }).catch((err) => {
                    Swal.fire("Error", err.message, "error")
                })

            }
        }
    }
    return (
        <>{
            !edit && (
                <Box>
                    <Header btnTitle={DocId === null ? "Add Message" : "Update Message"} heading={"Saylani's Chairman Message"} setedit={setEdit} />
                    <ShowGeneral heading={Data.title} description={Data.desc} />
                </Box>
            )
        }
            {
                edit && (
                    <AddForm
                        heading={"ChairMan Message"}
                        setEdit={setEdit}
                        btnTitle={DocId === null ? "Add message" : "Update message"}
                        publish={publishAbout}
                        showImgOpt={false}
                    />
                )
            }

        </>
    )
}

export default ChairManMessage