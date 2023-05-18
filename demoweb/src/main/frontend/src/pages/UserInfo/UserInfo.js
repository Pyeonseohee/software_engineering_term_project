import React, { useState, useEffect } from "react";
import { Card, Row } from "react-bootstrap";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import CryptoJS from "crypto-js"; // 암호화
import Swal from "sweetalert2"; // alert 디자인
import axios from "axios";

import Narvar from "../MapPage/Narvar";

const userInfoURL = "http://localhost:8080/api/userinfo";
const logoutURL = "http://localhost:8080/api/logout";
const exitURL = "http://localhost:8080/api/exit";
const changePwdURL = "http://localhost:8080/api/changepwd";

function UserInfo(props) {
  const navigate = useNavigate();
  const [userSession, setUserSession] = useState("");
  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");

  // 로그아웃 핸들러
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

  // 탈퇴 핸들러
  const ExitButtonHandler = (event) => {
    var tmpPwd = "";
    new Swal({
      title: "현재 비밀번호를 입력하세요",
      input: "password",
      inputAttributes: { autocapitalize: "off" },
      showCancelButton: true,
      cancelButtonText: "취소",
      confirmButtonText: "입력",
      preConfrim: (password) => {
        return password;
      },
    }).then((result) => {
      tmpPwd = result.value;
      new Swal({
        icon: "question",
        title: "정말 탈퇴하시겠습니까?",
        showCancelButton: true,
        cancelButtonText: "아니요",
        confirmButtonText: "네",
      }).then((result) => {
        if (result.isConfirmed) {
          const data = {
            session: userSession,
            pw: tmpPwd,
          };
          axios
            .post(exitURL, JSON.stringify(data), {
              headers: { "Content-Type": "application/json" },
            })
            .then((res) => {
              if (res.data == "Password Incorrect") {
                new Swal({
                  icon: "error",
                  title: "현재 비밀번호와\n일치하지 않습니다.",
                });
              } else if (res.data == "Sign out succeeded") {
                new Swal({
                  icon: "success",
                  title: "탈퇴되었습니다.",
                }).then(function () {
                  navigate("/");
                });
              } else {
                new Swal({
                  icon: "warning",
                  title: "유효하지 않은 세션입니다.",
                });
              }
            });
        }
      });
    });
  };

  // 비밀번호 변경 핸들러
  const ChangedPwdButtonHandler = (event) => {
    new Swal({
      title: "비밀번호 변경",
      html:
        "<br/>현재 비밀번호 입력" +
        '<input type="password" id="swal-input1" class="swal2-input"><br/>' +
        "<br/>새로운 비밀번호 입력" +
        '<input type="password"id="swal-input2" class="swal2-input"><br/>' +
        "<br/>새로운 비밀번호 확인" +
        '<input type="password" id="swal-input3" class="swal2-input">',
      confirmButtonText: "변경",
      showCancelButton: true,
      cancelButtonText: "취소",
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").value,
          document.getElementById("swal-input3").value,
        ];
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {
          session: userSession,
          pw: result.value[0],
          newPw: result.value[1],
          chkPw: result.value[2],
        };
        axios
          .post(changePwdURL, JSON.stringify(data), {
            headers: { "Content-Type": "application/json" },
          })
          .then((res) => {
            if (res.data === "Password Updated") {
              new Swal({
                icon: "success",
                title: "비밀번호가 변경되었습니다!",
              });
            } else if (res.data == "Password Incorrect") {
              new Swal({
                icon: "error",
                title: "현재 비밀번호와\n일치하지 않습니다.",
              });
            } else if (res.data === "New Password doesn't matches") {
              new Swal({
                icon: "error",
                title: "새로운 비밀번호가 서로 \n일치하지 않습니다.",
              });
            } else {
              new Swal({
                icon: "warning",
                title: "유효하지 않은 세션입니다.",
              });
            }
          });
      }
    });
  };

  const location = useLocation();
  const UserInfo = { ...location.state };
  useEffect(() => {
    setUserSession(UserInfo.userSession);
  });

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
