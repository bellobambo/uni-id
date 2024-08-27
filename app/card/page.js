"use client";

import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import ReactCardFlip from "react-card-flip";
import User from "../Components/User";

const IdCard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);

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
      <div className="flex justify-center items-center mt-[250px]">
        Loading...
      </div>
    );
  if (!data || data.length === 0)
    return (
      <div className="flex justify-center items-center mt-[250px]">
        No data found
      </div>
    );

  // Access the last item in the array
  const lastItem = data[data.length - 1];

  // Handle card flip
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div>
      <User />
      <div className="flex flex-col justify-center items-center mt-[250px]">
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
              <div className="w-20 h-20 bg-white p-1 rounded flex items-center justify-center">
                <QRCode value={lastItem.$id} size={64} />
              </div>
            </div>
            <p className="mt-5">Valid till : 20/09/25</p>
          </div>
        </ReactCardFlip>

        {/* Flip Button */}
        <button
          className="mt-4 px-4 py-2 bg-[#FAD572] text-[#061867] rounded-md shadow-lg font-bold"
          onClick={handleFlip}
        >
          Flip Card
        </button>
      </div>
    </div>
  );
};

export default IdCard;
