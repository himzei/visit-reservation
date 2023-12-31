import { Button, Input, VStack, Text, HStack } from "@chakra-ui/react";
import "./AddVisitSite.css";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { apiVisitSiteRegister } from "../api";
import useVisitSite from "../hooks/useVisitSite";

export default function AddVisitSite() {
  const { data: visitSite } = useVisitSite();
  const visitSiteIndex = visitSite?.visitSite?.visitSiteIndex;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { data, mutate } = useMutation((formData) =>
    apiVisitSiteRegister(formData, visitSiteIndex)
  );
  const onSubmit = (formData) => {
    mutate(formData);
  };
  if (data?.result === 0) {
    window.location.reload();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="add-visit-site">
        <VStack w="full">
          <HStack w="full">
            <Input
              type="text"
              {...register("title", {
                required: "방문지는 반드시 입력해 주셔야 합니다.",
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
