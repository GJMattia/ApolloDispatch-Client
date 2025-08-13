import sendRequest from "./send-request";
const BASE_URL = "http://localhost:4741/posts";

//Get first 10 posts
export async function getPosts() {
  return sendRequest(`${BASE_URL}/get10`);
}

//Add post
export async function createPost(content) {
  try {
    return await sendRequest(`${BASE_URL}/createpost`, "POST", content);
  } catch (error) {
    console.error("Error creating post", error);
  }
}

//Send Like
export async function likePost(id) {
  try {
    return await sendRequest(`${BASE_URL}/likepost`, "PUT", id);
  } catch (error) {
    console.error("error liking post", error);
  }
}

//Send Dislike
export async function dislikePost(id) {
  try {
    return await sendRequest(`${BASE_URL}/dislikepost`, "PUT", id);
  } catch (error) {
    console.error("error disliking post", error);
  }
}

export async function deletePost(id) {
  try {
    return await sendRequest(`${BASE_URL}/deletepost`, "DELETE", id);
  } catch (error) {
    console.error("error deleting post", error);
  }
}
