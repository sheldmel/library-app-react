import React from "react";

const Bookimage = (props) => {
  return (
    <img
      alt="Logo"
      src={props.id}
      style={{
        width: "80%",
        height: "100%",
        margin: "3%",
        display: "inline",
        maxHeight: "400px",
        maxWidth: "300px",
      }}
    />
  );
};

export default Bookimage;
