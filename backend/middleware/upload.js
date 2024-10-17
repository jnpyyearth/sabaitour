const fs = require('fs');
const path = require('path');
const multer = require('multer');

// ตรวจสอบและสร้างโฟลเดอร์ 'uploads' ถ้ายังไม่มีอยู่
const uploadDir = path.join(__dirname,'..','uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ตั้งค่า Multer สำหรับเก็บไฟล์ในโฟลเดอร์ 'uploads'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // โฟลเดอร์ที่ไฟล์จะถูกจัดเก็บ
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // ตั้งชื่อไฟล์ให้ไม่ซ้ำกัน
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
