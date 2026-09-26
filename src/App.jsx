import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [digits, setDigits] = useState([
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ]);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (dragOverIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (targetIndex) => {
    if (draggedIndex === null || draggedIndex === targetIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const updatedDigits = [...digits];
    const [movedItem] = updatedDigits.splice(draggedIndex, 1);
    updatedDigits.splice(targetIndex, 0, movedItem);

    setDigits(updatedDigits);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div className="app-container">
      <div className="card">
        <h1 className="title">Drag & Drop Digits</h1>
        <p className="description">Drag the boxes to reorder the digits 0–9.</p>

        <div className="grid">
          {digits.map((digit, index) => (
            <div
              key={digit}
              className={`box ${draggedIndex === index ? "dragging" : ""} ${
                dragOverIndex === index ? "drag-over" : ""
              }`}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
              onDrop={() => handleDrop(index)}
            >
              {digit}
            </div>
          ))}
        </div>

        <p className="tip">
          Tip: Try reordering to make <code>0123456789</code> or reverse it!
        </p>
      </div>
    </div>
  );
}
