const config = require("../config");
const express = require("express");
const sql = require("mssql");


module.exports.getAllguide=async (req, res)=>{
    try{
        const pool = await sql.connect(config);

        const allGuideresult =await pool.request()
        .query('SELECT * FROM Guide');
        res.status(200).json(allGuideresult.recordset);

    }catch (error) {
        res.status(500).json({ message: 'Error fetching tours', error });
      }
}