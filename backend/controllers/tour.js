const config = require("../config");
const express = require("express");
const sql = require("mssql");


module.exports.getAllTour=async (req, res)=>{
    try{
        const pool = await sql.connect(config);

        const Alltourresult =await pool.request()
        .query('SELECT * FROM Tour');
        res.status(200).json(Alltourresult.recordset);

    }catch (error) {
        res.status(500).json({ message: 'Error fetching tours', error });
      }
}