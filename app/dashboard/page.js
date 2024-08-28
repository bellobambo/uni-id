"use client";

import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { UploadDropzone } from "@uploadthing/react";
import User from "../Components/User";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Page = () => {
  const controls = useAnimation();
  const [isTyping, setIsTyping] = useState(false);
  const [formData, setFormData] = useState({
    Matric_Number: "BCH/2035/097",
    Full_Name: "Bello Bambo",
    NIN: "",
    Passport: "",
    Phone: "",
  });
  const [loading, setLoading] = useState(false); // Added loading state
  const router = useRouter();

  const handleFocus = () => {
    setIsTyping(true);
    controls.start({ scale: 1.05 });
  };

  const handleBlur = () => {
    setIsTyping(false);
    controls.start({ scale: 1 });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log(formData, "data sent ");

      const data = await response.json();
      if (response.ok) {
        toast.success("Submission successful!");
        setTimeout(() => {
          router.push("/card");
        }, 1000);
      } else {
        toast.error("Submission failed.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Submission failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <User />
      <Toaster />
      <div className="min-h-screen flex mt-[100px] items-center flex-col">
        <motion.i
          className="block text-center text-lg text-[#FAD572] mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Request For Your University ID By Filling The Form
          <p>
            <small>Confirm Details Below</small>
          </p>
        </motion.i>
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md border-[#FAD572] border-4">
          <motion.form
            className="space-y-4 items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            onSubmit={handleSubmit}
          >
            <div className="flex items-center gap-6 w-fit">
              <motion.div animate={controls}>
                <label className="block text-[#061867] font-semibold mb-2">
                  Matric Number
                </label>
                <input
                  type="text"
                  name="Matric_Number"
                  className="w-full px-4 py-2 border border-[#061867] rounded-md focus:outline-none focus:ring-2 focus:ring-[#061867] focus:border-transparent bg-gray-300 text-black"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={formData.Matric_Number}
                />
              </motion.div>
              <motion.div animate={controls}>
                <label className="block text-[#061867] font-semibold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="Full_Name"
                  className="w-full px-4 py-2 border border-[#061867] bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#061867] focus:border-transparent text-black"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={formData.Full_Name}
                />
              </motion.div>
            </div>
            <div>
              <motion.div animate={controls}>
                <label className="block text-[#061867] font-semibold mb-2">
                  Phone
                </label>
                <input
                  type="text"
                  name="Phone"
                  className="w-full px-4 py-2 border border-[#061867] bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#061867] focus:border-transparent text-black"
                  placeholder="Enter Phone Number"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={formData.Phone}
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
                  name="NIN"
                  className="w-full px-4 py-2 border border-[#061867] bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#061867] focus:border-transparent text-black"
                  placeholder="Enter NIN Number"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={formData.NIN}
                />
              </motion.div>
            </div>
            <div className="flex items-center gap-6">
              <motion.div animate={controls}>
                <label className="block text-[#061867] font-semibold mb-2">
                  Passport
                </label>
                <UploadDropzone
                  className="p-2 text-[#061867] bg-[#AAB6C4]"
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    if (res && Array.isArray(res) && res.length > 0) {
                      setFormData((prevData) => ({
                        ...prevData,
                        Passport: res[0].url,
                      }));
                    }
                  }}
                  onUploadError={(error) => {
                    alert(`ERROR! ${error.message}`);
                  }}
                />
              </motion.div>
            </div>
            <button
              type="submit"
              className="bg-[#061867] text-white px-4 py-2 rounded-md"
              disabled={loading} // Disable button while loading
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default Page;
