import Link from "next/link";
import React from "react";
import { withRouter } from "next/router";

function SmartLink({ children, href, as, router }) {
  if ([as, href].includes(router.asPath)) {
    return <div onClick={e => e.preventDefault()}>{children}</div>;
  }
  return (
    <Link href={href} as={as}>
      {children}
    </Link>
  );
}

export default withRouter(SmartLink);
