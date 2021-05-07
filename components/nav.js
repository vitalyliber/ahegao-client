import React from "react";
import { withUserAgent } from "next-useragent";
import SmartLink from "./SmartLink";
import * as gtag from "../utils/gtag";

const items = [
  {
    ios: {
      name: "Tech Remote Jobs",
      icon: "https://remote.casply.com/icon.png",
      link: "https://apps.apple.com/us/app/tech-remote-jobs/id1536178505"
    },
    android: {
      name: "Tech Remote Jobs",
      icon: "https://remote.casply.com/icon.png",
      link: "https://play.google.com/store/apps/details?id=com.remotejobsexpo"
    }
  },
  {
    ios: {
      name: "Irregular Verbs",
      icon: "https://iv.casply.com/logo.png",
      link: "https://apps.apple.com/us/app/iv-irregular-verbs/id1531830827"
    },
    android: {
      name: "Irregular Verbs",
      icon: "https://iv.casply.com/logo.png",
      link: "https://play.google.com/store/apps/details?id=com.casply.irregular"
    }
  },
  {
    ios: {
      name: "Birthday Reminder",
      icon: "https://bip.casply.com/logo.png",
      link: "https://apps.apple.com/us/app/bip-birthday-reminder/id1532232017"
    },
    android: {
      name: "Birthday Reminder",
      icon: "https://bip.casply.com/logo.png",
      link:
        "https://play.google.com/store/apps/details?id=com.casply.birthdayreminder"
    }
  }
];

const advertisement = items[Math.floor(Math.random() * items.length)];

const Nav = ({ ua }) => {
  const { isAndroid, isIos } = ua || {
    isAndroid: false,
    isIos: false
  };
  let advertisementObject = null;
  if (isAndroid) {
    advertisementObject = advertisement.android;
  }
  if (isIos) {
    advertisementObject = advertisement.ios;
  }

  return (
    <div>
      {advertisementObject && (
        <div className="d-flex flex-row bg-white p-4 align-content-center justify-content-between">
          <div className="d-flex flex-row justify-content-center align-items-center">
            <img height="30" width="30" src={advertisementObject.icon} />
            <div className="ml-2 font-weight-bolder">
              {advertisementObject.name}
            </div>
          </div>
          <a
            href={advertisementObject.link}
            target="_blank"
            className="btn btn-info text-white"
            onClick={() =>
              gtag.event({
                action: "Open Ad",
                category: advertisementObject.name
              })
            }
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
