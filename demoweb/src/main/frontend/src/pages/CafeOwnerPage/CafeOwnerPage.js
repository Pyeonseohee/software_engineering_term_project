import React, { useState } from 'react';

function CafeOwnerPage() {
  // 매장 정보 상태 관리
  const [store, setStore] = useState({
    name: '',
    address: '',
    phoneNumber: ''
  });
  const [stores, setStores] = useState([]);
  const [showStoreName, setShowStoreName] = useState(false);

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
    //매장 정보를 서버에 저장하는 로직을 구현해야함.
    setStores([...stores, store]);
    setStore({ name: '', address: '', phoneNumber: '' });
    setShowStoreName(false);
  };

  // 매장 삭제
  const handleDeleteStore = (index) => {
    const newStores = [...stores];
    newStores.splice(index, 1);
    setStores(newStores);
  };


  return (
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
  );
}

export default CafeOwnerPage;