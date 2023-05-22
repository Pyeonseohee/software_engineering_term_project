import Narvar from "../MapPage/Narvar";
import { Navbar, Dropdown, Nav } from "react-bootstrap";
import React, { useState } from "react";

const TestSeat = () => {
  const [buttons, setButtons] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleAddButton = () => {
    const newButton = {
      index: currentIndex,
      x: 0, // 초기 x 좌표
      y: 0, // 초기 y 좌표
    };

    setCurrentIndex(currentIndex + 1);
    setButtons([...buttons, newButton]);
  };

  const handleDragStart = (event, index) => {
    event.dataTransfer.setData("text/plain", index);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, targetIndex) => {
    const draggedIndex = parseInt(event.dataTransfer.getData("text/plain"));
    const draggedButton = buttons.find(
      (button) => button.index === draggedIndex
    );
    const targetButton = buttons.find((button) => button.index === targetIndex);

    const updatedButtons = buttons.map((button) => {
      if (button.index === draggedIndex) {
        return { ...button, x: targetButton.x + 70, y: targetButton.y };
      }
      return button;
    });

    setButtons(updatedButtons);
  };

  const handleDragEnd = (event, index) => {
    const updatedButtons = buttons.map((button) => {
      if (button.index === index) {
        return { ...button, x: event.clientX, y: event.clientY };
      }
      return button;
    });
    setButtons(updatedButtons);
  };

  const handleButtonPress = (index, x, y) => {
    console.log(`Button Index: ${index}, X: ${x}, Y: ${y}`);
  };

  return (
    <div>
      <Narvar /> {/* 다른 파일에서 가져온 컴포넌트 */}
      <div>
        <button onClick={handleAddButton}>추가</button>
        {buttons.map((button) => (
          <button
            key={button.index}
            draggable
            onDragStart={(event) => handleDragStart(event, button.index)}
            onDragOver={handleDragOver}
            onDrop={(event) => handleDrop(event, button.index)}
            onDragEnd={(event) => handleDragEnd(event, button.index)}
            style={{
              position: "absolute",
              left: button.x,
              top: button.y,
              width: "70px",
              height: "70px",
            }}
            onClick={() => handleButtonPress(button.index, button.x, button.y)}
          >
            {button.index}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TestSeat;
