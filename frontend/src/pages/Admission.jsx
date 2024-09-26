import { useNavigate} from "react-router-dom";
import { useState} from "react";
import Navbar from "./Navbar";

function  Admissionform() {
  const navigate = useNavigate()
  const [full_name, setFull_name] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [addres, setAddres] = useState("");
  const [block_id, setBlock_id] = useState("");
  const [room, setRoom] = useState("");

  
  const onSubmit = async (e) => {
    e.preventDefault();

    if (!full_name || full_name.trim() === "") {
      alert("Please enter a valid name.");
      return;
    }
    if (!email || email.trim() === "") {
        alert("Please enter a valid email.");
        return;
    }
    if (!phone || phone.trim() === "" || phone.length!= 10) {
    alert("Please enter a phone number.");
    return;
    }
    if (!room || room.trim() === "") {
      alert("Please enter Room No.");
      return;
    }

    try {
      const body={full_name,email,phone,addres,block_id,room};
      const response = await fetch("http://localhost:3000/admission", {
        method: "POST",
        headers: { "content-type": "application/json " },
        body: JSON.stringify(body),
      });
      console.log(response);
      const data = await response.json();
      console.log(data);
      if (data.jwtToken) {
        alert("Resident Admitted successfully");
        navigate('/getdata')
      } else {
        alert("Resident already exists");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
    <Navbar></Navbar>
      <section className="flex justify-center items-center h-screen">

<div className="relative flex  flex-col sm:w-full md:w-[30rem] lg:w-[30rem] xl:w-[30rem] 2xl:w-[30rem] rounded-lg border-gray-400 bg-white shadow-lg px-4">
  <div className="flex-auto p-6">
    <div className="mb-10 flex flex-shrink-0 flex-grow-0 items-center justify-center overflow-hidden">
      <a
        href="#"
        className="flex cursor-pointer items-center gap-2 text-indigo-500 no-underline hover:text-indigo-500"
      >
        <span className="flex-shrink-0 text-3xl font-black  tracking-tight opacity-100">
          Admission Form
        </span>
      </a>
    </div>

    <form className="mb-4" action="#" method="POST">
      <div className="mb-4">
        <div className="flex justify-between">
          <label
            className="mb-2 inline-block text-xs font-medium uppercase text-gray-700"
            htmlFor="password"
          >
            Full Name
          </label>
        </div>
        <div className="relative flex w-full flex-wrap items-stretch">
          <input
            type="text"
            className="relative block flex-auto cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
            name="full-name"
            placeholder="Enter your full name"
            onChange={(e) => setFull_name(e.target.value)}
          />
        </div>
      </div>
      <div className="mb-4">
        <div className="flex justify-between">
        <label
            htmlFor="email"
            className="mb-2 inline-block text-xs font-medium uppercase text-gray-700"
          >
            Email
          </label>
        
        </div>
        <div className="relative flex w-full flex-wrap items-stretch">
        <input
            type="text"
            className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
            id="email"
            name="email-username"
            placeholder="Enter your email "
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
          </div>
      </div>

      <div className="mb-4 flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
        <div className="flex-1">
        <label
            htmlFor="password"
            className="mb-2 inline-block text-xs font-medium uppercase text-gray-700"
          >
            Phone Number
          </label>
          <input
            type="text"
            className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
            name="password"
            placeholder="Enter your phone number"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="flex-1">
        <label
            htmlFor="text"
            className="mb-2 inline-block text-xs font-medium uppercase text-gray-700"
          >
            Address
          </label>
          <input
            type="text"
            className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
            id="addres"
            name="addres"
            placeholder="Enter your Addres "
            autoFocus
            onChange={(e) => setAddres(e.target.value)}
          />
        </div>
      </div>
      <div className="mb-4 flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
        <div className="flex-1">
          
          <label
            htmlFor="text"
            className="mb-2 inline-block text-xs font-medium uppercase text-gray-700"
          >
            Block Id
          </label>
          <input
            type="text"
            className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
            id="email"
            name="email-username"
            placeholder="Enter your Block ID"
            autoFocus
            onChange={(e) => setBlock_id(e.target.value)}
      />
        </div>
        <div className="flex-1">
        <label
              htmlFor="password"
              className="mb-2 inline-block text-xs font-medium uppercase text-gray-700"
            >
              Room
            </label>
            <input
              type="text"
              className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
              name="password"
              placeholder="Enter your Room"
              onChange={(e) => setRoom(e.target.value)}
            />
        </div>
      </div>


    
      <div className="mb-4">
        <button
          className="grid w-full cursor-pointer select-none rounded-md border border-indigo-500 bg-indigo-500 py-2 px-5 text-center align-middle text-sm text-white shadow hover:border-indigo-600 hover:bg-indigo-600 hover:text-white focus:border-indigo-600 focus:bg-indigo-600 focus:text-white focus:shadow-none"
          type="submit"
          onClick={onSubmit}
        >
          Submit Form
        </button>
      </div>
    </form>

  </div>
</div>
</section>
    </>
  
  );
}

export default Admissionform;
