const { Type } = require("@angular-devkit/build-angular");
const config = require("../config");
const express = require("express");
const sql = require("mssql");
const { isTypeQueryNode } = require("typescript");


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
        const guides = await pool.request().query(`SELECT g.Guide_ID, u.username as Guide_Name,gt.Type_Name,u.firstname,u.lastname,phone,u.email,u.User_Picture,u.User_ID
             FROM Guide g JOIN Users u ON g.User_ID = u.User_ID  JOIN Guide_Type gt ON g.Type_ID = gt.Type_ID 
             WHERE gt.Type_Name = 'outbound'`);
       
        res.status(200).json(guides.recordset);  // ส่งข้อมูลไกด์ outbound กลับไปยัง frontend
    } catch (error) {
        res.status(500).json({ message: 'Error fetching outbound guides', error });
    }
};


// Express.js - Route สำหรับดึงข้อมูลไกด์ที่เป็น inbound
module.exports.getInboundGuides = async (req, res) => {
    try {
        const pool = await sql.connect(config);

        // Query ข้อมูลไกด์ที่มี Guide_Type เป็น 'inbound'
        const guides = await pool.request()
            .query(`SELECT g.Guide_ID, u.username as Guide_Name,gt.Type_Name,u.firstname,u.lastname,phone,u.email,u.User_Picture,u.User_ID
            FROM Guide g JOIN Users u ON g.User_ID = u.User_ID  JOIN Guide_Type gt ON g.Type_ID = gt.Type_ID 
            WHERE gt.Type_Name = 'inbound'`);

       
        res.status(200).json(guides.recordset);  // ส่งข้อมูลไกด์ inbound กลับไปยัง frontend
    } catch (error) {
        res.status(500).json({ message: 'Error fetching inbound guides', error });
    }
};

module.exports.UpdateGuideProfile =async (req,res)=>{
    const{Guide_ID,Type_Name,email,firstname,lastname,phone,User_ID} =req.body

     let Type_ID =0
     if(Type_Name ==='inbound'){
        
        Type_ID =1
    console.log('set type ',Type_ID)
    }else if(Type_Name ==='outbound'){
        Type_ID =2
        console.log('set type ',Type_ID)
     }
    try{
        const pool = await sql.connect(config);
        const result =await pool.request()
        .input('Guide_ID',sql.Int,Guide_ID)
        .input('email',sql.VarChar,email)
        .input('firstname',sql.VarChar,firstname)
        .input('lastname',sql.VarChar,lastname)
        .input('phone',sql.Int,phone)
        .input('Type_ID',sql.Int,Type_ID)
        .input('User_ID',sql.Int,User_ID)
        .execute('updateGuideProfile');
        res.status(200).json({ message: 'Guide and user updated successfully', result });
    }catch(error){
        console.error('Error updating guide and user:', error);
        res.status(500).json({ error: 'Failed to update guide and user', details: error.message })
    }
}