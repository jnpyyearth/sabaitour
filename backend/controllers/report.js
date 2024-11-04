const config = require("../config");
const sql = require("mssql");

module.exports.getOverViewReport = async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .query(`select * from View_overviewReport`)
        res.status(201).json({ message: 'report', result })
    } catch (error) {
        res.status(500).json({ message: 'erorr', error })
    }
}
module.exports.populartour = async (req, res) => {
    try {
        const pool = await sql.connect(config)
        const result = await pool.request()
            .query(`select * from View_popularTour`)
        const populartour = result.recordset[0]
        res.status(201).json({ message: 'result:', populartour })
    } catch (error) {
        res.status(500).json({ message: 'error', error })
    }
}
module.exports.mostincomeTour = async (req, res) => {
    try {
        const pool = await sql.connect(config)
        const result = await pool.request()
            .query(`select * from View_mostincome`)
        const mostincome = result.recordset[0]
        res.status(201).json({ message: 'result:', mostincome })
    } catch (error) {
        res.status(500).json({ message: 'error', error })
    }
}
module.exports.TotalRevenue = async (req, res) => {
    try {
        const pool = await sql.connect(config)
        const result = await pool.request()
            .query(`select * from View_toal_revenue`)
        const revenue = result.recordset[0]
        res.status(201).json({ message: 'result:', revenue })
    } catch (error) {
        res.status(500).json({ message: 'error', error })
    }
}
module.exports.getmanager = async (req, res) => {
    try {
        const pool = await sql.connect(config)
        const result = await pool.request()
            .query(`SELECT COUNT(Manager_ID) AS count FROM Manager`)
        const manager = result.recordset[0]
        res.status(201).json({ message: 'result:', manager })
    } catch (error) {
        res.status(500).json({ message: 'error', error })
    }
}
module.exports.getguide = async (req, res) => {
    try {
        const pool = await sql.connect(config)
        const result = await pool.request()
            .query(`SELECT COUNT(dbo.Guide.Guide_ID) AS count FROM    dbo.Guide_Type INNER JOIN
                  dbo.Guide ON dbo.Guide_Type.Type_ID = dbo.Guide.Type_ID`)
        const guide = result.recordset[0]
        res.status(201).json({ message: 'result:', guide })
    } catch (error) {
        res.status(500).json({ message: 'error', error })
    }
}
module.exports.getInboundguide = async (req, res) => {
    try {
        const pool = await sql.connect(config)
        const result = await pool.request()
            .query(`SELECT COUNT(dbo.Guide.Guide_ID) AS count FROM    dbo.Guide_Type INNER JOIN
                  dbo.Guide ON dbo.Guide_Type.Type_ID = dbo.Guide.Type_ID where Guide.Type_ID =1`)
        const inboundguide = result.recordset[0]
        res.status(201).json({ message: 'result:', inboundguide })
    } catch (error) {
        res.status(500).json({ message: 'error', error })
    }
}
module.exports.getOutboundguide = async (req, res) => {
    try {
        const pool = await sql.connect(config)
        const result = await pool.request()
            .query(`SELECT COUNT(dbo.Guide.Guide_ID) AS count FROM    dbo.Guide_Type INNER JOIN
                  dbo.Guide ON dbo.Guide_Type.Type_ID = dbo.Guide.Type_ID where Guide.Type_ID =2`)
        const outboundguide = result.recordset[0]
        res.status(201).json({ message: 'result:', outboundguide })
    } catch (error) {
        res.status(500).json({ message: 'error', error })
    }
}
module.exports.getallpar = async (req, res) => {
    try {
        const pool = await sql.connect(config)
        const result = await pool.request()
            .query(`SELECT COUNT(dbo.Booking_Participants.Participant_ID) AS count
                  FROM    dbo.Booking INNER JOIN
                  dbo.Booking_Participants ON dbo.Booking.Booking_ID = dbo.Booking_Participants.Booking_ID`)
        const allpar = result.recordset[0]
        res.status(201).json({ message: 'result:', allpar })
    } catch (error) {
        res.status(500).json({ message: 'error', error })
    }
}
module.exports.getpaidpar = async (req, res) => {
    try {
        const pool = await sql.connect(config)
        const result = await pool.request()
            .query(`SELECT COUNT(dbo.Booking_Participants.Participant_ID) AS count
                  FROM    dbo.Booking INNER JOIN
                  dbo.Booking_Participants ON dbo.Booking.Booking_ID = dbo.Booking_Participants.Booking_ID where Booking.Status ='paid'`)
        const paid = result.recordset[0]
        res.status(201).json({ message: 'result:', paid })
    } catch (error) {
        res.status(500).json({ message: 'error', error })
    }
}
module.exports.getpendingpar = async (req, res) => {
    try {
        const pool = await sql.connect(config)
        const result = await pool.request()
            .query(`SELECT COUNT(dbo.Booking_Participants.Participant_ID) AS count
                  FROM    dbo.Booking INNER JOIN
                  dbo.Booking_Participants ON dbo.Booking.Booking_ID = dbo.Booking_Participants.Booking_ID where Booking.Status ='pending'`)
        const pending = result.recordset[0]
        res.status(201).json({ message: 'result:', pending })
    } catch (error) {
        res.status(500).json({ message: 'error', error })
    }
}


// ซน

module.exports.getcountinbound = async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .query(`SELECT t.Type_Status, COUNT(*) AS TotalBookings FROM     dbo.Booking AS b INNER JOIN
                    dbo.ProgramTour AS pt ON b.ProgramTour_ID = pt.ProgramTour_ID INNER JOIN
                    dbo.Tour AS t ON pt.Tour_ID = t.Tour_ID
                    WHERE  (t.Type_Status = 'inbound') GROUP BY t.Type_Status`)
                    const countinbound = result.recordset[0]  
        res.status(201).json({ message: 'inbound' ,countinbound})
    } catch (error) {
        res.status(500).json({ message: 'erorr', error })
    }
}


module.exports.getcountoutbound = async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .query(`SELECT t.Type_Status, COUNT(*) AS TotalBookings FROM     dbo.Booking AS b INNER JOIN
                    dbo.ProgramTour AS pt ON b.ProgramTour_ID = pt.ProgramTour_ID INNER JOIN
                    dbo.Tour AS t ON pt.Tour_ID = t.Tour_ID
                    WHERE  (t.Type_Status = 'outbound') GROUP BY t.Type_Status`)
                    const countoutbound = result.recordset[0] 
        res.status(201).json({ message: 'outbound' ,countoutbound})
    } catch (error) {
        res.status(500).json({ message: 'erorr', error })
    }
}