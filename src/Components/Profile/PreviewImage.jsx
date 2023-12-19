import React from "react";
import { useState } from "react";

const PreviewImage = ({ file, alt, ...props }) => {
  const [imageUrl, setImageUrl] = useState("");

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    setImageUrl(reader.result);
    // console.log(reader.result)
  };
  // console.log("checkFileURL", file);
  return (
    <>
      <img
        src={imageUrl && imageUrl}
        alt={alt ? alt : "can't load image"}
        {...props}
      />
    </>
  );
};

export default PreviewImage;
