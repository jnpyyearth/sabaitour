const config = require("../config");
const express = require("express");
const sql = require("mssql");



module.exports.addOriginalTour = async (req, res) => {
  try {
    const { Tour_name, Tour_Country, Hotel, Type_Status } = req.body;
       // ตรวจสอบว่ามีภาพที่อัปโหลดมาหรือไม่
       const Tour_Picture = req.file ? 'uploads/' + req.file.filename : null;   
       if (!Tour_Picture) {
        return res.status(400).json({ message: 'Image upload is required' });
      }
    const pool = await sql.connect(config);
    const addTourResult = await pool.request()
      .input('Tour_name', sql.VarChar, Tour_name)
      .input('Tour_Country', sql.VarChar, Tour_Country)
      .input('Tour_Picture', sql.VarChar, Tour_Picture)
      .input('Hotel', sql.VarChar, Hotel)
      .input('Type_Status', sql.VarChar, Type_Status)
      .query(` INSERT INTO Tour (Tour_name, Tour_Country, Tour_Picture, Hotel, Type_Status)
       VALUES (@Tour_name, @Tour_Country, @Tour_Picture, @Hotel, @Type_Status); `);
    res.status(201).json({message: 'Tour added successfully',});
  } catch (error) {
    console.error('Error adding tour:', error);
    res.status(500).json({ message: 'Failed to add tour', error });
  }
};


module.exports.getAllProgramTourForCard = async (req, res) => {
  try {
    const pool = await sql.connect(config);

    const AllprogramtourForCard = await pool.request()
      .query(`SELECT ProgramTour.ProgramTour_ID, Tour.Tour_name, Tour.Tour_Country, ProgramTour.StartDate, ProgramTour.EndDate, ProgramTour.Price_per_person, Tour.Tour_Picture,Price_per_day  
      ,DATEDIFF(day,ProgramTour.StartDate,ProgramTour.EndDate) + 1 AS period,ProgramTour.Guide_ID,Tour.Type_Status,ProgramTour.total_seats, ProgramTour.cancelled
      FROM ProgramTour INNER JOIN Tour ON ProgramTour.Tour_ID = Tour.Tour_ID`)
    res.status(200).json(AllprogramtourForCard.recordset)
  
  } catch (error) {
    res.status(500).json({ message: 'Erorr feching  all programtour', error });
  }
}
module.exports.getAllProgramTourForCardInbound = async (req, res) => {
  try {
    const pool = await sql.connect(config);

    const AllprogramtourForCard = await pool.request()
      .query(`SELECT ProgramTour.ProgramTour_ID, Tour.Tour_name, Tour.Tour_Country, ProgramTour.StartDate, ProgramTour.EndDate, ProgramTour.Price_per_person, Tour.Tour_Picture,Price_per_day  
      ,DATEDIFF(day,ProgramTour.StartDate,ProgramTour.EndDate) + 1 AS period,ProgramTour.Guide_ID,Tour.Type_Status,ProgramTour.total_seats, ProgramTour.cancelled
      FROM ProgramTour INNER JOIN Tour ON ProgramTour.Tour_ID = Tour.Tour_ID where Tour.Type_Status='inbound'`)
    res.status(200).json(AllprogramtourForCard.recordset)
  } catch (error) {
    res.status(500).json({ message: 'Erorr feching  all programtour', error });
  }
}

module.exports.getAllProgramTourForCardOutbound = async (req, res) => {
  try {
    const pool = await sql.connect(config);

    const AllprogramtourForCard = await pool.request()
      .query(`SELECT ProgramTour.ProgramTour_ID, Tour.Tour_name, Tour.Tour_Country, ProgramTour.StartDate, ProgramTour.EndDate, ProgramTour.Price_per_person, Tour.Tour_Picture,Price_per_day  
      ,DATEDIFF(day,ProgramTour.StartDate,ProgramTour.EndDate) + 1 AS period,ProgramTour.Guide_ID,Tour.Type_Status,ProgramTour.total_seats, ProgramTour.cancelled
      FROM ProgramTour INNER JOIN Tour ON ProgramTour.Tour_ID = Tour.Tour_ID where Tour.Type_Status='outbound'`)
    res.status(200).json(AllprogramtourForCard.recordset)
  } catch (error) {
    res.status(500).json({ message: 'Erorr feching  all programtour', error });
  }
}

module.exports.getAllTour = async (req, res) => {
  try {
    const pool = await sql.connect(config);

    const Alltourresult = await pool.request()
      .query('SELECT * FROM Tour');
    res.status(200).json(Alltourresult.recordset);

  } catch (error) {
    res.status(500).json({ message: 'Error fetching tours', error });
  }
}


