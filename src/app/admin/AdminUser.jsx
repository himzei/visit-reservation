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
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import AdminUserDetail from "./AdminUserDetail";
import { useQuery, useQueryClient } from "react-query";
import AdminUserWrite from "./AdminUserWrite";
import useVisitSite from "../../hooks/useVisitSite";
import { apiGetManager } from "../../api";

export default function AdminUser() {
  const queryClient = useQueryClient();
  // VISITSITEINDEX
  const { data: visitSite } = useVisitSite();
  const visitSiteIndex = visitSite?.visitSite?.visitSiteIndex;

  const { data: dataManagers } = useQuery(
    ["getManager", { visitSiteIndex, page: 1, pageRange: 10, type: 0 }],
    apiGetManager
  );

  console.log(dataManagers);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleClick = () => {
    onOpen();
  };
  return (
    <Layout menu={ADMIN_LIST}>
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
      <div className="admin-user">
        {/* search */}
        <div className="admin-user-front">
          <div className="search-group">
            <SearchCategory />
            <SearchEmploy />
            <SearchKeyword text="이름/사용자" />
            <ButtonSearch text="검색" />
          </div>

          <div onClick={() => handleClick()}>
            <ButtonSearch text="+ 추가" />
          </div>
        </div>
        {/* 테이블 */}
        <table>
          <thead>
            <tr>
              <td>분1류</td>
              <td>이름</td>
              <td>사용자 ID</td>
              <td>전화번호</td>
              <td>직책</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {dataManagers?.accounts?.map((item, i) => (
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
                        console.log("d");
                    }
                  })()}
                </td>
                <td>{item.name}</td>
                <td>{item.userId}</td>
                <td>{item.tel}</td>
                <td>{item.position}</td>
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
