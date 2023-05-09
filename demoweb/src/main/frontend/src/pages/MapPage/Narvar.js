import React, { useEffect, useRef, useState } from "react";
import { Navbar, Dropdown } from "react-bootstrap";
import { BiUserCircle } from "react-icons/bi";
import "./mapPage.css";

const Narvar = () => {
  const onUserButtonHandler = (event) => {
    console.log("Click!");
  };
  return (
    <Navbar className="topNarvar" variant="dark">
      <Navbar.Brand href="/">Cafe</Navbar.Brand>
      <Dropdown>
        <Dropdown.Toggle id="dropdown-basic">
          <button className="userButton" onClick={onUserButtonHandler}>
            <BiUserCircle className="icon" size="24" color="white" />
          </button>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="/register">회원가입</Dropdown.Item>
          <Dropdown.Item href="/login">로그인</Dropdown.Item>
          <Dropdown.Item href="/findPwd">비밀번호 찾기</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Navbar>
  );
};

export default Narvar;
