const express = require('express');
const cors = require('cors');
const sql = require('mssql');
const config = require('./config');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const loginroute = require('./routes/login');
const signUproute =require('./routes/signUp')
const tourroute =require('./routes/tour')
const guideSroute=require('./routes/guideSignUp')
const Guideroute =require('./routes/guide/guide')
const bookingroute =require('./routes/booking')
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 3000;

app.use('/', loginroute);
app.use('/',signUproute);
app.use('/',tourroute);
app.use('/',guideSroute)
app.use('/',Guideroute)
app.use('/',bookingroute)
async function connectToDatabase() {
    try{
        await sql.connect(config);
        console.log('Connect to mssql');
    }catch(err){
        console.error('Database connection failed',err);
    }
}
connectToDatabase();


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

