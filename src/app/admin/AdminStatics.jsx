import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import { ADMIN_LIST } from "../../lib/menuList";
import { Button } from "@chakra-ui/react";
import { useMutation } from "react-query";
import { apiNiceGetToken } from "../../api";

export default function AdminStatics() {
  const { mutate, data } = useMutation(apiNiceGetToken);

  useEffect(() => {
    if (navigator.geolocation) {
      // GPS를 지원하면
      navigator.geolocation.getCurrentPosition(
        function (position) {
          alert(position.coords.latitude + " " + position.coords.longitude);
        },
        function (error) {
          console.error(error);
        },
        {
          enableHighAccuracy: false,
          maximumAge: 0,
          timeout: Infinity,
        }
      );
    } else {
      alert("GPS를 지원하지 않습니다");
    }
  });

  const handleClick = () => {
    alert("click");
    mutate();
  };
  return (
    <Layout menu={ADMIN_LIST}>
      <div>AdminConfirm</div>
      <Button onClick={handleClick}>나이스인증</Button>
    </Layout>
  );
}
