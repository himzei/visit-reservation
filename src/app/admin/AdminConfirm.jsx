import "./AdminConfirm.css";
import React from "react";
import { ADMIN_LIST } from "../../lib/menuList";
import Layout from "../../components/Layout";
import { Box, Button, Checkbox } from "@chakra-ui/react";
import SearchLocation from "../../components/SearchLocation";
import SearchDate from "../../components/SearchDate";
import SearchStatus from "../../components/SearchStatus";
import SearchKeyword from "../../components/SearchKeyword";

export default function AdminConfirm() {
  return (
    <Layout menu={ADMIN_LIST}>
      <div className="admin-confirm">
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
                <tr key={i}>
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
