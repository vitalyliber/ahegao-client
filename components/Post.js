import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import ReactPlayer from "react-player";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import InstagramBtn from "./InstagramBtn";
import SmartLink from "./SmartLink";
import Link from "next/link";

function Post({ el, showText, single }) {
  const getDimension = type => {
    if (el.file_type === "video") {
      return el.video_metadata[type];
    }
    if (el.file_type === "image") {
      return el.metadata[type];
    }
  };
  return (
    <div className="card border-0 mb-3" style={{ width: single && "100%" }}>
      <div className="d-flex align-items-center mb-2 justify-content-between">
        <SmartLink href="/users/[pid]" as={`/users/${el.user_id}`}>
          <a className="text-dark">
            <div className="d-flex align-items-center">
              {el.user_avatar && (
                <img
                  height="35"
                  width="35"
                  className="rounded-circle ml-2 ml-sm-0"
                  src={el.user_avatar}
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
            <div className="wrapper">
              <img className="element" src={el.image} alt="Ahegao face" />
            </div>
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
          <h6 className="text-center mt-3 premiumTitle">{el.premium_title}</h6>
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
              <Link
                key={category.label}
                href="/categories/[id]/[page]"
                as={`/categories/${category.label}/1`}
              >
                <a className="badge badge-dark ml-1" href="#">
                  {category.label}
                </a>
              </Link>
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
        .element {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  );
}

Post.defaultProps = {
  showText: false
};

export default Post;
