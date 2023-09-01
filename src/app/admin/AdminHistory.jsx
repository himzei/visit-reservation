import "./AdminHistory.css";
import React from "react";
import Layout from "../../components/Layout";
import { ADMIN_LIST } from "../../lib/menuList";
import SearchLocation from "../../components/SearchLocation";
import SearchDate from "../../components/SearchDate";
import SearchStatus from "../../components/SearchStatus";
import SearchKeyword from "../../components/SearchKeyword";
import { Button, Checkbox } from "@chakra-ui/react";
import AllPass from "../../components/AllPass";

export default function AdminHistory() {
  return (
    <Layout menu={ADMIN_LIST}>
      <div className="admin-history">
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
        {/* 엑셀 다운로드 */}
        <div className="excel-group">
          <AllPass title="일괄승인" />
          <Button mx="2" colorScheme="green" size="sm">
            Excel 다운로드
          </Button>
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

              <td>담당자</td>

              <td>상태</td>
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
                  <td>행정실</td>
                  <td>홍길동</td>
                  <td>42누 1234</td>
                  <td>2023-10-16 16:30</td>
                  <td>진학상담</td>
                  <td>담당자</td>
                  <td>방문 2023-10-16 16:30</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
