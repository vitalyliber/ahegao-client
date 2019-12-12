import React from "react";
import dayjs from "dayjs";

function Footer() {
  return (
    <footer className="text-muted pb-3 pt-3 bg-light">
      <div className="container">
        <p className="float-right">
          <a
            className="text-dark"
            target="_blank"
            href="https://github.com/vitalyliber/ahegao-client"
          >
            GitHub
          </a>
        </p>
        <p className="mb-0">Ahegao faces, {dayjs().format("YYYY")}</p>
      </div>
    </footer>
  );
}

export default Footer;
