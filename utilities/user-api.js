import sendRequest from "./send-request";
const BASE_URL = "http://localhost:4741/users";

export async function signUp(userData) {
  return sendRequest(BASE_URL, "POST", userData);
}

export async function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, "POST", credentials);
}

export async function verifyEmail(code) {
  return sendRequest(`${BASE_URL}/verify`, "PUT", code);
}

export async function sendCode(email) {
  return sendRequest(`${BASE_URL}/sendcode`, "PUT", email);
}

export async function resetPW(password) {
  return sendRequest(`${BASE_URL}/resetpw`, "PUT", password);
}

export async function checkToken() {
  return sendRequest(`${BASE_URL}/check-token`);
}

export async function updatePP(pic) {
  try {
    return await sendRequest(`${BASE_URL}/updatepp`, "PUT", pic);
  } catch (error) {
    console.error("error changing profile pic", error);
  }
}
