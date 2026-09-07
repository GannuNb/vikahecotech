import React, { useEffect, useRef } from "react";
import QRCode from "qrcode";

const BrochureQR = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const generateQR = async () => {
      const brochureUrl =
        "https://vikahecotech.com/Brouchers/Full_plant.pdf";

      const canvas = canvasRef.current;

      // Generate QR code
      await QRCode.toCanvas(canvas, brochureUrl, {
        width: 500,
        margin: 4,
        errorCorrectionLevel: "H",
      });

      // Load logo
      const logo = new Image();
      logo.src = "/favicon-192.png";

      logo.onload = () => {
        const ctx = canvas.getContext("2d");

        const logoSize = 100;

        const x = (canvas.width - logoSize) / 2;
        const y = (canvas.height - logoSize) / 2;

        // White background behind logo
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(
          x - 10,
          y - 10,
          logoSize + 20,
          logoSize + 20
        );

        // Draw logo
        ctx.drawImage(
          logo,
          x,
          y,
          logoSize,
          logoSize
        );
      };
    };

    generateQR();
  }, []);

  const downloadQR = () => {
    const canvas = canvasRef.current;

    const link = document.createElement("a");

    link.download = "Vikah-Ecotech-Full-Plant-Brochure-QR.png";

    link.href = canvas.toDataURL("image/png");

    link.click();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        boxSizing: "border-box",
      }}
    >
      <h2 style={{ marginBottom: "25px" }}>
        Full Plant Brochure QR Code
      </h2>

      <canvas
        ref={canvasRef}
        style={{
          maxWidth: "100%",
          height: "auto",
        }}
      />

      <button
        onClick={downloadQR}
        style={{
          marginTop: "25px",
          padding: "12px 28px",
          fontSize: "16px",
          fontWeight: "600",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          backgroundColor: "#198754",
          color: "#ffffff",
        }}
      >
        Download QR Code
      </button>
    </div>
  );
};

export default BrochureQR;