module.exports.addProgramTour = async (req, res) => {
  // const { Tour_ID, StartDate, EndDate, Price_per_day, total_seats, Guide_ID } = req.body;
  const Tour_ID = parseInt(req.body.Tour_ID, 10);
  const StartDate = req.body.StartDate;
  const EndDate = req.body.EndDate;
  const Price_per_day = parseFloat(req.body.Price_per_day);
  const total_seats = parseInt(req.body.total_seats, 10);
  const Guide_ID = parseInt(req.body.Guide_ID, 10);
  const pdfPath = req.file ? 'uploads/' + req.file.filename : null;   
  if (!pdfPath) {
   return res.status(400).json({ message: 'pdf upload is required' });
 }

  try {
    const pool = await sql.connect(config);
    const available_seats = total_seats;

    const checkavaliable_guide =await pool.request()
      .input('StartDate',sql.Date, StartDate)
      .input('EndDate',sql.Date,EndDate)
      .input('Guide_ID',sql.Int ,Guide_ID)
      .query(`select * from ProgramTour  where Guide_ID =@Guide_ID and (StartDate between @StartDate and @EndDate  or EndDate between @StartDate and @EndDate)`);
      
      if(checkavaliable_guide.recordset.length >0 && checkavaliable_guide.recordset[0].cancelled ==0){
        console.log('cancelled =',checkavaliable_guide.recordset[0].cancelled)
        return res.status(200).json({available:false});
      }
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
      .input('available_seats', sql.Int, available_seats)
      .input('pdf_Tour',sql.VarChar,pdfPath)
      .query(`
          INSERT INTO ProgramTour (Tour_ID, StartDate, EndDate, Price_per_day, total_seats, Guide_ID,available_seats,pdf_Tour)
          VALUES (@Tour_ID, @StartDate, @EndDate, @Price_per_day, @total_seats, @Guide_ID,@available_seats,@pdf_Tour);
        `);

    res.status(201).json({ message: 'ProgramTour added successfully', result: addresult.recordset });

  } catch (error) {
    console.error('Error adding ProgramTour:', error);
    res.status(500).json({ message: 'Error adding ProgramTour', error: error.message || error });
  }
};


module.exports.updateProgramTour = async (req, res) => {
  const ProgramTourId = req.params.id;
  const { StartDate, EndDate, Price_per_day, Guide_ID, total_seats } = req.body;
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('StartDate', sql.Date, StartDate)
      .input('EndDate', sql.Date, EndDate)
      .input('Price_per_day', sql.Money, Price_per_day)
      .input('Guide_ID', sql.Int, Guide_ID)
      .input('total_seats', sql.Int, total_seats)
      .input('ProgramTour_ID', sql.Int, ProgramTourId)
      .execute('updateProgramtour')
      
    res.json({ message: 'update programtour successfully', result })
  } catch (err) {
    if (err.message.includes('ไม่สามารถอัปเดตได้ ไกด์ถูกจองแล้วในช่วงเวลานี้')) {
      console.log('Warning: The guide is already booked during this period.');
      res.status(409).json({error: 'guide is already booked during this period'}) // แสดงข้อความเตือนใน Console
    }else{
        console.error('Error updating data', err)
    res.status(500).json({ error: 'Failed to update data' });
    }
  
  }
}

module.exports.cancelledProgramTour = async (req, res) => {
  const ProgramTourId = req.params.id;
  try {
    const pool = await sql.connect(config)
    const result = await pool.request()
      .input('ProgramTour_ID', sql.Int, ProgramTourId)
      .query(`update ProgramTour set cancelled =1 where ProgramTour_ID =@ProgramTour_ID`)
    res.json({ message: 'tour got cancelled' })
  } catch {
    console.error('Error updating data', err)
    res.status(500).json({ error: 'Failed to update data' });
  }

}

