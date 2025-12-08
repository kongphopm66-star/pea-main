"use client";

import { useState, useEffect, useRef } from "react";

export default function Page() {
  // --- State ---
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [topHits, setTopHits] = useState([]);
  
  // ⭐ เพิ่ม State สำหรับรูปที่ถูกเลือก (เพื่อแสดง Modal)
  const [selectedImage, setSelectedImage] = useState(null);

  const carouselRef = useRef(null);

  // 1. Fetch Top Hits (สุ่มและดึง 10 อันดับ)
  useEffect(() => {
    async function fetchTopHits() {
      try {
        const apiHost = process.env.NEXT_PUBLIC_API_HOST;
        const res = await fetch(`${apiHost}/places`, { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        const shuffled = data.sort(() => 0.5 - Math.random());
        setTopHits(shuffled.slice(0, 10)); 
      } catch (err) {
        console.error("Error fetching top hits:", err);
      }
    }
    fetchTopHits();
  }, []);

  // 2. Fetch Main Content
  useEffect(() => {
    async function fetchPlaces() {
      setLoading(true);
      setError(null);
      try {
        const apiHost = process.env.NEXT_PUBLIC_API_HOST;
        const endpoint = selectedCategory === 'all' 
          ? `${apiHost}/places` 
          : `${apiHost}/places?category=${selectedCategory}`;

        const res = await fetch(endpoint, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setRows(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPlaces();
  }, [selectedCategory]);

  const scrollLeft = () => {
    if (carouselRef.current) carouselRef.current.scrollBy({ left: -400, behavior: 'smooth' });
  };
  const scrollRight = () => {
    if (carouselRef.current) carouselRef.current.scrollBy({ left: 400, behavior: 'smooth' });
  };

  // ⭐ ฟังก์ชันเปิดดูรูปใหญ่
  const openImage = (url) => {
    if (url) setSelectedImage(url);
  };

  // ⭐ ฟังก์ชันปิดรูป
  const closeImage = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <main className="container-fluid">
        
        <section id="home" className="hero-section">
          <h1 className="hero-title">
            อยาก<span className="highlight-text">ไปที่ไหน?</span>
          </h1>
          <p className="hero-subtitle">รวบรวมพิกัด ที่กิน ที่เที่ยว ที่พัก ทั่วไทย ครบจบในที่เดียว</p>
        </section>

        {topHits.length > 0 && (
          <section className="top-hits-section">
             <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', paddingRight:'2rem'}}>
                <h2 className="section-heading">🔥 10 อันดับยอดนิยม (แนะนำ)</h2>
                <div className="carousel-controls">
                  <button onClick={scrollLeft} className="nav-btn">❮</button>
                  <button onClick={scrollRight} className="nav-btn">❯</button>
                </div>
             </div>
             
             <div className="carousel-container" ref={carouselRef}>
               {topHits.map((place, index) => (
                 <div key={place.id} className="carousel-item">
                    <span className="rank-number">{index + 1}</span>
                    <div className="carousel-card-wrapper">
                      <div className="poster-card">
                        {/* ⭐ เพิ่ม onClick เพื่อเปิดรูปใหญ่ */}
                        <img 
                          src={place.image_url || "https://via.placeholder.com/300x450?text=No+Image"} 
                          alt={place.name} 
                          className="poster-img"
                          onClick={() => openImage(place.image_url)} // คลิกแล้วเปิด
                          style={{cursor: 'zoom-in'}} // เปลี่ยนเคอร์เซอร์เป็นแว่นขยาย
                          onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/300x450?text=No+Image"; }}
                        />
                        <div className="poster-overlay" onClick={() => openImage(place.image_url)}>
                          <span className="poster-title">{place.name}</span>
                        </div>
                      </div>
                    </div>
                 </div>
               ))}
             </div>
          </section>
        )}

        <div className="container main-content" id="places">
          <div className="tabs">
            <button className={`tab-btn ${selectedCategory === 'all' ? 'active' : ''}`} onClick={() => setSelectedCategory('all')}>🏠 ทั้งหมด</button>
            <button className={`tab-btn ${selectedCategory === 'travel' ? 'active' : ''}`} onClick={() => setSelectedCategory('travel')}>📍 จุดcheckpoint</button>
            <button className={`tab-btn ${selectedCategory === 'cafe' ? 'active' : ''}`} onClick={() => setSelectedCategory('cafe')}>☕ คาเฟ่</button>
            <button className={`tab-btn ${selectedCategory === 'restaurant' ? 'active' : ''}`} onClick={() => setSelectedCategory('restaurant')}>🍜 ร้านอาหาร</button>
          </div>

          {loading && <div className="loading-state">กำลังโหลดข้อมูล...</div>}
          {error && <div className="error-state">เกิดข้อผิดพลาด: {error}</div>}

          {!loading && !error && (
            rows.length === 0 ? (
              <div className="empty-state">ไม่พบข้อมูลในหมวดหมู่นี้</div>
            ) : (
              <section className="grid">
                {rows.map((x) => (
                  <article key={x.id} className="card">
                    <div className="media">
                       {/* ⭐ เพิ่ม onClick เพื่อเปิดรูปใหญ่ */}
                       {x.image_url ? (
                        <img 
                          src={x.image_url} 
                          alt={x.name} 
                          className="img" 
                          onClick={() => openImage(x.image_url)} // คลิกแล้วเปิด
                          style={{cursor: 'zoom-in'}}
                          onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/400x250?text=No+Image"; }} 
                        />
                       ) : <div className="no-img">No Image</div>}
                       <span className="category-tag">{x.category}</span>
                    </div>
                    <div className="body">
                      <h3 className="card-title">{x.name}</h3>
                      {x.description && <p className="detail">{x.description}</p>}
                      <div className="meta">
                        <span>Lat: {parseFloat(x.lat).toFixed(4)}</span>
                        <span>Lng: {parseFloat(x.lng).toFixed(4)}</span>
                      </div>
                      <a href={`https://www.google.com/maps/dir/?api=1&destination=${x.lat},${x.lng}`} target="_blank" rel="noreferrer" className="map-btn">📍 นำทาง Google Maps</a>
                    </div>
                  </article>
                ))}
              </section>
            )
          )}
        </div>

      </main>



      {/* ⭐ ส่วนแสดง Modal รูปภาพขนาดใหญ่ (Lightbox) */}
      {selectedImage && (
        <div className="modal-overlay" onClick={closeImage}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
             <img src={selectedImage} alt="Full View" />
             <button className="modal-close-btn" onClick={closeImage}>&times;</button>
          </div>
        </div>
      )}

    </>
  );
}