import "./AdminMainPage.css";
import React, { useRef, useState } from "react";
import Layout from "../../components/Layout";
import { ADMIN_LIST } from "../../lib/menuList";
import PhotoIcon from "../../assets/svg/photo-icon.svg";

import OrderItem from "../../components/OrderItem";
import DefaultLogo from "../../assets/png/__high-logo.png";
import AddVisitSite from "../../components/AddVisitSite";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { apiGetPurposeOfVisit, apiGetVisitSite } from "../../api";
import useVisitSite from "../../hooks/useVisitSite";
import { VisitSiteContext } from "../../context/VisitSiteContext";
import OrderItemOne from "../../components/OrderItemOne";

const LOCATION_CLASS = [{ title: "1" }, { title: "2" }, { title: "3" }];

export default function AdminMainPage() {
  const { data: visitSite } = useVisitSite();
  const visitSiteIndex = visitSite?.visitSite?.visitSiteIndex;

  // 방문지설정
  const { isLoading: isLoadingVisitSite, data: dataVisitSite } = useQuery(
    ["getVisitSite", visitSiteIndex],
    apiGetVisitSite
  );
  const locationGrade = dataVisitSite?.placeToVisits;

  // 방문목적 설정
  const { isLoading: isLoadingPupposeOfVisit, data: dataPurposeOfVisit } =
    useQuery(["getPurposeOfVisit", visitSiteIndex], apiGetPurposeOfVisit);
  const purposeOfVisit = dataPurposeOfVisit?.purposeOfVisits;

  const lengthPurposeOfVisit = purposeOfVisit?.length;

  const { isOpen, onOpen, onClose } = useDisclosure();
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
  // context
  const handleAddModal = () => {
    onOpen();
  };
  const [placeVisitIndex, setPlaceVisitIndex] = useState(-1);
  return (
    <VisitSiteContext.Provider
      value={{
        handleAddModal,
        placeVisitIndex,
        setPlaceVisitIndex,
        // PurposeOfVisit
        lengthPurposeOfVisit,
        purposeOfVisit,
      }}
    >
      <Modal onClose={onClose} size="xl" isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>방문지 추가</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddVisitSite />
          </ModalBody>
          {/* <ModalFooter>
            <Button width="100px" onClick={onClose}>
              닫기
            </Button>
            <Button
              width="100px"
              height="35px"
              color="white"
              bg="#0066FF"
              _hover={{ bg: "#0053CF" }}
              mx="2"
            >
              저장
            </Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
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
                <img
                  src={imgFile ? imgFile : DefaultLogo}
                  alt="학교배너이미지"
                />
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

                {!isLoadingVisitSite && (
                  <OrderItem lists={locationGrade} title="학급" />
                )}

                {/* 상세방문지 반 */}

                <OrderItem lists={LOCATION_CLASS} title="학급" />
              </div>
            </div>
            {/* 1fr */}
            <div>
              <div className="reg-title">
                <img src={PhotoIcon} alt="icon2" />
                <h2>방문목적</h2>
              </div>
              <div className="purpose-group">
                {!isLoadingPupposeOfVisit && (
                  <OrderItemOne lists={purposeOfVisit} title="방문목적" />
                )}
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
    </VisitSiteContext.Provider>
  );
}
