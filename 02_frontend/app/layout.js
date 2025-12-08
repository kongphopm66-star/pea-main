import './globals.css';
// 1. IMPORT Link component
import Link from 'next/link'; 

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
            {/* แนะนำให้เปลี่ยนส่วนโลโก้เป็น Link ด้วยเช่นกัน หากต้องการกลับไปหน้าแรก
            ถ้าต้องการให้เป็น Anchor link ภายในหน้าเดียว ให้ใช้ <a> แต่เนื่องจาก Build Fail
            แนะนำให้ใช้ Link เพื่อแก้ปัญหา
            */}
            <Link href="/" className="logo">
              <span role="img" aria-label="logo">🎒</span> ไปด้วยกัน <small>.com</small>
            </Link>
            <ul className="nav-links">
                {/* แก้ไข Error: ใช้ Link แทน <a> */}
                <li><Link href="/#home">หน้าแรก</Link></li>
                <li><Link href="/#places">ข้อมูลท่องเที่ยว</Link></li>
                <li><Link href="/#contact">ติดต่อเรา</Link></li>
                {/* แก้ไข Link สำหรับ Admin System */}
                <li><Link href="/admin" style={{color: 'red'}}>Admin System</Link></li>
            </ul>
          </div>
        </nav>

        {children}
        
      </body>
    </html>
  )
}