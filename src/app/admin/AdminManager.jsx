import "./AdminManager.css";
import React from "react";
import Layout from "../../components/Layout";
import { ADMIN_LIST } from "../../lib/menuList";
import { Checkbox } from "@chakra-ui/checkbox";
import SearchLocation from "../../components/SearchLocation";
import SearchDate from "../../components/SearchDate";
import SearchStatus from "../../components/SearchStatus";
import SearchKeyword from "../../components/SearchKeyword";
import { Button } from "@chakra-ui/button";
import EditIcon from "../../assets/svg/edit-icon.svg";
import DeleteIcon from "../../assets/svg/delete-icon.svg";
import AllPass from "../../components/AllPass";

export default function AdminManager() {
  return (
    <Layout menu={ADMIN_LIST}>
      <div className="admin-manager">
        {/* search */}
        <div className="search-group">
          <SearchLocation />
          <SearchDate />
          <SearchStatus />
          <SearchKeyword />
          <Button colorScheme="blue" size="sm" width="100px">
            검색
          </Button>
        </div>
        {/* 일괄발송 */}
        <div className="rigth-btn">
          <AllPass title="일괄발송" />
          <Button
            width="80px"
            fontSize="14px"
            leftIcon={"+"}
            ml="2"
            colorScheme="blue"
            size="sm"
          >
            추가
          </Button>
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
                      <div>
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
