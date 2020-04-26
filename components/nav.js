import React from "react";
import SmartLink from "./SmartLink";

const Nav = () => {
  return (
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
  );
};

export default Nav;
