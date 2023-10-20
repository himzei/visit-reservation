import { Button, Input, VStack, Text, HStack } from "@chakra-ui/react";
import "./AddVisitSite.css";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { apiPurposeOfVisitRegister } from "../api";
import useVisitSite from "../hooks/useVisitSite";
import { useContext } from "react";
import { VisitSiteContext } from "../context/VisitSiteContext";

export default function AddPurposeOfVisit({ onClose }) {
  // 저장, 삭제, 수정 후 동작
  // 데이터 새로 불로오기

  const { lengthPurposeOfVisit } = useContext(VisitSiteContext);
  const { data: visitSite } = useVisitSite();
  const visitSiteIndex = visitSite?.visitSite?.visitSiteIndex;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate } = useMutation(
    (formData) => {
      apiPurposeOfVisitRegister(formData, visitSiteIndex, lengthPurposeOfVisit);
    },
    {
      onSuccess: () => {
        window.location.reload();
        onClose();
      },
    }
  );

  const onSubmit = (formData) => {
    mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="add-visit-site">
        <VStack w="full">
          <HStack w="full">
            <Input
              type="text"
              {...register("title", {
                required: "방문목적은 반드시 입력해 주셔야 합니다.",
              })}
            />
            <Button
              type="submit"
              width="100px"
              height="35px"
              color="white"
              bg="#0066FF"
              _hover={{ bg: "#0053CF" }}
              mx="2"
            >
              저장
            </Button>
          </HStack>
          {errors?.title?.message && (
            <Text w="full" textAlign="left" color="tomato" fontSize="14">
              {errors?.title?.message}
            </Text>
          )}
        </VStack>
      </div>
    </form>
  );
}
