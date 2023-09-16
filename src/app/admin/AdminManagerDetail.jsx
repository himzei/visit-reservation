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
import { Box, Button, HStack } from "@chakra-ui/react";

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
  const { register, handleSubmit } = useForm({ mode: "onChange" });

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
              {...register("name")}
              type="text"
              defaultValue={selectEdit.name}
            />
          </div>
          <div className="input-group">
            <div>휴대전화번호</div>
            <input
              {...register("tel")}
              type="text"
              defaultValue={selectEdit.tel}
            />
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
            <HStack w="full" justifyContent="space-between" spacing="16">
              <Box w="1/2">
                <input
                  defaultValue={selectEdit.enterStartDate.substr(0, 10)}
                  type="date"
                  {...register("enterStartDate")}
                />
              </Box>
              <Box w="1/2">
                <input
                  defaultValue={selectEdit.enterEndDate.substr(0, 10)}
                  type="date"
                  {...register("enterEndDate")}
                />
              </Box>
            </HStack>
          </div>
        </section>
      </div>
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
    </form>
  );
}
