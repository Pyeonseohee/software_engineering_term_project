import React, { useState, useEffect } from "react";
import axios from "axios";
import Narvar from "../MapPage/Narvar";
import { useLocation } from "react-router-dom";

const setStoreURL = "http://localhost:8080/api/setstore";
const deleteStoreURL = "http://localhost:8080/api/deletestore";
const storeInfoURL = "http://localhost:8080/api/storeinfo";

function CafeOwnerPage() {
  const [userSession, setUserSession] = useState("");
  const location = useLocation();
  const userInfo = { ...location.state };

  useEffect(() => {
    setUserSession(userInfo.userSession);
    fetchStoreInfo(); // 컴포넌트 마운트시 fetchStoreInfo 호출
  }, []);

  const [store, setStore] = useState({
    name: "",
    address: "",
    phoneNumber: "",
  });
  const [stores, setStores] = useState([]);

  useEffect(() => {
    fetchStoreInfo(); // 초기 매장 데이터 불러오기
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setStore({ ...store, [name]: value });
  };

  const handleAddStore = () => {
    if (
      store.name.trim() === "" ||
      store.address.trim() === "" ||
      store.phoneNumber.trim() === ""
    ) {
      return; // 필수 필드가 비어있으면 매장 추가하지 않음
    }

    axios
      .post(
        setStoreURL,
        {
          session: userSession,
          storeName: store.name,
          storeAddress: store.address,
          phoneNumber: store.phoneNumber,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setStores([...stores, response.data]);
        setStore({ name: "", address: "", phoneNumber: "" });
      })
      .catch((error) => {
        console.error("매장 추가 에러:", error);
      });
  };

  const handleDeleteStore = (index) => {
    const storeId = stores[index]._id;

    axios
      .delete(`${deleteStoreURL}/${storeId}`, {
        data: {
          session: userSession,
        },
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        fetchStoreInfo();
      })
      .catch((error) => {
        console.error("매장 삭제 에러:", error);
      });
  };

  const fetchStoreInfo = () => {
    axios
      .get(storeInfoURL)
      .then((response) => {
        setStores(response.data); // 매장 정보를 stores 상태로 업데이트
      })
      .catch((error) => {
        console.error("매장 정보 불러오기 에러:", error);
      });
  };

  return (
    <div>
      <Narvar></Narvar>
      <div className="Main" style={{ margin: "auto", width: "700px" }}>
        <div className="d-grid gap-2">
          <div>
            <h1>매장 관리</h1>
            <form>
              <label>
                매장 이름:
                <input
                  type="text"
                  name="name"
                  value={store.name}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                매장 주소:
                <input
                  type="text"
                  name="address"
                  value={store.address}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                전화번호:
                <input
                  type="text"
                  name="phoneNumber"
                  value={store.phoneNumber}
                  onChange={handleChange}
                />
              </label>
            </form>
            <button onClick={handleAddStore}>매장 추가</button>
            <ul>
              {stores.map((s, index) => (
                <li key={index}>
                  {s.name}{" "}
                  <button onClick={() => handleDeleteStore(index)}>삭제</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CafeOwnerPage;
