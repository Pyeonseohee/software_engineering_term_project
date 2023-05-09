// src/main/frontend/src/App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import MapPage from "./pages/MapPage/MapPage";
import FindPwdPage from "./pages/FindPwdPage/FindPwdPage";
import KakaoMapExample from "./pages/MapPage/KakaoMapExample";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<MapPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/findPwd" element={<FindPwdPage />} />
          <Route path="/test" element={<KakaoMapExample />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
