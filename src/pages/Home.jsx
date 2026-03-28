/* eslint-disable jsx-a11y/iframe-has-title */

import React, { useState, useEffect } from "react";
import "../styles.css";

// const BASE_URL = "https://pmrda-backend.onrender.com";

const Home = () => {
  const [showPDF, setShowPDF] = useState(false);
  const [time, setTime] = useState(new Date());
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [menuOpen, setMenuOpen] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(true);

  /* ================= RESPONSIVE ================= */
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ================= TIME ================= */
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const getGreeting = () => {
    const hour = time.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <>
      {/* ================= HEADER ================= */}
      <div className="header">
        <div className="logo-section">
          <img
            src="https://zonecertificate.pmrda.gov.in/ZC/img/logo1.png"
            alt="logo"
          />
        </div>

        <div className="nav">
          <span className="link">Home</span>
          <span className="link">FAQ</span>
          <span className="link">English</span>
          <span className="link">Marathi</span>
          <span className="greeting">{getGreeting()},</span>
          <span className="datetime">{formatTime(time)}</span>

          <div
            className={`menu-icon ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

          {menuOpen && (
            <div className="dropdown">
              <div className="dropdown-item">Change Password</div>
              <div className="dropdown-item">Logout</div>
            </div>
          )}
        </div>
      </div>

      {/* ================= CARD ================= */}
      <div className="card">
        <div className="status">
          <img
            src="https://zonecertificate.pmrda.gov.in/ZC/img/success.png"
            alt="success"
            className="success-icon"
          />
          <span>This is a Valid Zone Certificate</span>
        </div>

        <hr />

        <button
          className="view-btn"
          onClick={() => {
            setPdfLoading(true); // reset loader
            setShowPDF(true);
          }}
        >
          View Certificate
        </button>
      </div>

      {/* ================= FOOTER ================= */}
      <div className="footer">
        Pune Metropolitan Region Development Authority.
      </div>

      {/* ================= MODAL ================= */}
      {showPDF && (
        <div className="overlay">
          {isMobile ? (
            /* ================= MOBILE ================= */
            <div className="mobile-viewer">
              <div className="top-strip">
                <button
                  className="close"
                  onClick={() => setShowPDF(false)} // ✅ FIXED
                >
                  ×
                </button>
              </div>

              <div className="mobile-box">
                <div className="mobile-inner">
                  <div className="mobile-id">226106</div>

                  {/* 🔥 SAME BUTTON, JUST CHANGED LOGIC */}
                  <button
                    className="open-btn"
                    onClick={() => {
                      window.open(
                        "https://pmrda-frontend.vercel.app/pmrda-gov.pdf",
                        "_blank",
                      );
                    }}
                  >
                    Open
                  </button>

                  {/* 🔥 LOADER */}
                  {pdfLoading && (
                    <div className="pdf-loader">
                      <div className="spinner"></div>
                    </div>
                  )}

                  {/* 🔥 PDF LOAD */}
                  <iframe
                    src={`https://pmrda-frontend.vercel.app/pmrda-gov.pdf#toolbar=0`}
                    className="pdf-frame"
                    onLoad={() => setPdfLoading(false)}
                  />
                </div>
              </div>
            </div>
          ) : (
            /* ================= DESKTOP ================= */
            <div className="viewer">
              <div className="top-strip">
                <button
                  className="close"
                  onClick={() => setShowPDF(false)} // ✅ FIXED
                >
                  ×
                </button>
              </div>

              <div className="modal">
                <div className="pdf-container">
                  {pdfLoading && (
                    <div className="pdf-loader">
                      <div className="spinner"></div>
                    </div>
                  )}

                  <iframe
                    src={`https://pmrda-frontend.vercel.app/pmrda-gov.pdf#toolbar=0`}
                    className="pdf-frame"
                    title="Zone Certificate PDF 1"
                    onLoad={() => setPdfLoading(false)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Home;
