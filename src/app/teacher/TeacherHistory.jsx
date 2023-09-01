import "./TeacherHistory.css";
import React from "react";
import Layout from "../../components/Layout";
import { TEACHER_LIST } from "../../lib/menuList";
import SearchDate from "../../components/SearchDate";
import SearchStatus from "../../components/SearchStatus";
import SearchKeyword from "../../components/SearchKeyword";
import { Button } from "@chakra-ui/button";

export default function TeacherHistory() {
  return (
    <Layout menu={TEACHER_LIST}>
      <div className="teacher-history">
        {/* 검색 */}
        <div className="teacher-history__search">
          <SearchDate />
          <SearchStatus />
          <SearchKeyword />
          <Button colorScheme="blue" size="sm" width="100px">
            검색
          </Button>
        </div>

        {/* 테이블 */}
        <table>
          <thead>
            <tr>
              <td>방문객명</td>
              <td>차량번호</td>
              <td>방문예정일시</td>
              <td>목적</td>
              <td>예약일시</td>
              <td>상태</td>
            </tr>
          </thead>
          <tbody>
            {Array(10)
              .fill("")
              .map((_, i) => (
                <tr key={i}>
                  <td>홍길동</td>
                  <td>42누 1234</td>
                  <td>2023-10-16 16:30</td>
                  <td>진학상담</td>
                  <td>2023-10-14 16:00</td>
                  <td>방문 2023-10-14 16:00</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
