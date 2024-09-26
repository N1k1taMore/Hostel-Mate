import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import NavbarS from "./NavbarS";
import Complaint from "./Complaint";
import WardenComplaints from "./WardenComplaint";
import { GetAuthHeader } from "../testing/Headers";

function Dashboard() {
  const [userType, setUserType] = useState(null);

  
  useEffect(() => {
   
    const fetchUserType = async () => {
      try {
        const response = await fetch("http://localhost:3000/userType", {
          method: "GET",
          headers: GetAuthHeader(),
        });

        if (response.ok) {
          const data = await response.json();
          setUserType(data.userType);
        } else {
          console.error('Failed to fetch user type');
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchUserType();
  }, []); 

  return (
    <>
     
      {userType === "student" ?<div> <NavbarS /><Complaint /> </div> : null}
      {userType === "warden" ? <div><Navbar/><WardenComplaints /></div> : null}
    </>
  );
}

export default Dashboard;
