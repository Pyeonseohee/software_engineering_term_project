import React from "react";
import Narvar from "../MapPage/Narvar";

function SeatPage2() {
  return (
    <div>
      <Narvar></Narvar>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(10, 60px)", // 10개의 열로 구성되며 각 열의 너비는 50px
            gridTemplateRows: "repeat(10, 60px)", // 10개의 행으로 구성되며 각 행의 높이는 50px
            gap: "10px", // 버튼 사이의 간격을 10px로 지정 (선택 사항)
          }}
        >
          {Array.from({ length: 100 }, (_, index) => (
            <button
              key={index}
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#F0F0F0",
                border: "none",
              }}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SeatPage2;
