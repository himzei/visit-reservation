import "./AdminPolicy.css";
import React, { useState } from "react";
import Layout from "../../components/Layout";
import { ADMIN_LIST } from "../../lib/menuList";
import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import ButtonSearch from "../../components/ButtonSearch";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import useVisitSite from "../../hooks/useVisitSite";
import { apiAgreement, apiPolicyDelete, apiPolicyRegister } from "../../api";
import AdminPolicyEdit from "./AdminPolicyEdit";
import Markdown from "react-markdown";
import SettingSchoolName from "../../components/SettingSchoolName";
import SettingVisitPurpose from "../../components/SettingVisitPurpose";

export default function AdminPolicy() {
  const [agreementIndex, setAgreementIndex] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // 재랜더링
  const queryClient = useQueryClient();

  // visitsiteIndex 값
  const { data: visitSite } = useVisitSite();
  const visitSiteIndex = visitSite?.visitSite?.visitSiteIndex;

  // 입력을 위안 useForm
  const { register, handleSubmit, reset } = useForm({ mode: "onChange" });

  // 정책읽기 USEQUERY
  const { data: dataLists, isLoading } = useQuery(
    ["Agreement", visitSiteIndex],
    apiAgreement
  );
  const agreements = dataLists?.agreements;

  // 정책 입력
  const { mutate } = useMutation(
    (formData) => apiPolicyRegister(formData, visitSiteIndex),
    {
      onSuccess: () => {
        // 정책 입력 후 State 없데이트
        queryClient.invalidateQueries("Agreement");
        reset();
      },
    }
  );
  const onSubmit = (formData) => {
    mutate(formData);
  };

  // 정책삭제
  const { mutate: mutateDeletePolicy } = useMutation(
    (id) => apiPolicyDelete(id),
    {
      onSuccess: () => {
        // 삭제후 업데이트
        queryClient.invalidateQueries("Agreement");
      },
    }
  );

  // 정책수정
  const handleEditClick = (agreementIndex) => {
    onOpen();
    setAgreementIndex(agreementIndex);
  };

  // 삭제 버튼 클릭시 이벤트 발생
  // mutate 실행
  const handleDeleteClick = (id) => {
    const check = window.confirm("삭제하시겠습니까?");
    if (check) {
      mutateDeletePolicy(id);
    }
  };

  return (
    <Layout menu={ADMIN_LIST}>
      <Modal onClose={onClose} size="4xl" isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>정책 관리 수정</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AdminPolicyEdit
              onClose={onClose}
              agreementIndex={agreementIndex}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
      {isLoading ? (
        <HStack justifyContent="center" py="10">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </HStack>
      ) : (
        <div className="admin-policy">
          {agreements?.map((item, index) => (
            <div key={index}>
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
                      {index + 1}
                      <input
                        type="hidden"
                        value={item.agreementIndex}
                        name="agreementIndex"
                      />
                    </td>
                    <td width="25%">{item.title}</td>

                    <td>{item.isMust ? "필수동의" : "선택동의"}</td>
                    <div className="remark-container">
                      <Markdown children={item.contents} />
                    </div>
                    <td>
                      <div className="edit-delete">
                        <Button
                          onClick={() => handleEditClick(item.agreementIndex)}
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
                          onClick={() => handleDeleteClick(item.agreementIndex)}
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
            </div>
          ))}

          <hr />
          <div className="title">공지 및 동의 정보 작성하기</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="save-group">
              <ButtonSearch text="추가" />
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
                    <div className="checkbox-container">
                      <input
                        type="checkbox"
                        id="checkbox-write"
                        {...register("isMust")}
                      />
                      <label htmlFor="checkbox-write">필수동의</label>
                    </div>
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
      )}
      <SettingSchoolName />
      <SettingVisitPurpose />
    </Layout>
  );
}
