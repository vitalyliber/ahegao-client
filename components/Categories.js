import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Categories = ({ list }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

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
              onClick={toggle}
              key={label}
              type="button"
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
