import { useRef, useState } from "react";
import DefaultLogo from "../assets/png/__high-logo.png";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { apiVisitSiteImageRegister } from "../api";
import PhotoIcon from "../assets/svg/photo-icon.svg";
import useVisitSite from "../hooks/useVisitSite";
import { Button } from "@chakra-ui/react";

export default function SettingSchoolName() {
  const { data: visitSite } = useVisitSite();
  const visitSiteIndex = visitSite?.visitSite?.visitSiteIndex;

  const fileInput = useRef(null);

  const [imgFile, setImgFile] = useState("");
  const [imgPath, setImgPath] = useState("");
  const [imageFile, setImageFile] = useState(null);
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

  const handleButtonClick = (e) => {
    fileInput.current.click();
  };

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

  return (
    <div>
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
              <img src={imgFile ? imgFile : DefaultLogo} alt="학교배너이미지" />
            </div>
          </div>
          <Button colorScheme="green" type="submit">
            이미지 업로드
          </Button>
        </section>
      </form>
    </div>
  );
}
