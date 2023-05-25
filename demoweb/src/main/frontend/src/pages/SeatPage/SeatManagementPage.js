import React, { useEffect, useRef, useState } from "react";
import { Dropdown, DropdownButton, Overlay, Popover } from "react-bootstrap";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Narvar from "../MapPage/Narvar";
import axios from "axios";

const SeatInfoURL = "http://localhost:8080/api/seatinfo";
const StoreInfoURL = "http://localhost:8080/api/storeinfo";
const SetStoreURL = "http://localhost:8080/api/setstore";
const SetPurchaseURL = "http://localhost:8080/api/setpurchase";

function SeatManagementPage() {
  const ref = useRef(null);
  var test = "메가커피";
  const [using, setUsing] = useState([]);
  const [storeName, setStoreName] = useState("매장을 선택하세요."); // 어떤 매장인지에 따라
  const [existStore, setExistStore] = useState(false);
  const [userSession, setUserSession] = useState("");
  const [target, setTarget] = useState(null);
  const [show, setShow] = useState(false);
  const [buttonCount, setButtonCount] = useState(0);
  const [buttons, setButtons] = useState([]);
  const [storeList, setStoreList] = useState([]); // 매장 list

  // user session 받아오는 부분
  // 저장했던 버튼의 위치정보 받아 다시 rendering
  const location = useLocation();
  const UserInfo = { ...location.state };
  useEffect(() => {
    setUserSession(UserInfo.userSession);
    exitStore();
    //fetchData();
  }, [storeName]);

  // 매장 있는지 없는지 확인
  const exitStore = () => {
    const data = {
      session: userSession,
    };

    axios
      .post(StoreInfoURL, JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(res);
        if (res.data != "doesn't exist.") {
          setExistStore(true);
          setStoreName(res.data.name);
          console.log(res.data.name);
          fetchData();
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
      });
  };

  //나중에 좌석 관리 페이지에 쓰일 함수(오른쪽 누르면 좌석 번호, 메뉴, )
  const handleRightClick = (event, buttonId) => {
    event.preventDefault();
    console.log(buttonId);
    const data = {
      session: userSession,
      name: test,
    };
    axios
      .post(SeatInfoURL, JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        const use = res.data[buttonId - 1].available;
        console.log(use);
        // 좌석이 사용중이라면
        if (use == true) {
          setUsing(use);
        } else {
          // 좌석이 비어있다면
          //   console.log(use);
          //   const data = {
          //     session: userSession,
          //     name: test,
          //     seatnum: buttonId,
          //   };
          //   axios
          //     .post(SetPurchaseURL, JSON.stringify(data), {
          //       headers: { "Content-Type": "application/json" },
          //     })
          //     .then((res) => {});
        }
      });
    setShow(!show);
    setTarget(event.target);
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
              onContextMenu={(event) => handleRightClick(event, button.seatnum)}
            >
              {button.seatnum}
            </button>
          ))}
        <Overlay
          show={show}
          target={target}
          placement="bottom"
          container={ref}
          containerPadding={20}
        >
          {using ? (
            <Popover id="popover-contained">
              <Popover.Header as="h3">사용중..</Popover.Header>
              <Popover.Body>
                <strong>Holy guacamole!</strong> Check this info.
              </Popover.Body>
            </Popover>
          ) : (
            <Popover id="popover-contained">
              <Popover.Header as="h3">비어있는 좌석</Popover.Header>
              <Popover.Body style="fontSize: 24px">
                <strong>메뉴를 선택해주세요</strong>
                <br />
                dsds
              </Popover.Body>
            </Popover>
          )}
        </Overlay>
      </div>
    </div>
  );
}

export default SeatManagementPage;
