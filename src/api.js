export async function login({ UserId, password }) {
  return await fetch(`/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      UserId,
      Password: password,
    }),
    credentials: "include",
  }).then((res) => res.json());
}
