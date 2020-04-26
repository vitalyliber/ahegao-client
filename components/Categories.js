import React, { useState } from "react";
import { Collapse, Button } from "reactstrap";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Categories = ({ list }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="mb-3">
      <div className="w-100 d-flex justify-content-end">
        <Button onClick={toggle} color="dark" className="btn-sm">
          Categories{" "}
          <FontAwesomeIcon
            color="white"
            size="lg"
            icon={faBars}
            className="ml-2"
          />
        </Button>
      </div>
      <Collapse isOpen={isOpen}>
        <div className="list-group mt-3">
          {list.map(({ label }) => (
            <Link
              key={label}
              href="/categories/[id]/[page]"
              as={`/categories/${label}/1`}
            >
              <a
                onClick={toggle}
                key={label}
                type="button"
                className="list-group-item list-group-item-action"
              >
                {label}
              </a>
            </Link>
          ))}
        </div>
      </Collapse>
    </div>
  );
};

export default Categories;
