import React, { useEffect, useRef, useState } from "react";
import { BiChair } from "react-icons/bi";
import { AiFillPlusCircle } from "react-icons/ai";
import Narvar from "../MapPage/Narvar";

function SeatPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [draggingButton, setDraggingButton] = useState(null);
  const [buttonCount, setButtonCount] = useState(0);
  const [buttons, setButtons] = useState([]);

  // 저장했던 버튼의 위치정보 받아 다시 rendering
  //   useEffect(() => {
  //     fetchButtonPositions();
  //   }, []);

  // 버튼을 드래그하여 옮길 때
  const handleMouseDown = (event, buttonId) => {
    setIsDragging(true);
    setDraggingButton(buttonId);
  };

  // 마우스 움직일 때
  const handleMouseMove = (event) => {
    if (isDragging) {
      const updatedButtons = buttons.map((button) => {
        if (button.id === draggingButton) {
          return {
            ...button,
            x: event.clientX,
            y: event.clientY,
          };
        }
        return button;
      });
      setButtons(updatedButtons);
    }
  };

  //
  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggingButton(null);
    // Save button positions to the server
    saveButtonPositions();
  };

  // 자리 데이터 보냄
  const saveButtonPositions = () => {
    console.log(buttons);
    // axios
    //   .post("/api/buttons", buttons)
    //   .then((response) => {
    //     console.log("Button positions saved to the server:", response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Failed to save button positions:", error);
    //   });
  };

  // 자리 data 받아옴
  //   const fetchButtonPositions = () => {
  //     console.log("test");

  //     axios
  //       .get("/api/buttons")
  //       .then((response) => {
  //         setButtons(response.data);
  //       })
  //       .catch((error) => {
  //         console.error("Failed to fetch button positions:", error);
  //       });
  //   };

  const handleButtonClick = () => {
    if (!isDragging) {
      const newButton = {
        id: buttonCount,
        x: 20,
        y: 20,
      };
      setButtonCount(buttonCount + 1);
      setButtons([...buttons, newButton]);
    }
  };

  return (
    <div>
      <Narvar></Narvar>
      <div
        className="Main"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "600px",
            margin: "auto",
          }}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <button
            className="seatButton"
            style={{
              border: "none",
              backgroundColor: "transparent",
            }}
            onClick={handleButtonClick}
          >
            <AiFillPlusCircle className="icon" size="70px" color="black" />
          </button>
          {buttons &&
            buttons.map((button) => (
              <button
                key={button.id}
                style={{
                  border: "none",
                  position: "absolute",
                  left: button.x,
                  top: button.y,
                  width: "70px",
                  height: "70px",
                  backgroundColor: "#F0F0F0",
                }}
                onMouseDown={(event) => handleMouseDown(event, button.id)}
              >
                {button.id}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}

export default SeatPage;
