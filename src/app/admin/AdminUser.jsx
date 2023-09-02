import "./AdminUser.css";
import React from "react";
import Layout from "../../components/Layout";
import { ADMIN_LIST } from "../../lib/menuList";
import SearchCategory from "../../components/SearchCategory";
import ButtonSearch from "../../components/ButtonSearch";
import SearchEmploy from "../../components/SearchEmploy";
import SearchKeyword from "../../components/SearchKeyword";
import EditIcon from "../../assets/svg/edit-icon.svg";
import DeleteIcon from "../../assets/svg/delete-icon.svg";
import {
  Box,
  HStack,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import AdminUserDetail from "./AdminUserDetail";

export default function AdminUser() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleClick = () => {
    onOpen();
  };
  return (
    <Layout menu={ADMIN_LIST}>
      <Modal onClose={onClose} size="5xl" isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>사용자 관리</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AdminUserDetail />
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
      <div className="admin-user">
        {/* search */}
        <div className="admin-user-front">
          <div className="search-group">
            <SearchCategory />
            <SearchEmploy />
            <SearchKeyword text="이름/사용자" />
            <ButtonSearch text="검색" />
          </div>
          <div>
            <ButtonSearch text="+ 추가" />
          </div>
        </div>
        {/* 테이블 */}
        <table>
          <thead>
            <tr>
              <td>분류</td>
              <td>제목</td>
              <td>사용자 ID</td>
              <td>전화번호</td>
              <td>재직여부</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {Array(10)
              .fill("")
              .map((_, i) => (
                <tr key={i}>
                  <td>교사</td>
                  <td>홍길동</td>
                  <td>abcd@gmail.com</td>
                  <td>010-1234-5678</td>
                  <td>
                    <HStack
                      justifyContent="center"
                      color="white"
                      fontSize="sm"
                      spacing="4px"
                    >
                      <Box bg="#67B17B" px="2" py="0.5" rounded="md">
                        재직
                      </Box>
                      <Box bg="#CC4E4E" px="2" py="0.5" rounded="md">
                        퇴직
                      </Box>
                    </HStack>
                  </td>
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
