import React from "react";
import Layout from "../../components/Layout";
import RegIcon2 from "../../assets/svg/security-register2.svg";
import RegIcon3 from "../../assets/svg/security-register3.svg";
import { TEACHER_LIST } from "../../lib/menuList";
import { Button } from "@chakra-ui/react";

export default function TeacherRegister() {
  return (
    <Layout menu={TEACHER_LIST}>
      <div className="security-register">
        <section>
          <div className="reg-title">
            <img src={RegIcon2} alt="icon2" />
            <h2>방문객 정보</h2>
          </div>
          <div className="input-group">
            <div>방문객명</div>
            <input type="text" placeholder="성함을 입력해 주세요." />
          </div>
          <div className="input-group">
            <div>휴대전화번호</div>
            <input type="text" placeholder="휴대전화번호를 입력해 주세요." />
          </div>
          <div className="input-group">
            <div>차량번호</div>
            <input type="text" placeholder="차량번호를 입력해 주세요." />
          </div>
        </section>
        <section>
          <div className="reg-title">
            <img src={RegIcon3} alt="icon3" />
            <h2>방문장소 정보</h2>
          </div>
          <div className="input-group">
            <div>방문자</div>
            <select>
              <option className="select-default" value="">
                방문자를 선택해 주세요.
              </option>
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <option key={i} value={i}>
                    선택옵션 {i}
                  </option>
                ))}
            </select>
          </div>
          <div className="input-group">
            <div>방문목적</div>
            <select placeholder="방문목적" className="select">
              <option className="select-default" value="">
                방문목적을 선택해 주세요.
              </option>
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <option key={i} value={i}>
                    선택옵션 {i}
                  </option>
                ))}
            </select>
          </div>
          <div className="input-group">
            <div>방문일시</div>
            <input type="text" placeholder="차량번호를 입력해 주세요." />
          </div>
        </section>
        <div className="btn-container">
          <Button colorScheme="blue">등록하기</Button>
        </div>
      </div>
    </Layout>
  );
}
