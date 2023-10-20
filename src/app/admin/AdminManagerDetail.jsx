import "./AdminManagerDetail.css";
import React from "react";
import RegIcon1 from "../../assets/svg/person-input.svg";
import RegIcon2 from "../../assets/svg/location-icon.svg";
import { useForm } from "react-hook-form";
import useVisitSite from "../../hooks/useVisitSite";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  apiGetPurposeOfVisit,
  apiGetVisitSite,
  apiPutVisitor,
} from "../../api";
import { Button, Grid, HStack, Stack } from "@chakra-ui/react";

export default function AdminManagerDetail({ selectEdit, onClose }) {
  const queryClient = useQueryClient();
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

  const handleClose = () => {
    onClose();
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const { mutate } = useMutation((formData) => apiPutVisitor(formData), {
    onSuccess: (data) => {
      if (data.result === 0) {
        onClose();
      }
    },
    onSettled: () => queryClient.invalidateQueries("getVisitor"),
  });
  const onSubmit = (formData) => {
    mutate(formData);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="admin-manager-detail">
        <section>
          <input
            type="hidden"
            value={selectEdit.visitorIndex}
            {...register("visitorIndex")}
          />
          <div className="reg-title">
            <img src={RegIcon1} alt="icon1" />
            <h2>방문객 정보</h2>
          </div>
          <div className="input-group">
            <div>방문객명</div>
            <input
              {...register("name", {
                required: "이름을 입력해 주세요",
                minLength: {
                  value: 2,
                  message: "최소 2글자 이상 입력해주세요",
                },
              })}
              type="text"
              defaultValue={selectEdit.name}
            />
            <span className="form-errors">{errors?.name?.message}</span>
          </div>
          <div className="input-group">
            <div>휴대전화번호</div>
            <input
              {...register("tel", {
                required: "모바일 번호를 입력해 주세요",
                pattern: {
                  value: /^[0-9]{10,11}$/,
                  message: "'-' 없이 숫자만 입력해 주세요",
                },
              })}
              type="text"
              defaultValue={selectEdit.tel}
            />
            <span className="form-errors">{errors?.tel?.message}</span>
          </div>
          <div className="input-group">
            <div>차량번호</div>
            <input
              {...register("carNumber")}
              type="text"
              defaultValue={selectEdit.carNumber}
            />
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
                <option
                  key={index}
                  defaultValue={item.title}
                  selected={item.title === selectEdit.placeToVisit}
                >
                  {item.title}
                </option>
              ))}
            </select>
          </div>
          <div className="input-group">
            <div>방문 목적</div>
            <select {...register("purposeOfVisit")}>
              {dataPurposeOfVisits?.purposeOfVisits?.map((item, index) => (
                <option
                  key={index}
                  defaultValue={item.title}
                  selected={item.title === selectEdit.purposeOfVisit}
                >
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
                  defaultValue={selectEdit.enterStartDate.substr(0, 10)}
                  type="date"
                  {...register("enterStartDate", {
                    required: true,
                  })}
                />
              </Stack>
              <Stack w="full">
                <input
                  defaultValue={selectEdit.enterEndDate.substr(0, 10)}
                  type="date"
                  {...register("enterEndDate", {
                    required: true,
                  })}
                />
              </Stack>
            </Grid>
          </div>
        </section>
      </div>
      <HStack w="full" justifyContent="center" my={4}>
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
    </form>
  );
}
