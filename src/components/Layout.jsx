import React from "react";
import "./Layout.css";
import { Avatar, Button } from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useTokenLogin from "../hooks/useTokenLogin";
import { IoIosSettings } from "react-icons/io";

export default function Layout({ children, menu }) {
  const { data } = useTokenLogin();

  const { pathname } = useLocation();
  const temp_data = menu.find((item) => item.url === pathname);
  const MAIN_TITLE = temp_data?.title || "설정";
  const SUB_TITLE = temp_data?.subTitle;

  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      localStorage.setItem("visitschool", "");
      navigate("/");
      window.location.reload();
    }
  };

  return (
    <div className="container">
      {/* grid 1 */}
      <div className="menu-left">
        <div className="menu-container">
          {/* profile */}
          <div className="menu-profile">
            <div className="avatar-group">
              <Avatar name={data?.userName} />
              <div className="icon-setting">
                {data?.auth === 0 ? (
                  <Link to="/admin/profile">
                    <IoIosSettings size="20px" />
                  </Link>
                ) : data?.auth === 1 ? (
                  <Link to="/teacher/profile">
                    <IoIosSettings size="20px" />
                  </Link>
                ) : (
                  <Link to="/security/profile">
                    <IoIosSettings size="20px" />
                  </Link>
                )}
              </div>
            </div>
            <p>{data?.userName}</p>
            <Button onClick={handleLogout} size="sm">
              로그아웃
            </Button>
          </div>
          {/* menu */}
          <div className="menu-list">
            {menu.map((item, i) => (
              <Link to={item.url} key={i}>
                {item.url === pathname ? (
                  <div className="menu-list__item_active">{item.title}</div>
                ) : (
                  <div className="menu-list__item">{item.title}</div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
      {/* grid 2 */}
      <div className="container-main">
        <div className="main-header">
          <h2>{MAIN_TITLE}</h2>
          <p>{SUB_TITLE}</p>
        </div>
        <div className="main-body">{children}</div>
      </div>
    </div>
  );
}
