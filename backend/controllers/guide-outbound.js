const config = require("../config");
const express = require("express");
const sql = require("mssql");


module.exports.getAllguide = async (req, res) => {
    try {
        const pool = await sql.connect(config);

        const allGuideresult = await pool.request()
            .query(' SELECT g.Guide_ID, u.username as Guide_Name,gt.Type_Name FROM Guide g inner JOIN Users u ON g.User_ID = u.User_ID   inner JOIN Guide_Type gt ON g.Type_ID = gt.Type_ID');

        res.status(200).json(allGuideresult.recordset);

    } catch (error) {
        res.status(500).json({ message: 'Error fetching tours', error });
    }
}

module.exports.getOutboundGuides = async (req, res) => {
    try {
        const pool = await sql.connect(config);

        // Query ข้อมูลไกด์ที่มี Guide_Type เป็น 'outbound'
        const guides = await pool.request().query(`SELECT g.Guide_ID, u.username as Guide_Name,gt.Type_Name
             FROM Guide g JOIN Users u ON g.User_ID = u.User_ID  JOIN Guide_Type gt ON g.Type_ID = g.Type_ID 
             WHERE gt.Type_Name = 'outbound'`);
        console.log('outbound query')
        res.status(200).json(guides.recordset);  // ส่งข้อมูลไกด์ outbound กลับไปยัง frontend
    } catch (error) {
        res.status(500).json({ message: 'Error fetching outbound guides', error });
    }
};
