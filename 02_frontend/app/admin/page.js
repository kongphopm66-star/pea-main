"use client";

import { useState, useEffect } from "react";

export default function AdminPage() {
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState({ name: "", category: "travel", description: "", image_url: "", lat: "", lng: "" });
  const [isEditing, setIsEditing] = useState(null);

  useEffect(() => {
    fetchPlaces();
  }, []);

  const fetchPlaces = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/places`, { cache: "no-store" });
      if (!res.ok) return;
      const data = await res.json();
      setRows(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
        ...form,
        lat: parseFloat(form.lat),
        lng: parseFloat(form.lng)
    };
    const apiHost = process.env.NEXT_PUBLIC_API_HOST;
    const method = isEditing ? "PUT" : "POST";
    const url = isEditing ? `${apiHost}/places/${isEditing}` : `${apiHost}/places`;

    try {
        const res = await fetch(url, {
          method: method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          alert(isEditing ? "✅ แก้ไขข้อมูลเรียบร้อย" : "✅ เพิ่มข้อมูลใหม่เรียบร้อย");
          setForm({ name: "", category: "travel", description: "", image_url: "", lat: "", lng: "" });
          setIsEditing(null);
          fetchPlaces();
        } else {
          alert("❌ บันทึกไม่สำเร็จ กรุณาเช็คข้อมูล");
        }
    } catch (err) {
        alert("❌ เชื่อมต่อ Server ไม่ได้");
    }
  };

  const handleEdit = (item) => {
    setForm(item);
    setIsEditing(item.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!confirm("⚠️ ยืนยันที่จะลบข้อมูลนี้? (กู้คืนไม่ได้นะ)")) return;
    const apiHost = process.env.NEXT_PUBLIC_API_HOST;
    await fetch(`${apiHost}/places/${id}`, { method: "DELETE" });
    fetchPlaces();
  };

  return (
    <main className="admin-container">
      
      <div className="admin-header">
        <h1>🛠️ ระบบจัดการหลังบ้าน (Back Office)</h1>
        <p>จัดการข้อมูลสถานที่ท่องเที่ยว คาเฟ่ และร้านอาหาร</p>
      </div>

      <div className="admin-grid-layout">
        
        {/* --- ส่วนฟอร์ม (Form Section) --- */}
        <section className="admin-card form-section">
          <div className="card-header">
            <h2>{isEditing ? "✏️ แก้ไขข้อมูล" : "➕ เพิ่มสถานที่ใหม่"}</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-group">
              <label>ชื่อสถานที่ <span className="req">*</span></label>
              <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="เช่น วัดอรุณ, ร้านกาแฟ..." required />
            </div>

            <div className="form-row">
                <div className="form-group">
                <label>หมวดหมู่</label>
                <select name="category" value={form.category} onChange={handleChange}>
                    <option value="travel">🌲 เที่ยวธรรมชาติ</option>
                    <option value="cafe">☕ คาเฟ่</option>
                    <option value="restaurant">🍜 ร้านอาหาร</option>
                </select>
                </div>
                <div className="form-group">
                <label>ลิงก์รูปภาพ (URL)</label>
                <input type="text" name="image_url" value={form.image_url} onChange={handleChange} placeholder="https://..." />
                </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Latitude (พิกัด)</label>
                <input type="number" step="any" name="lat" value={form.lat} onChange={handleChange} placeholder="13.xxxx" required />
              </div>
              <div className="form-group">
                <label>Longitude (พิกัด)</label>
                <input type="number" step="any" name="lng" value={form.lng} onChange={handleChange} placeholder="100.xxxx" required />
              </div>
            </div>

            <div className="form-group">
              <label>รายละเอียด</label>
              <textarea name="description" value={form.description} onChange={handleChange} rows="4" placeholder="เขียนบรรยายสั้นๆ..."></textarea>
            </div>

            <div className="btn-group">
               <button type="submit" className={`btn-submit ${isEditing ? 'btn-warning' : 'btn-primary'}`}>
                 {isEditing ? "บันทึกการแก้ไข" : "ยืนยันการเพิ่ม"}
               </button>
               
               {isEditing && (
                 <button type="button" className="btn-cancel" onClick={() => { 
                    setIsEditing(null); 
                    setForm({ name: "", category: "travel", description: "", image_url: "", lat: "", lng: "" }); 
                 }}>
                    ยกเลิก
                 </button>
               )}
            </div>
          </form>
        </section>

        {/* --- ส่วนตาราง (Table Section) --- */}
        <section className="admin-card table-section">
          <div className="card-header">
            <h2>📋 รายการสถานที่ทั้งหมด ({rows.length})</h2>
          </div>
          
          <div className="table-responsive">
            <table className="modern-table">
              <thead>
                <tr>
                  <th style={{width: '60px'}}>รูป</th>
                  <th>ชื่อสถานที่</th>
                  <th>หมวดหมู่</th>
                  <th style={{textAlign: 'right'}}>จัดการ</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id}>
                    <td>
                        <div className="table-img-wrapper">
                            {row.image_url ? (
                                <img src={row.image_url} alt="place" />
                            ) : (
                                <div className="no-img-placeholder">No</div>
                            )}
                        </div>
                    </td>
                    <td>
                        <div className="row-title">{row.name}</div>
                        <div className="row-coords">{parseFloat(row.lat).toFixed(4)}, {parseFloat(row.lng).toFixed(4)}</div>
                    </td>
                    <td>
                        <span className={`badge badge-${row.category}`}>
                            {row.category === 'travel' && '🌲 เที่ยว'}
                            {row.category === 'cafe' && '☕ คาเฟ่'}
                            {row.category === 'restaurant' && '🍜 อาหาร'}
                        </span>
                    </td>
                    <td style={{textAlign: 'right'}}>
                      <button className="icon-btn edit-btn" onClick={() => handleEdit(row)} title="แก้ไข">✏️</button>
                      <button className="icon-btn delete-btn" onClick={() => handleDelete(row.id)} title="ลบ">🗑️</button>
                    </td>
                  </tr>
                ))}
                {rows.length === 0 && (
                    <tr><td colSpan="4" style={{textAlign: 'center', padding: '20px'}}>ยังไม่มีข้อมูล</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </main>
  );
}