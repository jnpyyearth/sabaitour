const config = require("../config");
const sql = require("mssql");
const bcrypt = require('bcrypt');


module.exports.signUp = async (req, res) => {
    const { username, email, password, firstname, lastname, phone, confirmPassword } = req.body;
    const defaultRole ='customer';
    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }
    try {
        const pool = await sql.connect(config);
        //check have user?
        const checkUser = await pool.request()
            .input('email', sql.VarChar, email)
            .query('select * from Users where email=@email ');

        if (checkUser.recordset.length > 0) {
            return res.status(400).json({ message: 'Username or Email already exits' })
        }
        const storedHashedPassword = await bcrypt.hash(password, 10);
        //insert data
        const transaction = new sql.Transaction(pool)
        await transaction.begin()
        try {
            const insertCustomer = await transaction.request()
                .input('username', sql.VarChar, username)
                .input('email', sql.VarChar, email)
                .input('password', sql.VarChar, storedHashedPassword)
                .input('firstname', sql.VarChar, firstname)
                .input('lastname', sql.VarChar, lastname)
                .input('phone', sql.VarChar, phone)
                .input('role',sql.VarChar,defaultRole)
                .query('insert into Users (username, email, password,firstname,lastname,phone,role)OUTPUT inserted.User_ID VALUES (@username, @email, @password, @firstname, @lastname, @phone,@role)')
            const User_ID = insertCustomer.recordset[0].User_ID;
            await transaction.request()
                .input('User_ID', sql.Int, User_ID)
                .query('insert into Customer (User_ID) values (@User_ID)');

            await transaction.commit();
            res.status(201).json({ meesage: 'User registered successsfully' });
        } catch (error) {
            await transaction.rollback();
            console.error('Transaction error:', error);
            res.status(500).json({ mesage: 'Error during registreation.' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' })
    }

    
}