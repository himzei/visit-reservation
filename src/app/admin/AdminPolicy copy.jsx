import "./AdminPolicy.css";
import React, { useState } from "react";
import Layout from "../../components/Layout";
import { ADMIN_LIST } from "../../lib/menuList";
import { Button, Checkbox, HStack, Text, Textarea } from "@chakra-ui/react";
import ButtonSearch from "../../components/ButtonSearch";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import useVisitSite from "../../hooks/useVisitSite";
import { apiAgreement, apiPolicyEdit, apiPolicyRegister } from "../../api";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";

export default function AdminPolicy() {
  const { data: visitSite } = useVisitSite();
  const [editIndex, setEditIndex] = useState(null);
  const visitSiteIndex = visitSite?.visitSite?.visitSiteIndex;
  const { register, handleSubmit } = useForm({ mode: "onChange" });
  const { handleSubmit: editHandleSubmit, register: editRegister } = useForm();

  const handleEditClick = (index, agreementIndex) => {
    setEditIndex(index);
    alert(agreementIndex);
  };

  // 정책입력 USEMUTATION
  const { data: dataResult, mutate } = useMutation((formData) =>
    apiPolicyRegister(formData, visitSiteIndex)
  );
  // 정책수정 USEMUTATION
  const { mutate: mutateEdit } = useMutation((editData) =>
    apiPolicyEdit(editData)
  );

  // 정책읽기 USEQUERY
  const { data: dataLists } = useQuery(
    ["Agreement", visitSiteIndex],
    apiAgreement
  );
  const agreements = dataLists?.agreements;

  // 정책입력 후 결과처리
  if (dataResult) {
  }
  const onSubmit = (formData) => {
    mutate(formData);
  };

  const onEditSubmit = (editData) => {};
  return (
    <Layout menu={ADMIN_LIST}>
      <div className="admin-policy">
        {agreements?.map((item, index) => (
          <>
            {editIndex === index ? (
              <form key={index} onSubmit={editHandleSubmit(onEditSubmit)}>
                <table>
                  <thead>
                    <tr>
                      <td>순번</td>
                      <td>제목</td>
                      <td>동의여부</td>
                      <td width="50%">내용</td>
                      <td></td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <input
                          type="hidden"
                          value={item.agreementIndex}
                          {...editRegister("agreementIndex")}
                        />
                      </td>
                      <td width="25%">
                        <input
                          type="text"
                          {...editRegister("editTitle")}
                          defaultValue={item.title}
                        />
                      </td>

                      <td>
                        <HStack justifyContent="center">
                          <Checkbox
                            {...editRegister("editIsMust")}
                            defaultChecked={item.isMust}
                          />
                          <Text>필수동의</Text>
                        </HStack>
                      </td>
                      <td>
                        <Textarea
                          cols="50"
                          rows="10"
                          {...register("editContents")}
                        >
                          {item.contents}
                        </Textarea>
                      </td>
                      <td>
                        <div className="edit-delete">
                          <Button
                            onClick={() => handleEditClick(index)}
                            colorScheme="blue"
                            w="20"
                            size="sm"
                          >
                            저장
                          </Button>
                          <Button
                            onClick={() => setEditIndex(null)}
                            colorScheme="gray"
                            w="20"
                            size="sm"
                          >
                            취소
                          </Button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>
            ) : (
              <table key={index}>
                <thead>
                  <tr>
                    <td>순번</td>
                    <td>제목</td>
                    <td>동의여부</td>
                    <td width="50%">내용</td>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {index + 1}
                      <input
                        type="hidden"
                        value={item.agreementIndex}
                        {...editRegister("agreementIndex")}
                      />
                    </td>
                    <td width="25%">{item.title}</td>

                    <td>
                      <HStack justifyContent="center">
                        {item.isMust ? (
                          <Text>필수동의</Text>
                        ) : (
                          <Text>선택동의</Text>
                        )}
                      </HStack>
                    </td>
                    <td>
                      <Textarea cols="50" rows="10">
                        {item.contents}
                      </Textarea>
                    </td>
                    <td>
                      <div className="edit-delete">
                        <Button
                          onClick={() =>
                            handleEditClick(index, item.agreementIndex)
                          }
                          type="post"
                          bg="#67B17B"
                          _hover={{ bg: "#328248" }}
                          color="white"
                          w="20"
                          size="sm"
                        >
                          수정
                        </Button>
                        <Button
                          bg="#CC4E4E"
                          _hover={{ bg: "#A72E2E" }}
                          size="sm"
                          color="white"
                          w="20"
                        >
                          삭제
                        </Button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </>
        ))}
        <hr />
        <div className="title">새 정책관리 작성하기</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="save-group">
            <ButtonSearch text="저장" />
          </div>
          {/* 테이블 1 */}
          <table>
            <thead>
              <tr>
                <td>제목</td>

                <td>동의여부</td>
                <td width="50%">내용</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input {...register("title")} type="text" />
                </td>

                <td>
                  <HStack justifyContent="center">
                    <Checkbox {...register("isMust")} />
                    <Text>필수동의</Text>
                  </HStack>
                </td>
                <td>
                  <Textarea
                    cols="50"
                    rows="10"
                    {...register("contents")}
                  ></Textarea>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </Layout>
  );
}
