import { IAttribute, IAttributeOrMeasure, INullableFilter } from "@gooddata/sdk-model";
import { LineChart } from "@gooddata/sdk-ui-charts";
import React from "react";
import { DateMonth } from "../../ldm/full";

export interface IButtonProps {
    measure: IAttributeOrMeasure[];
    trendBy?: IAttribute;
    segmentBy: IAttribute;
    filters: INullableFilter[];
}

const LineChartComponent: React.FC<IButtonProps> = ({
    measure,
    trendBy = DateMonth.Short,
    segmentBy,
    filters,
}) => {
    return <LineChart measures={measure} trendBy={trendBy} segmentBy={segmentBy} filters={filters} />;
};

export default LineChartComponent;
