import React from "react";
import Layout from "../../components/Layout";
import { ADMIN_LIST } from "../../lib/menuList";
import OrderItem from "../../components/OrderItem";

export default function AdminUser() {
  return (
    <Layout menu={ADMIN_LIST}>
      <div>
        <OrderItem />
      </div>
    </Layout>
  );
}
