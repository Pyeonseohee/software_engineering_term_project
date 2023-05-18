import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { BiPlus, BiChair } from "react-icons/bi";

import Swal from "sweetalert2"; // alert 디자인
import axios from "axios";
import Narvar from "../MapPage/Narvar";

const storeInfoURL = "http://localhost:8080/api/storeinfo";

function SeatPage2() {
  const navigate = useNavigate();
  const [existStore, setExistStore] = useState(false);
  const [userSession, setUserSession] = useState("");
  const [selectedButtons, setSelectedButtons] = useState([]);

  const location = useLocation();
  const UserInfo = { ...location.state };
  useEffect(() => {
    setUserSession(UserInfo.userSession);
  });

  // 나의 매장이 있는지 확인하는 단계
  const data = {
    session: userSession,
  };
  axios
    .post(storeInfoURL, JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => {
      if (res.data == "") {
        setExistStore(false);
      } else {
        setExistStore(true);
      }
    });

  const SeatButtonHandler = (index) => {
    if (selectedButtons.includes(index)) {
      // 이미 선택된 버튼일 경우 선택 해제
      setSelectedButtons(selectedButtons.filter((btn) => btn !== index));
    } else {
      // 선택되지 않은 버튼일 경우 선택 추가
      setSelectedButtons([...selectedButtons, index]);
      console.log(index);
    }
  };

  const SeatButtonDoubleClickHandler = (index) => {
    // 버튼 더블 클릭 시 선택 해제
    setSelectedButtons(selectedButtons.filter((btn) => btn !== index));
  };

  const CompletionButtonHandler = (event) => {
    var json = {};
    selectedButtons.forEach((value, index) => (json[index] = value));
    console.log(json);
  };

  return (
    <div>
      <Narvar user={userSession}></Narvar>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
        }}
      >
        {existStore ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(10, 60px)", // 10개의 열로 구성되며 각 열의 너비는 50px
              gridTemplateRows: "repeat(9, 60px)", // 10개의 행으로 구성되며 각 행의 높이는 50px
              gap: "8px", // 버튼 사이의 간격을 10px로 지정 (선택 사항)
            }}
          >
            {Array.from(
              { length: 90 },
              (
                _,
                index // 버튼 개수가 length
              ) => (
                <button
                  key={index}
                  onClick={() => SeatButtonHandler(index)}
                  onDoubleClick={() => SeatButtonDoubleClickHandler(index)}
                  style={{
                    width: "100%",
                    height: "100%",
                    // 선택했는지 아닌지에 따라 색깔 바뀜
                    backgroundColor: selectedButtons.includes(index)
                      ? "#1B9C85"
                      : "#F0F0F0",
                    border: "none",
                  }}
                >
                  {selectedButtons.includes(index) ? (
                    <BiChair className="icon" size="40px" color="black" />
                  ) : (
                    <BiPlus className="icon" size="20px" color="black" />
                  )}
                </button>
              )
            )}
            <button onClick={CompletionButtonHandler}>완료</button>
          </div>
        ) : (
          <div>
            <h2>매장이 존재하지 않습니다.</h2>내 매장을 먼저 등록해주세요!
            <br />
            <br />
            <button
              onClick={() =>
                navigate("/Ownerpage", { state: { userSession: userSession } })
              }
            >
              등록하러 가기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SeatPage2;
