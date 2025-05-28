import React from "react";

export default function Spinner() {
  return (
    <div style={{ textAlign: "center", margin: "32px 0" }}>
      <div
        style={{
          display: "inline-block",
          width: 32,
          height: 32,
          border: "4px solid #1976d2",
          borderTop: "4px solid #e3e3e3",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
      `}</style>
    </div>
  );
}
