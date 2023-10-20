import "./TeacherProfile.css";
import React from "react";
import Layout from "../../components/Layout";
import { TEACHER_LIST } from "../../lib/menuList";
import ProfileModified from "../../components/ProfileModified";

export default function TeacherProfile() {
  return (
    <Layout menu={TEACHER_LIST}>
      <ProfileModified />
    </Layout>
  );
}
