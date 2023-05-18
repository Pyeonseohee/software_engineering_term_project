import React, { useState, useEffect } from "react";
import { Card, Row } from "react-bootstrap";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import CryptoJS from "crypto-js"; // 암호화
import Swal from "sweetalert2"; // alert 디자인
import axios from "axios";

import Narvar from "../MapPage/Narvar";

var userSession = ""; // 고유한 유저
const userInfoURL = "http://localhost:8080/api/userinfo";
const logoutURL = "http://localhost:8080/api/logout";
const exitURL = "http://localhost:8080/api/exit";

function UserInfo(props) {
  const navigate = useNavigate();
  const [userSession, setUserSession] = useState("");
  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");

  const LogoutButtonHandler = (event) => {
    new Swal({
      icon: "question",
      title: "로그아웃 하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "예",
      cancelButtonText: "아니요",
    }).then((result) => {
      const data = {
        session: userSession,
      };
      if (result.isConfirmed) {
        axios
          .post(logoutURL, JSON.stringify(data), {
            headers: { "Content-Type": "application/json" },
          })
          .then((res) => {
            console.log(res);
            if (res.data == "Log out completed") {
              new Swal({
                icon: "success",
                title: "로그아웃 되었습니다.",
              }).then(function () {
                navigate("/");
              });
            } else if (res.data == "Invalid Session") {
              new Swal({
                icon: "warning",
                title: "유효하지 않는 세션입니다.",
              });
            }
          });
      }
    });
  };

  const ExitButtonHandler = (event) => {
    new Swal({
      title: "현재 비밀번호를 입력하세요",
      input: "text",
      inputAttributes: { autocapitalize: "off" },
      showCancelButton: true,
      cancelButtonText: "취소",
      confirmButtonText: "입력",
      preConfrim: (password) => {
        return password;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(result.value);
      } else {
        console.log("Dont");
      }
    });
  };

  const ChangedPwdButtonHandler = (event) => {
    console.log("test");
  };

  const location = useLocation();
  const UserInfo = { ...location.state };
  useEffect(() => {
    setUserSession(UserInfo.userSession);
  }, []);

  // userInfo에게 보낼 데이터
  const data = {
    session: userSession,
    pw: "hi",
  };

  axios
    .post(userInfoURL, JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => {
      setEmail(res.data.email); // 화면에 이메일과 이름 출력
      setName(res.data.name);
    });

  return (
    <div>
      <Narvar user={userSession}></Narvar>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        <Row>
          <h2>내 정보</h2>
          <Card body style={{ marginTop: "1rem", borderRadius: "10px" }}>
            Email : {Email}
            <br />
            <br />
            이름 : {Name}
            <br />
            <br />
            <button onClick={LogoutButtonHandler}>로그아웃</button>
            <button onClick={ChangedPwdButtonHandler}>비밀번호 변경</button>
            <button onClick={ExitButtonHandler}>탈퇴하기</button>
          </Card>
        </Row>
      </div>
    </div>
  );
}

export default UserInfo;
