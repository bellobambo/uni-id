import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { SignOutButton } from "@clerk/nextjs";

const Page = async () => {
  const user = await currentUser();
  const email = user.emailAddresses[0].emailAddress;
  const Name = user.fullName;
  const img = user.imageUrl;
  console.log(Name, "email address");
  return (
    <div>
      <div className="bg-[#AAB6C4]  w-full text-[#0A2081]">
        <div className="flex items-center p-4 space-x-12 pl-[120px]">
          <img src="/oaulogo.png" width={100} className="bg-transparent " />

          <h1 className="font-normal text-[45px]">
            Obafemi Awolowo University
            <br />
            Student Information Portal
          </h1>
        </div>
      </div>
      <div className="bg-[#061867]  w-full h-[5vw] flex px-[140px]  justify-between pb-2">
        <div className=" flex gap-8 items-end ">
          <h1 className="font-extralight  text-[27px]">Home</h1>
          <h1
            className="text-[#F8CB4F] font-extralight  text-[24px]
          "
            // style={{ fontFamily: "'Open Sans Condensed', sans-serif" }}
          >
            Students
          </h1>
          <h1
            className="text-[#F8CB4F] font-extralight  text-[24px]"
            // style={{ fontFamily: "'Open Sans Condensed', sans-serif" }}
          >
            Staff
          </h1>
          <h1
            className="text-[#F8CB4F] font-extralight  text-[24px]"
            // style={{ fontFamily: "'Open Sans Condensed', sans-serif" }}
          >
            {" "}
            FAQs
          </h1>
          <h1
            className="text-[#F8CB4F] font-extralight  text-[24px]"
            style={{ fontFamily: "'Open Sans Condensed', sans-serif" }}
          >
            Contact Us
          </h1>
        </div>
        <div className=" flex gap-2 items-center">
          <h1 className="text-[#F8CB4F]">Welcome</h1>
          <h1>{Name}</h1>
          <SignOutButton />
        </div>
      </div>
      <div className="bg-white px-[100px] min-h-screen  w-full flex ">
        <div className="bg-[#F0F5F5] w-[300px]">
          <h1 className="text-[#F8CB4F] font-extralight  text-[27px] py-6 px-3">
            Profile Menu
          </h1>
          <div className=" space-y-2 pb-6 pt-2 px-3 border border-black ml-3 rounded h-fit">
            <h5 className="text-[15px] text-black cursor-pointer hover:bg-gray-300 hover:border hover:border-black rounded px-2">
              Profile Page
            </h5>
            <h5 className="text-[15px] text-black cursor-pointer hover:bg-gray-300 hover:border hover:border-black rounded px-2">
              Health Center
            </h5>
            <h5 className="text-[15px] text-black cursor-pointer hover:bg-gray-300 hover:border hover:border-black rounded px-2">
              Teaching Assessment
            </h5>

            <div className="h-9 "></div>
            <h5 className="text-[15px]  text-[bg-gray-500]rounded px-2">
              Complete Certificate Form
            </h5>
            <h5 className="text-[15px]  text-[bg-gray-500]rounded px-2">
              Online Screening
            </h5>
            <h5 className="text-[15px]  text-[bg-gray-500]rounded px-2">
              Check Admission Status
            </h5>
            <h5 className="text-[15px] text-black cursor-pointer hover:bg-gray-300 hover:border hover:border-black rounded px-2 whitespace-nowrap">
              Activate Late Reg. Payment
            </h5>
            <h5 className="text-[15px] text-black cursor-pointer hover:bg-gray-300 hover:border hover:border-black rounded px-2 whitespace-nowrap">
              Update Biodata information
            </h5>
            <h5 className="text-[15px] text-black cursor-pointer hover:bg-gray-300 hover:border hover:border-black rounded px-2">
              Register Courses
            </h5>
            <h5 className="text-[15px]  text-[bg-gray-500]rounded px-2">
              Complete Health Centre Form
            </h5>
            <h5 className="text-[15px] text-black cursor-pointer hover:bg-gray-300 hover:border hover:border-black rounded px-2">
              View Semester Raw Score
            </h5>
            <h5 className="text-[15px] text-black cursor-pointer hover:bg-gray-300 hover:border hover:border-black rounded px-2">
              Check Results
            </h5>
            <h5 className="text-[15px]  text-[bg-gray-500]rounded px-2">
              Bedspace Request
            </h5>
            <a
              href="/dashboard"
              className="text-[15px] text-black cursor-pointer hover:bg-gray-300 hover:border hover:border-black rounded px-2"
            >
              Access Campus ID Card
            </a>
            <h5 className="text-[15px] text-black cursor-pointer hover:bg-gray-300 hover:border hover:border-black rounded px-2">
              Reports
            </h5>
            <h5 className="text-[15px] text-black cursor-pointer hover:bg-gray-300 hover:border hover:border-black rounded px-2">
              Print ICT Certificate
            </h5>
            <h5 className="text-[15px] text-black cursor-pointer hover:bg-gray-300 hover:border hover:border-black rounded px-2">
              Documentations
            </h5>
            <h5 className="text-[15px] text-black cursor-pointer hover:bg-gray-300 hover:border hover:border-black rounded px-2">
              Contact Counsellor
            </h5>

            <h5 className="text-[15px] text-black cursor-pointer hover:bg-gray-300 hover:border hover:border-black rounded px-2">
              Change Password
            </h5>
            <h5 className="text-[15px] text-black cursor-pointer hover:bg-gray-300 hover:border hover:border-black rounded px-2">
              Sign out
            </h5>
          </div>
        </div>
        <div className=" px-11  bg-[#DEDEDE] w-full">
          <h2 className="my-[50px] text-black font-mono text-[27px]">
            Student Details
          </h2>
          <div className="space-y-3 flex ">
            <div className="space-y-3 ">
              <h5 className="text-[15px] text-[#336699] rounded  ">
                Profile Page : <b>BCH/2019/097</b>
              </h5>
              <h5 className="text-[15px] text-[#336699] rounded  ">
                Name : <b>{Name}</b>
              </h5>
              <h5 className="text-[15px] text-[#336699] rounded  ">
                Current Part : <b>1</b>
              </h5>
              <h5 className="text-[15px] text-[#336699] rounded  ">
                Degree Programme : <b>B.Sc Computer Science with Economics</b>
              </h5>
              <h5 className="text-[15px] text-[#336699] rounded  ">
                Department : <b>Computer Science and Engineering</b>
              </h5>
              <h5 className="text-[15px] text-[#336699] rounded  ">
                Faculty : <b>Technology</b>
              </h5>
              <h5 className="text-[15px] text-[#336699] rounded  ">
                BedSpace Location: <b>NIL</b>
              </h5>
              <h5 className="text-[15px] text-[#336699] rounded  ">
                Email Address: : <b>{email}</b>
              </h5>
              <h5 className="text-[15px] text-[#336699] rounded   whitespace-nowrap">
                Email Password :{" "}
                <b>
                  {" "}
                  (Your matric/registration number, the alphabets in CAPSLOCK) :
                  BCH/2019/097
                </b>
              </h5>
            </div>
            <div className="items-start pr-[100px]">
              <img src={img} width={300} />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black h-[100px] "></div>
    </div>
  );
};

export default Page;
