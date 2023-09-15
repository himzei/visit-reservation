const TOKEN = localStorage.getItem("visitschool");

// 현대 아이피 주소
export async function ipData() {
  return await fetch("https://geolocation-db.com/json/").then((res) =>
    res.json()
  );
}

// 로그인
export async function login({ UserId, Password, ip }) {
  return await fetch(`/api/Account/login`, {
    method: "POST",
    headers: {
      accept: "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: UserId,
      password: Password,
      ip,
    }),
    credentials: "include",
  }).then((res) => res.json());
}

// Visit Site Index
export async function apiVisitSiteIndex() {
  return await fetch(`/api/VisitSite`, {
    method: "GET",
    headers: {
      accept: "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    credentials: "include",
  }).then((res) => res.json());
}

// 토큰 로그인
export async function apiTokenLogin() {
  return await fetch(`/api/Account/tokenlogin`, {
    method: "POST",
    headers: {
      accept: "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    credentials: "include",
  }).then((res) => res.json());
}

// 사용자관리 - 관리자등록
export async function adminManagerRegister(formData, visitSiteIndex) {
  return await fetch(`/api/Account`, {
    method: "POST",
    headers: {
      accept: "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({
      visitSiteIndex,
      account: {
        accountIndex: -1,
        userId: formData.email,
        password: formData.password,
        name: formData.name,
        tel: formData.tel,
        auth: parseInt(formData.auth),
        position: formData.state,
      },
    }),
    credentials: "include",
  }).then((res) => res.json());
}

// 정책 입력
export async function apiPolicyRegister(formData, visitSiteIndex) {
  return await fetch(`/api/Agreement`, {
    method: "POST",
    headers: {
      accept: "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({
      visitSiteIndex,
      agreement: {
        title: formData.title,
        isMust: formData.isMust,
        contents: formData.contents,
      },
    }),
    credentials: "include",
  }).then((res) => res.json());
}

// 정책수정
export async function apiPolicyEdit(agreementIndex, title, isMust, contents) {
  return await fetch(`/api/Agreement/${agreementIndex}`, {
    method: "PUT",
    headers: {
      accept: "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({
      agreementIndex,
      title,
      isMust,
      contents,
    }),
    credentials: "include",
  }).then((res) => res.json());
}

// 정책 불러오기
export async function apiAgreement({ queryKey }) {
  const visitSiteIndex = queryKey[1];
  return await fetch(`/api/Agreement?visitSiteIndex=${visitSiteIndex}`, {
    method: "GET",
    headers: {
      accept: "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    credentials: "include",
  }).then((res) => res.json());
}

// 방문지 등록하기
export async function apiVisitSiteRegister(formData, visitSiteIndex) {
  return await fetch(`/api/PlaceToVisit`, {
    method: "POST",
    headers: {
      accept: "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({
      visitSiteIndex,
      placeToVisit: {
        parrentIndex: -1,

        title: formData.title,
      },
    }),
    credentials: "include",
  }).then((res) => res.json());
}

// 방문지 불러오기
export async function apiGetVisitSite({ queryKey }) {
  const visitSiteIndex = queryKey[1];
  return await fetch(`/api/PlaceToVisit?visitSiteIndex=${visitSiteIndex}`, {
    method: "GET",
    headers: {
      accept: "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    credentials: "include",
  }).then((res) => res.json());
}

// 방문목적 등록하기
export async function apiPurposeOfVisitRegister(
  formData,
  visitSiteIndex,
  lengthPurposeOfVisit
) {
  const itemOrder = lengthPurposeOfVisit + 1;
  return await fetch(`/api/PurposeOfVisit`, {
    method: "POST",
    headers: {
      accept: "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({
      visitSiteIndex,
      purposeOfVisit: {
        parentIndex: -1,
        itemOrder,
        title: formData.title,
      },
    }),
    credentials: "include",
  }).then((res) => res.json());
}

// 방문목적 불러오기
export async function apiGetPurposeOfVisit({ queryKey }) {
  const visitSiteIndex = queryKey[1];
  return await fetch(`/api/PurposeOfVisit?visitSiteIndex=${visitSiteIndex}`, {
    method: "GET",
    headers: {
      accept: "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    credentials: "include",
  }).then((res) => res.json());
}
