import React from 'react';

const Logo = (props) => {
  return (
    <img
      alt="Logo"
      src="/images/logo.jpg"
      style={{ width: '60%', height: '60%', borderRadius: '50%' }}
      {...props}
    />
  );
};

export default Logo;