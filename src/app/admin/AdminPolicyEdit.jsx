import "./AdminPolicyEdit.css";
import { Button, HStack } from "@chakra-ui/react";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { apiAgreementOne, apiPolicyEdit } from "../../api";
import { useForm } from "react-hook-form";

export default function AdminPolicyEdit({ agreementIndex, onClose }) {
  const queryClient = useQueryClient();
  // 정책관리 한 개만 불러오기
  const { data } = useQuery(
    ["apiGetAgreementOne", agreementIndex],
    apiAgreementOne
  );

  // 정책관리 수정하기 Mutation
  // 수정 api 호출 apiPolicyEdit
  const { mutate } = useMutation(
    (data) => apiPolicyEdit(data, agreementIndex),
    {
      onSuccess: (data) => {
        if (data.result === 0) {
          queryClient.invalidateQueries("Agreement");
          onClose();
        }
      },
    }
  );

  const { handleSubmit, register } = useForm();
  const onValid = (data) => {
    mutate(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <div className="policy-input-group">
          <div>제목</div>
          <div>
            <input
              className="input-title"
              type="text"
              defaultValue={data?.agreement?.title}
              {...register("title", {
                required: true,
              })}
            />
          </div>
        </div>
        <div className="policy-input-group">
          <div>동의여부</div>
          <div>
            <input
              id="policy-isMust"
              type="checkbox"
              defaultChecked={data?.agreement?.isMust}
              {...register("isMust")}
            />
            <label htmlFor="policy-isMust">필수동의</label>
          </div>
        </div>
        <div className="policy-textarea-group">
          <div>내용</div>
          <textarea
            rows="12"
            defaultValue={data?.agreement?.contents}
            {...register("contents", {
              required: true,
            })}
          ></textarea>
        </div>

        <HStack w="full" py={4} justifyContent="center">
          <Button type="submit" colorScheme="blue">
            수정
          </Button>
          <Button onClick={() => onClose()}>닫기</Button>
        </HStack>
      </form>
    </div>
  );
}
