import React, { useEffect, useRef, useState } from "react";
import {Button} from "react-bootstrap";
import axios from "axios";
import Narvar from "../MapPage/Narvar";

function CafeOwnerPage(){
    return(
        <>
        <Narvar></Narvar>
        <div className="Main" style={{margin: "auto", width:"700px"}}>
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

