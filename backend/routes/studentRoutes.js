const express = require('express');
const studentRoutes = express.Router()
const { getStudentByid ,getStudentsInWardenBlock} = require('../controller/studentController');


studentRoutes.get('/student/block/:warden_id', getStudentsInWardenBlock);
studentRoutes.get("/student/:student_id",getStudentByid);

module.exports = studentRoutes