import React from "react";

const Bookimage = (props) => {
  return (
    <img
      alt="Logo"
      src={`/images/${props.id}.jpg`}
      style={{
        width: "20%",
        height: "30%",
        //marginTop: "2%",
        margin: "2%",
        display: "inline",
        float: "left",
        maxHeight: "500px",
        maxWidth: "500px",
      }}
    />
  );
};

export default Bookimage;
