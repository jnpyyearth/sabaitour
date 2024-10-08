const config = require("../config");
const express = require("express");
const sql = require("mssql");




module.exports.getAllProgramTourForCard =async (req,res)=>{
  try{
    const pool =await sql.connect(config);

    const AllprogramtourForCard =await pool.request()
    .query(`SELECT ProgramTour.ProgramTour_ID, Tour.Tour_name, Tour.Tour_Country, ProgramTour.StartDate, ProgramTour.EndDate, ProgramTour.Price_per_person, Tour.Tour_Picture  
      ,DATEDIFF(day,ProgramTour.StartDate,ProgramTour.EndDate) + 1 AS period
      FROM ProgramTour INNER JOIN Tour ON ProgramTour.Tour_ID = Tour.Tour_ID`)
    res.status(200).json(AllprogramtourForCard.recordset)
  }catch (error){
    res.status(500).json({message:'Erorr feching  all programtour',error});
  }
}


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


module.exports.addProgramTour = async (req, res) => {
    const { Tour_ID, StartDate, EndDate, Price_per_day, total_seats, Guide_ID } = req.body;
  
    try {
      const pool = await sql.connect(config);
      const available_seats = total_seats; 

      const checkSameProgram = await pool.request()
      .input('Tour_ID', sql.Int, Tour_ID)
      .input('StartDate', sql.Date, StartDate)
      .input('EndDate', sql.Date, EndDate)
      .query(`
        SELECT COUNT(*) AS count FROM ProgramTour
        WHERE Tour_ID = @Tour_ID AND StartDate = @StartDate AND EndDate = @EndDate
      `);

    // ถ้ามีโปรแกรมทัวร์ซ้ำ ให้ส่งสถานะ 400 พร้อมข้อความเตือนกลับไป
    if (checkSameProgram.recordset[0].count > 0) {
      return res.status(400).json({ message: 'โปรแกรมทัวร์นี้มีอยู่แล้วในช่วงเวลาที่กำหนด' });
    }


      const addresult = await pool.request()
        .input('Tour_ID', sql.Int, Tour_ID)
        .input('StartDate', sql.Date, StartDate)
        .input('EndDate', sql.Date, EndDate)
        .input('Price_per_day', sql.Money, Price_per_day) 
        .input('total_seats', sql.Int, total_seats)
        .input('Guide_ID', sql.Int, Guide_ID)
        .input('available_seats',sql.Int,available_seats)
        .query(`
          INSERT INTO ProgramTour (Tour_ID, StartDate, EndDate, Price_per_day, total_seats, Guide_ID,available_seats)
          VALUES (@Tour_ID, @StartDate, @EndDate, @Price_per_day, @total_seats, @Guide_ID,@available_seats);
        `);
  
      res.status(201).json({ message: 'ProgramTour added successfully', result: addresult.recordset });
      
    } catch (error) {
      console.error('Error adding ProgramTour:', error);  
      res.status(500).json({ message: 'Error adding ProgramTour', error: error.message || error });
    }
  };
  

