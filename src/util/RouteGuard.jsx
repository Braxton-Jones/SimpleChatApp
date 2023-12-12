import { withAuthenticationRequired } from "@auth0/auth0-react";
import React from "react";
import PageLoader from "../ui/components/PageLoader";
export const RouteGuard = ({component}) => {
    const GuardedComponent = withAuthenticationRequired(component, {
        onRedirecting: () => <PageLoader/>,

    });
    return <GuardedComponent/>;
}