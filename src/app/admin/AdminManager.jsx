import "./AdminManager.css";
import React from "react";
import Layout from "../../components/Layout";
import { ADMIN_LIST } from "../../lib/menuList";
import SearchLocation from "../../components/SearchLocation";
import SearchDate from "../../components/SearchDate";
import SearchStatus from "../../components/SearchStatus";
import SearchKeyword from "../../components/SearchKeyword";
import EditIcon from "../../assets/svg/edit-icon.svg";
import DeleteIcon from "../../assets/svg/delete-icon.svg";
import AllPass from "../../components/AllPass";
import ButtonSearch from "../../components/ButtonSearch";
import {
  Button,
  Checkbox,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import AdminManagerDetail from "./AdminManagerDetail";

export default function AdminManager() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleClick = () => {
    onOpen();
  };
  return (
    <Layout menu={ADMIN_LIST}>
      <Modal onClose={onClose} size="5xl" isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>상시방문자 관리(수정)</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AdminManagerDetail />
          </ModalBody>
          <ModalFooter>
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
          </ModalFooter>
        </ModalContent>
      </Modal>
      <div className="admin-manager">
        {/* search */}
        <div className="search-group">
          <SearchLocation />
          <SearchDate />
          <SearchStatus />
          <SearchKeyword />
          <ButtonSearch text="검색" />
        </div>
        {/* 일괄발송 */}
        <div className="rigth-btn">
          <AllPass title="일괄발송" />
          <ButtonSearch text="추가" />
        </div>
        {/* 테이블 */}
        <table>
          <thead>
            <tr>
              <td>선택</td>
              <td>방문객명</td>
              <td>차량번호</td>
              <td>방문지</td>
              <td>목적</td>
              <td>담당자</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {Array(10)
              .fill("")
              .map((_, i) => (
                <tr key={i}>
                  <td>
                    <Checkbox position="absolute" top="42%" />
                  </td>
                  <td>홍길동</td>
                  <td>42누 1234</td>
                  <td>행정실</td>
                  <td>진학상담</td>
                  <td>담당자</td>
                  <td>
                    <div className="edit-delete">
                      <div onClick={() => handleClick()}>
                        <img src={EditIcon} alt="edit-icon" />
                      </div>
                      <div>
                        <img src={DeleteIcon} alt="delete-icon" />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
