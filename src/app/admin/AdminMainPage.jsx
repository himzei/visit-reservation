import "./AdminMainPage.css";
import React from "react";
import Layout from "../../components/Layout";
import { ADMIN_LIST } from "../../lib/menuList";

export default function AdminMainPage() {
  // 방문지설정

  return (
    <Layout menu={ADMIN_LIST}>
      <div className="admin-main"></div>
    </Layout>
  );
}
