const NiceTokenDatas = () => {
  // POST 요청을 위한 설정
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token_version_id: token_version_id,
      enc_data: encData,
      integrity_value: integrity_value,
    }),
    credentials: "include",
  };

  fetch("/api/Nice", requestOptions)
    .then((res) => res.json())
    .then((data) => {
      // 호출 성공
      setTokenData(data);
    })
    .catch((error) => {
      console.error("API 호출 중 에러 발생:", error);
    });
};

const NiceTokenData = async () => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token_version_id: token_version_id,
      enc_data: encData,
      integrity_value: integrity_value,
    }),
    credentials: "include",
  };
  return await axios
    .post(`/api/Nice`, {
      data: {
        token_version_id: token_version_id,
        enc_data: encData,
        integrity_value: integrity_value,
      },
    }
    .then((response) => response.data)
};
