"use client";

import React, { useEffect } from "react";
import { SignedOut, SignInButton } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !user) {
      router.push("/");
    }
  }, [isLoaded, user, router]);

  return (
    <div>
      <SignedOut>
        <SignInButton mode="modal" forceRedirectUrl="/homepage">
          <div className="text-center flex justify-center flex-col items-center mt-[100px] mx-auto space-y-4">
            <motion.span
              className="rounded-md hover:bg-[#FAD572] hover:text-[#061867] border w-fit cursor-pointer px-3 p-2"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              Sign In
            </motion.span>
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
