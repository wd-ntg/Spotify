import React from "react";

import DotLoader from 'react-spinners/DotLoader'
import PuffLoader from 'react-spinners/PuffLoader'

function Loader() {
  return (
    <div className="justify-between items-center flex h-[214px]">
      <PuffLoader color="#B4BDFF" />
    </div>
  );
}

export default Loader;
