import React, { useState, useEffect } from "react";
import Swal from "sweetalert2"; // alert 디자인
import axios from "axios";

const GetEndTimeURL = "http://localhost:8080/api/endtime";
const SeatAvailableURL = "http://localhost:8080/api/seatavailable";

const SeatTimer = (props) => {
  const [endTime, setEndTime] = useState(null);
  const [remainingTime, setRemainingTime] = useState(0);
  const { userSession, currentButton } = props;
  useEffect(() => {
    const data = {
      session: userSession,
      seatnum: currentButton,
    };
    // 버튼을 눌렀을 때, DB로부터 종료 시간을 가져오는 비동기 함수
    const fetchEndTime = () => {
      axios
        .post(GetEndTimeURL, JSON.stringify(data), {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          setEndTime(new Date(res.data)); // 종료 시간을 Date 객체로 변환하여 저장
          console.log(res.data);
        });
    };

    fetchEndTime(); // 함수 호출하여 종료 시간을 가져옴
  }, []);

  useEffect(() => {
    // 종료 시간이 설정되었을 때, 남은 시간을 계산하는 타이머 함수
    const timer = setInterval(() => {
      if (endTime) {
        const currentTime = new Date().getTime();
        const difference = endTime.getTime() - currentTime;
        if (difference > 0) {
          setRemainingTime(difference);
        } else {
          clearInterval(timer);
          const data = {
            session: userSession,
            seatnum: currentButton,
          };
          axios
            .post(SeatAvailableURL, JSON.stringify(data), {
              headers: { "Content-Type": "application/json" },
            })
            .then((res) => {
              new Swal({
                title: "시간이 종료된 좌석입니다!",
              });
            });
        }
      }
    }, 1000); // 1초마다 업데이트

    return () => {
      clearInterval(timer); // 컴포넌트 언마운트 시 타이머 정리
    };
  }, [endTime]);

  // 시간을 시:분:초 형식으로 변환하는 함수
  const formatTimer = () => {
    const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
    const seconds = Math.floor((remainingTime / 1000) % 60);
    return `${hours < 10 ? "0" + hours : hours} : ${
      minutes < 10 ? "0" + minutes : minutes
    } : ${seconds < 10 ? "0" + seconds : seconds}`;
  };

  return (
    <div>
      <div>{formatTimer()}</div>
    </div>
  );
};

export default SeatTimer;
