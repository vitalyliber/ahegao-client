import React, { useState, Fragment } from "react";
import { Waypoint } from "react-waypoint";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import ReactPlayer from "react-player";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import InstagramBtn from "./InstagramBtn";
import LikeBtn from "./LikeBtn";
import SmartLink from "./SmartLink";

function Post({ el, ua, showText, single }) {
  const generateSvg = (w, h) =>
    `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' ><rect width='${w}' height='${h}' style="fill:rgb(235,235,230)"/></svg>`;
  const [avatar, setAvatar] = useState(
    ua && ua.isBot ? el.user_avatar_direct : generateSvg(50, 50)
  );
  const getDimension = type => {
    if (el.file_type === "video") {
      return el.video_metadata[type];
    }
    if (el.file_type === "image") {
      return el.metadata[type];
    }
  };
  const [image, setImage] = useState(
    ua && ua.isBot
      ? el.image_direct
      : generateSvg(getDimension("width"), getDimension("height"))
  );
  return (
    <Waypoint
      onEnter={() => {
        setImage(el.image);
        setAvatar(el.user_avatar);
      }}
    >
      <div style={{ width: single && "100%" }}>
        <div className="d-flex align-items-center mb-2 justify-content-between">
          <SmartLink href="/users/[pid]" as={`/users/${el.user_id}`}>
            <a className="text-dark">
              <div className="d-flex align-items-center">
                {el.user_avatar && (
                  <img
                    height="35"
                    width="35"
                    className="rounded-circle ml-2 ml-sm-0"
                    src={avatar}
                    alt={`Ahegao face from ${el.username}`}
                  />
                )}

                <p className="mb-0 ml-2 font-weight-bold">{el.username}</p>
              </div>
            </a>
          </SmartLink>
          <div className="text-black-50 d-inline mr-2 mr-sm-0">
            {dayjs(el.updated_at).fromNow()}
          </div>
        </div>
        {el.file_type === "image" && (
          <SmartLink href="/posts/[pid]" as={`/posts/${el.id}`}>
            <a>
              <img className="img-fluid" src={image} alt="Ahegao face" />
            </a>
          </SmartLink>
        )}
        {el.file_type === "video" && (
          <div className="wrapper">
            <ReactPlayer
              style={{
                position: "absolute",
                top: 0,
                left: 0
              }}
              url={el.video}
              light={el.video_preview}
              playing
              controls
              width="100%"
              height="100%"
            />
          </div>
        )}
        {el.status === "premium_published" && (
          <>
            <h6 className="text-center mt-3 premiumTitle">
              {el.premium_title}
            </h6>
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0 price">{el.price}</h5>
              <button type="button" className="btn btn-outline-primary btn-sm">
                Buy images
              </button>
            </div>
          </>
        )}
        <div className="d-flex justify-content-between ml-2 ml-sm-0 mr-2 mr-sm-0 mt-3">
          <div>
            <InstagramBtn el={el} />
            <LikeBtn el={el} />
            <a
              className="text-dark"
              href={`${el.image_direct}?disposition=attachment`}
            >
              <FontAwesomeIcon className="ml-2" icon={faDownload} />
            </a>
          </div>

          <div>
            {el.categories.map(category => {
              return (
                <SmartLink
                  key={category.label}
                  href="/categories/[pid]"
                  as={`/categories/${category.label}`}
                >
                  <a className="badge badge-dark ml-1" href="#">
                    {category.label}
                  </a>
                </SmartLink>
              );
            })}
          </div>
        </div>
        {showText && (
          <p className="mt-3 ml-3 mr-3 ml-sm-0 mr-sm-0 wordBreak">
            {el.text.split("\n").map((item, index) => {
              return (
                <Fragment key={index}>
                  {item}
                  <br />
                </Fragment>
              );
            })}
          </p>
        )}
        <style jsx>{`
          .premiumTitle {
            color: #343434;
          }
          .price {
            color: #f11b86;
          }
          .wordBreak {
            word-break: break-all;
          }
          .wrapper {
            position: relative;
            padding-top: ${100 /
              (getDimension("width") / getDimension("height"))}%;
          }
        `}</style>
      </div>
    </Waypoint>
  );
}

Post.defaultProps = {
  showText: false
};

export default Post;
