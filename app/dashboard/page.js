"use client";

import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import User from "../Components/User";

const page = () => {
  const controls = useAnimation();
  const [isTyping, setIsTyping] = useState(false);

  const handleFocus = () => {
    setIsTyping(true);
    controls.start({ scale: 1.05 });
  };

  const handleBlur = () => {
    setIsTyping(false);
    controls.start({ scale: 1 });
  };

  return (
    <div className="min-h-screen flex mt-[100px] items-center  flex-col">
      {/* <User /> */}
      <motion.i
        className="block text-center text-lg text-[#FAD572] mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Request For Your University ID By Filling The Form
      </motion.i>
      <br />
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md border-[#FAD572] border-4">
        <motion.p
          className="text-center text-2xl font-bold mb-4 text-[#061867]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        ></motion.p>
        <div className="text-center font-mono text-[30px] mb-4 text-gray-400">
          UID
        </div>
        <motion.form
          className="space-y-4 items-center "
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center  gap-6 w-fit">
            <motion.div animate={controls}>
              <label className="block text-[#061867] font-semibold mb-2">
                Matric Number
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-[#061867] rounded-md focus:outline-none focus:ring-2 focus:ring-[#061867] focus:border-transparent bg-gray-300 text-black "
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </motion.div>
            <motion.div animate={controls}>
              <label className="block text-[#061867] font-semibold mb-2">
                Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-[#061867] bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#061867] focus:border-transparent text-black "
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </motion.div>
          </div>

          <div className="flex items-center  gap-6">
            <motion.div animate={controls}>
              <label className="block text-[#061867] font-semibold mb-2">
                Passport
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-[#061867] bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#061867] focus:border-transparent text-black "
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </motion.div>
            <motion.div animate={controls}>
              <label className="block text-[#061867] font-semibold mb-2">
                Signature
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-[#061867] bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#061867] focus:border-transparent text-black "
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </motion.div>
          </div>

          <div>
            <motion.div animate={controls}>
              <label className="block text-[#061867] font-semibold mb-2">
                NIN
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-[#061867] bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#061867] focus:border-transparent text-black "
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </motion.div>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default page;
