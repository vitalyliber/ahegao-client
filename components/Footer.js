import React from "react";
import dayjs from "dayjs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer className="text-muted pb-3 pt-3 bg-light">
      <div className="container">
        <p className="mb-0 text-center">Ahegao faces, {dayjs().format("YYYY")}</p>
        <p className="text-center mt-3">
          <a
            className="text-dark"
            target="_blank"
            href="https://github.com/vitalyliber/ahegao-client"
          >
            <FontAwesomeIcon className="mr-2" color="black" size="lg" icon={faGithub} />
            GitHub
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
