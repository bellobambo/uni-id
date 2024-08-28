import React from "react";
import { UserButton } from "@clerk/nextjs";

const User = () => {
  return (
    <div>
      <div className="flex justify-between  p-3 bg-[#FAD572] text-white ">
        <img src="/oaulogo.png" width={70} className="bg-transparent " />
        <UserButton showName className=" text-[40px] tex-white" />
      </div>
    </div>
  );
};

export default User;
