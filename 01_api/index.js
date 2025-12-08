const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config({ path: '.env.local' });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Config Database
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  // ⚠️ อย่าลืมแก้ชื่อ Database ใน .env ให้ตรงกับที่สร้าง (เช่น travel_project)
  database: process.env.DB_NAME || 'travel_project', 
  port: Number(process.env.DB_PORT || 3306),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Check Server Status
app.get('/health', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 AS ok');
    res.json({ status: 'ok', db: rows[0].ok === 1 });
  } catch (e) {
    console.error(e);
    res.status(500).json({ status: 'error', message: e.message });
  }
});

// ✅ GET /places
// ดึงข้อมูลทั้งหมด หรือ กรองตาม category
// ตัวอย่างการเรียก: /places หรือ /places?category=cafe
app.get('/places', async (req, res) => {
  try {
    const { category } = req.query; // รับค่า category จาก URL

    let sql = 'SELECT * FROM places';
    let params = [];

    // ถ้ามีการส่ง category มา ให้เพิ่มเงื่อนไข WHERE
    if (category) {
      sql += ' WHERE category = ?';
      params.push(category);
    }

    const [rows] = await pool.query(sql, params);
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ✅ GET /places/:id
// ดึงข้อมูลเจาะจงรายตัว (เผื่อใช้หน้า Detail)
// ตัวอย่างการเรียก: /places/1
app.get('/places/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const [rows] = await pool.query('SELECT * FROM places WHERE id = ?', [id]);
      
      if (rows.length === 0) {
          return res.status(404).json({ error: 'Place not found' });
      }

      res.json(rows[0]);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // --- ส่วนที่เพิ่มใหม่สำหรับ Full Stack (CRUD) ---

// 1. POST: เพิ่มสถานที่ใหม่
app.post('/places', async (req, res) => {
    try {
      const { name, category, description, image_url, lat, lng } = req.body;
      const sql = 'INSERT INTO places (name, category, description, image_url, lat, lng) VALUES (?, ?, ?, ?, ?, ?)';
      const [result] = await pool.query(sql, [name, category, description, image_url, lat, lng]);
      res.json({ id: result.insertId, message: 'เพิ่มข้อมูลสำเร็จ' });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: e.message });
    }
  });
  
  // 2. PUT: แก้ไขข้อมูล
  app.put('/places/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { name, category, description, image_url, lat, lng } = req.body;
      const sql = 'UPDATE places SET name=?, category=?, description=?, image_url=?, lat=?, lng=? WHERE id=?';
      const [result] = await pool.query(sql, [name, category, description, image_url, lat, lng, id]);
      res.json({ message: 'แก้ไขข้อมูลสำเร็จ' });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: e.message });
    }
  });
  
  // 3. DELETE: ลบข้อมูล
  app.delete('/places/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await pool.query('DELETE FROM places WHERE id = ?', [id]);
      res.json({ message: 'ลบข้อมูลสำเร็จ' });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: e.message });
    }
  });

const port = Number(process.env.PORT || 3001);
app.listen(port, () => console.log(`API listening on http://localhost:${port}`));