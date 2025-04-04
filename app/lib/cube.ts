// lib/cubejs.ts
export const CUBEJS_BASE_URL =
  "https://amaranth-muskox.aws-us-east-1.cubecloudapp.dev/dev-mode/feat/frontend-hiring-task/cubejs-api/v1/load";

export const CUBEJS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJicmFuZElkIjoiNDkiLCJleHAiOjE3NDM0OTYyMTIsImlzcyI6ImN1YmVjbG91ZCJ9.luqfkt0CQW_B01j5oAvl_8hicbFzPmyLXfvEZYJbej4";

export async function fetchCubeData(queryBody: any) {
  const res = await fetch(CUBEJS_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${CUBEJS_TOKEN}`,
    },
    body: JSON.stringify(queryBody),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data from Cube.js");
  }
  return res.json();
}
