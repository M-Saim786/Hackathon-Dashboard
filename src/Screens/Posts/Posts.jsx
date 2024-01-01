import React, { useState, useEffect } from "react";

// import PostTable from "./PostMain";
// import PostMain from "./PostMain";
import AddPost from "./AddPost";
import Header from "../../Components/Header/Header";
import { db } from "../../Config/Firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import CustomTable from "../../Components/CustomTable/CustomTable";
import AddForm from "../../Components/AddForm/AddForm";
import Swal from "sweetalert2";


const AddDishesMenu = () => {
  // this is Tabs
  const [tab, settab] = useState(0);
  // const { data: allDishes, loading } = useGetAllDishesQuery()

  // console.log("allDishes", allDishes)

  const handleTabChange = (event, newValue) => {
    settab(newValue);
  };

  const [tabDirection, setTabDirection] = useState("");

  const [orientation, setOrientation] = useState(
    window.innerWidth >= 600 ? "horizontal" : "vertical"
  );

  useEffect(() => {
    const handleResize = () => {
      setOrientation(window.innerWidth >= 600 ? "horizontal" : "vertical");
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [edit, setEdit] = useState(false)
  // const handleClose = () => {
  //   // setedit(false)
  // }

  const [Data, setData] = useState([]); // State for the original data

  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "Posts"));
    const newData = querySnapshot.docs.map((doc, i) => ({ ...doc.data(), id: ++i }));
    setData(newData);
  };
  useEffect(() => {
    getData();
  }, [edit]);

  const date = new Date()
  const [handleImg, setHandleImg] = useState([])
  const [ImgUrl, setImgUrl] = useState("")

  const publishPost = async (title, desc, ImgUrl, ImgType) => {
    console.log("publishPost")
    console.log("ImgUrl", ImgUrl)
    console.log("ImgType", ImgType)
    if (!title || !desc) {
      Swal.fire("Error", "Title & Desc can't be null", "error")
    } else {
      await addDoc(collection(db, "Posts"), {
        title: title,
        desc: desc,
        postImg: ImgUrl,
        status: "active",
        date: date.toLocaleDateString(),
        imgType: ImgType

      }).then(() => {
        Swal.fire("Success", "Post Published...", "success")
        setEdit(false)
      }).catch((err) => {
        Swal.fire("Error", err.message, "error")
      })
    }
  }



  return (
    <>
      {!edit && (
        <>
          <Header btnTitle={"Add Posts"} setedit={setEdit} heading={"All Posts"} />
          <CustomTable Data={Data} />
        </>
      )}

      {edit && (
        <>
          <AddForm
            heading={"Posts"}
            setEdit={setEdit}
            input2Name={"Desc"}
            input2PlaceHolder={"Enter Desc"}
            btnTitle={"Publish Post"}
            publish={publishPost}
            setHandleImg={setHandleImg}
            handleImg={handleImg}
            ImgUrl={ImgUrl}
            setImgUrl={setImgUrl}
            showImgOpt={true} />
        </>
      )}

    </>
  );
};

export default AddDishesMenu;
