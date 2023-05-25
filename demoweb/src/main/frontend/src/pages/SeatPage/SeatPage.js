import React, { useEffect, useRef, useState } from "react";
import { Dropdown, DropdownButton, Overlay, Popover } from "react-bootstrap";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { AiFillPlusCircle } from "react-icons/ai";
import Narvar from "../MapPage/Narvar";
import axios from "axios";

const SetSeatURL = "http://localhost:8080/api/setseat";
const SeatInfoURL = "http://localhost:8080/api/seatinfo";
const setStoreURL = "http://localhost:8080/api/setstore";
const StoreInfoURL = "http://localhost:8080/api/storeinfo";

function SeatPage() {
  var test = "메가커피";
  const [userSession, setUserSession] = useState("");
  const ref = useRef(null);
  const [storeName, setStoreName] = useState("매장을 선택하세요."); // 어떤 매장인지에 따라
  const [existStore, setExistStore] = useState(false);
  const [isDragging, setIsDragging] = useState(false); // 드래깅 여부
  const [draggingButton, setDraggingButton] = useState(null); // 드래깅 버튼
  const [buttonCount, setButtonCount] = useState(1); // 버튼 몇 개 있는지
  const [buttons, setButtons] = useState([]); // 버튼 list

  // user session 받아오는 부분
  // 저장했던 버튼의 위치정보 받아 다시 rendering
  const location = useLocation();
  const UserInfo = { ...location.state };
  useEffect(() => {
    setUserSession(UserInfo.userSession);
    confirmStore();
    //fetchData();
  }, [storeName]);

  // 매장 있는지 없는지 확인
  const confirmStore = () => {
    const data = {
      session: userSession,
    };

    axios
      .post(StoreInfoURL, JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(res);
        if (res.data != null) {
          setExistStore(true);
          setStoreName(res.data.name);
          console.log(res.data.name);
          fetchData();
        } else {
          console.log("------no store!!!");
        }
      });
  };

  // 저장된 좌석 정보 받아오기
  const fetchData = () => {
    const data = {
      session: userSession,
      name: storeName,
    };
    axios
      .post(SeatInfoURL, JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(res.data);
        setButtons(res.data);
        setButtonCount(res.data.length + 1);
      });
  };

  // 버튼을 드래그하여 옮길 때
  const handleMouseDown = (event, buttonId) => {
    console.log("test");
    setIsDragging(true);
    setDraggingButton(buttonId);
  };

  // 마우스 움직일 때
  const handleMouseMove = (event) => {
    if (isDragging) {
      const updatedButtons = buttons.map((button) => {
        if (button.seatnum === draggingButton) {
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
  };

  // 좌석 추가버튼
  const handleAddButtonClick = () => {
    if (!isDragging) {
      const newButton = {
        seatnum: buttonCount,
        x: 150,
        y: 150,
      };
      setButtonCount(buttonCount + 1);
      setButtons([...buttons, newButton]);
    }
  };

  // 두 번 누르면 좌석 삭제
  const handleButtonDoubleClick = (buttonId) => {
    const data = {
      session: userSession,
      name: test,
      seatNum: buttonId,
    };
    console.log(JSON.stringify(data));
    axios
      .delete(
        SetSeatURL,
        {
          data: {
            session: userSession,
            name: test,
            seatNum: buttonId,
          },
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        console.log(res);
        if (!isDragging) {
          const updatedButtons = buttons.filter(
            (button) => button.seatnum !== buttonId
          );
          setButtons(updatedButtons);
          setButtonCount(buttonCount - 1);
        }
      });
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
        //console.log(res);
      });
  };

  // 드롭다운에서 store정보 받아오는 부분
  const StoreList = () => {
    const data = {
      session: userSession,
    };
    axios
      .post(StoreInfoURL, JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(res.data.name);
        setStoreName(res.data.name);
      });
  };

  // 드롭다운에서 store 이름 눌렀을 때 실행되는 함수.
  const storeSelect = (storeName) => {
    console.log("-------", storeName);
    setStoreName(storeName);
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
          <DropdownButton
            id="dropdown-basic-button"
            title={storeName}
            onClick={StoreList}
          >
            <Dropdown.Item>{storeName}</Dropdown.Item>
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
              key={button.seatnum}
              style={{
                border: "none",
                position: "absolute",
                left: button.x,
                top: button.y,
                width: "70px",
                height: "70px",
                backgroundColor: "#F0F0F0",
              }}
              onMouseDown={(event) => handleMouseDown(event, button.seatnum)}
              onDoubleClick={() => handleButtonDoubleClick(button.seatnum)}
              onMouseUp={(event) => handleSendSeatInfo(event, button.seatnum)}
            >
              {button.seatnum}
            </button>
          ))}
      </div>
    </div>
  );
}

export default SeatPage;
