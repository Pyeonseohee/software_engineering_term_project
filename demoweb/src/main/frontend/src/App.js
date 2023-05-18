// src/main/frontend/src/App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// login 전 register, login, findPwd
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import FindPwdPage from "./pages/FindPwdPage/FindPwdPage";

// login후 userPage
import CafeOwnerPage from "./pages/CafeOwnerPage/CafeOwnerPage";
import SeatPage from "./pages/SeatPage/SeatPage";
import SeatPage2 from "./pages/SeatPage/SeatPage2";

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
          <Route path="/Ownerpage" element={<CafeOwnerPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
