
const config = require("../config");
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
module.exports.getguideprofile = async (req, res) => {
    let transaction;
    const {username} =req.body

    try {
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
        const result = await transaction.request()
            .input('Guide_ID', sql.Int, Guide_ID)
            .query(`SELECT Guide.Guide_ID, Users.firstname, Users.lastname, Users.email, Users.phone, Users.User_Picture, Guide_Type.Type_Name, Guide_Type.Type_Color
                    FROM Users
                    INNER JOIN Guide ON Users.User_ID = Guide.User_ID
                    INNER JOIN Guide_Type ON Guide.Type_ID = Guide_Type.Type_ID
                    where Guide.Guide_ID = @Guide_ID`)
        await transaction.commit();
        console.log('guide profile',result.recordset[0])
        res.status(200).json(result.recordset[0]);

    } catch (error) {
        res.status(500).json({ message: 'Error fetching Guide profile', error });
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

module.exports.UpdateGuideProfile = async (req, res) => {
    const { Guide_ID, Type_Name, email, firstname, lastname, phone, User_ID } = req.body

    let Type_ID = 0
    if (Type_Name === 'inbound') {

        Type_ID = 1
        console.log('set type ', Type_ID)
    } else if (Type_Name === 'outbound') {
        Type_ID = 2
        console.log('set type ', Type_ID)
    }
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('Guide_ID', sql.Int, Guide_ID)
            .input('email', sql.VarChar, email)
            .input('firstname', sql.VarChar, firstname)
            .input('lastname', sql.VarChar, lastname)
            .input('phone', sql.Int, phone)
            .input('Type_ID', sql.Int, Type_ID)
            .input('User_ID', sql.Int, User_ID)
            .execute('updateGuideProfile');
        res.status(200).json({ message: 'Guide and user updated successfully', result });
    } catch (error) {
        console.error('Error updating guide and user:', error);
        res.status(500).json({ error: 'Failed to update guide and user', details: error.message })
    }
}

module.exports.getmanagerprofile = async (req, res) => {
    let transaction;
    const {username} =req.body

    try {
        console.log('hello manager profile')
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

        const getManager_ID = await transaction.request()
            .input('User_ID', sql.Int, User_ID)
            .query(`select Manager_ID from Manager where User_ID =@User_ID`)
        if (getManager_ID.recordset.length === 0) {
            return res.status(400).json({ message: 'Manager_ID not found' });
        }
        const Manager_ID = getManager_ID.recordset[0].Manager_ID
        console.log('Manager_ID', Manager_ID)
        const result = await transaction.request()
            .input('Manager_ID', sql.Int, Manager_ID)
            .query(`SELECT Manager.Manager_ID, Users.firstname, Users.lastname, Users.email, Users.phone, Users.User_Picture
                    FROM Users
                    INNER JOIN Manager ON Users.User_ID = Manager.User_ID
                    where Manager.Manager_ID = @Manager_ID`)
        await transaction.commit();
        console.log('guide profile',result.recordset[0])
        res.status(200).json(result.recordset[0]);

    } catch (error) {
        res.status(500).json({ message: 'Error fetching Guide profile', error });
    }
}