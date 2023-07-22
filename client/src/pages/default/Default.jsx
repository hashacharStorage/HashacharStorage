import React, { useEffect } from "react";
import { handleUserRedirect } from "../../utils/userVerification";

const Default = () => {
  useEffect(() => {
    const redirectPath = handleUserRedirect();
    if (window.location.pathname !== redirectPath) {
      window.location.pathname = redirectPath;
    }
  }, []);
};

export default Default;
