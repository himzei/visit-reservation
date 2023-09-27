//
// 상시반문자 관리 페이지
//

import "./AdminManager.css";
import React, { useState } from "react";
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
import { useQuery, useQueryClient } from "react-query";
import AdminManagerWrite from "./AdminManagerWrite";
import { apiDeleteVisitor, apiGetVisitor } from "../../api";
import useVisitSite from "../../hooks/useVisitSite";
import { dateNowChange } from "../../utils/dateNowChange";
import { nameHidden } from "../../utils/nameHidden";

export default function AdminManager() {
  // refetch
  const queryClient = useQueryClient();
  // VISITSITEINDEX
  const { data: visitSite } = useVisitSite();
  const visitSiteIndex = visitSite?.visitSite?.visitSiteIndex;

  const [selectEdit, setSelectEdit] = useState(null);

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
    await apiDeleteVisitor(index);
    queryClient.invalidateQueries("getVisitor");
  };

  const handleClickWrite = () => {
    onOpenWrite();
  };

  // api search 없음
  //

  const { data } = useQuery(
    [
      "getVisitor",
      {
        visitSiteIndex,
        page: 1,
        pageRange: 10,
        type: 0,
      },
    ],
    apiGetVisitor
  );

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
        <div className="admin-manager">
          {/* search */}
          <div className="search-group"></div>
          {/* 일괄발송 */}
          <div className="rigth-btn">
            <AllPass title="일괄발송" />
            <Button onClick={() => handleClickWrite()}>추가 </Button>
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
              {data?.visitors?.map((item, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{nameHidden(item.name)}</td>
                  <td>{item.tel}</td>
                  <td>{item.carNumber}</td>
                  <td>{item.placeToVisit}</td>
                  <td>{item.purposeOfVisit}</td>
                  <td>
                    <div className="edit-delete">
                      <div onClick={() => handleEditClick(item.visitorIndex)}>
                        <img src={EditIcon} alt="edit-icon" />
                      </div>
                      <div onClick={() => handleDeleteClick(item.visitorIndex)}>
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
    </>
  );
}
