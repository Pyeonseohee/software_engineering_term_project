import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";
import Narvar from "../MapPage/Narvar";

function CafeOwnerPage() {
  const location = useLocation();
  const UserSession = { ...location.state };
  console.log(UserSession);
  return (
    <>
      <Narvar></Narvar>
      <div className="Main" style={{ margin: "auto", width: "700px" }}>
        <div className="d-grid gap-2">
          <Button variant="secondary" size="lg">
            내 매장 추가하기
          </Button>
        </div>
      </div>
    </>
  );
}

export default CafeOwnerPage;
