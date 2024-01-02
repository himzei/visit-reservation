export default function NameLogoVisit() {
  return (
    <div>
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
              <p className="file-upload-text">5MB 이하 파일 업로드 권장</p>
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
      </div>
    </div>
  );
}
