import "./TeacherApproval.css";
import React from "react";
import Layout from "../../components/Layout";
import { TEACHER_LIST } from "../../lib/menuList";
import { Box, Checkbox } from "@chakra-ui/react";

export default function TeacherApproval() {
  return (
    <Layout menu={TEACHER_LIST}>
      <div className="teacher-approval">
        {/* 일괄승인 */}
        <div className="onepass">
          <div>
            <input type="checkbox" id="allCheck" />
            <label htmlFor="allCheck">일괄승인</label>
          </div>
        </div>
        {/* 테이블 */}
        <table>
          <thead>
            <tr>
              <td>선택</td>
              <td>방문객명</td>
              <td>연락처</td>
              <td>차량번호</td>
              <td>방문예정일시</td>
              <td>출입일시</td>
              <td>목적</td>
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
                    <Checkbox />
                  </td>
                  <td>홍길동</td>
                  <td>010-****-1234</td>
                  <td>42누 1234</td>
                  <td>2023-10-16 16:30</td>
                  <td>2023-10-16 16:30</td>
                  <td>진학상담</td>
                  <td>2023-10-14 16:00</td>
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
