//client/src/pages/Login.js
import React, { useState } from "react";
import { Card, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import CryptoJS from "crypto-js"; // 암호화
import Swal from "sweetalert2"; // alert 디자인
import axios from "axios";

import Narvar from "../MapPage/Narvar";
import "./button.css";

const LoginURL = "http://localhost:8080/api/login";
const SessionURL = "http://localhost:8080/api/userinfo";
var session = "";
function LoginPage(props) {
  const navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  const onClickLogin = (event) => {
    const secretKey = "0509";
    console.log("click login");
    const data = {
      email: Email,
      pw: Password,
    };

    axios
      .post(LoginURL, JSON.stringify(data), {
        // 이메일 데이터만 보내고
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        // 아이디가 존재하지 않으면
        if (res.data == "login fail") {
          new Swal({
            title: "존재하지 않는 아이디입니다.",
            icon: "warning",
          });
        } else {
          session = res.data;
          console.log(session);
          // 아이디가 존재하면
          new Swal({
            title: "로그인 되었습니다!",
            icon: "success",
          }).then(function () {
            navigate("/owner", { state: { UserSession: session } });
          });
          // const bytes = CryptoJS.AES.decrypt(res.data, secretKey);
          // const original = bytes.toString(CryptoJS.enc.Utf8);
          // if (original == Password) {
          //   // 비밀번호까지 일치하면
          //   new Swal({
          //     title: "로그인 되었습니다!",
          //     icon: "success",
          //   }).then(function () {
          //     navigate("/");
          //   });
          // } else {
          //   // 비밀번호가 일치하지 않으면
          //   new Swal({
          //     title: "비밀번호가 일치하지 않습니다.",
          //     icon: "warning",
          //   });
          // }
        }
      })
      .catch((error) => {
        console.log(error);
      });
    const getData = {
      session: session,
      pw: Password,
    };
    axios
      .post(SessionURL, JSON.stringify(getData), {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <div>
      <Narvar></Narvar>
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
          <h2>로그인</h2>
          <Card body style={{ marginTop: "1rem", borderRadius: "10px" }}>
            <br />
            <form
              style={{ display: "flex", flexDirection: "column" }}
              onSubmit={onSubmitHandler}
            >
              <lable>이메일</lable>
              <input type="text" value={Email} onChange={onEmailHandler} />
              <br />
              <lable>비밀번호</lable>
              <input
                type="Password"
                value={Password}
                onChange={onPasswordHandler}
              />
              <br />
              <pre>
                <a href="http://localhost:3000/register">회원가입</a>{" "}
                <a href="http://localhost:3000/findPwd">비밀번호 찾기</a>
              </pre>
              <button className="button" type="submit" onClick={onClickLogin}>
                로그인
              </button>
            </form>
          </Card>
        </Row>
      </div>
    </div>
  );
}
export default LoginPage;
