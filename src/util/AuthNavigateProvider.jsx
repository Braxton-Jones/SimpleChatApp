import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import { useNavigate } from "react-router-dom";

export const AuthNavigateProvider = ({ children }) => {
  const navigate = useNavigate();

  const onRedirectCallback = (appState) => {
    // When user is redirected from Auth0, this function will be called
    navigate(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain="dev-ku6xx3xu75n332vz.us.auth0.com"
      clientId="0ETIEY2Lz8zkhDcn3degpboLOZ3LFMkO"
      redirectUri="http://localhost:5173/callback"
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};
