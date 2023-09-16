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

// 사용자 관리 페이지 불러오기
// queryKey: getManager
export async function apiGetManager({ queryKey }) {
  const { visitSiteIndex, page, pageRange } = queryKey[1];
  return await fetch(
    `/api/Account?visitSiteIndex=${visitSiteIndex}&page=${page}&pageRange=${pageRange}`,
    {
      method: "GET",
      headers: {
        accept: "*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      credentials: "include",
    }
  ).then((res) => res.json());
}

// 사용자관리 수정하기
export async function apiPutManager(formData) {
  const { accountIndex, userId, password, name, tel, auth, position } =
    formData;

  return await fetch(`/api/Account/${accountIndex}`, {
    method: "PUT",
    headers: {
      accept: "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({
      userId,
      password,
      name,
      tel,
      auth,
      position,
    }),
    credentials: "include",
  }).then((res) => res.json());
}

// 사용자관리 삭제하기
export async function apiDeleteManager(accountIndex) {
  return await fetch(`/api/Account/${accountIndex}`, {
    method: "DELETE",
    headers: {
      accept: "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
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
  const itemOrder =
    lengthPurposeOfVisit === undefined ? 1 : lengthPurposeOfVisit + 1;
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
// queryKey : getPurposeOfVisit
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

// 방문목적 수정하기
export async function apiPurposeOfVisitEdit(props) {
  const title = props[0];
  const purposeOfVisitIndex = props[1].purposeOfVisitIndex;
  const parentIndex = props[1].parentIndex;
  const itemOrder = props[1].itemOrder;

  return await fetch(`/api/PurposeOfVisit/${purposeOfVisitIndex}`, {
    method: "PUT",
    headers: {
      accept: "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({
      purposeOfVisitIndex,
      parentIndex,
      itemOrder,
      title,
    }),
    credentials: "include",
  }).then((res) => res.json());
}

// 방문목적 삭제하기
export async function apiPurposeOfVisitDelete(purposeOfVisitIndex) {
  return await fetch(`/api/PurposeOfVisit/${purposeOfVisitIndex}`, {
    method: "DELETE",
    headers: {
      accept: "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },

    credentials: "include",
  }).then((res) => res.json());
}

// 상시방문자 추가
export async function apiVisitorRegister(formData, visitSiteIndex) {
  return await fetch(`/api/Visitor`, {
    method: "POST",
    headers: {
      accept: "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({
      visitSiteIndex,
      visitor: {
        // visitorIndex: formData.visitorIndex,
        name: formData.name,
        tel: formData.tel,
        type: parseInt(formData.type),
        code: formData.code,
        carNumber: formData.carNumber,
        purposeOfVisit: formData.purposeOfVisit,
        placeToVisit: formData.placeToVisit,
        enterStartDate: formData.enterStartDate,
        enterEndDate: formData.enterEndDate,
      },
    }),
    credentials: "include",
  }).then((res) => res.json());
}

// 상시방문자 불러오기
// queryKey : getVisitor
export async function apiGetVisitor({ queryKey }) {
  const { visitSiteIndex, page, type, pageRange } = queryKey[1];
  return await fetch(
    `/api/Visitor/type?visitSiteIndex=${visitSiteIndex}&type=${type}&page=${page}&pageRange=${pageRange}`,
    {
      method: "GET",
      headers: {
        accept: "*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      credentials: "include",
    }
  ).then((res) => res.json());
}

// 방문자 수정하기
export async function apiPutVisitor(formData) {
  const {
    visitorIndex,
    name,
    tel,
    carNumber,
    placeToVisit,
    purposeOfVisit,
    enterStartDate,
    enterEndDate,
  } = formData;
  return await fetch(`/api/Visitor/${visitorIndex}`, {
    method: "PUT",
    headers: {
      accept: "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({
      name,
      tel,
      carNumber,
      placeToVisit,
      purposeOfVisit,
      enterStartDate,
      enterEndDate,
    }),
    credentials: "include",
  }).then((res) => res.json());
}

// 방문자 삭제하기
export async function apiDeleteVisitor(visitorIndex) {
  return await fetch(`/api/Visitor/${visitorIndex}`, {
    method: "DELETE",
    headers: {
      accept: "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    credentials: "include",
  }).then((res) => res.json());
}
