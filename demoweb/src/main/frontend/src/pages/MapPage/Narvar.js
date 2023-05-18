import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Navbar, Dropdown, Nav } from "react-bootstrap";
import { BiUserCircle, BiCoffeeTogo } from "react-icons/bi";
import "./mapPage.css";

const Narvar = (props) => {
  // 현재 route 정보
  const location = useLocation().pathname;
  var isLogin; // 로그인 했는지
  if (props.user == undefined) isLogin = false; // 세션이 undefined이면 로그인X
  else isLogin = true;
  return (
    <Navbar className="topNarvar" variant="dark">
      <BiCoffeeTogo className="icon" size="40px" color="#C1EFFF"></BiCoffeeTogo>
      <Navbar.Brand href="/">Cafe</Navbar.Brand>
      {isLogin ? (
        <Nav className="me-auto">
          <Nav.Link href="/owner" active={location == "/owner" ? true : false}>
            내 매장
          </Nav.Link>
          <Nav.Link href="/register">좌석 관리</Nav.Link>
          <Nav.Link href="/register">제품 관리</Nav.Link>
          <Nav.Link href="/seat2" active={location == "/seat2" ? true : false}>
            좌석 배치
          </Nav.Link>
          <Nav.Link href="/register">내 정보</Nav.Link>
        </Nav>
      ) : (
        <Nav className="me-auto">
          <Nav.Link href="/login" active={location == "/login" ? true : false}>
            로그인
          </Nav.Link>
          <Nav.Link
            href="/register"
            active={location == "/register" ? true : false}
          >
            회원가입
          </Nav.Link>
        </Nav>
      )}
    </Navbar>
  );
};

export default Narvar;
