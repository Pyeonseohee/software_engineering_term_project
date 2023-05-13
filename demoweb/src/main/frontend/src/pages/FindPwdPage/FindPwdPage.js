//client/src/pages/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Row } from "react-bootstrap";

import CryptoJS from "crypto-js";
import Swal from "sweetalert2";
import axios from "axios";
import Narvar from "../MapPage/Narvar";

const url = "http://localhost:8080/api/findPwd";

function FindPwdPage(props) {
  const navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  const onClickFindPwd = (event) => {
    const secretKey = "0509";
    console.log("click login");
    const data = {
      name: Name,
      email: Email,
    };
    console.log(JSON.stringify(data));

    axios
      .post(url, JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data == "아이디를 다시 입력해주세요") {
          new Swal({
            title: "일치하는 회원이 없습니다.",
            icon: "warning",
          });
        } else {
          const bytes = CryptoJS.AES.decrypt(res.data, secretKey);
          const original = bytes.toString(CryptoJS.enc.Utf8);
          new Swal({
            title: Name + "님의 비밀번호는 '" + original + "'입니다.",
            icon: "info",
          }).then(function () {
            navigate("/");
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("test");
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
          <h2>비밀번호 찾기</h2>
          <Card body style={{ marginTop: "1rem", borderRadius: "10px" }}>
            <br />
            <form
              style={{ display: "flex", flexDirection: "column" }}
              onSubmit={onSubmitHandler}
            >
              <lable>이름</lable>
              <input type="text" value={Name} onChange={onNameHandler} />
              <br />
              <lable>이메일</lable>
              <input type="text" value={Email} onChange={onEmailHandler} />
              <br />
              <button className="button" type="submit" onClick={onClickFindPwd}>
                비밀번호 찾기
              </button>
            </form>
          </Card>
        </Row>
      </div>
    </div>
  );
}

export default FindPwdPage;
