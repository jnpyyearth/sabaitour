const config = require("../config");
const sql = require("mssql");


module.exports.addreview = async (req, res) => {
    let transaction
    try {
        const { ProgramTour_ID, username,comment } = req.body
        const Review_Date =new Date();
        const pool = await sql.connect(config)
        transaction = new sql.Transaction(pool);
        await transaction.begin();
        //get User_ID
        const getUser_ID = await transaction.request()
            .input('username', sql.VarChar,username)
            .query('select User_ID from Users where username =@username')

        if (getUser_ID.recordset.length === 0) {
            return res.status(400).json({ message: 'User_ID not found' });
        }
        const User_ID = getUser_ID.recordset[0].User_ID
        console.log('user_ID', User_ID)
        //getCus_ID
        const getCus_ID = await transaction.request()
            .input('User_ID', sql.Int, User_ID)
            .query(`select Cus_ID from Customer where User_ID =@User_ID`)
        if (getCus_ID.recordset.length === 0) {
            return res.status(400).json({ message: 'Cus_ID not found' });
        }
        const Cus_ID = getCus_ID.recordset[0].Cus_ID
        console.log('Cus_ID', Cus_ID)

        //add review
        const reviewresult =await transaction.request()
        .input('Cus_ID',sql.Int,Cus_ID)
        .input('ProgramTour_ID',sql.Int,ProgramTour_ID)
        .input('Review_Date',sql.Date,Review_Date)
        .input('comment',sql.VarChar,comment)
        .query(`insert into Reviews (Cus_ID, ProgramTour_ID, Review_Date, comment) 
            VALUES (@Cus_ID, @ProgramTour_ID, @Review_Date, @comment)`)
        await transaction.commit()
        res.status(200).json({ message: 'Review added successfully', review: reviewresult });
    } catch (error) {
        if (transaction) {
            await transaction.rollback(); // rollback ธุรกรรมเมื่อเกิดข้อผิดพลาด
            console.log('Transaction rolled back due to error.');
        }
        res.status(500).json({ message: 'Error adding review', error: error.message || error });
    }
}
module.exports.getreview = async (req, res) => {
    const  ProgramTour_ID  = req.params.id;
    console.log('Received ProgramTour_ID:', ProgramTour_ID);
    try {
      const pool = await sql.connect(); 
      const result = await pool.request()
        .input('ProgramTour_ID', sql.Int, ProgramTour_ID) 
        .query(`
          SELECT Reviews.ProgramTour_ID, Reviews.comment, Users.username
          FROM Reviews
          INNER JOIN Customer ON Reviews.Cus_ID = Customer.Cus_ID
          INNER JOIN Users ON Customer.User_ID = Users.User_ID
          WHERE Reviews.ProgramTour_ID = @ProgramTour_ID;  
        `);
          console.log("programTour_ID",ProgramTour_ID)  
      res.status(200).json(result.recordset); 
    } catch (error) {
      res.status(500).json({ message: 'Error getting review', error: error.message || error });
    }
  };
  