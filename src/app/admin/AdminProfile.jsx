import "./AdminProfile.css";
import Layout from "../../components/Layout";
import { ADMIN_LIST } from "../../lib/menuList";
import ProfileModified from "../../components/ProfileModified";

export default function AdminProfile() {
  return (
    <Layout menu={ADMIN_LIST}>
      <ProfileModified />
    </Layout>
  );
}
