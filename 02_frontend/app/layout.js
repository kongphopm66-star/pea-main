import './globals.css';

export const metadata = {
  title: 'ไปด้วยกัน - เที่ยว กิน ฟินทั่วไทย',
  description: 'Web Application รวบรวมที่เที่ยว คาเฟ่ ร้านอาหาร',
}

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body>
        <nav className="navbar">
          <div className="nav-container">
            <a href="#home" className="logo">
              <span role="img" aria-label="logo">🎒</span> ไปด้วยกัน <small>.com</small>
            </a>
            <ul className="nav-links">
    <li><a href="/#home">หน้าแรก</a></li>
    <li><a href="/#places">ข้อมูลท่องเที่ยว</a></li>
    <li><a href="/#contact">ติดต่อเรา</a></li>
    {/* เพิ่มปุ่มนี้เข้าไป */}
    <li><a href="/admin" style={{color: 'red'}}>Admin System</a></li>
</ul>
          </div>
        </nav>

        {children}
        
      </body>
    </html>
  )
}