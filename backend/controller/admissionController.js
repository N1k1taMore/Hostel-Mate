const express = require('express');
const cors = require('cors');
const app = express();
const db = require('../db');
const { jwtGenerator, jwtDecoder } = require('../utils/jwtToken');
app.use(cors());
app.use(express.json());

exports.Admission = async (req, res) => {
  const { full_name, email, phone, addres,block_id, room, admitted_at, fee_payed } =
    req.body;
    if (!full_name || !email || !phone || !addres || !block_id|| !room) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
  try {
    const resident = await db.pool.query(
      'SELECT * FROM resident WHERE email = $1',
      [email]
    );

    if (resident.rows.length > 0) {
      return res.status(401).json('Resident already exist!');
    }

    const query =
      'INSERT INTO resident (full_name, email,  phone,addres,block_id,room,admitted_at,fee_payed) VALUES ($1, $2, $3, $4,$5,$6,$7,$8) RETURNING *';
    let newResident = await db.pool.query(query, [
      full_name,
      email,
      phone,
      addres,
      block_id,
      room,
      new Date().toISOString(),
      true,
    ]);

    const jwtToken = jwtGenerator(newResident.rows[0].resident_id);

    //console.log(jwtDecoder(jwtToken));
    return res.json({ jwtToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getresident=async(req,res)=>{
  try{
    const resident=await db.pool.query(
      "SELECT * FROM resident"
    );
    res.json(resident.rows)
  }
  catch(err){
    console.log(err.message);
  }
}
