"use client";

import React, { useEffect, useState, useRef } from "react";
import QRCode from "react-qr-code";
import ReactCardFlip from "react-card-flip";
import User from "../Components/User";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const IdCard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const reportRef = useRef();

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

  return (
    <div className="bg-[#1933a7] h-screen">
      <User />
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
        <small>
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
