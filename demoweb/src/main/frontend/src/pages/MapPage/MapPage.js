// MapContainer.js

import React, { useEffect, useRef, useState } from "react";
import { Navbar, Form, Button, Dropdown } from "react-bootstrap";
import { BiUserCircle } from "react-icons/bi";
import "./mapPage.css";

const { kakao } = window;

const MapPage = () => {
  var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
  const [keyword, setKeyword] = useState("");

  const onKeywordHandler = (event) => {
    setKeyword(event.currentTarget.value);
  };

  const onSearchHandler = (event) => {
    console.log(keyword);
  };

  const onUserButtonHandler = (event) => {
    console.log("Click!");
  };

  const container = useRef(null);
  const options = {
    center: new kakao.maps.LatLng(37.56637787425258, 126.97827585270615),
    level: 3,
  };

  useEffect(() => {
    const map = new kakao.maps.Map(container.current, options);

    var ps = new kakao.maps.services.Places();
    ps.keywordSearch(keyword, placeSearchCB);

    function displayMarker(place) {
      // 마커를 생성하고 지도에 표시합니다
      var marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });
      console.log("test");

      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, "click", function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        infowindow.setContent(
          '<div style="padding:3px;font-size:12px;">' +
            '<a href="#" target="_blank" style="text-decoration-line:none">' +
            place.place_name +
            "</a>" +
            "</div>"
        );
        infowindow.open(map, marker);
      });
    }

    // search된 place 보여줌.
    function placeSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        var bounds = new kakao.maps.LatLngBounds();
        for (var i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        map.setBounds(bounds);
      }
    }
  });

  return (
    <div>
      <Navbar className="topNarvar" variant="dark">
        <Navbar.Brand href="/">Cafe</Navbar.Brand>
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
      <div
        id={"map"}
        ref={container}
        style={{ width: "100%", height: "100vh" }}
      ></div>
    </div>
  );
};

export default MapPage;
