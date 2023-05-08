//client/src/pages/Login.js
import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import "./button.css";
const url = "http://localhost:8080/api/login";

function LoginPage(props) {
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
    console.log("click login");
    const data = {
      email: Email,
      pw: Password,
    };
    console.log(JSON.stringify(data));

    axios
      .post(url, JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("test");
  };

  return (
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
        <h2>Cafe Regulation System</h2>
        <Card body style={{ marginTop: "1rem", borderRadius: "10px" }}>
          <br />
          <form
            style={{ display: "flex", flexDirection: "column" }}
            onSubmit={onSubmitHandler}
          >
            <lable>이메일</lable>
            <input type="Email" value={Email} onChange={onEmailHandler} />
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
  );
}
export default LoginPage;
