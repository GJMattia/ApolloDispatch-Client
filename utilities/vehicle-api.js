import sendRequest from "./send-request";
// const BASE_URL = "http://localhost:4741/vehicles";
const BASE_URL = "https://apollodispatch-api.onrender.com/vehicles";

export async function getVehicles() {
  return sendRequest(`${BASE_URL}/getvehicles`);
}

export async function createVehicle(content) {
  try {
    return await sendRequest(`${BASE_URL}/createvehicle`, "POST", content);
  } catch (error) {
    console.error("Error creating vehicle", error);
  }
}

export async function updateTire(tireInfo) {
  try {
    return await sendRequest(`${BASE_URL}/updatetire`, "PUT", tireInfo);
  } catch (error) {
    console.error("error updating tire", error);
  }
}

export async function updateFluid(fluidInfo) {
  try {
    return await sendRequest(`${BASE_URL}/updatefluid`, "PUT", fluidInfo);
  } catch (error) {
    console.error("error updating tire", error);
  }
}

export async function updateStatus(statusInfo) {
  try {
    return await sendRequest(`${BASE_URL}/updatestatus`, "PUT", statusInfo);
  } catch (error) {
    console.error("error updating drive status", error);
  }
}

export async function updateRegistration(registrationInfo) {
  try {
    return await sendRequest(
      `${BASE_URL}/updateregistration`,
      "PUT",
      registrationInfo
    );
  } catch (error) {
    console.error("error updating drive status", error);
  }
}

export async function addNote(noteInfo) {
  try {
    return await sendRequest(`${BASE_URL}/addnote`, "PUT", noteInfo);
  } catch (error) {
    console.error("error adding note", error);
  }
}

export async function deleteNote(deleteInfo) {
  try {
    return await sendRequest(`${BASE_URL}/deletenote`, "DELETE", deleteInfo);
  } catch (error) {
    console.error("error deleting note", error);
  }
}
