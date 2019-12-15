import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import useStoreon from "storeon/react";
import { deletePostLike, likePost } from "../api/posts";

function LikeBtn({ el: { liked, id, updatePost } }) {
  const {
    dispatch,
    user: { authorized }
  } = useStoreon("user");
  return (
    <FontAwesomeIcon
      onClick={async () => {
        if (!authorized) {
          dispatch("user/showAuthModal");
        }
        if (authorized) {
          try {
            if (liked) {
              const response = await deletePostLike(id);
              const {
                data: { product }
              } = response;
              updatePost(product);
            }
            if (!liked) {
              const response = await likePost(id);
              const {
                data: { product }
              } = response;
              updatePost(product);
            }
          } catch (e) {
            alert("Something went wrong");
          }
        }
      }}
      className={`cp ml-2 mr-1 ${liked ? "text-danger" : "text-dark"}`}
      size="lg"
      icon={liked ? faHeart : farHeart}
    />
  );
}

export default LikeBtn;
