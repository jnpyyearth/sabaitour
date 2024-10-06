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
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 3000;

app.use('/', loginroute);
app.use('/',signUproute);
app.use('/',tourroute);
app.use('/',guideSroute)
async function connectToDatabase() {
    try{
        await sql.connect(config);
        console.log('Connect to mssql');
    }catch(err){
        console.error('Database connection failed',err);
    }
}
connectToDatabase();
//declare item array
let items =[
    {id: 1,name: 'Item1',description:'this is item 1'},
    {id:2 , name: 'Item2',description:'this is tiem 2'},
];// addtem
app.post('/items',(req,res)=>{

    const {name,description}=req.body;
    const newItem ={
        id:items.length +1,
        name,
        description
    };
    items.push(newItem);
    res.status(201).json(newItem);
});





app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

