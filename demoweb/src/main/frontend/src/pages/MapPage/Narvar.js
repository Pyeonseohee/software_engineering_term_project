import React, { useEffect, useRef, useState } from "react";
import { Navbar, Dropdown, Nav } from "react-bootstrap";
import { BiUserCircle, BiCoffeeTogo } from "react-icons/bi";
import "./mapPage.css";

const Narvar = (props) => {
  const onUserButtonHandler = (event) => {
    console.log("Click!");
  };
  return (
    <Navbar className="topNarvar" variant="dark">
      <BiCoffeeTogo className="icon" size="40px" color="#C1EFFF"></BiCoffeeTogo>
      <Navbar.Brand href="/">Cafe</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="/login">로그인</Nav.Link>
        <Nav.Link href="/register">회원가입</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Narvar;
