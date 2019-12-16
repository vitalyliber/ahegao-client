import React, { useState } from "react";
import Link from "next/link";
import { Waypoint } from "react-waypoint";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import InstagramBtn from "./InstagramBtn";
import LikeBtn from "./LikeBtn";

function Post({ el }) {
  const generateSvg = (w, h) =>
    `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' ><rect width='${w}' height='${h}' style="fill:rgb(235,235,230)"/></svg>`;
  const [avatar, setAvatar] = useState(generateSvg(50, 50));
  const [image, setImage] = useState(
    generateSvg(el.metadata.width, el.metadata.height)
  );
  return (
    <Waypoint
      onEnter={() => {
        setImage(el.image);
        setAvatar(el.user_avatar);
      }}
    >
      <div>
        <div className="d-flex align-items-center mb-2 justify-content-between">
          <Link href="/users/[pid]" as={`/users/${el.user_id}`}>
            <a className="text-dark">
              <div className="d-flex align-items-center">
                <img
                  height="35"
                  width="35"
                  className="rounded-circle ml-2 ml-sm-0"
                  src={avatar}
                  alt={`Ahegao face from ${el.username}`}
                />
                <p className="mb-0 ml-2 font-weight-bold">{el.username}</p>
              </div>
            </a>
          </Link>
          <div className="text-black-50 d-inline mr-2 mr-sm-0">
            {dayjs(el.updated_at).fromNow()}
          </div>
        </div>
        <Link href="/posts/[pid]" as={`/posts/${el.id}`}>
          <a>
            <img className="img-fluid" src={image} alt="Ahegao face" />
          </a>
        </Link>
        <div className="d-flex justify-content-between ml-2 ml-sm-0 mr-2 mr-sm-0 mt-3">
          <div>
            <InstagramBtn el={el} />
            <LikeBtn el={el} />
          </div>

          <div>
            {el.categories.map(category => {
              return (
                <Link
                  key={category.label}
                  href="/categories/[pid]"
                  as={`/categories/${category.label}`}
                >
                  <a className="badge badge-dark ml-1">{category.label}</a>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </Waypoint>
  );
}

export default Post;
