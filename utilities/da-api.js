import sendRequest from "./send-request";
const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:4741/das"
    : "https://apollodispatch-api.onrender.com/das";

//Get DAs
export async function getDAs() {
  return sendRequest(`${BASE_URL}/getDAs`);
}

//Create DA
export async function createDA(DA) {
  try {
    return await sendRequest(`${BASE_URL}/createDA`, "POST", DA);
  } catch (error) {
    console.error("Error creating DA", error);
  }
}

//Delete DA

export async function deleteDA(daID) {
  try {
    return await sendRequest(`${BASE_URL}/deleteda`, "DELETE", daID);
  } catch (error) {
    console.error("error deleting DA", error);
  }
}

//Flip DA status

export async function flipStatus(DAID) {
  try {
    return await sendRequest(`${BASE_URL}/flipstatus`, "PUT", DAID);
  } catch (error) {
    console.error("error flipping daid status", error);
  }
}

export async function resetAllStatus() {
  try {
    return await sendRequest(`${BASE_URL}/resetallstatus`, "PUT");
  } catch (error) {
    console.error("error resetting all status", error);
  }
}
