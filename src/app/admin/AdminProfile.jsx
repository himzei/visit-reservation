import React from "react";
import Layout from "../../components/Layout";
import { ADMIN_LIST } from "../../lib/menuList";

export default function AdminProfile() {
  return (
    <Layout menu={ADMIN_LIST}>
      <div>AdminConfirm</div>
    </Layout>
  );
}
