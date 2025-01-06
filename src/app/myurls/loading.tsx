import Loader from "@/components/Loader";
import React from "react";

const loading = () => {
  return (
    <div className="w-screen h-[calc(100vh-100px)] flex justify-center items-center">
      <Loader width={100} height={100} color="orange" />
    </div>
  );
};

export default loading;
