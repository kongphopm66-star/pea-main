CREATE DATABASE IF NOT EXISTS travel_project
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_general_ci;

USE travel_project;

CREATE TABLE IF NOT EXISTS places (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  description TEXT,
  image_url TEXT,
  lat DECIMAL(10,8),
  lng DECIMAL(11,8),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO places (id, name, category, description, image_url, lat, lng, created_at) VALUES
(1, 'ดอยอินทนนท์', 'travel', 'ยอดเขาที่สูงที่สุดในประเทศไทย อากาศดีมาก', 'https://image-tc.galaxy.tf/wijpeg-sxrfid5inslt46adwg0pwpho/intanon_standard.jpg?crop=112%2C0%2C1777%2C1333', 18.58866900, 98.48722600, '2025-12-08 06:35:54'),
(2, 'Chom Cafe', 'cafe', 'คาเฟ่สวนป่า บรรยากาศเหมือนหลุดเข้าไปในนิยาย', 'https://www.lemon8-app.com/seo/image?item_id=7375044771594748417&index=0&sign=b56649bdc466485fc05fba71edab05e7', 18.74052300, 98.94367500, '2025-12-08 06:35:54'),
(3, 'ร้านข้าวซอยแม่สาย', 'restaurant', 'ข้าวซอยต้นตำรับ อร่อยและราคาไม่แพง', 'https://img.salehere.co.th/p/600x0/2021/05/28/pzxonxiwfrzh.jpg', 18.79012300, 98.98045600, '2025-12-08 06:35:54'),
(4, 'อุทยานแห่งชาติภูกระดึง', 'travel', 'เส้นทางเดินป่าที่ท้าทาย ชมใบเมเปิ้ลแดงในช่วงฤดูหนาว', 'https://upload.wikimedia.org/wikipedia/commons/2/27/Lom_Sak_Cliff_%28I%29.jpg', 16.89000000, 101.85000000, '2025-12-08 06:40:00'),
(5, 'เกาะพีพี', 'travel', 'หมู่เกาะที่มีหาดทรายขาว น้ำทะเลใส เหมาะกับการดำน้ำ', 'https://www.pullmanphuketarcadia.com/wp-content/uploads/sites/65/2020/01/Phi-Phi-Island-3.jpg', 7.74100000, 98.77500000, '2025-12-08 06:40:01'),
(6, 'พระบรมมหาราชวัง', 'travel', 'สถาปัตยกรรมที่วิจิตรงดงาม เป็นศูนย์กลางทางประวัติศาสตร์', 'https://cdn.royalgrandpalace.th/images/history/sec1_dt.jpg', 13.75000000, 100.49100000, '2025-12-08 06:40:02'),
(7, 'อุทยานประวัติศาสตร์สุโขทัย', 'travel', 'ชมโบราณสถานและซากปรักหักพังของอาณาจักรสุโขทัย', 'https://www.silpa-mag.com/wp-content/uploads/2018/03/%E0%B8%AD%E0%B8%B8%E0%B8%97%E0%B8%A2%E0%B8%B2%E0%B8%99%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%A7%E0%B8%B1%E0%B8%95%E0%B8%B4%E0%B8%A8%E0%B8%B2%E0%B8%AA%E0%B8%95%E0%B8%A3%E0%B9%8C%E0%B8%AA%E0%B8%B8%E0%B9%82%E0%B8%82%E0%B8%97%E0%B8%B1%E0%B8%A2.jpg', 17.02000000, 99.78000000, '2025-12-08 06:40:03'),
(8, 'ภูชี้ฟ้า', 'travel', 'จุดชมวิวพระอาทิตย์ขึ้นและทะเลหมอกที่มีชื่อเสียงในเชียงราย', 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Pu_Chi_Fah.jpg', 19.86400000, 100.45000000, '2025-12-08 06:40:04'),
(9, 'The Iron Fairies', 'cafe', 'บาร์/คาเฟ่ ที่ตกแต่งด้วยธีมโรงงานเหล็กและนางฟ้า', 'https://www.theironfairies.com/social.jpg', 13.73800000, 100.57000000, '2025-12-08 06:40:05'),
(10, 'Graph Cafe', 'cafe', 'คาเฟ่เล็กๆ ที่เน้นกาแฟดริปแบบพิเศษและหายาก', 'https://rootsandleisure.com/wp-content/uploads/2017/05/RootsandLeisure_GraphCafe10.jpg', 18.79000000, 98.98500000, '2025-12-08 06:40:06'),
(11, 'Transit Number 8', 'cafe', 'คาเฟ่สไตล์ญี่ปุ่นเหมือนสถานีรถไฟ มีมุมถ่ายรูปสวย', 'https://th.readme.me/f/35989/5fcfa3431b9397030ff00a8b.jpg', 18.75500000, 98.98500000, '2025-12-08 06:40:07'),
(12, 'Factory Coffee', 'cafe', 'โรงคั่วกาแฟและคาเฟ่ชื่อดัง เน้นกาแฟคุณภาพระดับโลก', 'https://images.adsttc.com/media/images/67ac/b241/90ae/9000/012e/0f08/newsletter/Tastespace_FactoryHQ-28.jpg?1739371096', 13.75000000, 100.53000000, '2025-12-08 06:40:08'),
(13, 'River Vibe Restaurant & Bar', 'cafe', 'คาเฟ่และร้านอาหารริมแม่น้ำเจ้าพระยา วิวดีมาก', 'https://riverviewbkk.com/wp-content/uploads/2023/05/rivervibe29.05-40-1024x683.jpg', 13.71500000, 100.51000000, '2025-12-08 06:40:09'),
(14, 'เจ๊โอว ข้าวต้มเป็ด', 'restaurant', 'ร้านข้าวต้มรอบดึกชื่อดัง เมนูเด็ดคือมาม่าโอ้โห', 'https://www.scb.co.th/getmedia/a507136e-74e4-444d-b0b3-b44679a3b773/jae-oh-mama-oho.jpg', 13.74600000, 100.52000000, '2025-12-08 06:40:10'),
(15, 'เรือนเพชรสุกี้', 'restaurant', 'สุกี้แบบโบราณ รสชาติจัดจ้านและน้ำจิ้มเด็ด', 'https://img.wongnai.com/p/1920x0/2023/08/07/fa814f2564b44f00bd2d22bb8f01325e.jpg', 13.72500000, 100.55000000, '2025-12-08 06:40:11'),
(16, 'ก๋วยเตี๋ยวเรืออนุสาวรีย์', 'restaurant', 'ร้านก๋วยเตี๋ยวเรือที่มีชื่อเสียงมายาวนาน', 'https://thailandindy.com/wp-content/uploads/2017/08/%E0%B8%81%E0%B9%8B%E0%B8%A7%E0%B8%A2%E0%B9%80%E0%B8%95%E0%B8%B5%E0%B9%8B%E0%B8%A2%E0%B8%A7%E0%B9%80%E0%B8%A3%E0%B8%B7%E0%B8%AD%E0%B8%AD%E0%B8%99%E0%B8%B8%E0%B9%80%E0%B8%AA%E0%B8%B2%E0%B8%A7%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B9%8C.jpg', 13.76400000, 100.53700000, '2025-12-08 06:40:12'),
(17, 'ร้านอาหารทะเลปรีชา', 'restaurant', 'อาหารทะเลสดใหม่ริมทะเล บรรยากาศดี', 'https://s3-ap-southeast-1.amazonaws.com/photo.wongnai.com/photos/2016/09/07/dee9d8a075c64739a203227307578c1e.jpg', 12.87000000, 100.92000000, '2025-12-08 06:40:13'),
(18, 'ครัวเจ๊ง้อ', 'restaurant', 'ร้านอาหารจีน-ไทยรสชาติกลมกล่อม เมนูหลากหลาย', 'https://f.ptcdn.info/594/036/000/nwj282am3wCh41XEbOC-o.jpg', 13.73000000, 100.58000000, '2025-12-08 06:40:14');
