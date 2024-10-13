import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import NavbarS from "./NavbarS";
import Complaint from "./Complaint";
import WardenComplaints from "./WardenComplaint";
import { GetAuthHeader } from "../testing/Headers";
import axios from 'axios';

function Dashboard() {
  const [userType, setUserType] = useState(null);

  
  useEffect(() => {
   
    const fetchUserType = async () => {
      try {
        const response = await axios.get("http://localhost:3000/userType", {
          headers: GetAuthHeader()
        });
      
        setUserType(response.data.userType);
      } catch (error) {
        if (error.response) {
          console.error('Failed to fetch user type');
        } else {
          console.error(error.message);
        }
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
