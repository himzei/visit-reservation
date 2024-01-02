import Layout from "../../components/Layout";
import { TEACHER_LIST } from "../../lib/menuList";
import DirectRegister from "../../components/DirectRegister";
import React, { useState, useEffect } from "react";


export default function TeacherRegister() {
  const [initialLogin, setInitialLogin] = useState(localStorage.getItem("initialLogin"));

  // 로컬 스토리지에서 initialLogin 값이 변경되었을 때 감지
  useEffect(() => {
    const loginStatus = localStorage.getItem("initialLogin");
    setInitialLogin(loginStatus);
  }, []);

  return (
    <Layout menu={TEACHER_LIST}>
      {initialLogin !== "4" ? (
        <DirectRegister />
      ) : null}
    </Layout>
  );
}