module.exports.getProgramTourById = async (req, res) => {
  const ProgramTourId = req.params.id;
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('ProgramTour_ID', sql.Int, ProgramTourId)
      .query(`SELECT ProgramTour.ProgramTour_ID, 
       ProgramTour.StartDate, 
       ProgramTour.EndDate, 
       ProgramTour.Price_per_day, 
       ProgramTour.Price_per_person, 
       ProgramTour.Guide_ID, 
       ProgramTour.total_seats, 
       ProgramTour.status, 
       ProgramTour.available_seats, 
       ProgramTour.cancelled,ProgramTour.pdf_Tour,
       DATEDIFF(day,ProgramTour.StartDate,ProgramTour.EndDate) + 1 AS period,
       Tour.Tour_name, 
       Tour.Tour_Country, 
       Tour.Tour_Picture, 
       Tour.Hotel, 
       Tour.Type_Status
FROM ProgramTour
INNER JOIN Tour ON ProgramTour.Tour_ID = Tour.Tour_ID where ProgramTour.ProgramTour_ID =@ProgramTour_ID
`);
    console.log('hello get id api', result.recordset)
    res.json(result.recordset);
  } catch (err) {
    console.error('Error updating data', err);
    res.status(500).json({ error: 'Failed to update data' });
  }
};
/////////////////////////////////////////
module.exports.gettouristById = async (req,res)=>{
  const programtourId = req.params.id;
  console.log('programtourid',programtourId)
  let transaction
  try{
    console.log('hello try ')
    const pool =await sql.connect(config)
    transaction = new sql.Transaction(pool);
    await transaction.begin()
    const Booking_IDresult =await transaction.request()
    .input('ProgramTour_ID',sql.Int,programtourId)
    .query(`select  Booking_ID from Booking where ProgramTour_ID = @ProgramTour_ID and cancelled =0`)
    console.log('Booking_ID',Booking_IDresult)
    const participantsresult =[];
    for (let Booking_ID of Booking_IDresult.recordset){
      console.log('hello begin loop')
      const newBooking_ID =Booking_ID.Booking_ID;
      console.log('hello newBooking_ID',newBooking_ID)
      const result = await transaction.request()
      .input('Booking_ID',sql.Int,newBooking_ID)
      .query(`select * from Booking_Participants where Booking_ID = @Booking_ID `)
      participantsresult.push({Booking_ID:Booking_ID,participantsresult:result.recordset})
      console.log('hello loop result :',result.recordset)
      console.log('hello loop participantsresult :',participantsresult.recordset)
    }
    await transaction.commit()
    res.status(201).json({message:'all participants',participantsresult})
  }catch (err){
    if(transaction){
      await transaction.rollback()
      console.log('rollback')
    }
    res.status(500).json({message:'error',err:err})
  }
}

module.exports.checksameguide = async (req, res) => {
  const {  StartDate, EndDate,  Guide_ID } = req.body;

  try {
    const pool = await sql.connect(config);

    const checkavaliable_guide =await pool.request()
      .input('StartDate',sql.Date, StartDate)
      .input('EndDate',sql.Date,EndDate)
      .input('Guide_ID',sql.Int ,Guide_ID)
      .query(`select * from ProgramTour  where Guide_ID =@Guide_ID and (StartDate between @StartDate and @EndDate  or EndDate between @StartDate and @EndDate)`);

      if(checkavaliable_guide.recordset.length >0){
        return res.status(200).json({available:false});
      }
      
    }catch(error){

    }
  }
      module.exports.getAllProgramTourForCard = async (req, res) => {
  try {
    const pool = await sql.connect(config);

    const AllprogramtourForCard = await pool.request()
      .query(`SELECT ProgramTour.ProgramTour_ID, Tour.Tour_name, Tour.Tour_Country, ProgramTour.StartDate, ProgramTour.EndDate, ProgramTour.Price_per_person, Tour.Tour_Picture,Price_per_day  
      ,DATEDIFF(day,ProgramTour.StartDate,ProgramTour.EndDate) + 1 AS period,ProgramTour.Guide_ID,Tour.Type_Status,ProgramTour.total_seats, ProgramTour.cancelled
      FROM ProgramTour INNER JOIN Tour ON ProgramTour.Tour_ID = Tour.Tour_ID`)
    res.status(200).json(AllprogramtourForCard.recordset)
  } catch (error) {
    res.status(500).json({ message: 'Erorr feching  all programtour', error });
  }
}

module.exports.getProgramTourForGuide = async (req, res) => {
  let transaction
  try {
    const {username}=req.body
    console.log('hello guide profile')
    const pool = await sql.connect(config);
    
    transaction = new sql.Transaction(pool);
    await transaction.begin();
    const getUser_ID = await transaction.request()
        .input('username', sql.VarChar, username)
        .query('select User_ID from Users where username =@username')

    if (getUser_ID.recordset.length === 0) {
        return res.status(400).json({ message: 'User_ID not found' });
    }
    const User_ID = getUser_ID.recordset[0].User_ID
    console.log('user_ID', User_ID)
    //get guide_ID
    const getGuide_ID = await transaction.request()
        .input('User_ID', sql.Int, User_ID)
        .query(`select Guide_ID from Guide where User_ID =@User_ID`)
    if (getGuide_ID.recordset.length === 0) {
        return res.status(400).json({ message: 'Guide_ID not found' });
    }
    const Guide_ID = getGuide_ID.recordset[0].Guide_ID
    console.log('Guide_ID', Guide_ID)
    const AllprogramtourForGuide= await transaction.request()
      .input('Guide_ID',sql.Int,Guide_ID)
      .query(`select * from   View_programtourForGuide where Guide_ID =@Guide_ID and cancelled =0`)
    res.status(200).json(AllprogramtourForGuide.recordset)
  } catch (error) {
    if(transaction){
      await transaction.rollback()
    }
    res.status(500).json({ message: 'Erorr feching  all programtour', error });
  }
}
