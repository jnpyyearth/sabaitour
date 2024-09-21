const express = require('express');
const cors = require('cors');
const sql = require('mssql');
const config = require('./config');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const loginroute = require('./routes/login');
const registerroute =require('./routes/register');
const productsRoute = require('./routes/product');
const deliver_register=require('./routes/deliver_register')
const testroute= require('./routes/test')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 3000;

app.use('/', loginroute);
app.use('/',registerroute);
app.use('/', productsRoute);
app.use('/',testroute);
app.use('/',deliver_register);
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

