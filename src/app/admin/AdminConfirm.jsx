import "./AdminConfirm.css";
import React from "react";
import { ADMIN_LIST } from "../../lib/menuList";
import Layout from "../../components/Layout";
import {
  Box,
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
import SearchLocation from "../../components/SearchLocation";
import SearchDate from "../../components/SearchDate";
import SearchStatus from "../../components/SearchStatus";
import SearchKeyword from "../../components/SearchKeyword";
import ButtonSearch from "../../components/ButtonSearch";
import AdminConfirmDetail from "./AdminConfirmDetail";

export default function AdminConfirm() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleClick = () => {
    onOpen();
  };
  return (
    <Layout menu={ADMIN_LIST}>
      <Modal onClose={onClose} size="5xl" isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>방문예약확인</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AdminConfirmDetail />
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
      <div className="admin-confirm">
        {/* search */}
        <div className="search-group">
          <SearchLocation />
          <SearchDate />
          <SearchStatus />
          <SearchKeyword />
          <ButtonSearch text="검색" />
        </div>
        {/* 테이블 */}
        <table>
          <thead>
            <tr>
              <td>선택</td>
              <td>방문지</td>
              <td>방문객명</td>
              <td>차량번호</td>
              <td>방문예정일시</td>
              <td>목적</td>
              <td>예약일시</td>
              <td>담당자</td>
              <td>반려사유</td>
              <td>상태</td>
            </tr>
          </thead>
          <tbody>
            {Array(10)
              .fill("")
              .map((_, i) => (
                <tr
                  onClick={() => handleClick()}
                  key={i}
                  className="table-hover"
                >
                  <td>
                    <Checkbox position="absolute" top="42%" />
                  </td>

                  <td>행정실</td>
                  <td>홍길동</td>
                  <td>42누 1234</td>
                  <td>2023-10-16 16:30</td>
                  <td>진학상담</td>
                  <td>2023-10-14 16:00</td>
                  <td>담당자</td>
                  <td>학교 행사 일정으로 상담불가</td>
                  <td>
                    <div className="approval-status">
                      <Box
                        my="0.5"
                        fontSize="14px"
                        p="0.5"
                        rounded="md"
                        bg="#0066FF"
                        color="white"
                      >
                        대기
                      </Box>
                      <Box
                        my="0.5"
                        fontSize="14px"
                        p="0.5"
                        rounded="md"
                        bg="#67B17B"
                        color="white"
                      >
                        승인
                      </Box>
                      <Box
                        my="0.5"
                        fontSize="14px"
                        p="0.5"
                        rounded="md"
                        bg="#CC4E4E"
                        color="white"
                      >
                        반려
                      </Box>
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
