import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import { getInstagramName } from "../api/users";
import * as gtag from "../utils/gtag";

function InstagramBtn({ el }) {
  const [loading, setLoading] = useState(false);
  const openUserProfile = async () => {
    const { instagram_user_id } = el;
    const windowReference = window.open();
    setLoading(true);
    try {
      const result = await getInstagramName(instagram_user_id);
      const {
        data: { username }
      } = result;
      gtag.event({
        action: "Open an Account success",
        category: "Instagram",
        label: instagram_user_id
      });
      windowReference.location = `https://www.instagram.com/${username}/`;
    } catch (e) {
      console.log(e);
      windowReference.close();
      gtag.event({
        action: "Open an Account error",
        category: "Instagram",
        label: instagram_user_id
      });
      alert("Something went wrong. Probably user was blocked or removed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {loading && (
        <FontAwesomeIcon color="black" pulse size="lg" icon={faSpinner} />
      )}
      {!loading && (
        <FontAwesomeIcon
          className="mr-2"
          color="black"
          size="lg"
          icon={faInstagram}
          onClick={openUserProfile}
        />
      )}
    </>
  );
}

export default InstagramBtn;
