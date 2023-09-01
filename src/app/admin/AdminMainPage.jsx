import "./AdminMainPage.css";
import React, { useRef } from "react";
import Layout from "../../components/Layout";
import { ADMIN_LIST } from "../../lib/menuList";
import PhotoIcon from "../../assets/svg/photo-icon.svg";
import LocationIcon from "../../assets/svg/location-icon.svg";
import { Button } from "@chakra-ui/button";
import SearchIcon from "../../assets/svg/search-icon.svg";
import DeleteIcon from "../../assets/svg/delete-icon.svg";
import ButtonBlue from "../../components/ButtonBlue";
import ButtonRed from "../../components/ButtonRed";

export default function AdminMainPage() {
  const handleButtonClick = (e) => {
    fileInput.current.click();
  };
  const fileInput = useRef(null);
  return (
    <Layout menu={ADMIN_LIST}>
      <div className="admin-main">
        <section>
          <div className="reg-title">
            <img src={PhotoIcon} alt="icon2" />
            <h2>대표 이미지</h2>
          </div>
          <div className="file-group">
            <div className="border-box" />
            <button className="file-btn" onClick={handleButtonClick}>
              찾기
            </button>
            <input ref={fileInput} type="file" style={{ display: "none" }} />
            <ButtonRed text="삭제" LeftIcon={DeleteIcon} />
          </div>
          <div className="image-group">
            <p>미리보기</p>
            <div className="pre-image"></div>
          </div>
        </section>
        <div className="horizon-divide">
          <div>
            <div className="reg-title">
              <img src={PhotoIcon} alt="icon2" />
              <h2>방문지 설정</h2>
            </div>
            <div className="location-group">
              {/* 방문지 학년 */}
              <div className="location-first"></div>
              {/* 상세방문지 반 */}
              <div className="location-second"></div>
            </div>
          </div>
          <div></div>
        </div>

        <div className="btn-container">
          <Button colorScheme="blue">등록하기</Button>
        </div>
      </div>
    </Layout>
  );
}
