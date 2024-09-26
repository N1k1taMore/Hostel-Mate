const express = require("express");
const cors = require("cors");
const app = express();
const db = require("../db");
const { jwtGenerator, jwtDecoder } = require("../utils/jwtToken");

app.use(cors());
app.use(express.json());

const decodeUser = async (token) => {
    try {
      const decodedToken = jwtDecoder(token);
      console.log(decodedToken);
  
      const { user_id, type } = decodedToken.user;
      let userInfo;
  
      if (type === "student") {
        const query = `
          SELECT student_id, room, block_id
          FROM student 
          WHERE student_id = $1
        `;
  
        const result = await db.pool.query(query, [user_id]);
        console.log(result.rows);
        if (result.rows.length > 0) {
          userInfo = result.rows[0];
        }
      }
  
      if (type === "warden") {
        const query = `
          SELECT warden_id,  block_id
          FROM warden 
          WHERE warden_id = $1
        `;
  
        const result = await db.pool.query(query, [user_id]);
  
        if (result.rows.length > 0) {
          userInfo = result.rows[0];
        }
      }
  
      return userInfo;
    } catch (err) {
      console.error("here111", err.message);
    }
  };

exports.postleaves = async (req, res) => {
    try {
      const token = req.headers.authorization;
      console.log(token);
      const userInfo = await decodeUser(token);
  
      const { student_id, block_id } = userInfo;
  
      const { name, description, room } = req.body;
  
      const query = `insert into leave 
              (name, block_id, 
              student_id, 
              description, room, created_at) 
              values ($1,$2,$3,$4,$5,$6) returning *`;
  
      const newLeave = await db.pool.query(query, [
        name,
        block_id,
        student_id,
        description,
        room,
        new Date().toISOString(),
      ]);
      res.json(newLeave.rows[0]);
    } catch (err) {
      console.log(err.message);
    }
  };

exports.getAllLeavesByUser = async (req, res) => {
  const token = req.headers.authorization;
  console.log(token);
  const decodedToken = jwtDecoder(token);
  console.log(decodedToken);

  const { user_id, type } = decodedToken.user;

  try {
    if (type === "warden") {
      const allleaves = await db.pool.query(
        "SELECT * FROM leave ORDER BY created_at DESC"
      );
      res.json(allleaves.rows);
    } else if (type === "student") {
      const myleaves = await db.pool.query(
        "SELECT * FROM leave WHERE student_id = $1 ORDER BY created_at DESC",
        [user_id]
      );
      res.json(myleaves.rows);
    } else {
      res.status(403).json({ error: "Unauthorized" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
