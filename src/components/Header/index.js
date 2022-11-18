import React, {  useState } from "react";
import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";
import { Col, Dropdown, Input, Menu, Row } from "antd";
import logo from "../../assets/image/logo.png";
import "./index.css";
import {
  UserOutlined,
  ShoppingCartOutlined,
  WalletFilled,
  MessageOutlined,
  PlusCircleFilled,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import ModalAdd from "../ModalAdd";

const Header = () => {
  const location = useLocation();
  const connectWithMetamask = useMetamask();
  const address = useAddress();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false)

  const shortAddress = () => {
    if (address) {
      return (
        address.slice(0, 4) +
        "..." +
        address.slice(address.length - 4, address.length)
      );
    } else {
      return "";
    }
  };

  const menu = (
    <Menu
      className="custom-menu-header"
      items={[
        {
          key: "1",
          onClick: () => {
            navigate("/profile/" + address);
          },
          label: shortAddress(),
          icon: <WalletFilled />,
        },
        {
          key: "2",
          onClick: () => {
            navigate("/chat");
          },
          label: "Chat",
          icon: <MessageOutlined />,
        },
        {
          key: "3",
          onClick: () => {
            setShowModal(true)
          },
          label: "Add a product",
          icon: <PlusCircleFilled />,
        },
        {
          key: "4",
          onClick: () => {
            navigate("/transactions");
          },
          label: "Transactions",
          icon: <ShoppingCartOutlined />,
        },
        {
          key: "5",
          onClick: useDisconnect(),
          label: "Exit",
        },
      ]}
    />
  );

  const search = (value) => {
    if(value)
    navigate("/search/" + value);
  };


  return (
    <Row
      className="header-container"
      style={{
        position:
          (location.pathname.includes("/profile") || location.pathname === "/")
            ? "fixed"
            : "unset",
      }}
      id='header'
      gutter={[0, 24]}
    >
      <ModalAdd showModal={showModal} setShowModal={setShowModal} />
      <Col className="logo-container" span={24} md={6} lg={4}>
        <img
          alt="logo"
          src={logo}
          onClick={() => {
            navigate("/");
          }}
        />
      </Col>
      <Col className="center-vertically"  span={20} md={16}>
        <Input.Search
          className="search-bar"
          placeholder="Search..."
          onSearch={search}
        />
      </Col>
      <Col className="center-vertically" span={4} md={2} lg={4}>
        <div className="metamask-container">
          {address ? (
            <Row>
              <Col className="center-vertically icon-header" span={24}>
                <Dropdown overlay={menu} placement={"bottomRight"}>
                  <UserOutlined />
                </Dropdown>
              </Col>
            </Row>
          ) : (
            <button className="metamask-button" onClick={connectWithMetamask}>
              <Row>
                <Col className="center-vertically" span={8}>
                  <img
                    src="https://cdn.iconscout.com/icon/free/png-256/metamask-2728406-2261817.png"
                    alt="metamask-logo"
                  />
                </Col>
                <Col className="center-vertically" span={16}>
                  Login with Metamask
                </Col>
              </Row>
            </button>
          )}
        </div>
      </Col>
    </Row>
  );
};

export default Header;
