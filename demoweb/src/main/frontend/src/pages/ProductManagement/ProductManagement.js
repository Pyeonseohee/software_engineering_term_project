import React, { useState } from "react";

function ProductManagement() {
  // 메뉴 정보 상태 관리
  const [menu, setMenu] = useState({
    name: "",
    cost: "",
  });
  const [menus, setMenus] = useState([]);

  // 메뉴 정보 변경
  const handleChange = (event) => {
    const { name, value } = event.target;
    setMenu({ ...menu, [name]: value });
  };

  // 메뉴 추가
  const handleAddMenu = () => {
    if (menu.name.trim() === "" || menu.cost.trim() === "") {
      return; // 필수 필드가 비어있으면 메뉴 추가하지 않음
    }
    setMenus([...menus, menu]);
    setMenu({ name: "", cost: "" });
  };

  // 메뉴 삭제
  const handleDeleteMenu = (index) => {
    const newMenus = [...menus];
    newMenus.splice(index, 1);
    setMenus(newMenus);
  };

  return (
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
              <li key={index}>
                {m.name}{" "}
                <button onClick={() => handleDeleteMenu(index)}>삭제</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProductManagement;