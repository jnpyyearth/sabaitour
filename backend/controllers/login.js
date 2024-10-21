const config = require("../config");
const sql = require("mssql");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.loginUser = async(req,res)=>{
    const { username, password } = req.body;
    const pool = await sql.connect(config);
    console.log('hello login api',username,password)
    try {
        // Query to check if user exists with the given username and password
        const result = await pool.request()

        .input('username', sql.VarChar, username)//bind username
        .query('SELECT * FROM Users WHERE username = @username'); //query

        if (result.recordset.length === 0) {
            console.log('hello incorrect username');
            return res.status(401).json({ message: 'Invalid username or password' }); // ส่ง HTTP 401
        }
        if (result.recordset.length > 0) {
            const user = result.recordset[0];
            const storedHashedPassword = user.password;
        
            const isPasswordValid = await bcrypt.compare(password, storedHashedPassword);
            // Successful login
            if (isPasswordValid) {
                var payload ={
                    user: {
                        username:user.username,
                        role:user.role,
                        picture:user.picture
                    }
                }
                jwt.sign(payload, 'jwtsecret', { expiresIn: '1h' }, (err, token) => {
                    if (err) throw err;

                    //send response
                    return res.status(200).json({ message: 'Login successful', token });//เพิ่มpayload
                });
            } else {
                //password invalid
                console.log('hello invaild password')
               return res.status(401).json({ message: 'Invalid username or password' });
            }
 
        } 
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
module.exports.getCustomerInfo = async (req, res) => {
    const { username } = req.body; // รับ username จาก request body
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('username', sql.VarChar, username)
            .query(`
                SELECT Users.User_ID, Customer.Cus_ID
                FROM Users
                INNER JOIN Customer ON Users.User_ID = Customer.User_ID
                WHERE Users.username = @username
            `);

        if (result.recordset.length === 0) {
            return res.status(400).json({ message: 'User or Customer not found' });
        }

        const { User_ID, Cus_ID } = result.recordset[0];
        res.status(200).json({ User_ID, Cus_ID }); // ส่ง User_ID และ Cus_ID กลับไปยัง frontend

    } catch (err) {
        console.error('Error fetching user/customer info:', err);
        res.status(500).json({ message: 'Server error', error: err });
    }
};


