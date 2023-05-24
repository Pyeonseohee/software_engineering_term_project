import React, { useState, useEffect } from 'react';
import axios from "axios";
import Narvar from "../MapPage/Narvar";

//const menusURL = "http://localhost:8080/api/menus";

function ProductManagement() {
  // 메뉴 정보 상태 관리
  const [menu, setMenu] = useState({
    name: "",
    cost: "",
  });
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    // 초기 메뉴 데이터 불러오기
    fetchMenus();
  }, []);

  // 메뉴 정보 변경
  const handleChange = (event) => {
    const { name, value } = event.target;
    setMenu({ ...menu, [name]: value });
  };

  // 메뉴 추가 및 저장
  const handleAddMenu = () => {
    if (menu.name.trim() === "" || menu.cost.trim() === "") {
      return; // 필수 필드가 비어있으면 메뉴 추가하지 않음
    }

    // 메뉴 정보를 서버로 전송
    axios.post("/api/menus", menu)
      .then(response => {
        // 새로운 메뉴로 menus 상태 업데이트
        setMenus([...menus, response.data]);
        setMenu({ name: "", cost: "" });
      })
      .catch(error => {
        console.error("메뉴 추가 에러:", error);
      });
  };

  // 메뉴 삭제
  const handleDeleteMenu = (index) => {
    const menuId = menus[index]._id;

    // 메뉴 정보를 서버에서 삭제
    axios.delete(`/api/menus/${menuId}`)
      .then(() => {
        // 메뉴 삭제 후 업데이트된 메뉴 목록을 불러옴
        fetchMenus();
      })
      .catch(error => {
        console.error("메뉴 삭제 에러:", error);
      });
  };

  // 메뉴 목록 불러오기
  const fetchMenus = () => {
    axios.get("/api/menus")
      .then(response => {
        setMenus(response.data);
      })
      .catch(error => {
        console.error("메뉴 목록 불러오기 에러:", error);
      });
  };

  return (
    <div>
      <Narvar></Narvar>
      <div className="Main" style={{ margin: "auto", width: "700px" }}>
        <div className="d-grid gap-2">
          <div>
            <h1>메뉴 관리</h1>
            <form>
              <label>
                메뉴 이름:
                <input
                  type="text"
                  name="name"
                  value={menu.name}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                메뉴 가격:
                <input
                  type="text"
                  name="cost"
                  value={menu.cost}
                  onChange={handleChange}
                />
              </label>
            </form>
            <button onClick={handleAddMenu}>메뉴 추가</button>
            <ul>
              {menus.map((m, index) => (
                <li key={m._id}>
                  {m.name} {m.cost}{" "}
                  <button onClick={() => handleDeleteMenu(index)}>삭제</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductManagement;