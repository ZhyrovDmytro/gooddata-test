import React from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";

import { WorkspaceProvider } from "../contexts/Workspace";

import Login from "./Login";
import Logout from "./Logout";
import Homework from "./Homework";
import Insight from "./Insight";

import styles from "./AppRouter.module.scss";

// Uncomment these lines if you want to redirect unauthorized users to login form
import { useAuth } from "../contexts/Auth";
import { AuthStatus } from "../contexts/Auth/state";
export const RedirectIfNotLoggedIn: React.FC = () => {
    const auth = useAuth();
    const shouldRedirectToLogin = auth.authStatus === AuthStatus.UNAUTHORIZED;
    return shouldRedirectToLogin ? <Route component={() => <Redirect to="/gooddata-test/login" />} /> : null;
};

const AppRouter: React.FC = () => {
    return (
        <div className={styles.AppRouter}>
            <Router>
                {/* WorkspaceProvider depends on Router so it must be nested */}
                <WorkspaceProvider>
                    <Route exact path="/gooddata-test/" component={Homework} />
                    <Route exact path="/gooddata-test/insight" component={Insight} />
                    <Route exact path="/gooddata-test/login" component={Login} />
                    <Route exact path="/gooddata-test/logout" component={Logout} />
                    <RedirectIfNotLoggedIn />
                </WorkspaceProvider>
            </Router>
        </div>
    );
};

export default AppRouter;
