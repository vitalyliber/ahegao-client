import React from "react";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faTwitter,
  faTelegram,
  faVk
} from "@fortawesome/free-brands-svg-icons";
import * as gtag from "../utils/gtag";

function Footer() {
  return (
    <footer className="text-muted pb-3 pt-3 bg-light mt-3">
      <div className="container">
        <p className="mb-0 text-center">
          Ahegao faces, {dayjs().format("YYYY")}
        </p>
        <p className="text-center mt-3">
          <a
            className="text-dark"
            target="_blank"
            href="https://github.com/vitalyliber/ahegao-client"
            onClick={() =>
              gtag.event({
                action: "Open github",
                category: "Social link"
              })
            }
          >
            <FontAwesomeIcon color="black" size="lg" icon={faGithub} />
          </a>
          <a
            className="text-dark ml-3"
            target="_blank"
            href="https://twitter.com/ahegaofacess"
            onClick={() =>
              gtag.event({
                action: "Open twitter",
                category: "Social link"
              })
            }
          >
            <FontAwesomeIcon color="black" size="lg" icon={faTwitter} />
          </a>
          <a
            className="text-dark ml-3"
            target="_blank"
            href="https://t.me/ahegaolikes"
            onClick={() =>
              gtag.event({
                action: "Open telegram",
                category: "Social link"
              })
            }
          >
            <FontAwesomeIcon color="black" size="lg" icon={faTelegram} />
          </a>
          <a
            className="text-dark ml-3"
            target="_blank"
            href="https://vk.com/public182348311"
            onClick={() =>
              gtag.event({
                action: "Open vkontakte",
                category: "Social link"
              })
            }
          >
            <FontAwesomeIcon color="black" size="lg" icon={faVk} />
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
