import { useState, useEffect } from 'react';
import { useAuth } from '../utils/Auth';
import NavbarS from './NavbarS';

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

const formatTimestamp1 = (timestamp) => {
  const date = new Date(timestamp);
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

const LeaveForm = () => {
  const { authToken, headers } = useAuth();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [room, setRoom] = useState('');

  const onSubmitForm = async (e) => {
    e.preventDefault();

    if (!name || name.trim() === '') {
      alert('Please enter a valid name.');
      return;
    }
    if (!room || room.trim() === '') {
      alert('Please enter Room No.');
      return;
    }
    if (!description || description.trim() === '') {
      alert('Please enter the Reason.');
      return;
    }

    try {
      const body = { name, description, room };
      const response = await fetch('http://localhost:3000/leaves', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body),
      });
      window.location = '/leave';
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <section className="bg-gray-100 text-gray-800 sm:pt-20 h-full flex justify-center items-center h-90">
        <div className="border border-gray-100 shadow-gray-500/20 ml-25 mt-5 mb-8 max-w-md bg-white shadow-sm sm:rounded-lg sm:shadow-lg lg:mt-0">
          <div className="relative border-b border-gray-300 p-4 py-6 sm:px-8">
            <h3 className="mb-1 inline-block text-3xl font-medium">
              <span className="mr-4">Leave Application</span>
            </h3>
          </div>
          <div className="p-4 sm:p-8">
            <input
              id="name"
              type="text"
              className="mt-1 w-full resize-y overflow-auto rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none hover:border-blue-500"
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              id="email"
              type="text"
              className="peer mt-8 w-full resize-y overflow-auto rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none hover:border-blue-500"
              placeholder="Enter your Room No."
              onChange={(e) => setRoom(e.target.value)}
            />
            <label className="mt-5 mb-2 inline-block max-w-full">
              Give valid resaon
            </label>
            <textarea
              id="about"
              className="mb-8 w-full resize-y overflow-auto rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none hover:border-blue-500"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <button
              className="w-full rounded-lg border border-blue-700 bg-blue-700 p-3 text-center font-medium text-white outline-none transition focus:ring hover:border-blue-700 hover:bg-blue-600 hover:text-white"
              onClick={onSubmitForm}
            >
              Submit
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

const Leave = () => {
  const { headers } = useAuth();
  const [leaves, setLeaves] = useState([]);

  const getLeaves = async () => {
    try {
      const response = await fetch('http://localhost:3000/leaves', {
        method: 'GET',
        headers: headers,
      });
      if (!response.ok) {
        throw new Error(`Error fetching complaints: ${response.status}`);
      }

      const jsonData = await response.json();
      setLeaves(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getLeaves();
  }, []);

  console.log(leaves);

  return (
    <>
      <NavbarS></NavbarS>
      <LeaveForm />
      <div className="bg-gray-100 sm:p-8 md:p-10 ">
        <h1 className="text-2xl font-bold  mb-8">Leaves</h1>
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
                <p className="text-sm">
                  Created on {formatTimestamp1(leave.created_at)}
                </p>
                <div
                  className="text-md leading-normal text-gray-400 sm:block overflow-hidden"
                  style={{ maxHeight: '100px' }}
                >
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

export default Leave;
