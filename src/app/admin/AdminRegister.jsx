// 관리자
// 방문 직접 등록
// 글쓰기

import "./AdminRegister.css";
import React from "react";
import Layout from "../../components/Layout";
import { ADMIN_LIST } from "../../lib/menuList";

import DirectRegister from "../../components/DirectRegister";

export default function AdminRegister() {
  return (
    <Layout menu={ADMIN_LIST}>
      <DirectRegister />
    </Layout>
  );
}
