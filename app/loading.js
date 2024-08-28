import React from "react";

const loading = () => {
  return (
    <div className="flex justify-center items-center mt-[200px] flex-col space-y-4">
      <img src="/oaulogo.png" width={70} className="bg-transparent " />
      <p>Loading....</p>
    </div>
  );
};

export default loading;
