import React, { useEffect, useRef, useState } from "react";
import {
  Dropdown,
  DropdownButton,
  Overlay,
  Popover,
  Form,
  ListGroup,
  CloseButton,
} from "react-bootstrap";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Narvar from "../MapPage/Narvar";
import axios from "axios";

const SeatInfoURL = "http://localhost:8080/api/seatinfo";
const StoreInfoURL = "http://localhost:8080/api/storeinfo";
const SetPurchaseURL = "http://localhost:8080/api/setpurchase";
const GetMenusURL = "http://localhost:8080/api/menus";
const AddItemURL = "http://localhost:8080/api/additem";

function SeatManagementPage() {
  const ref = useRef(null);
  var test = "메가커피";
  const [using, setUsing] = useState(false);
  const [storeName, setStoreName] = useState("매장을 선택하세요."); // 어떤 매장인지에 따라
  const [existStore, setExistStore] = useState(false);
  const [userSession, setUserSession] = useState("");
  const [target, setTarget] = useState(null);
  const [show, setShow] = useState(false);
  const [buttonCount, setButtonCount] = useState(0);
  const [buttons, setButtons] = useState([]);
  const [available, setAvailable] = useState([]); // 사용중인지 아닌지
  const [dropdownItems, setDropdownItems] = useState([]); // 메뉴 list
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]); // 주문한 메뉴 list(장바구니)

  // user session 받아오는 부분
  // 저장했던 버튼의 위치정보 받아 다시 rendering
  const location = useLocation();
  const UserInfo = { ...location.state };
  useEffect(() => {
    setUserSession(UserInfo.userSession);
    confirmStore();
    //fetchData();
  }, [storeName]);

  // 매장 있는지 없는지 확인
  const confirmStore = () => {
    const data = {
      session: userSession,
    };

    axios
      .post(StoreInfoURL, JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(res);
        if (res.data != "doesn't exist.") {
          setExistStore(true);
          setStoreName(res.data.name);
          console.log(res.data.name);
          fetchData();
        }
      });
  };

  // 저장된 좌석 정보 받아오기
  const fetchData = () => {
    const data = {
      session: userSession,
      name: storeName,
    };
    axios
      .post(SeatInfoURL, JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        setButtons(res.data);
      });
  };

  //오른쪽 누르면 좌석 번호, 메뉴, ..등
  const handleRightClick = (event, buttonId, available) => {
    event.preventDefault();
    console.log(buttonId, available);
    fetchDropDownItems();
    show ? setShow(false) : setShow(true);
    setTarget(event.target);
  };

  // 드롭다운에서 store정보 받아오는 부분
  const StoreList = () => {
    const data = {
      session: userSession,
    };
    axios
      .post(StoreInfoURL, JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(res.data.name);
        setStoreName(res.data.name);
      });
  };

  // 드롭다운에서 store 이름 눌렀을 때 실행되는 함수.
  const storeSelect = (storeName) => {
    console.log("-------", storeName);
    setStoreName(storeName);
  };

  // 메뉴 리스트 보여주는 dropdown
  const fetchDropDownItems = () => {
    var itemList = [];
    const data = {
      session: userSession,
    };
    axios
      .post(GetMenusURL, JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        for (var i = 0; i < res.data.length; i++) {
          itemList[i] = res.data[i].name;
        }
        setDropdownItems(itemList);
        console.log(dropdownItems);
      });
  };

  // 메뉴 선택하면 List 보여줌
  const handleMenuSelect = (menu) => {
    setSelectedItems((prevItems) => [...prevItems, menu]);
    setSelectedMenu(menu);
  };

  // 이용 버튼 누르면
  const handlePurchaseButtonClick = () => {};

  // testAddItemAPI
  const addItem = () => {
    console.log("test");
    const data = {
      session: userSession,
      storename: storeName,
      itemname: "라떼",
      price: 4500,
      time: 70000,
    };
    axios
      .post(AddItemURL, JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(res);
      });
  };
  return (
    <div>
      <Narvar user={userSession}></Narvar>
      <div
        ref={ref}
        style={{
          width: "100%",
          height: "100vh",
        }}
      >
        <div
          style={{ margin: "20px", display: "flex", justifyContent: "center" }}
        >
          <DropdownButton
            id="dropdown-basic-button"
            title={storeName}
            onClick={StoreList}
          >
            <Dropdown.Item>{storeName}</Dropdown.Item>
          </DropdownButton>
        </div>
        {buttons &&
          buttons.map((button) => (
            <button
              key={button.seatnum}
              style={{
                border: "none",
                position: "absolute",
                left: button.x,
                top: button.y,
                width: "70px",
                height: "70px",
                backgroundColor: button.available ? "red" : "#F0F0F0",
              }}
              onContextMenu={(event) =>
                handleRightClick(event, button.seatnum, button.available)
              }
            >
              {button.seatnum}
            </button>
          ))}
        <Overlay
          show={show}
          target={target}
          placement="bottom"
          container={ref}
          containerPadding={20}
        >
          {using ? (
            <Popover id="popover-contained">
              <Popover.Header as="h3">사용중..</Popover.Header>
              <Popover.Body>
                <strong>Holy guacamole!</strong> Check this info.
              </Popover.Body>
            </Popover>
          ) : (
            <Popover id="popover-contained">
              <Popover.Header as="h3">
                <CloseButton
                  onClick={() => {
                    setShow(false);
                  }}
                />
                <span>&nbsp;&nbsp;&nbsp;</span>비어있는 좌석
                <span>&nbsp;&nbsp;&nbsp;</span>
                <button onClick={handlePurchaseButtonClick}>이용</button>
              </Popover.Header>
              <Popover.Body>
                <strong>메뉴를 추가해주세요</strong>
                <br />
                <Dropdown>
                  <Dropdown.Toggle
                    as={CustomToggle}
                    id="dropdown-custom-components"
                  >
                    메뉴 추가하기
                  </Dropdown.Toggle>
                  <Dropdown.Menu as={CustomMenu}>
                    {dropdownItems.map((menu, index) => (
                      <Dropdown.Item
                        key={index}
                        onClick={() => handleMenuSelect(menu)}
                      >
                        {menu}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                  <br />
                  <br />
                  <ListGroup>
                    <ListGroup.Item disabled>주문하신 메뉴</ListGroup.Item>
                    {selectedItems.map((item, index) => (
                      <ListGroup.Item key={index}>{item}</ListGroup.Item>
                    ))}
                  </ListGroup>
                </Dropdown>
              </Popover.Body>
            </Popover>
          )}
        </Overlay>
        <button>메뉴 추가</button>
      </div>
    </div>
  );
}

// react-bootstrap
// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    style={{
      textDecoration: "none",
    }}
    onClick={(e) => {
      e.preventDefault();
      console.log("test");
      onClick(e);
    }}
  >
    {children}
    &#x25bc;
  </a>
));

const CustomMenu = React.forwardRef(
  ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
    const [value, setValue] = useState("");

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <Form.Control
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="메뉴를 선택해주세요!"
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child) =>
              !value || child.props.children.toLowerCase().startsWith(value)
          )}
        </ul>
      </div>
    );
  }
);

export default SeatManagementPage;
