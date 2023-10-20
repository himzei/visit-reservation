import "./AdminManagerDetail.css";
import React from "react";
import RegIcon1 from "../../assets/svg/person-input.svg";
import RegIcon2 from "../../assets/svg/location-icon.svg";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  apiGetPurposeOfVisit,
  apiGetVisitSite,
  apiVisitorRegister,
} from "../../api";
import useVisitSite from "../../hooks/useVisitSite";
import { Button, Grid, HStack, Stack, Text, VStack } from "@chakra-ui/react";

export default function AdminManagerWrite({ onClose }) {
  const queryClient = useQueryClient();

  const handleClose = () => {
    onClose();
  };

  // VISITSITEINDEX
  const { data: visitSite } = useVisitSite();
  const visitSiteIndex = visitSite?.visitSite?.visitSiteIndex;

  // 방문목적 불러오기
  const { data: dataPurposeOfVisits } = useQuery(
    ["getPurposeOfVisit", visitSiteIndex],
    apiGetPurposeOfVisit
  );

  // 방문지 불러오기
  const { data: dataVisitSite } = useQuery(
    ["getVisitSite", visitSiteIndex],
    apiGetVisitSite
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const { mutate } = useMutation(
    (formData) => apiVisitorRegister(formData, visitSiteIndex),
    {
      onSuccess: (data) => {
        if (data.result === 0) {
          queryClient.invalidateQueries("getVisitor");
          onClose();
        }
      },
    }
  );

  const onSubmit = (formData) => {
    mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="admin-manager-detail">
        <input type="hidden" value={0} {...register("type")} />
        <input type="hidden" value="code" {...register("code")} />
        <section>
          <div className="reg-title">
            <img src={RegIcon1} alt="icon1" />
            <h2>방문객 정보</h2>
          </div>

          <div className="input-group">
            <div>방문객명</div>
            <input
              type="text"
              {...register("name", {
                required: "이름을 입력해 주세요",
                minLength: {
                  value: 2,
                  message: "최소 2글자 이상 입력해주세요",
                },
              })}
            />
            <span className="form-errors">{errors?.name?.message}</span>
          </div>
          <div className="input-group">
            <div>휴대전화번호</div>
            <input
              type="text"
              {...register("tel", {
                required: "모바일 번호를 입력해 주세요",
                pattern: {
                  value: /^[0-9]{10,11}$/,
                  message: "'-' 없이 숫자만 입력해 주세요",
                },
              })}
            />
            <span className="form-errors">{errors?.tel?.message}</span>
          </div>
          <div className="input-group">
            <div>차량번호</div>
            <input type="text" {...register("carNumber")} />
          </div>
        </section>
        <section>
          <div className="reg-title">
            <img src={RegIcon2} alt="icon2" />
            <h2>방문장소 정보</h2>
          </div>
          <div className="input-group">
            <div>방문지</div>
            <select {...register("placeToVisit")}>
              {dataVisitSite?.placeToVisits?.map((item, index) => (
                <option key={index} value={item.title}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
          <div className="input-group">
            <div>방문 목적</div>
            <select {...register("purposeOfVisit")}>
              {dataPurposeOfVisits?.purposeOfVisits?.map((item, index) => (
                <option key={index} value={item.title}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
          <div className="input-group">
            <div>방문일시</div>
            <Grid w="full" templateColumns={"1fr 1fr 1fr"}>
              <Stack w="full">
                <input
                  type="date"
                  {...register("enterStartDate", {
                    required: "시작날짜를 입력해 주세요",
                  })}
                />
                <Text color="red.500">{errors?.enterStartDate?.message}</Text>
              </Stack>
              <VStack w="full">
                <input
                  type="date"
                  {...register("enterEndDate", {
                    required: "종료날짜를 입력해 주세요",
                  })}
                />
                <Text>{errors?.enterEndDate?.message}</Text>
              </VStack>
            </Grid>
          </div>
        </section>
        <HStack py={4} mt={4}>
          <Button width="100px" onClick={() => handleClose()}>
            닫기
          </Button>
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
      </div>
    </form>
  );
}
