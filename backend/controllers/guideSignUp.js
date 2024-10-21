const config = require("../config");
const sql = require("mssql");
const bcrypt = require('bcrypt');


module.exports.signUp = async (req, res) => {
    const { username, email, password, firstname, lastname, phone, confirmPassword, guidetype,image } = req.body;
    console.log(req.body)
    const User_Picture = req.file ? 'uploads/' + req.file.filename : null;   
       if (!User_Picture) {
        return res.status(400).json({ message: 'Image upload is required' });
      }
    const defaultRole = 'guide';
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
            const insertguide = await transaction.request()
                .input('username', sql.VarChar, username)
                .input('email', sql.VarChar, email)
                .input('password', sql.VarChar, storedHashedPassword)
                .input('firstname', sql.VarChar, firstname)
                .input('lastname', sql.VarChar, lastname)
                .input('phone', sql.VarChar, phone)
                .input('role', sql.VarChar, defaultRole)
                .input('User_Picture',sql.VarChar,User_Picture)
                .query('insert into Users (username, email, password,firstname,lastname,phone,role,User_Picture)OUTPUT inserted.User_ID VALUES (@username, @email, @password, @firstname, @lastname, @phone,@role,@User_Picture)')
            const User_ID = insertguide.recordset[0].User_ID;

            const getType = await transaction.request()
                .input('guidetype', sql.VarChar, guidetype)
                .query('select Type_ID from Guide_Type where Type_Name=@guidetype')
            const Type_ID = getType.recordset[0].Type_ID

            await transaction.request()
                .input('Type_ID', sql.Int, Type_ID)
                .input('User_ID', sql.Int, User_ID)
                .query('insert into Guide (Type_ID,User_ID) values (@Type_ID,@User_ID)');

            await transaction.commit();
            res.status(201).json({ meesage: 'guide registered successsfully' });
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

module.exports.managersignUp = async (req, res) => {
    const { username, email, password, firstname, lastname, phone, confirmPassword} = req.body;
    console.log(req.body)
    const key = 1235;
    const access_key = Number(req.body.access_key);
    const User_Picture = req.file ? 'uploads/' + req.file.filename : null;   
    if(key!==access_key){
        return res.status(401).json({message:'you do not have permission'})
    }
       if (!User_Picture) {
        return res.status(400).json({ message: 'Image upload is required' });
      }
    const defaultRole = 'manager';
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
            const insertguide = await transaction.request()
                .input('username', sql.VarChar, username)
                .input('email', sql.VarChar, email)
                .input('password', sql.VarChar, storedHashedPassword)
                .input('firstname', sql.VarChar, firstname)
                .input('lastname', sql.VarChar, lastname)
                .input('phone', sql.VarChar, phone)
                .input('role', sql.VarChar, defaultRole)
                .input('User_Picture',sql.VarChar,User_Picture)
                .query('insert into Users (username, email, password,firstname,lastname,phone,role,User_Picture)OUTPUT inserted.User_ID VALUES (@username, @email, @password, @firstname, @lastname, @phone,@role,@User_Picture)')
            const User_ID = insertguide.recordset[0].User_ID;

            await transaction.request()
                
                .input('User_ID', sql.Int, User_ID)
                .query('insert into Manager (User_ID) values (@User_ID)');

            await transaction.commit();
            res.status(201).json({ meesage: 'manager registered successsfully' });
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