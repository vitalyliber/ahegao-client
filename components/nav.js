import React, { useEffect } from "react";
import Router, { withRouter } from "next/router";
import Link from "next/link";
import useStoreon from "storeon/react";
import Cookies from "js-cookie";

const Nav = ({ router }) => {
  const {
    dispatch,
    user: { authorized },
    categories: { list },
    ui: { burgerVisible }
  } = useStoreon("user", "categories", "ui");

  useEffect(() => {
    const handleRouteChange = url => {
      console.log("App is changing to: ", url);
      dispatch("ui/hideBurger");
    };

    Router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      Router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  const linkActiveClass = link => {
    return router.asPath === link ? "active" : "";
  };

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
          onClick={() => dispatch("ui/toggleBurger")}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          style={{ display: burgerVisible ? "block" : "none" }}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mr-auto">
            {list.map(el => {
              const link = `/categories/${el.label}`;
              return (
                <li key={el.id} className={`nav-item ${linkActiveClass(link)}`}>
                  <Link href="/categories/[pid]" as={link}>
                    <a className="nav-link" href="#">
                      {el.label}
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
          <ul className="navbar-nav ml-auto">
            <li key="login" className="nav-item">
              <a
                onClick={e => {
                  e.preventDefault();
                  if (authorized) {
                    Cookies.remove("token");
                    dispatch("user/set_local_info", {
                      authorized: false,
                      admin: false
                    });
                    dispatch("ui/hideBurger");
                  } else {
                    dispatch("user/showAuthModal");
                  }
                }}
                className="nav-link"
                href="#"
              >
                {authorized ? "Logout" : "Login"}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default withRouter(Nav);
