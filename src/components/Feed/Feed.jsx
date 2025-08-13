import "./Feed.css";
import { useState, useEffect } from "react";
import ProfilePics from "../../assets/data/profilepics.json";
import {
  createPost,
  getPosts,
  likePost,
  dislikePost,
  deletePost,
} from "../../../utilities/post-api";
import Up from "../../assets/images/icons/up.png";
import Down from "../../assets/images/icons/down.png";

export default function Feed({ user }) {
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState(null);

  async function sendLike(postID) {
    try {
      let response = await likePost({ id: postID });
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === postID ? response : post))
      );
    } catch (error) {
      console.error("error like post".error);
    }
  }

  async function sendDelete(postID) {
    try {
      let response = await deletePost({ id: postID });
      if (response === true) {
        setPosts((prevPosts) =>
          prevPosts.filter((post) => post._id !== postID)
        );
      }
    } catch (error) {
      console.error("error delete post".error);
    }
  }

  async function sendDislike(postID) {
    try {
      let response = await dislikePost({ id: postID });
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === postID ? response : post))
      );
    } catch (error) {
      console.error("error dislike post".error);
    }
  }

  async function sendPost() {
    try {
      let response = await createPost({ content: content });
      if (response) {
        setPosts((prevPosts) => [response, ...prevPosts]);
      }
      setContent("");
    } catch (error) {
      console.error("error create post".error);
    }
  }

  useEffect(function () {
    async function get10() {
      try {
        const response = await getPosts();
        setPosts(response);
      } catch (error) {
        console.error("Error getting posts", error);
      }
    }
    get10();
  }, []);

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  function formatDate(dateString) {
    const date = new Date(dateString);

    const month = date.getMonth() + 1; // months are 0-indexed
    const day = date.getDate();
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");

    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // convert to 12-hour format

    return `${month}/${day}/${year} ${hours}:${minutes} ${ampm}`;
  }

  const sortByDate = () => {
    setPosts((prevPosts) =>
      [...prevPosts].sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      )
    );
  };

  const sortByLikes = () => {
    setPosts((prevPosts) =>
      [...prevPosts].sort((a, b) => b.likes.value - a.likes.value)
    );
  };

  const sortByDislikes = () => {
    setPosts((prevPosts) =>
      [...prevPosts].sort((a, b) => b.dislikes.value - a.dislikes.value)
    );
  };

  return (
    <div className="Feed">
      <div className="FeedSort">
        <h5>Sort Feed</h5>
        <ul className="SortList">
          <li onClick={sortByDate}>By Date</li>
          <li onClick={sortByLikes}>By Likes</li>
          <li onClick={sortByDislikes}>By Dislikes</li>
        </ul>
      </div>
      <div className="PostFeed">
        <div className="CreatePost">
          <div className="UserInfo">
            <div className="PostUser">
              {user && (
                <img className="PostPic" src={ProfilePics[user.pic].img} />
              )}
              <h5>{user.name}</h5>
            </div>
            <h5>DSP notes</h5>
          </div>

          <textarea
            className="PostArea"
            placeholder="Add a note"
            minLength={1}
            maxLength={200}
            onChange={handleChange}
          />
          <button className="PostBtn" onClick={sendPost}>
            Post to feed
          </button>
        </div>
        <ul className="Posts">
          {posts &&
            posts.map((post) => (
              <li key={post._id} className="Post">
                <div className="UserInfo">
                  <div className="PostUser">
                    <img
                      className="PostPic"
                      src={ProfilePics[post.user.pic].img}
                    />
                    <h5>{post.user.name}</h5>
                  </div>
                  <h5>{formatDate(post.createdAt)}</h5>
                </div>

                <p>{post.content}</p>
                {post.user._id === user._id && (
                  <button
                    className=" DeletePostBtn"
                    onClick={() => sendDelete(post._id)}
                  >
                    delete
                  </button>
                )}
                <div className="PostRating">
                  <div className="PostBtns">
                    <img
                      src={Up}
                      className="LikeBtn"
                      onClick={() => sendLike(post._id)}
                    />
                    <h5>{post.likes.value}</h5>
                  </div>
                  <div className="PostBtns">
                    <img
                      src={Down}
                      className="LikeBtn"
                      onClick={() => sendDislike(post._id)}
                    />
                    <h5>{post.dislikes.value}</h5>
                  </div>
                </div>
                <div className="LikeBar">
                  <div
                    style={{
                      width: `${
                        (post.dislikes.value /
                          (post.likes.value + post.dislikes.value)) *
                        100
                      }%`,
                    }}
                    className="DislikeBar"
                  ></div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
