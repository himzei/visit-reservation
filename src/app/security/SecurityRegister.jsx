// 입구관리자(안전지킴이)
// 방문 직접등록
// 등록

import "./SecurityRegister.css";
import React from "react";
import Layout from "../../components/Layout";
import { SECURITY_LIST } from "../../lib/menuList";
import RegIcon1 from "../../assets/svg/security-register1.svg";
import RegIcon2 from "../../assets/svg/security-register2.svg";
import RegIcon3 from "../../assets/svg/security-register3.svg";
import { Button } from "@chakra-ui/react";
import useVisitSite from "../../hooks/useVisitSite";
import { useQuery } from "react-query";
import { apiGetPurposeOfVisit, apiGetVisitSite } from "../../api";
import { useForm } from "react-hook-form";

export default function SecurityRegister() {
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

  const { register, handleSubmit } = useForm({ mode: "onChange" });
  const onSubmit = (data) => {};

  return (
    <Layout menu={SECURITY_LIST}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="security-register">
          {/* type =  */}
          <input type="hidden" value={1} {...register("type")} />
          <input type="hidden" value="" {...register("code")} />
          <section>
            <div className="reg-title">
              <img src={RegIcon2} alt="icon2" />
              <h2>방문객 정보</h2>
            </div>
            <div className="input-group">
              <div>방문객명</div>
              <input
                {...register("name")}
                type="text"
                placeholder="성함을 입력해 주세요."
              />
            </div>
            <div className="input-group">
              <div>휴대전화번호</div>
              <input
                {...register("tel")}
                type="text"
                placeholder="휴대전화번호를 입력해 주세요."
              />
            </div>
            <div className="input-group">
              <div>차량번호</div>
              <input
                {...register("carNumber")}
                type="text"
                placeholder="차량번호를 입력해 주세요."
              />
            </div>
          </section>
          <section>
            <div className="reg-title">
              <img src={RegIcon3} alt="icon3" />
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
              <div>방문목적</div>
              <select {...register("purposeOfVisit")}>
                {dataPurposeOfVisits?.purposeOfVisits?.map((item, index) => (
                  <option key={index} value={item.title}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-group">
              <div>방문일자</div>
              <input type="date" {...register("date", { required: true })} />
            </div>
            <div className="input-group">
              <div>방문시간</div>
              <input type="time" {...register("time", { required: true })} />
            </div>
          </section>
          <div className="btn-container">
            <Button type="submit" colorScheme="blue">
              승인 요청
            </Button>
          </div>
        </div>
      </form>
    </Layout>
  );
}
