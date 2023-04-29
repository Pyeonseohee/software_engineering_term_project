// src/main/frontend/src/App.js

import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import RegisterPage from "pages/RegisterPage/RegisterPage";

function App() {
  // const [hello, setHello] = useState("");

  // useEffect(() => {
  //   axios
  //     .get("/api/hello")
  //     .then((response) => setHello(response.data))
  //     .catch((error) => console.log(error));
  // }, []);

  // return <div>백엔드에서 가져온 데이터입니다 : {hello}</div>;
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route exact path="/register" component={RegisterPage} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
