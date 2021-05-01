import React from "react";
import Image from "next/image";
import Link from "next/link";
import * as gtag from "../utils/gtag";

const Categories = ({ list }) => {
  return (
    <div className="mb-3">
      <h4>Categories</h4>
      <div className="scrollmenu">
        {list.map(({ label }) => (
          <Link
            key={label}
            href="/categories/[id]/[page]"
            as={`/categories/${label.toLowerCase()}/1`}
          >
            <a
              className="float-text-container"
              onClick={() => {
                gtag.event({
                  action: "Open category",
                  category: label.toLowerCase()
                });
              }}
              key={label}
            >
              <Image
                width={200}
                height={200}
                src={`/${label.toLowerCase()}.jpg`}
              />
              <div className="float-text">{label}</div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
