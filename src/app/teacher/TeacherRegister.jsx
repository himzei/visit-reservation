import React from "react";
import Layout from "../../components/Layout";
import { TEACHER_LIST } from "../../lib/menuList";
import DirectRegister from "../../components/DirectRegister";

export default function TeacherRegister() {
  return (
    <Layout menu={TEACHER_LIST}>
      <DirectRegister />
    </Layout>
  );
}
