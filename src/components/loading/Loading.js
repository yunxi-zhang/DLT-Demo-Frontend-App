import React from 'react';
import ReactLoading from 'react-loading';

function LoadingBar() {
   return (
        <span><ReactLoading type={"spin"} color={"gray"} /></span>
   )  
};

export default LoadingBar;