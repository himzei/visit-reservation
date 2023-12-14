import Layout from "../../components/Layout";
import ProfileModified from "../../components/ProfileModified";
import { SECURITY_LIST } from "../../lib/menuList";

export default function SecurityProfile() {
  return (
    <Layout menu={SECURITY_LIST} title="비밀번호 변경">
      <ProfileModified />
    </Layout>
  );
}
