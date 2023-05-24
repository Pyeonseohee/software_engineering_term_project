import React, { useState, useEffect } from 'react';
import axios from "axios";
import Narvar from "../MapPage/Narvar";

//const StoreInfoURL = "http://localhost:8080/api/storeinfo";

function CafeOwnerPage() {
  // 매장 정보 상태 관리
  const [store, setStore] = useState({
    name: '',
    address: '',
    phoneNumber: ''
  });
  const [stores, setStores] = useState([]);

  useEffect(() => {
    // 초기 매장 데이터 불러오기
    fetchStores();
  }, []);

  // 매장 정보 변경
  const handleChange = (event) => {
    const { name, value } = event.target;
    setStore({ ...store, [name]: value });
  };

  // 매장 추가 및 저장
  const handleAddStore = () => {
    if (store.name.trim() === '' || store.address.trim() === '' || store.phoneNumber.trim() === '') {
      return; // 필수 필드가 비어있으면 매장 추가하지 않음
    }

    // 매장 정보를 서버로 전송
    axios.post("/api/storeinfo", store)
      .then(response => {
        // 새로운 매장으로 stores 상태 업데이트
        setStores([...stores, response.data]);
        setStore({ name: '', address: '', phoneNumber: '' });
      })
      .catch(error => {
        console.error("매장 추가 에러:", error);
      });
  };

  // 매장 삭제
  const handleDeleteStore = (index) => {
    const storeId = stores[index]._id;

    // 매장 정보를 서버에서 삭제
    axios.delete(`/api/storeinfo/${storeId}`)
      .then(() => {
        // 매장 삭제 후 업데이트된 매장 목록을 불러옴
        fetchStores();
      })
      .catch(error => {
        console.error("매장 삭제 에러:", error);
      });
  };

  // 매장 목록 불러오기
  const fetchStores = () => {
    axios.get("/api/storeinfo")
      .then(response => {
        setStores(response.data);
      })
      .catch(error => {
        console.error("매장 목록 불러오기 에러:", error);
      });
  };

  return (
    <div>
      <Narvar></Narvar>
      <div className="Main" style={{ margin: 'auto', width: '700px' }}>
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
                  {s.name}{' '}
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