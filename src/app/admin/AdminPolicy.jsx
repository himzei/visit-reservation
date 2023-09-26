import "./AdminPolicy.css";
import React from "react";
import Layout from "../../components/Layout";
import { ADMIN_LIST } from "../../lib/menuList";
import { Button, Checkbox, HStack, Text, Textarea } from "@chakra-ui/react";
import ButtonSearch from "../../components/ButtonSearch";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import useVisitSite from "../../hooks/useVisitSite";
import {
  apiAgreement,
  apiPolicyDelete,
  apiPolicyEdit,
  apiPolicyRegister,
} from "../../api";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";

export default function AdminPolicy() {
  const { data: visitSite } = useVisitSite();
  const visitSiteIndex = visitSite?.visitSite?.visitSiteIndex;
  const { register, handleSubmit } = useForm({ mode: "onChange" });
  const { handleSubmit: editHandleSubmit } = useForm();

  const { data: dataResult, mutate } = useMutation((formData) =>
    apiPolicyRegister(formData, visitSiteIndex)
  );
  // 정책수정 USEMUTATION
  const { mutate: mutateEdit } = useMutation((editData) =>
    apiPolicyEdit(editData)
  );
  // 정책입력 USEMUTATION

  // 정책읽기 USEQUERY
  const { data: dataLists } = useQuery(
    ["Agreement", visitSiteIndex],
    apiAgreement
  );
  const agreements = dataLists?.agreements;

  // 정책입력 후 결과처리
  if (dataResult) {
    console.log(dataResult);
  }
  const onSubmit = (formData) => {
    mutate(formData);
  };

  const onEditSubmit = (editData) => {};
  const handleChangeTextarea = (id, value) => {
    const updateData = dataLists.map((item) => {
      if (item.agreementIndex === id) {
        return { ...item, inputValue: value };
      }
      return item;
    });
    dataLists = updateData;
  };

  // 수정해야함
  const { mutate: mutateDeletePolicy } = useMutation(
    (id) => apiPolicyDelete(id),
    {
      onSuccess: (data) => {
        if (data.reault === 0) {
          alert("삭제완료");
        }
      },
    }
  );

  const handleEditClick = (id) => {
    const item = dataLists.find((item) => item.agreementIndex === id);
    if (item) {
      setInputValue(item.inputValue);
    }
  };

  const handleDeleteClick = (id) => {
    mutateDeletePolicy(id);
  };

  const setInputValue = (value) => {};

  return (
    <Layout menu={ADMIN_LIST}>
      <div className="admin-policy">
        <form onSubmit={editHandleSubmit(onEditSubmit)}>
          {agreements?.map((item, index) => (
            <>
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
                      <input type="hidden" value={item.agreementIndex} />
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
                      <Textarea
                        cols="50"
                        rows="10"
                        onChange={(e) =>
                          handleChangeTextarea(
                            item.agreementIndex,
                            e.target.value
                          )
                        }
                      >
                        {item.contents}
                      </Textarea>
                    </td>
                    <td>
                      <div className="edit-delete">
                        <Button
                          onClick={(e) => handleEditClick(item.agreementIndex)}
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
                          onClick={(e) =>
                            handleDeleteClick(item.agreementIndex)
                          }
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
            </>
          ))}
        </form>
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
