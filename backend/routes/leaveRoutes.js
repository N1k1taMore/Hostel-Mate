const express = require("express");
const leaveRoutes=express.Router();
const {
    postleaves,
    getAllLeavesByUser,
}=require("../controller/leaveController");
const { authorizeWardenOrStudent} = require("../middleware/auth");

leaveRoutes.post("/leaves",postleaves);
leaveRoutes.get("/leaves", authorizeWardenOrStudent, getAllLeavesByUser);

module.exports=leaveRoutes;