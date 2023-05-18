import React, { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";
import Narvar from "../MapPage/Narvar";

var userSession = "";

function CafeOwnerPage() {
  const location = useLocation();
  const UserInfo = { ...location.state };
  userSession = UserInfo.userSession;
  console.log(userSession);
  const [stores, setStores] = useState([]);
  const [newStoreName, setNewStoreName] = useState("");

  const handleStoreNameChange = (e) => {
    setNewStoreName(e.target.value);
  };

  const handleAddStore = () => {
    if (newStoreName.trim() === "") {
      return; // 이름이 비어있으면 추가하지 않음
    }

    const newStore = {
      id: Date.now(),
      name: newStoreName.trim(),
    };

    setStores([...stores, newStore]);
    setNewStoreName("");
  };

  const handleRemoveStore = (id) => {
    const updatedStores = stores.filter((store) => store.id !== id);
    setStores(updatedStores);
  };

  return (
    <>
      <Narvar user={userSession}></Narvar>
      <div className="Main" style={{ margin: "auto", width: "700px" }}>
        <div className="d-grid gap-2">
          <input
            type="text"
            value={newStoreName}
            onChange={handleStoreNameChange}
            placeholder="매장 이름 입력"
          />
          <button onClick={handleAddStore}>매장 추가</button>

          <ul>
            {stores.map((store) => (
              <li key={store.id}>
                {store.name}
                <button onClick={() => handleRemoveStore(store.id)}>
                  삭제
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default CafeOwnerPage;
