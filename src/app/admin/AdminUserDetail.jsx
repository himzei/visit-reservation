import React from "react";
import RegIcon1 from "../../assets/svg/person-input.svg";
import RegIcon2 from "../../assets/svg/location-icon.svg";
import { Button } from "@chakra-ui/react";

export default function AdminUserDetail() {
  return (
    <div className="admin-user-detail">
      <section>
        <div className="reg-title">
          <img src={RegIcon1} alt="icon1" />
          <h2>사용자 정보</h2>
        </div>
        <div className="input-group">
          <div>사용자명</div>
          <input type="text" />
        </div>
        <div className="input-group">
          <div>휴대전화번호</div>
          <input type="text" />
        </div>
        <div className="input-group">
          <div>이메일</div>
          <input type="text" />
        </div>
        <div className="input-group">
          <div>재직여부</div>
          <select>
            <option className="select-default" value="">
              재직
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
          <div>분류</div>
          <select>
            <option className="select-default" value="">
              교사
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
      </section>
      <section>
        <div className="reg-title">
          <img src={RegIcon2} alt="icon2" />
          <h2>비밀번호 초기화</h2>
        </div>
        <div>
          <Button
            height="35px"
            color="white"
            bg="#0066FF"
            _hover={{ bg: "#0053CF" }}
            mx="2"
          >
            초기화 하기
          </Button>
        </div>
      </section>
    </div>
  );
}
