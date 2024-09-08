"use client";

import React, { useEffect, useState, useRef } from "react";
import QRCode from "react-qr-code";
import ReactCardFlip from "react-card-flip";
import User from "../Components/User";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { PaystackButton } from "react-paystack";
import toast, { Toaster } from "react-hot-toast";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const IdCard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const reportRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const { user, isLoaded } = useUser();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  console.log(user, "user");

  const [formData, setFormData] = useState({
    accountNumber: "",
    amount: "",
    description: "",
    bank: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // If bank is selected, set receiver's name to Bello Bambo Ayodeji
    if (name === "bank") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        recivername: "Bello Bambo Ayodeji",
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const banks = [
    "Access Bank",
    "Zenith Bank",
    "Guaranty Trust Bank (GTBank)",
    "First Bank of Nigeria",
    "United Bank for Africa (UBA)",
    "Fidelity Bank",
    "Union Bank",
    "Ecobank",
    "Stanbic IBTC Bank",
    "Sterling Bank",
    "Polaris Bank",
    "Wema Bank",
    "Heritage Bank",
    "Keystone Bank",
    "Opay",
    "Palmpay",
    "Moniepoint",
  ];

  const config = {
    reference: new Date().getTime().toString(),
    email: isLoaded && user ? user.emailAddresses[0].emailAddress : "", // Check if user and isLoaded are valid
    amount: formData.amount * 100,
    publicKey: "pk_test_551a9d732dd912b7a8c17b3096c1e11d61a1ac11",
  };

  const handlePaystackSuccessAction = (reference) => {
    console.log(reference);

    toast.success("Transfer Successful");
    router.push("/card");
  };

  const handlePaystackCloseAction = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

  const componentProps = {
    ...config,
    text: "Pay Now",
    onSuccess: (reference) => handlePaystackSuccessAction(reference),
    onClose: handlePaystackCloseAction,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert("Please authenticate using your fingerprint first.");
    } else {
      console.log("Form submitted with:", formData);
    }
  };
  useEffect(() => {
    // Function to fetch data
    const fetchData = async () => {
      try {
        const response = await fetch("/api/create");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        console.log(result.data, "fetched data");
        setData(result.data); // Assuming result.data is an array
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center mt-[200px] flex-col space-y-4">
        <img src="/oaulogo.png" width={70} className="bg-transparent " />
        <p>Loading....</p>
      </div>
    );
  if (!data || data.length === 0)
    return (
      <div className="flex justify-center items-center mt-[250px]">
        No data found
      </div>
    );

  const lastItem = data[data.length - 1];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const downloadPDF = async () => {
    const canvas = await html2canvas(reportRef.current, {
      scale: 2,
    });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    const logo = new Image();
    logo.src = "/oaulogo.png";
    logo.onload = () => {
      const logoWidth = 70;
      const logoHeight = 30;
      const logoX = (imgWidth - logoWidth) / 2;
      const logoY = 10;

      pdf.addImage(logo, "PNG", logoX, logoY, logoWidth, logoHeight);

      const date = new Date();
      const formattedDate = date.toLocaleDateString();
      const formattedTime = date.toLocaleTimeString();
      const dateTimeText = `Generated on: ${formattedDate} at ${formattedTime}`;
      const disclaimer =
        "Tender the QRcode in the ICT center for Physical ID card Collection";

      pdf.setFontSize(12);
      pdf.text(dateTimeText, imgWidth / 2, logoY + logoHeight + 10, {
        align: "center",
      });
      pdf.text(disclaimer, imgWidth / 2, logoY + logoHeight + 20, {
        align: "center",
      });

      position = logoY + logoHeight + 30;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        pdf.addPage();
        pdf.addImage(
          imgData,
          "PNG",
          0,
          position - imgHeight,
          imgWidth,
          imgHeight
        );
        heightLeft -= pageHeight;
        position = heightLeft;
      }

      const pdfName = `OAU-STUDENTID(${formattedDate.replace(
        /\//g,
        "-"
      )}_${formattedTime.replace(/:/g, "-")}).pdf`;
      pdf.save(pdfName);

      // Show the header again
      // headerRef.current.classList.remove("hidden");
    };
  };

  const handleFingerprintAuth = async () => {
    try {
      const publicKey = {
        challenge: new Uint8Array([
          0x8c, 0x99, 0x91, 0xca, 0xa4, 0x59, 0x91, 0xc7,
        ]).buffer,
        rp: {
          name: "Your Payment App",
        },
        user: {
          id: new Uint8Array([1, 2, 3, 4]),
          name: user.emailAddresses[0].emailAddress,
          displayName: user.fullName,
        },
        pubKeyCredParams: [{ type: "public-key", alg: -7 }],
        timeout: 60000,
        authenticatorSelection: {
          userVerification: "required",
        },
      };

      const credential = await navigator.credentials.create({
        publicKey,
      });

      if (credential) {
        setIsAuthenticated(true);
        alert("Authentication successful!");
      }
    } catch (error) {
      console.error("Authentication failed", error);
      alert("Fingerprint authentication failed. Please try again.");
    }
  };

  return (
    <div className="bg-[#1933a7] h-screen">
      <User />
      <Toaster />

      <div className="flex flex-col justify-center items-center mt-[250px] ">
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
          {/* Front of the card */}
          <div
            className="w-80 h-48 bg-[#061867] text-[#FAD572] rounded-lg shadow-lg border-4 border-[#FAD572] flex flex-col justify-between p-3 cursor-pointer"
            onClick={handleFlip}
          >
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-md font-bold">Campus ID</h1>
              <img src="oaulogo.png" alt="Logo" className="w-10 h-10" />
            </div>

            <div className="flex justify-between items-center mb-3">
              <img
                src={lastItem.Passport}
                alt="Profile"
                className="w-16 h-16 bg-[#FAD572] rounded-md mb-2"
              />

              <div className="text-center text-lg font-bold">
                <p>Name:</p>
                <p className="font-mono text-[13px]">{lastItem.Full_Name}</p>
                <p>Matric Number:</p>
                <p className="font-mono text-[13px]">
                  {lastItem.Matric_Number}
                </p>
              </div>
            </div>
          </div>

          {/* Back of the card */}
          <div
            className="w-80 h-48 bg-[#061867] text-[#FAD572] rounded-lg shadow-lg border-4 border-[#FAD572] flex flex-col justify-center items-center cursor-pointer"
            onClick={handleFlip}
          >
            <div className="flex items-center justify-between w-full px-4">
              <img src="/chip.png" alt="Chip" className="w-12 h-12" />
              <div
                className="w-20 h-20 bg-white p-1 rounded flex items-center justify-center"
                ref={reportRef}
              >
                <QRCode value={lastItem.$id} size={64} />
              </div>
            </div>
            <p className="mt-5">Valid till : 20/09/25</p>
            <small className="items-center  text-center px-1 ">
              This ID should be returned to the University ICT center if found
            </small>
          </div>
        </ReactCardFlip>

        {/* Flip Button */}
        <div className="flex justify-between items-center gap-4">
          <button
            className="mt-4 px-4 py-2 bg-[#FAD572] text-[#061867] rounded-md shadow-lg font-bold"
            onClick={handleFlip}
          >
            Flip Card
          </button>

          <button
            className="bg-[#061867] text-white w-full md:w-auto h-[48px] mt-4 px-3 rounded"
            onClick={downloadPDF}
          >
            Save QRCode
          </button>
        </div>
        <button
          className="mt-4 px-4 py-2 bg-[#FAD572] text-[#061867] rounded-md shadow-lg font-bold"
          onClick={toggleModal}
        >
          Pay
        </button>

        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-[#DEDEDE] rounded-lg shadow-lg w-96 p-6">
              <h2 className="text-2xl text-black font-bold mb-4 text-center">
                Make a Payment
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Receiver Account Number */}
                <div>
                  <label className="block font-bold text-black">
                    Receiver Account Number
                  </label>
                  <input
                    type="text"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded-md"
                    required
                  />
                </div>

                <div className="flex justify-between items-center gap-4">
                  <div>
                    <label className="block font-bold text-black">
                      Bank Name
                    </label>
                    <select
                      name="bank"
                      value={formData.bank}
                      onChange={handleChange}
                      className="w-full border px-3 py-2 rounded-md"
                      required
                    >
                      <option value="" disabled>
                        Select Bank
                      </option>
                      {banks.map((bank, index) => (
                        <option key={index} value={bank}>
                          {bank}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Amount */}
                  <div>
                    <label className="block font-bold text-black">Amount</label>
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      className="w-full border px-3 py-2 rounded-md"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-black">
                    Receiver Name
                  </label>
                  <input
                    type="text"
                    name="recivername"
                    value={formData.recivername}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded-md"
                    required
                    readOnly
                  />
                </div>
                <div>
                  <label className="block font-bold text-black">
                    Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded-md"
                    required
                  />
                </div>

                {/* Modal Actions */}

                <div className="flex justify-end gap-4 items-center">
                  <div className="flex justify-between mt-4">
                    <button
                      type="button"
                      className="px-4 py-2 text-white rounded-md bg-gray-400"
                      onClick={toggleModal}
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="mt-4 items-center">
                    {!isAuthenticated ? (
                      <button
                        type="button"
                        className="px-4 py-2 text-white rounded-md bg-[#1933a7]"
                        onClick={handleFingerprintAuth}
                      >
                        Confirm
                      </button>
                    ) : (
                      <div className="  bg-[#1933a7] p-3 text-black">
                        <PaystackButton {...componentProps} />
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
        <small className="my-4">
          <i>
            The QRcode will be used to confirm your identity in the schools ICT
            Center
          </i>
        </small>
      </div>
    </div>
  );
};

export default IdCard;
