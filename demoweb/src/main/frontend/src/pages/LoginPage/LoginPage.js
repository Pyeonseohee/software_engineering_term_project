//client/src/pages/Login.js
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Login = () => {
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

  return (
    <Row>
      <Col xs={1} md={3}></Col>
      <Col xs={10} md={6}>
        <Card body style={{ marginTop: "1rem", borderRadius: "10px" }}>
          <h2>Welcome!</h2>
          <h5>Cafe regulation System</h5>
          <br />
          <form
            style={{ display: "flex", flexDirection: "column" }}
            onSubmit={onSubmitHandler}
          >
            <lable>Email</lable>
            <input type="email" value={Email} onChange={onEmailHandler} />
            <br />
            <lable>Password</lable>
            <input
              type="Password"
              value={Password}
              onChange={onPasswordHandler}
            />
            <br />
            <a href="../register">회원이 아니십니까?</a>
            <button type="submit">로그인</button>
          </form>
        </Card>
      </Col>
      <Col xs={1} md={3}></Col>
    </Row>
  );
};
export default Login;
