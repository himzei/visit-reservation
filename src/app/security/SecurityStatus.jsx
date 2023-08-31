import "./SecurityStatus.css";
import React from "react";
import Layout from "../../components/Layout";
import { Button, Input } from "@chakra-ui/react";
import { SECURITY_LIST } from "../../lib/menuList";

export default function SecurityStatus() {
  return (
    <Layout menu={SECURITY_LIST}>
      <div className="security-container">
        <section>
          {/* 검색창 */}
          <div className="security-search">
            <div className="security-search__label">검색어</div>
            <Input type="text" />
            <Button colorScheme="blue" width="100px">
              검색
            </Button>
          </div>
          {/* 테이블 */}
          <table>
            <thead>
              <tr>
                <td>방문지</td>
                <td>방문객명</td>
                <td>연락처</td>
                <td>차량번호</td>
                <td>방문예정일</td>
                <td>목적</td>
                <td>출입일시</td>
                <td>상태</td>
              </tr>
            </thead>
            <tbody>
              {Array(10)
                .fill("")
                .map((_, i) => (
                  <tr key={i}>
                    <td>행정실</td>
                    <td>홍길동</td>
                    <td>010-****-1234</td>
                    <td>42누 1234</td>
                    <td>2023-10-16 16:30</td>
                    <td>진학상담</td>
                    <td>2023-10-14 16:00</td>
                    <td>승인</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>
        <section>
          <h2>최근 출입자</h2>
          <table>
            <thead>
              <tr>
                <td>방문지</td>
                <td>방문객명</td>
                <td>연락처</td>
                <td>차량번호</td>
                <td>방문예정일</td>
                <td>목적</td>
                <td>출입일시</td>
                <td>상태</td>
              </tr>
            </thead>
            <tbody>
              {Array(2)
                .fill("")
                .map((_, i) => (
                  <tr key={i} className="table-accent">
                    <td>행정실</td>
                    <td>홍길동</td>
                    <td>010-****-1234</td>
                    <td>42누 1234</td>
                    <td>2023-10-16 16:30</td>
                    <td>진학상담</td>
                    <td>2023-10-14 16:00</td>
                    <td>승인</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>
      </div>
    </Layout>
  );
}
