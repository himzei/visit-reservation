import "./AdminProfile.css";
import React from "react";
import Layout from "../../components/Layout";
import { ADMIN_LIST } from "../../lib/menuList";
import { Button, Image, Text } from "@chakra-ui/react";
import PasswordEye from "../../assets/svg/password-eye.svg";
import PassIcon from "../../assets/svg/input-password.svg";

export default function AdminProfile() {
  return (
    <Layout menu={ADMIN_LIST}>
      <div className="admin-profile">
        <section>
          <div className="reg-title">
            <img src={PassIcon} alt="icon2" />
            <h2>연락처 변경</h2>
          </div>
          <div className="input-group">
            <div>휴대전화번호</div>
            <input type="text" placeholder="성함을 입력해 주세요." />

            <Button
              position="absolute"
              right="0"
              bottom="4"
              colorScheme="blue"
              size="xs"
              px="4"
            >
              인증번호 발송
            </Button>
          </div>
          <div className="input-group">
            <div>인증번호</div>
            <input type="text" placeholder="휴대전화번호를 입력해 주세요." />
            <Text position="absolute" right="8" color="red.500">
              02:22
            </Text>
          </div>
        </section>
        <section>
          <div className="reg-title">
            <img src={PassIcon} alt="icon2" />
            <h2>비밀번호 변경</h2>
          </div>
          <div className="input-group">
            <div>현재비밀번호</div>
            <input type="text" placeholder="성함을 입력해 주세요." />
            <Image src={PasswordEye} position="absolute" right="8" />
          </div>
          <div className="input-group">
            <div>새 비밀번호</div>
            <input type="text" placeholder="휴대전화번호를 입력해 주세요." />
            <Image src={PasswordEye} position="absolute" right="8" />
          </div>
          <div className="input-group">
            <div>새 비밀번호 확인</div>
            <input type="text" placeholder="차량번호를 입력해 주세요." />
            <Image src={PasswordEye} position="absolute" right="8" />
          </div>
        </section>
        <div className="btn-container">
          <Button mx="2" colorScheme="blue" variant="outline">
            되돌리기
          </Button>
          <Button mx="2" colorScheme="blue">
            등록하기
          </Button>
        </div>
      </div>
    </Layout>
  );
}
