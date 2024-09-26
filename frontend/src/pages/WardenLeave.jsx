import  { useState, useEffect } from "react";
import { useAuth } from "../utils/Auth";
import Navbar from "./Navbar";


const formatTimestamp1 = (timestamp) => {
  const date = new Date(timestamp);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

const WardenLeave = () => {
  const { headers } = useAuth();
  const [leaves, setLeaves] = useState([]);

  const getLeaves = async () => {
    try {
      const response = await fetch("http://localhost:3000/leaves", {
        method: "GET",
        headers: headers,
      });
      const jsonData = await response.json();

      setLeaves(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };


  useEffect(() => {
    getLeaves();
  }, []);

  return (
    <>
    <Navbar></Navbar>
      
      <div className="mt-20 bg-gray-100 p-4 sm:p-8 md:p-2 h-screen">
        <h1 className="text-2xl font-bold mt-3 mb-8 pl-5">Leaves</h1>
        {leaves.length === 0 ? (
          <p className="ml-4 mt-2 text-gray-600 text-xl">
            No Leaves registered yet.
          </p>
        ) : (
          <div className="container mx-auto grid gap-8 md:grid-cols-3 sm:grid-cols-1">
            {leaves.map((leave) => (
              <div
                key={leave.id}
                className="relative flex h-full flex-col rounded-md border border-gray-200 bg-white p-2.5 hover:border-gray-400 sm:rounded-lg sm:p-5"
              >
                <div className="text-lg mb-2 font-semibold text-gray-900 hover:text-black sm:mb-1.5 sm:text-2xl">
                  {leave.name} (Room No.{leave.room})
                </div>
                <p className="text-sm">
                  Created on {formatTimestamp1(leave.created_at)}
                </p>
                
                <div className="text-md leading-normal text-gray-400 sm:block">
                  {leave.description}
                </div>
             
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default WardenLeave;
