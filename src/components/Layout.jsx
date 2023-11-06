import React from "react";
import "./Layout.css";
import { Avatar } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import useTokenLogin from "../hooks/useTokenLogin";

export default function Layout({ children, menu }) {
  const { data } = useTokenLogin();

  const { pathname } = useLocation();
  const temp_data = menu.find((item) => item.url === pathname);
  const MAIN_TITLE = temp_data.title;
  const SUB_TITLE = temp_data.subTitle;

  return (
    <div className="container">
      {/* grid 1 */}
      <div className="menu-left">
        <div className="menu-container">
          {/* profile */}
          <div className="menu-profile">
            <Avatar name={data?.userName} />
            <p>{data?.userName}</p>
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
