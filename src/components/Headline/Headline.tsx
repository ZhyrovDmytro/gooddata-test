import * as React from "react";

import styles from "./Headline.module.scss";

interface IHeadline {
    tag?: string;
}

function Headline(props: React.PropsWithChildren<IHeadline>): JSX.Element {
    const { children, tag } = props;

    if (tag === "h2") {
        return <h2 className={styles.Headline}>{children}</h2>;
    }

    return <h1 className={styles.Headline}>{children}</h1>;
}

export default Headline;
