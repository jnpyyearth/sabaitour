// const config = require("../config");
// const express = require("express");
// const sql = require("mssql");


// module.exports.addbooking = async (req, res) => {
//   const { username, ProgramTour_ID, price_per_person, participants } = req.body;

//   const BookingDate = new Date();
//   let transaction;
//   try {

//     const pool = await sql.connect(config);
//      transaction = new sql.Transaction(pool);
//     await transaction.begin()
//     //หาUser_ID
//     console.log(username)
//     const userResult = await pool.request()
//       .input('username', sql.VarChar, username)
//       .query(`select User_ID from Users  where username =@username`);
//       console.log("user id",userResult.recordset[0].User_ID)
//     if (userResult.recordset.length === 0) {
//       throw new Error('user not found');
//     }
//     const User_ID = userResult.recordset[0].User_ID;
//     console.log("new user",User_ID)
//     // หา Cus_ID
//     const customerResult = await pool.request()
//       .input('User_ID', sql.Int, User_ID)
//       .query(`select Cus_ID from Customer where User_ID =@User_ID `);
//     if (customerResult.recordset.length === 0) {
//       console.log(' no user ');
//       return res.status(404).json({ message: 'Customer not found' }); 
//     }
//     const Cus_ID = customerResult.recordset[0].Cus_ID;
//     console.log(Cus_ID)
//     //เอา ราคาต่อคน กับ ที่ว่าง
//     const programTourResult = await pool.request()
//       .input('ProgramTour_ID', sql.Int, ProgramTour_ID)
//       .query(`select Price_per_person, available_seats from ProgramTour where ProgramTour_ID=@ProgramTour_ID`);
//     if (programTourResult.recordset.length === 0) {
//       console.log("error programid not found")
//       return res.status(404).json({ message: 'programid  not found' })
//     }
//     const Price_per_person = programTourResult.recordset[0].Price_per_person;
//     const available_seats = programTourResult.recordset[0].available_seats;

//     const touristAmount = participants.length;
//     const TotalPrice = touristAmount * Price_per_person
//     //check ว่า มีที่ว่างมั้ย
//     if (touristAmount > available_seats) {
//       return res.status(400).json({ message: 'no seat left' })
//     }
//     //insert booking and get  booking_ID
//     console.log('Cus_ID:', Cus_ID);
//     const bookingInsert = await pool.request()

//       .input('ProgramTour_ID', sql.Int, ProgramTour_ID)
//       .input('Tourist_Amount', sql.Int, touristAmount)
//       .input('TotalPrice', sql.Money, TotalPrice)
//       .input('Cus_ID', sql.Int, Cus_ID)
//       .input('BookingDate', sql.Date,BookingDate)
//       .query(` insert into Booking (ProgramTour_ID,Tourist_Amount,TotalPrice,Cus_ID,Booking_Date) 
//               output inserted.Booking_ID values
//               (@ProgramTour_ID,@Cus_ID,@Tourist_Amount,@TotalPrice,@BookingDate)`)

//         const Booking_ID =bookingInsert.recordset[0].Booking_ID

//        for(const participant of participants){
//         await pool.request()
//         .input('booking_ID',sql.Int,Booking_ID)
//         .input('Cus_ID',sql.Int,Cus_ID)
//         .input('Tourist_Firstname',sql.VarChar,participant.firstname)
//         .input('Tourist_Lastname', sql.VarChar, participant.lastname)
//         .input('ID_Card', sql.VarChar, participant.id_card)
//         .input('DateOfBirth', sql.Date, participant.DateOfBirth)
//         .input('email', sql.VarChar, participant.email)
//         .input('phone', sql.VarChar, participant.phone)
//         .input('Special_Request', sql.VarChar, participant.special_request)
//         .query(`insert into booking_Participants (Booking_ID, Cus_ID,Tourist_Firstname,Tourist_Lastname,ID_Card,DateOfBirth,email,phone,Special_Request) 
//           values(@Booking_ID, @Cus_ID, @Tourist_Firstname, @Tourist_Lastname, @ID_Card, @DateOfBirth, @email, 
//           @phone, @Special_Request)`)
//       }
//       //update available price
//       await pool.request()
//       .input('available_seats',sql.Int,available_seats-touristAmount)
//       .input('ProgramTour_ID',sql.Int,ProgramTour_ID)
//       .query('update ProgramTour SET available_seats =@available_seats where ProgramTour_ID=@ProgramTour_ID')

//       await transaction.commit();
//       res.status(200).json({message:'booking added successfully'})
//   } catch(error) {
//     console.error('error adding booking',error.message)
//     if(transaction){
//       console.log('rollback')
//       await transaction.rollback();
//     }
//     res.status(500).json({
//       message: 'Error adding booking',
//       error: error.message
//     });
//   }
// }
const config = require("../config");
const express = require("express");
const sql = require("mssql");

