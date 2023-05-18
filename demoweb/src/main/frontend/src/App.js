// src/main/frontend/src/App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import MapPage from "./pages/MapPage/MapPage";
import FindPwdPage from "./pages/FindPwdPage/FindPwdPage";
import KakaoMapExample from "./pages/MapPage/KakaoMapExample";
import SeatPage from "./pages/SeatPage/SeatPage";
import SeatPage2 from "./pages/SeatPage/SeatPage2";
import CafeOwnerPage from "./pages/CafeOwnerPage/CafeOwnerPage";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/findPwd" element={<FindPwdPage />} />
          <Route path="/seat" element={<SeatPage />} />
          <Route path="/seat2" element={<SeatPage2 />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/test" element={<KakaoMapExample />} />
          <Route path="/Ownerpage" element={<CafeOwnerPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
