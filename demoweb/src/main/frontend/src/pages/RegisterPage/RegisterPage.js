import React, { useState } from "react";

function RegisterPage(props) {
  //email과 pw를 위한 state 만들기
  const [Id, setId] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const onIdHandler = (event) => {
    setId(event.currentTarget.value);
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
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <lable>ID</lable>
        <input type="text" value={Id} onChange={onIdHandler} />

        <lable>Name</lable>
        <input type="text" value={Name} onChange={onNameHandler} />

        <lable>Password</lable>
        <input type="Password" value={Password} onChange={onPasswordHandler} />

        <lable>Confirm Password</lable>
        <input
          type="Password"
          value={ConfirmPassword}
          onChange={onConfirmPasswordHandler}
        />
        <br />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}

export default RegisterPage;
