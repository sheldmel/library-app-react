import React from "react";

const Bookimage = (props) => {
  return (
    <img
      alt="Logo"
      src={props.id}
      style={{
        width: "70%",
        height: "80%",
        margin: "2%",
        display: "inline",
        maxHeight: "500px",
        maxWidth: "400px",
      }}
    />
  );
};

export default Bookimage;
