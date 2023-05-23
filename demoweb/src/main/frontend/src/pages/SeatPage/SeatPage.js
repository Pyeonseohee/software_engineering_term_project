import React, { useEffect, useRef, useState } from "react";
import { Dropdown, DropdownButton, Overlay, Popover } from "react-bootstrap";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { AiFillPlusCircle } from "react-icons/ai";
import Narvar from "../MapPage/Narvar";
import axios from "axios";

const SetSeatURL = "http://localhost:8080/api/setseat";
const SetStoreURL = "http://localhost:8080/api/setstore";

function SeatPage() {
  const [userSession, setUserSession] = useState("");
  const ref = useRef(null);
  const [target, setTarget] = useState(null);
  const [show, setShow] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [draggingButton, setDraggingButton] = useState(null);
  const [buttonCount, setButtonCount] = useState(0);
  const [buttons, setButtons] = useState([]);

  // user session 받아오는 부분
  const location = useLocation();
  const UserInfo = { ...location.state };
  useEffect(() => {
    setUserSession(UserInfo.userSession);
  });
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

  // drag하고 mouse 땔 때
  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggingButton(null);
    // Save button positions to the server
  };

  const handleAddButtonClick = () => {
    if (!isDragging) {
      const newButton = {
        id: buttonCount,
        x: 150,
        y: 150,
      };
      setButtonCount(buttonCount + 1);
      setButtons([...buttons, newButton]);
    }

    const data = {
      session: userSession,
      name: "메가커피",
    };
    axios
      .post(SetStoreURL, JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(res);
      });
  };

  const handleButtonDoubleClick = (buttonId) => {
    if (!isDragging) {
      const updatedButtons = buttons.filter((button) => button.id !== buttonId);
      setButtons(updatedButtons);
      setButtonCount(buttonCount - 1);
    }
  };

  // 배치완료되면 데이터 seat의 데이터 보낼거임.
  const handleSendSeatInfo = (event, buttonId) => {
    console.log(buttonId, event.clientX, event.clientY);
    const data = {
      session: userSession,
      name: "메가커피",
      seatnum: buttonId,
      x: event.clientX,
      y: event.clientY,
    };
    console.log(JSON.stringify(data));
    axios
      .post(SetSeatURL, JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(res);
      });
  };

  //나중에 좌석 관리 페이지에 쓰일 함수(오른쪽 누르면 좌석 번호, 메뉴, )
  const handleRightClick = (event, buttonId) => {
    event.preventDefault();
    console.log(event.target);
    setShow(!show);
    setTarget(event.target);
  };

  return (
    <div>
      <Narvar user={userSession}></Narvar>
      <div
        ref={ref}
        style={{
          width: "100%",
          height: "100vh",
        }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div
          style={{ margin: "20px", display: "flex", justifyContent: "center" }}
        >
          <DropdownButton id="dropdown-basic-button" title="매장을 선택하세요 ">
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </DropdownButton>
        </div>
        <button
          className="seatButton"
          style={{
            margin: "50px",
            border: "none",
            backgroundColor: "transparent",
          }}
          onClick={handleAddButtonClick}
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
              onDoubleClick={() => handleButtonDoubleClick(button.id)}
              onMouseUp={(event) => handleSendSeatInfo(event, button.id)}
              onContextMenu={(event) => handleRightClick(event, button.id)}
            >
              {button.id}
            </button>
          ))}
        <Overlay
          show={show}
          target={target}
          placement="bottom"
          container={ref}
          containerPadding={20}
        >
          <Popover id="popover-contained">
            <Popover.Header as="h3">Popover bottom</Popover.Header>
            <Popover.Body>
              <strong>Holy guacamole!</strong> Check this info.
            </Popover.Body>
          </Popover>
        </Overlay>
        <button
          style={{
            border: "none",
            width: "70px",
            height: "50px",
            backgroundColor: "green",
          }}
        >
          완료
        </button>
      </div>
    </div>
  );
}

export default SeatPage;
