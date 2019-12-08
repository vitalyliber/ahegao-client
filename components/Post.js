import { useState } from "react";
import Link from "next/link";
import { Waypoint } from "react-waypoint";
import dayjs from "dayjs";
import React from "react";

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
      <div className="col-sm-12 col-md-6" key={el.id}>
        <div className="d-flex align-items-center mb-2 justify-content-between">
          <Link href="/user/[pid]" as={`/user/${el.user_id}`}>
            <div className="d-flex align-items-center">
              <img
                height="35"
                width="35"
                className="rounded-circle"
                src={avatar}
                alt={`Ahegao face from ${el.username}`}
              />
              <p className="mb-0 ml-2 font-weight-bold">{el.username}</p>
            </div>
          </Link>
          <div className="text-black-50 d-inline">
            {dayjs(el.updated_at).fromNow()}
          </div>
        </div>
        <Link href="/post/[pid]" as={`/post/${el.id}`}>
          <img className="img-fluid mb-3" src={image} alt="Ahegao face" />
        </Link>
      </div>
    </Waypoint>
  );
}

export default Post;
