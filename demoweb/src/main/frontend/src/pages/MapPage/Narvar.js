import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { BiUserCircle } from "react-icons/bi";
import React, { useState } from "react";
import "./narvar.css";

function Narvar() {
  const [keyword, setKeyword] = useState("");

  const onKeywordHandler = (event) => {
    setKeyword(event.currentTarget.value);
  };

  const onSearchHandler = (event) => {
    console.log(keyword);
  };

  return (
    <>
      <Navbar className="topNarvar" variant="dark">
        <Navbar.Brand href="#home">Cafe</Navbar.Brand>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="장소 검색"
            className="me-2"
            aria-label="Search"
            onChange={onKeywordHandler}
          />
          <Button variant="outline-light" onClick={onSearchHandler}>
            Search
          </Button>
        </Form>
        <BiUserCircle className="icon" size="24" color="white" />
      </Navbar>
    </>
  );
}

export default Narvar;
