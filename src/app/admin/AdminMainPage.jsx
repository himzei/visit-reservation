import "./AdminMainPage.css";
import React, { useRef, useState } from "react";
import Layout from "../../components/Layout";
import { ADMIN_LIST } from "../../lib/menuList";
import PhotoIcon from "../../assets/svg/photo-icon.svg";
import OrderItem from "../../components/OrderItem";
import DefaultLogo from "../../assets/png/__high-logo.png";
import { Button, HStack, Spinner } from "@chakra-ui/react";
import { useMutation, useQuery } from "react-query";
import {
  apiGetPurposeOfVisit,
  apiGetVisitSite,
  apiManagerInterviewStatis,
  apiVisitSiteImageRegister,
  apiVisitorInterviewStatis,
} from "../../api";
import useVisitSite from "../../hooks/useVisitSite";
import { VisitSiteContext } from "../../context/VisitSiteContext";
import OrderItemOne from "../../components/OrderItemOne";
import { useForm } from "react-hook-form";
import SearchDate from "../../components/SearchDate";
import { timeEnd, timeStart } from "../../utils/timeStatEnd";
import { mobileDash } from "../../utils/mobileDash";

export default function AdminMainPage() {
  const { data: visitSite } = useVisitSite();
  const visitSiteIndex = visitSite?.visitSite?.visitSiteIndex;

  // 방문지설정
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

  const [imgFile, setImgFile] = useState("");
  const [imgPath, setImgPath] = useState("");
  const handleButtonClick = (e) => {
    fileInput.current.click();
  };
  const fileInput = useRef(null);

  const [imageFile, setImageFile] = useState(null);

  const saveImgFile = () => {
    const file = fileInput.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
    setImgPath(file.name);
    setImageFile(file);
  };

  const [placeVisitIndex, setPlaceVisitIndex] = useState(-1);

  const { handleSubmit } = useForm();
  const handleReset = () => {
    setImgPath("");
    setImgFile("");
  };

  const { mutate } = useMutation(
    () => apiVisitSiteImageRegister(imageFile, visitSiteIndex),
    {
      onSuccess: (data) => {
        if (data.result === 0) {
          alert("이미지가 등록되었습니다.");
        }
      },
    }
  );

  const onSubmit = () => {
    mutate();
  };
  const [searchOption, setSearchOption] = useState({
    startDate: timeStart(),
    endDate: timeEnd(),
  });

  // 담당자 면담 통계
  const { data: managerInterview } = useQuery(
    [
      "managerInterviewStatis",
      {
        visitSiteIndex,
        startDate: searchOption.startDate,
        endDate: searchOption.endDate,
      },
    ],
    apiManagerInterviewStatis
  );

  // 방문객 면담 통계
  const { data: visitorInterview } = useQuery(
    [
      "visitorInterviewStatis",
      {
        visitSiteIndex,
        startDate: searchOption.startDate,
        endDate: searchOption.endDate,
      },
    ],
    apiVisitorInterviewStatis
  );

  return (
    <VisitSiteContext.Provider
      value={{
        placeVisitIndex,
        setPlaceVisitIndex,
        lengthPurposeOfVisit,
        purposeOfVisit,
      }}
    >
      <Layout menu={ADMIN_LIST}>
        <div className="admin-main">
          {/* 이미지 업로드 */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <section>
              {/* 학교이름 */}
              <div className="reg-title">
                <img src={PhotoIcon} alt="icon2" />
                <h2>학교이름</h2>
              </div>
              <div className="name-title">{visitSite?.visitSite?.name}</div>
              {/* 대표이미지 */}
              <div className="reg-title">
                <img src={PhotoIcon} alt="icon2" />
                <h2>대표 이미지</h2>
              </div>
              <div className="files-group">
                <div className="border-box">{imgPath}</div>
                <Button
                  height="35px"
                  color="white"
                  bg="#0066FF"
                  _hover={{ bg: "#0053CF" }}
                  onClick={handleButtonClick}
                  mr="1"
                >
                  찾기
                </Button>
                <Button
                  height="35px"
                  color="white"
                  bg="#D44242"
                  _hover={{ bg: "#B23232" }}
                  mr="1"
                  onClick={handleReset}
                >
                  삭제
                </Button>

                <input
                  accept="image/*"
                  ref={fileInput}
                  type="file"
                  style={{ display: "none" }}
                  onChange={saveImgFile}
                />
              </div>
              <div className="image-group">
                <p>미리보기</p>
                <div className="pre-image">
                  <img
                    src={imgFile ? imgFile : DefaultLogo}
                    alt="학교배너이미지"
                  />
                </div>
              </div>
              <Button colorScheme="green" type="submit">
                이미지 업로드
              </Button>
            </section>
          </form>

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

          <section>
            <div className="reg-title">
              <img src={PhotoIcon} alt="icon2" />
              <h2>기간별 담당자 및 방문객 면담횟수</h2>
            </div>
            <SearchDate
              searchOption={searchOption}
              setSearchOption={setSearchOption}
              title=""
            />
            <div className="interview-container">
              <div>
                <h3>담당자</h3>
                <table className="interview-statistics">
                  <thead>
                    <tr>
                      <td>No</td>
                      <td>이름</td>
                      <td>상담횟수</td>
                    </tr>
                  </thead>
                  <tbody>
                    {managerInterview?.managerInterviews?.map((item, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{item.accountName}</td>
                        <td>{item.interviewCnt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div>
                <h3>방문객</h3>
                <table className="interview-statistics">
                  <thead>
                    <tr>
                      <td>No</td>
                      <td>전화번호</td>
                      <td>상담횟수</td>
                    </tr>
                  </thead>
                  <tbody>
                    {visitorInterview?.visitorInterviews?.map((item, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{mobileDash(item.visitorTel)}</td>
                        <td>{item.interviewCnt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </VisitSiteContext.Provider>
  );
}