module.exports.addbooking = async (req, res) => {
  const { username, ProgramTour_ID, price_per_person, participants } = req.body;

  const BookingDate = new Date();
  let transaction;
  try {
    const pool = await sql.connect(config);
    transaction = new sql.Transaction(pool);
    await transaction.begin();

    // หา User_ID
    const userResult = await pool.request()
      .input('username', sql.VarChar, username)
      .query(`SELECT User_ID FROM Users WHERE username = @username`);

    if (userResult.recordset.length === 0) {
      throw new Error('User not found');
    }

    const User_ID = userResult.recordset[0].User_ID;

    // หา Cus_ID
    const customerResult = await pool.request()
      .input('User_ID', sql.Int, User_ID)
      .query(`SELECT Cus_ID FROM Customer WHERE User_ID = @User_ID`);

    if (customerResult.recordset.length === 0) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const Cus_ID = customerResult.recordset[0].Cus_ID;

    // เอา ราคาต่อคน กับ ที่ว่าง
    const programTourResult = await pool.request()
      .input('ProgramTour_ID', sql.Int, ProgramTour_ID)
      .query(`SELECT Price_per_person, available_seats FROM ProgramTour WHERE ProgramTour_ID = @ProgramTour_ID`);

    if (programTourResult.recordset.length === 0) {
      return res.status(404).json({ message: 'Program Tour not found' });
    }

    const Price_per_person = programTourResult.recordset[0].Price_per_person;
    const available_seats = programTourResult.recordset[0].available_seats;

    const touristAmount = participants.length;
    const TotalPrice = touristAmount * Price_per_person;

    // Check ว่ามีที่ว่างไหม
    if (touristAmount > available_seats) {
      return res.status(400).json({ message: 'No seat left' });
    }

    // Insert booking and get Booking_ID
    const bookingInsert = await pool.request()
      .input('ProgramTour_ID', sql.Int, ProgramTour_ID)
      .input('Tourist_Amount', sql.Int, touristAmount)
      .input('TotalPrice', sql.Money, TotalPrice)
      .input('Cus_ID', sql.Int, Cus_ID)
      .input('BookingDate', sql.Date, BookingDate)
      .query(`INSERT INTO Booking (ProgramTour_ID, Tourist_Amount, TotalPrice, Cus_ID, Booking_Date) 
               VALUES 
              (@ProgramTour_ID, @Tourist_Amount, @TotalPrice, @Cus_ID, @BookingDate)select scope_identity() as Booking_ID`);

    const Booking_ID = bookingInsert.recordset[0].Booking_ID;
    //save all participants to booking_participants
    for (const participant of participants) {
      await pool.request()
        .input('Booking_ID', sql.Int, Booking_ID)
        .input('Cus_ID', sql.Int, Cus_ID)
        .input('Tourist_Firstname', sql.VarChar, participant.firstname)  // แก้ fistname เป็น firstname
        .input('Tourist_Lastname', sql.VarChar, participant.lastname)
        .input('ID_Card', sql.VarChar, participant.id_card)
        .input('DateOfBirth', sql.Date, participant.DateOfBirth)
        .input('email', sql.VarChar, participant.email)
        .input('phone', sql.VarChar, participant.phone)
        .input('Special_Request', sql.VarChar, participant.special_request)
        .query(`INSERT INTO booking_Participants (Booking_ID, Cus_ID, Tourist_Firstname, Tourist_Lastname, ID_Card, DateOfBirth, email, phone, Special_Request) 
                VALUES (@Booking_ID, @Cus_ID, @Tourist_Firstname, @Tourist_Lastname, @ID_Card, @DateOfBirth, @email, @phone, @Special_Request)`);
    }


    await transaction.commit();
    return res.status(200).json({ message: 'Booking added successfully' });
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    return res.status(500).json({
      message: 'Error adding booking',
      error: error.message
    });
  }
};

module.exports.canceling = async (req, res) => {
  const Booking_ID = req.params.id;
  const bookdata = req.body
  let transaction;
  try {
    const pool = await sql.connect(config);
    transaction = new sql.Transaction(pool);
    await transaction.begin();
    const getUser_ID = await transaction.request()
      .input('username', sql.VarChar, bookdata.username)
      .query('select User_ID from Users where username =@username')

    if (getUser_ID.recordset.length === 0) {
      return res.status(400).json({ message: 'User_ID not found' });
    }
    const User_ID = getUser_ID.recordset[0].User_ID
    console.log('user_ID', User_ID)

    const getCus_ID = await transaction.request()
      .input('User_ID', sql.Int, User_ID)
      .query(`select Cus_ID from Customer where User_ID =@User_ID`)
    if (getCus_ID.recordset.length === 0) {
      return res.status(400).json({ message: 'Cus_ID not found' });
    }
    const Cus_ID = getCus_ID.recordset[0].Cus_ID
    console.log('Cus_ID', Cus_ID)

    const result = await transaction.request()
      .input('Booking_ID', sql.Int, Booking_ID)
      .input('Cus_ID', sql.Int, Cus_ID)
      .execute(`updatecancelled`);

    await transaction.commit();
    console.log('Transaction commit!', result);
  } catch (err) {
    console.log("error:", err);
    if (transaction) {
      await transaction.rollback(); // rollback ธุรกรรมเมื่อเกิดข้อผิดพลาด
      console.log('Transaction rolled back due to error.');
    }
    res.status(500).json({ message: 'Error during cancellation', error: err });
  }

}
module.exports.getAllProgramTourCheck = async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const Cus_ID = req.params.id
    const AllprogramtourCheck = await pool.request()
      .input('Cus_ID', sql.Int, Cus_ID)
      .query(`SELECT b.Booking_ID,   t.Tour_Country, t.Tour_name, t.Hotel, pt.StartDate,  pt.EndDate,  DATEDIFF(DAY, pt.StartDate, pt.EndDate) + 1 AS period, pt.Price_per_day, pt.Price_per_person, pt.Guide_ID,  b.Tourist_Amount, b.TotalPrice,  b.Booking_Date
FROM Booking b
INNER JOIN ProgramTour pt ON b.ProgramTour_ID = pt.ProgramTour_ID
INNER JOIN Guide g ON pt.Guide_ID = g.Guide_ID
INNER JOIN Tour t ON pt.Tour_ID = t.Tour_ID
WHERE b.Cus_ID = @Cus_ID`)
    res.status(200).json(AllprogramtourCheck.recordset)
  } catch (error) {
    res.status(500).json({ message: 'Erorr feching  all programtour', error });
  }
}
