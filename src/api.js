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
