import { InsightView } from "@gooddata/sdk-ui-ext";
import * as React from "react";

import Page from "../components/Page";
import { Insights } from "../ldm/full";

const Insight: React.FC = () => {
    return (
        <Page>
            <div style={{ height: 300 }}>
                <InsightView insight={Insights.ProductBreakdown} />
            </div>
        </Page>
    );
};

export default Insight;
