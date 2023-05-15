import React, { useState } from "react";
import { BiPlus } from "react-icons/bi";
import Narvar from "../MapPage/Narvar";

function SeatPage2() {
  const [selectedButtons, setSelectedButtons] = useState([]);

  const handleButtonClick = (index) => {
    if (selectedButtons.includes(index)) {
      // 이미 선택된 버튼일 경우 선택 해제
      setSelectedButtons(selectedButtons.filter((btn) => btn !== index));
    } else {
      // 선택되지 않은 버튼일 경우 선택 추가
      setSelectedButtons([...selectedButtons, index]);
    }
  };
  const handleButtonDoubleClick = (index) => {
    // 버튼 더블 클릭 시 선택 해제
    setSelectedButtons(selectedButtons.filter((btn) => btn !== index));
  };

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
              onClick={() => handleButtonClick(index)}
              onDoubleClick={() => handleButtonDoubleClick(index)}
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: selectedButtons.includes(index)
                  ? "#1B9C85"
                  : "#F0F0F0",
                border: "none",
              }}
            >
              <BiPlus className="icon" size="30px" color="black" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SeatPage2;
