import React from 'react';

const Bookimage = (props) => {
  return (
    <img
      alt="Logo"
      src={`/images/${props.id}.jpg`}
      style={{ width: '30%', height: '40%'}}
    />
  );
};

export default Bookimage;