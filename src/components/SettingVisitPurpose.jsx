import { useQuery } from "react-query";
import { apiGetPurposeOfVisit, apiGetVisitSite } from "../api";
import PhotoIcon from "../assets/svg/photo-icon.svg";
import useVisitSite from "../hooks/useVisitSite";
import { HStack, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import { VisitSiteContext } from "../context/VisitSiteContext";
import MenuVisitPurpose from "./MenuVisitPurpose";
import MenuPlaceToVisit from "./MenuPlaceToVisit";

export default function SettingVisitPurpose() {
  const { data: visitSite } = useVisitSite();
  const visitSiteIndex = visitSite?.visitSite?.visitSiteIndex;
  const { isLoading: isLoadingVisitSite, data: dataVisitSite } = useQuery(
    ["getVisitSite", visitSiteIndex],
    apiGetVisitSite
  );
  const locationGrade = dataVisitSite?.placeToVisits || [];

  // 방문목적 설정
  const { isLoading: isLoadingPupposeOfVisit, data: dataPurposeOfVisit } =
    useQuery(["getPurposeOfVisit", visitSiteIndex], apiGetPurposeOfVisit);
  const purposeOfVisit = dataPurposeOfVisit?.purposeOfVisits || [];
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
                  <MenuPlaceToVisit lists={locationGrade} title="학급" />
                  {/* <OrderItem lists={locationGrade} title="학급" /> */}
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
                // <OrderItemOne lists={purposeOfVisit} title="방문목적" />
                <MenuVisitPurpose lists={purposeOfVisit} title="방문목적" />
              )}
            </div>
          </div>
        </div>
      </div>
    </VisitSiteContext.Provider>
  );
}
