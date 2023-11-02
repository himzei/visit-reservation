//
// 상시반문자 관리 페이지
//

import "./AdminManager.css";
import React, { useState } from "react";
import Layout from "../../components/Layout";
import { ADMIN_LIST } from "../../lib/menuList";
import EditIcon from "../../assets/svg/edit-icon.svg";
import DeleteIcon from "../../assets/svg/delete-icon.svg";

import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import AdminManagerDetail from "./AdminManagerDetail";
import { useQuery, useQueryClient } from "react-query";
import AdminManagerWrite from "./AdminManagerWrite";
import { apiDeleteVisitor, apiGetVisitor } from "../../api";
import useVisitSite from "../../hooks/useVisitSite";
import { nameHidden } from "../../utils/nameHidden";
import Pagination from "react-js-pagination";

export default function AdminManager() {
  // refetch
  const queryClient = useQueryClient();
  // VISITSITEINDEX
  const { data: visitSite } = useVisitSite();
  const visitSiteIndex = visitSite?.visitSite?.visitSiteIndex;

  const [selectEdit, setSelectEdit] = useState(null);

  const [page, setPage] = useState(1);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenWrite,
    onOpen: onOpenWrite,
    onClose: onCloseWrite,
  } = useDisclosure();

  const handleEditClick = (index) => {
    onOpen();
    const editData = data?.visitors?.find(
      (item) => item?.visitorIndex === index
    );
    setSelectEdit(editData);
  };

  const handleDeleteClick = async (index) => {
    const check = window.confirm("삭제하시겠습니까?");
    if (check) {
      await apiDeleteVisitor(index);
    }
    queryClient.invalidateQueries("getVisitor");
  };

  const handleClickWrite = () => {
    onOpenWrite();
  };

  // api search 없음
  const { data, isLoading } = useQuery(
    [
      "getVisitor",
      {
        visitSiteIndex,
        page: page,
        pageRange: 10,
        type: 0,
      },
    ],
    apiGetVisitor
  );

  const totalItemsCount = data?.totalCnt;
  const handlePageChange = (page) => {
    setPage(page);
  };

  return (
    <>
      <Modal onClose={onCloseWrite} size="5xl" isOpen={isOpenWrite}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>상시방문자 추가</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AdminManagerWrite onClose={onCloseWrite} />
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
      <Modal onClose={onClose} size="5xl" isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>상시방문자 관리(수정)</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AdminManagerDetail selectEdit={selectEdit} onClose={onClose} />
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
      <Layout menu={ADMIN_LIST}>
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
          <div className="admin-manager">
            {/* search */}
            <div className="search-group"></div>
            {/* 일괄발송 */}
            <div className="rigth-btn">
              {/* <AllPass title="일괄발송" /> */}
              <Button my={4} onClick={() => handleClickWrite()}>
                추가{" "}
              </Button>
            </div>
            {/* 테이블 */}
            <table>
              <thead>
                <tr>
                  <td>No</td>
                  <td>방문객명</td>
                  <td>휴대전화</td>
                  <td>차량번호</td>
                  <td>방문지</td>
                  <td>목적</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {!data ? (
                  <tr>
                    <td colSpan={8}>
                      <div>해당하는 데이터가 없습니다.</div>
                    </td>
                  </tr>
                ) : (
                  data?.visitors?.map((item, i) => (
                    <tr key={i}>
                      <td>{totalItemsCount - i - (page - 1) * 10}</td>
                      <td>{nameHidden(item.name)}</td>
                      <td>{item.tel}</td>
                      <td>{item.carNumber}</td>
                      <td>{item.placeToVisit}</td>
                      <td>{item.purposeOfVisit}</td>
                      <td>
                        <div className="edit-delete">
                          <div
                            onClick={() => handleEditClick(item.visitorIndex)}
                          >
                            <img src={EditIcon} alt="edit-icon" />
                          </div>
                          <div
                            onClick={() => handleDeleteClick(item.visitorIndex)}
                          >
                            <img src={DeleteIcon} alt="delete-icon" />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
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
    </>
  );
}
