
const config = require("../config");
const sql = require("mssql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    const pool = await sql.connect(config);
    try {
        const result = await pool.request()
            .input('username', sql.VarChar, username)
            .query('select * from Users where username =@username');
        if (result.recordset.length === 0) {
            return res.status(401).json({ message: 'Invaild username or password' });
        }
        if (result.recordset.length > 0) {
            const user = result.recordset[0];
            const storedHashedPassword = user.password;
            const isPasswordValid = await bcrypt.compare(password, storedHashedPassword);
            //Successful
            if (isPasswordValid) {
                var payload = {
                    user: {
                        username: user.username,
                        role: user.role
                    }
                }
                jwt.sign(payload, 'jwtsecret', { expiresIn: '1h' }, (err, token) => {
                    if (err) throw err;
                    return res.status(200).json({ message: 'Login successful', token, payload });
                });

            } else {
                res.status(401).json({ message: 'Invalid username or password' });
            }

        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}
