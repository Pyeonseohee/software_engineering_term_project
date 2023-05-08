// MapContainer.js

import React, { useEffect, useRef, useState } from "react";
import Narvar from "./Narvar";
const { kakao } = window;

const MapPage = () => {
  var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
  var map;

  useEffect(() => {
    var mapContainer = document.getElementById("map");
    var position = new kakao.maps.LatLng(33.450701, 126.570667);
    var mapOptions = {
      center: position,
      level: 3,
    };
    position = new kakao.maps.LatLng(33.450701, 126.570667);

    map = new kakao.maps.Map(mapContainer, mapOptions);
    var marker = new kakao.maps.Marker({ position });
    marker.setMap(map);

    var ps = new kakao.maps.services.Places();
    ps.keywordSearch("서울역 메가커피", placeSearchCB);
  });

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

  function displayMarker(place) {
    // 마커를 생성하고 지도에 표시합니다
    var marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(place.y, place.x),
    });

    // 마커에 클릭이벤트를 등록합니다
    kakao.maps.event.addListener(marker, "click", function () {
      // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
      infowindow.setContent(
        '<div style="padding:5px;font-size:12px;">' +
          place.place_name +
          "</div>"
      );
      infowindow.open(map, marker);
    });
  }

  return (
    <div>
      <Narvar fixed="top"></Narvar>
      <div
        id="map"
        style={{
          width: "100%",
          height: "800px",
        }}
      ></div>
    </div>
  );
};

export default MapPage;
