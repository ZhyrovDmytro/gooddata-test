import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./Header.module.scss";

const Links: React.FC = () => {
    return (
        <>
            <NavLink to={"/gooddata-test/"} className={styles.Link} activeClassName={styles.LinkActive} exact>
                Homework
            </NavLink>
            <NavLink
                to={"/gooddata-test/insight"}
                className={styles.Link}
                activeClassName={styles.LinkActive}
                exact
            >
                Insight
            </NavLink>
        </>
    );
};

export default Links;
