import "./AdminPolicy.css";
import React from "react";
import Layout from "../../components/Layout";
import { ADMIN_LIST } from "../../lib/menuList";
import { Checkbox, HStack, Text, Textarea } from "@chakra-ui/react";
import { rule1 } from "../../lib/rule1";
import ButtonSearch from "../../components/ButtonSearch";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";

export default function AdminPolicy() {
  return (
    <Layout menu={ADMIN_LIST}>
      <div className="admin-policy">
        <div className="save-group">
          <ButtonSearch text="저장" />
        </div>
        {/* 테이블 1 */}
        <table>
          <thead>
            <tr>
              <td>순번</td>
              <td>제목</td>

              <td>동의여부</td>
              <td width="50%">내용</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>개인정보 수집항목 및 이용목적</td>

              <td>
                <HStack justifyContent="center">
                  <Checkbox />
                  <Text>필수동의</Text>
                </HStack>
              </td>
              <td>
                <Textarea cols="50" rows="10">
                  {rule1}
                </Textarea>
              </td>
            </tr>
          </tbody>
        </table>
        {/* 테이블 2 */}
        <table>
          <thead>
            <tr>
              <td>순번</td>
              <td>제목</td>

              <td>동의여부</td>
              <td width="50%">내용</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2</td>
              <td>개인정보 위탁에 관한 사항</td>

              <td>
                <HStack justifyContent="center">
                  <Checkbox />
                  <Text>필수동의</Text>
                </HStack>
              </td>
              <td>
                <Textarea cols="50" rows="10">
                  {rule1}
                </Textarea>
              </td>
            </tr>
          </tbody>
        </table>
        {/* 테이블 3 */}
        <table>
          <thead>
            <tr>
              <td>순번</td>
              <td>제목</td>

              <td>동의여부</td>
              <td width="50%">내용</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>3</td>
              <td>개인정보 제3자 제공에 관한 사항</td>

              <td>
                <HStack justifyContent="center">
                  <Checkbox />
                  <Text>필수동의</Text>
                </HStack>
              </td>
              <td>
                <Textarea cols="50" rows="10">
                  {rule1}
                </Textarea>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
