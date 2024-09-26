const express = require("express");
const AddmissionRoutes=express.Router();

const {Admission,getresident} =require("../controller/admissionController");

AddmissionRoutes.post("/admission",Admission);
AddmissionRoutes.get("/getresident",getresident);

module.exports=AddmissionRoutes;