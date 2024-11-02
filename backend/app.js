const express = require('express');
const cors = require('cors');
const sql = require('mssql');
const config = require('./config');
const path = require('path')
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const loginroute = require('./routes/login');
const signUproute =require('./routes/signUp')
const tourroute =require('./routes/tour')
const guideSroute=require('./routes/guideSignUp')
const Guideroute =require('./routes/guide/guide')
const bookingroute =require('./routes/booking')
const reviewroute = require ('./routes/review')
const reportroute = require ('./routes/report')
const multer = require('multer')
// const upload = require('./middleware/upload')
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 3000;
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/', loginroute);
app.use('/',signUproute);
app.use('/',tourroute);
app.use('/',guideSroute)
app.use('/',Guideroute)
app.use('/',bookingroute)
app.use('/',reviewroute)
app.use('/',reportroute)
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

app.post('/upload-image', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No image uploaded' });
  }
  res.status(201).json({
    message: 'Image uploaded successfully',
    imagePath: `/uploads/${req.file.filename}`
  });
});
  
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

// ซน

app.get('/api/tours', (req, res) => {
  const sql = "SELECT COUNT(*) AS domesticTours FROM tours WHERE type='domestic', COUNT(*) AS internationalTours FROM tours WHERE type='international';";
  db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
  });
});

app.get('/api/income', (req, res) => {
  const sql = "SELECT SUM(income) AS domesticIncome FROM tours WHERE type='domestic', SUM(income) AS internationalIncome FROM tours WHERE type='international';";
  db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
  });
});