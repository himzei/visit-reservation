import "./AdminMainPage.css";
import React, { useRef, useState } from "react";
import Layout from "../../components/Layout";
import { ADMIN_LIST } from "../../lib/menuList";
import PhotoIcon from "../../assets/svg/photo-icon.svg";
import { Button } from "@chakra-ui/button";
import OrderItem from "../../components/OrderItem";
import DefaultLogo from "../../assets/png/__high-logo.png";

const LOCATION_GRADE = ["1학년", "2학년", "3학년", "교무실", "급식실"];
const LOCATION_CLASS = ["1반", "2반", "3반", "4반"];
const PURPOSE_VISIT = ["상담", "강의", "배달", "회의"];

export default function AdminMainPage() {
  const [imgFile, setImgFile] = useState("");
  const [imgPath, setImgPath] = useState("");
  const handleButtonClick = (e) => {
    fileInput.current.click();
  };
  const fileInput = useRef(null);

  const saveImgFile = () => {
    const file = fileInput.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
    setImgPath(file.name);
  };
  return (
    <Layout menu={ADMIN_LIST}>
      <div className="admin-main">
        <section>
          <div className="reg-title">
            <img src={PhotoIcon} alt="icon2" />
            <h2>대표 이미지</h2>
          </div>
          <div className="files-group">
            <div className="border-box">{imgPath}</div>
            <Button
              height="35px"
              color="white"
              bg="#0066FF"
              _hover={{ bg: "#0053CF" }}
              onClick={handleButtonClick}
              mr="1"
            >
              찾기
            </Button>
            <Button
              height="35px"
              color="white"
              bg="#D44242"
              _hover={{ bg: "#B23232" }}
              onClick={handleButtonClick}
              mr="1"
            >
              삭제
            </Button>

            <input
              accept="image/*"
              ref={fileInput}
              type="file"
              style={{ display: "none" }}
              onChange={saveImgFile}
            />
          </div>
          <div className="image-group">
            <p>미리보기</p>
            <div className="pre-image">
              <img src={imgFile ? imgFile : DefaultLogo} alt="학교배너이미지" />
            </div>
          </div>
        </section>
        <div className="horizon-divide">
          {/* 2fr */}
          <div>
            <div className="reg-title">
              <img src={PhotoIcon} alt="icon2" />
              <h2>방문지 설정</h2>
            </div>
            <div className="location-group">
              {/* 방문지 학년 */}
              <div className="location-first">
                <div className="">
                  <div>방문지</div>
                  <div className="add-btn">+ 추가</div>
                </div>
                <div>
                  <OrderItem lists={LOCATION_GRADE} />
                </div>
              </div>
              {/* 상세방문지 반 */}
              <div className="location-second">
                <div className="">
                  <div>방문지</div>
                  <div className="add-btn">+ 추가</div>
                </div>
                <div>
                  <OrderItem lists={LOCATION_CLASS} />
                </div>
              </div>
            </div>
          </div>
          {/* 1fr */}
          <div>
            <div className="reg-title">
              <img src={PhotoIcon} alt="icon2" />
              <h2>방문지 설정</h2>
            </div>
            <div className="purpose-group">
              <div className="purpose-visit">
                <div className="">
                  <div>방문지</div>
                  <div className="add-btn">+ 추가</div>
                </div>
                <div>
                  <OrderItem lists={PURPOSE_VISIT} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="btn-container">
          <Button
            w="120px"
            mx="1"
            bg="#A8A8A8"
            color="white"
            _hover={{ bg: "#737373" }}
          >
            되돌리기
          </Button>
          <Button
            w="120px"
            mx="1"
            bg="#0066FF"
            color="white"
            _hover={{ bg: "#0040A1" }}
          >
            저장
          </Button>
        </div>
      </div>
    </Layout>
  );
}
