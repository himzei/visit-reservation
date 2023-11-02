//
// 사용자 관리 페이지
//

import "./AdminUser.css";
import React, { useState } from "react";
import Layout from "../../components/Layout";
import { ADMIN_LIST } from "../../lib/menuList";
import ButtonSearch from "../../components/ButtonSearch";
import EditIcon from "../../assets/svg/edit-icon.svg";
import DeleteIcon from "../../assets/svg/delete-icon.svg";
import {
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { useQuery, useQueryClient } from "react-query";
import AdminUserWrite from "./AdminUserWrite";
import useVisitSite from "../../hooks/useVisitSite";
import { apiDeleteManager, apiGetManager } from "../../api";
import AdminUserDetail from "./AdminUserDetail";
import Pagination from "react-js-pagination";

export default function AdminUser() {
  const queryClient = useQueryClient();
  const [selectEdit, setSelectEdit] = useState(null);

  // VISITSITEINDEX
  const { data: visitSite } = useVisitSite();
  const [page, setPage] = useState(1);

  const visitSiteIndex = visitSite?.visitSite?.visitSiteIndex;
  const { data, isLoading } = useQuery(
    ["getManager", { visitSiteIndex, page: page, pageRange: 10 }],
    apiGetManager
  );

  const totalItemsCount = data?.totalCnt;
  const handlePageChange = (page) => {
    setPage(page);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();

  const handleClick = () => {
    onOpen();
  };

  const handleEditClick = (index) => {
    onOpenEdit();
    const editData = data?.accounts?.find(
      (item) => item?.accountIndex === index
    );
    setSelectEdit(editData);
  };

  const handDeleteClick = async (index) => {
    const check = window.confirm("삭제하시겠습니까?");
    if (check) {
      await apiDeleteManager(index);
    }
    queryClient.invalidateQueries("getManager");
  };

  return (
    <Layout menu={ADMIN_LIST}>
      {/* 글쓰기 */}
      <Modal onClose={onClose} size="5xl" isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>사용자 등록하기</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AdminUserWrite onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* 수정하기 */}
      <Modal onClose={onCloseEdit} size="5xl" isOpen={isOpenEdit}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>사용자 수정하기</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AdminUserDetail selectEdit={selectEdit} onClose={onCloseEdit} />
          </ModalBody>
        </ModalContent>
      </Modal>
      {isLoading ? (
        <HStack justifyContent="center" py="10">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </HStack>
      ) : (
        <div className="admin-user">
          {/* search */}
          <div className="admin-user-front">
            <div className="search-group">
              {/* <SearchCategory />
              <SearchEmploy />
              <SearchKeyword text="이름/사용자" />
              <ButtonSearch text="검색" /> */}
            </div>

            <div onClick={() => handleClick()}>
              <ButtonSearch text="+ 추가" />
            </div>
          </div>
          {/* 테이블 */}
          <table>
            <thead>
              <tr>
                <td>분류</td>
                <td>이름</td>
                <td>사용자 ID</td>
                <td>전화번호</td>
                <td>직책</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {data?.accounts?.map((item, i) => (
                <tr key={i}>
                  <td>
                    {(() => {
                      switch (item.auth) {
                        case 0:
                          return <div>관리자</div>;
                        case 1:
                          return <div>담당자</div>;
                        case 2:
                          return <div>입구관리자</div>;
                        case 999:
                          return <div>총 관리자</div>;
                        default:
                          return;
                      }
                    })()}
                  </td>
                  <td>{item.name}</td>
                  <td>{item.userId}</td>
                  <td>{item.tel}</td>
                  <td>{item.position}</td>
                  <td>
                    <div className="edit-delete">
                      <div onClick={() => handleEditClick(item.accountIndex)}>
                        <img src={EditIcon} alt="edit-icon" />
                      </div>
                      <div onClick={() => handDeleteClick(item.accountIndex)}>
                        <img src={DeleteIcon} alt="delete-icon" />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <Pagination
              activePage={page}
              itemsCountPerPage={10}
              totalItemsCount={totalItemsCount}
              pageRangeDisplayed={5}
              prevPageText={"‹"}
              nextPageText={"›"}
              onChange={handlePageChange}
            />
          </div>
        </div>
      )}
    </Layout>
  );
}
