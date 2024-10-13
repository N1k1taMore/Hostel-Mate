import { useState, useEffect } from 'react';
import { useAuth } from '../utils/Auth';
import Navbar from './Navbar';
import axios from 'axios';

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

const ResidentData = () => {
  const { headers } = useAuth();
  const [residents, setResidents] = useState([]);

  const getresident = async () => {
    try {
      const response = await axios.get('http://localhost:3000/getresident', {
        headers: headers,
      });
    
      const jsonData = response.data;
      setResidents(jsonData);
    } 
    catch (err) {
      console.error("Error fetching resident:", err.message);
    }
    
  };

  useEffect(() => {
    getresident();
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <div className="bg-gray-100 p-4 sm:p-8 md:p-10 h-screen">
        <h1 className="text-2xl font-bold mt-10 mb-8">Residents</h1>
        {residents.length === 0 ? (
          <p className="ml-4 mt-2 text-gray-600 text-xl">
            No residents found in this block.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="w-full bg-gray-200 text-gray-900">
                  <th className="px-6 py-3 border-b text-left text-sm font-medium">
                    Full Name
                  </th>
                  <th className="px-6 py-3 border-b text-left text-sm font-medium">
                    Block Id
                  </th>
                  <th className="px-6 py-3 border-b text-left text-sm font-medium">
                    Room No.
                  </th>
                  <th className="px-6 py-3 border-b text-left text-sm font-medium">
                    Admitted On
                  </th>
                  <th className="px-6 py-3 border-b text-left text-sm font-medium">
                    Address
                  </th>
                  <th className="px-6 py-3 border-b text-left text-sm font-medium">
                    Fee Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {residents.map((resident) => (
                  <tr key={resident.resident_id} className="hover:bg-gray-100">
                    <td className="px-6 py-4 border-b text-sm text-gray-900">
                      {resident.full_name}
                    </td>
                    <td className="px-6 py-4 border-b text-sm text-gray-900">
                      {resident.block_id}
                    </td>
                    <td className="px-6 py-4 border-b text-sm text-gray-900">
                      {resident.room}
                    </td>
                    <td className="px-6 py-4 border-b text-sm text-gray-900">
                      {formatTimestamp(resident.admitted_at)}
                    </td>
                    <td className="px-6 py-4 border-b text-sm text-gray-900">
                      {resident.addres}
                    </td>
                    <td className="px-6 py-4 border-b text-sm text-gray-900">
                      <span
                        className={`px-3 py-1 rounded-full text-white ${
                          resident.fee_payed ? 'bg-green-500' : 'bg-red-600'
                        }`}
                      >
                        {resident.fee_payed ? 'Payed' : 'Not Payed'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default ResidentData;
