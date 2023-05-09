import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Row } from "react-bootstrap";
import axios from "axios";
import CryptoJS from "crypto-js"; // 암호화
import Swal from "sweetalert2"; // alert 디자인
import Narvar from "../MapPage/Narvar";

const url = "http://localhost:8080/api/signIn";

function RegisterPage(props) {
  const navigate = useNavigate();

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

      //이 형식으로 보내야함!!!!!
      const data = {
        email: Email,
        name: Name,
        pw: cipherText,
        store: ConfirmPassword,
      };

      console.log(JSON.stringify(data));

      axios
        .post(url, JSON.stringify(data), {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          // 이미 아이디가 존재한다면
          if (res.data == "exist") {
            new Swal({
              title: "이미 존재하는 아이디입니다.",
              icon: "warning",
            }).then(function () {
              navigate("/login");
            });
          } else {
            // 아이디가 존재하지 않는다면
            new Swal({
              title: "회원가입 완료되었습니다!",
              icon: "success",
            }).then(function () {
              navigate("/login");
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("No");
      new Swal({
        title: "비밀번호가 일치하지 않습니다!",
        icon: "error",
      });
    }
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
          <h2>회원가입</h2>
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
              <button
                className="button"
                type="submit"
                onClick={onClickRegister}
              >
                회원가입
              </button>
            </form>
          </Card>
        </Row>
      </div>
    </div>
  );
}

export default RegisterPage;
