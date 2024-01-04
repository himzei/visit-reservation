import { Button, HStack, Text, Input, VStack } from "@chakra-ui/react";
import useVisitSite from "../hooks/useVisitSite";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { apiVisitSiteRegister } from "../api";

export default function AddPlaceToVisit({ onClose, checkIndex }) {
  console.log(checkIndex);
  const queryClient = useQueryClient();
  const { data: visitSite } = useVisitSite();
  const visitSiteIndex = visitSite?.visitSite?.visitSiteIndex;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate } = useMutation(
    (formData) => apiVisitSiteRegister(formData, visitSiteIndex, checkIndex),
    {
      onSuccess: (data) => {
        if (data.result === 0) {
          queryClient.invalidateQueries("getVisitSite").then(() => {
            onClose();
            window.location.reload();
          });
        }
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
              maxLength={20}
              type="text"
              placeholder = "최대글자수는 20자로 제한되어 있습니다."
              {...register("title", {
                required: "방문목적은 반드시 입력해 주셔야 합니다.",
                maxLength: {
                  value: 20,
                  message: "최대글자수는 20자로 제한되어 있습니다.",
                },
                
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
