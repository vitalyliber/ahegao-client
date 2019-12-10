import React, { useState, useEffect } from "react";
import Router from "next/router";
import Link from "next/link";

const Nav = ({ categories }) => {
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    const handleRouteChange = url => {
      console.log("App is changing to: ", url);
      setOpen(false);
    };

    Router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      Router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <div className="container">
        <Link href="/">
          <a className="navbar-brand rounded" href="#">
            <img src="/favicon.png" width="30" height="30" alt="" />
          </a>
        </Link>
        <Link href="/">
          <a className="navbar-brand" href="#">
            Ahegao Faces
          </a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setOpen(!isOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          style={{ display: isOpen ? "block" : "none" }}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mr-auto">
            {categories.map(el => (
              <li key={el.id} className="nav-item active">
                <Link href="/category/[pid]" as={`/category/${el.label}`}>
                  <a className="nav-link" href="#">
                    {el.label}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
