import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";

function RegisterPage(props) {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
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
        <input type="email" value={Email} onChange={onEmailHandler} />
        <br />

        <lable>이름</lable>
        <input type="text" value={Name} onChange={onNameHandler} />
        <br />

        <lable>비밀번호</lable>
        <input type="Password" value={Password} onChange={onPasswordHandler} />
        <br />

        <lable>비밀번호 확인</lable>
        <input
          type="Password"
          value={ConfirmPassword}
          onChange={onConfirmPasswordHandler}
        />
        <br />
        <br />
        <button className="button" type="submit">회원가입</button>
      </form>
        </Card>
    </Row>
    </div>
    // <div
    //   style={{
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     width: "100%",
    //     height: "100vh",
    //   }}
    // >
    //   <form
    //     style={{ display: "flex", flexDirection: "column" }}
    //     onSubmit={onSubmitHandler}
    //   >
    //     <lable>ID</lable>
    //     <input type="text" value={Id} onChange={onIdHandler} />

    //     <lable>Name</lable>
    //     <input type="text" value={Name} onChange={onNameHandler} />

    //     <lable>Password</lable>
    //     <input type="Password" value={Password} onChange={onPasswordHandler} />

    //     <lable>Confirm Password</lable>
    //     <input
    //       type="Password"
    //       value={ConfirmPassword}
    //       onChange={onConfirmPasswordHandler}
    //     />
    //     <br />
    //     <button type="submit">회원가입</button>
    //   </form>
    // </div>
  );
}

export default RegisterPage;
