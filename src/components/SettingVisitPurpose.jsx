import { useQuery } from "react-query";
import { apiGetPurposeOfVisit, apiGetVisitSite } from "../api";
import PhotoIcon from "../assets/svg/photo-icon.svg";
import useVisitSite from "../hooks/useVisitSite";
import OrderItem from "./OrderItem";
import OrderItemOne from "./OrderItemOne";

import { Button, HStack, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import { VisitSiteContext } from "../context/VisitSiteContext";

export default function SettingVisitPurpose() {
  const { data: visitSite } = useVisitSite();
  const visitSiteIndex = visitSite?.visitSite?.visitSiteIndex;
  const { isLoading: isLoadingVisitSite, data: dataVisitSite } = useQuery(
    ["getVisitSite", visitSiteIndex],
    apiGetVisitSite
  );
  const locationGrade = dataVisitSite?.placeToVisits;

  // 방문목적 설정
  const { isLoading: isLoadingPupposeOfVisit, data: dataPurposeOfVisit } =
    useQuery(["getPurposeOfVisit", visitSiteIndex], apiGetPurposeOfVisit);
  const purposeOfVisit = dataPurposeOfVisit?.purposeOfVisits;
  const lengthPurposeOfVisit = purposeOfVisit?.length;

  const [placeVisitIndex, setPlaceVisitIndex] = useState(-1);

  return (
    <VisitSiteContext.Provider
      value={{
        placeVisitIndex,
        setPlaceVisitIndex,
        lengthPurposeOfVisit,
        purposeOfVisit,
      }}
    >
      <div>
        <div className="horizon-divide">
          {/* 2fr */}
          <div>
            <div className="reg-title">
              <img src={PhotoIcon} alt="icon2" />
              <h2>방문지 설정</h2>
            </div>

            <div className="location-group">
              {isLoadingVisitSite ? (
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
                <>
                  <OrderItem lists={locationGrade} title="학급" />
                </>
              )}
            </div>
          </div>
          {/* 1fr */}
          <div>
            <div className="reg-title">
              <img src={PhotoIcon} alt="icon2" />
              <h2>방문목적</h2>
            </div>
            <div className="purpose-group">
              {isLoadingPupposeOfVisit ? (
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
                <OrderItemOne lists={purposeOfVisit} title="방문목적" />
              )}
            </div>
          </div>
        </div>

        <div className="btn-container">
          <Button
            w="120px"
            mx="1"
            bg="#A8A8A8"
            color="white"
            _hover={{ bg: "#737373" }}
          >
            되돌리기
          </Button>
          <Button
            w="120px"
            mx="1"
            bg="#0066FF"
            color="white"
            _hover={{ bg: "#0040A1" }}
          >
            저장
          </Button>
        </div>
      </div>
    </VisitSiteContext.Provider>
  );
}
