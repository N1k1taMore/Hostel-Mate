const express = require("express");
const cors = require("cors");
const app = express();
const db = require("../db");
app.use(cors());
app.use(express.json());

exports.getStudentByid = async(req, res)=> {
    try {
        const {student_id} = req.params;
        const student = await db.pool.query(
          "select * from student where student_id = $1",
          [student_id]
        );
        res.json(student.rows)
      } catch (err) {
        console.log(err.message);
      }
};
exports.getStudentsInWardenBlock = async (req, res) => {
  try {
    // Extract the warden_id from the request (assuming it's passed in the query or token)
    const { warden_id } = req.params;

    // Query to get the block of the given warden
    const wardenQuery = await db.pool.query(
      "SELECT block_id FROM warden WHERE warden_id = $1",
      [warden_id]
    );

    if (wardenQuery.rows.length === 0) {
      return res.status(404).json({ error: "Warden not found" });
    }

    // Extract the block from the warden data
    const { block_id } = wardenQuery.rows[0];

    // Query to get students from the same block
    const studentsQuery = await db.pool.query(
      "SELECT * FROM student WHERE block_id = $1",
      [block]
    );

    // Send the list of students as a response
    res.json(studentsQuery.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};