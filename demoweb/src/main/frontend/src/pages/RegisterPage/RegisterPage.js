import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import axios from "axios";
import CryptoJS from "crypto-js";
import Swal from "sweetalert2";

const url = "http://localhost:8080/api/signIn";

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

  const onClickRegister = (event) => {
    const secretKey = "0509";
    if (Password === ConfirmPassword) {
      const cipherText = CryptoJS.AES.encrypt(Password, secretKey).toString();
      // const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
      // const original = bytes.toString(CryptoJS.enc.Utf8);

      const data = {
        user_id: Email,
        name: Name,
        password: cipherText,
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
      new Swal({
        title: "회원가입 완료되었습니다!",
        icon: "success",
      }).then(function () {
        location.herf = "";
      });
    } else {
      console.log("No");
    }
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
            <input type="text" value={Email} onChange={onEmailHandler} />
            <br />

            <lable>이름</lable>
            <input type="text" value={Name} onChange={onNameHandler} />
            <br />

            <lable>비밀번호</lable>
            <input
              type="Password"
              value={Password}
              onChange={onPasswordHandler}
            />
            <br />

            <lable>비밀번호 확인</lable>
            <input
              type="Password"
              value={ConfirmPassword}
              onChange={onConfirmPasswordHandler}
            />
            <br />
            <br />
            <button className="button" type="submit" onClick={onClickRegister}>
              회원가입
            </button>
          </form>
        </Card>
      </Row>
    </div>
  );
}

export default RegisterPage;
