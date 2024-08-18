import React from "react";
import { SignedOut, SignInButton } from "@clerk/nextjs";
import { motion } from "framer-motion";

const SignIn = () => {
  return (
    <div>
      <SignedOut>
        <SignInButton forceRedirectUrl="/dashboard">
          <div className="text-center flex justify-center flex-col items-center mt-[100px] mx-auto  space-y-4">
            <span
              className="rounded-md hover:bg-[#FAD572] hover:text-[#061867] border w-fit cursor-pointer px-3 p-2"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              Sign In
            </span>

            <i>
              Sign In with Your University Email Address To Request/Access ID
            </i>
          </div>
        </SignInButton>
      </SignedOut>
    </div>
  );
};

export default SignIn;
