import React from "react";
import { withUserAgent } from "next-useragent";
import SmartLink from "./SmartLink";

const Nav = ({ ua }) => {
  const { isAndroid } = ua || { isAndroid: false };

  return (
    <div>
      {isAndroid && (
        <div className="d-flex flex-row bg-white p-4 align-content-center justify-content-between">
          <div className="d-flex flex-row justify-content-center align-items-center">
            <img
              height="30"
              width="30"
              src="https://lh3.googleusercontent.com/E6zwMOob9cK0kcoCImy_5Zdev_FQluLGVIlIVNEJ0UihtmrtnQUh_a45bKfGvfjzafk=s180-rw"
            />
            <div className="ml-2 font-weight-bolder">Birthday Reminder</div>
          </div>
          <a
            href="https://play.google.com/store/apps/details?id=com.casply.birthdayreminder"
            target="_blank"
            className="btn btn-info text-white"
          >
            Install
          </a>
        </div>
      )}
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div className="container">
          <SmartLink href="/">
            <a className="navbar-brand rounded" href="#">
              <img src="/favicon.png" width="30" height="30" alt="" />
            </a>
          </SmartLink>
          <SmartLink href="/">
            <a className="navbar-brand" href="#">
              Ahegao Faces
            </a>
          </SmartLink>
          <div />
        </div>
      </nav>
    </div>
  );
};

export default withUserAgent(Nav);
