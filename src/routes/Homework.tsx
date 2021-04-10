import { IAllTimeDateFilterOption } from "@gooddata/sdk-backend-spi";
import { newMeasureValueFilter } from "@gooddata/sdk-model";
import { useDataView, useExecution } from "@gooddata/sdk-ui";
import { DateFilterHelpers, DateFilterOption } from "@gooddata/sdk-ui-filters";
import * as React from "react";
import Select from "../components/controls/Select";
import DateFilterComponent, {
    dateFilterOptions,
} from "../components/DateFilterComponent/DateFilterComponent";
import Headline from "../components/Headline/Headline";
import LineChartComponent from "../components/LineChartComponent/LineChartCoomponent";

import styles from "./Homework.module.scss";

import Page from "../components/Page";
import { DateDatasets, Product, Revenue } from "../ldm/full";

const SELECT_OPTIONS = [
    {
        value: "ALL",
        text: "All Products",
    },
    {
        value: "GREATER_THAN_1500",
        text: "Revenue greater than 1500",
    },
    {
        value: "LESS_THAN_1500",
        text: "Revenue less than 1500",
    },
];

export const defaultStateDateFilter = dateFilterOptions.allTime;

const Homework: React.FC = () => {
    const [state, setState] = React.useState<{
        selectedFilterOption: any | undefined;
        excludeCurrentPeriod: boolean;
    }>({
        selectedFilterOption: defaultStateDateFilter,
        excludeCurrentPeriod: false,
    });

    const [selectedOption, setSelectedOption] = React.useState(SELECT_OPTIONS[0].value);

    const measure = [Revenue];

    const onApply = React.useCallback(
        (selectedFilterOption: DateFilterOption, excludeCurrentPeriod: boolean) => {
            setState({
                selectedFilterOption: selectedFilterOption as IAllTimeDateFilterOption,
                excludeCurrentPeriod,
            });
        },
        [setState],
    );

    const dateFilter = DateFilterHelpers.mapOptionToAfm(
        state.selectedFilterOption,
        DateDatasets.Date.ref,
        state.excludeCurrentPeriod,
    );
    const greaterThanFilter = newMeasureValueFilter(Revenue, "GREATER_THAN", 1500);
    const lessThanFilter = newMeasureValueFilter(Revenue, "LESS_THAN", 1500);

    const getSelectFilter = () => {
        if (selectedOption === "GREATER_THAN_1500") {
            return greaterThanFilter;
        } else if (selectedOption === "LESS_THAN_1500") {
            return lessThanFilter;
        }

        return undefined;
    };

    const execution = useExecution({
        seriesBy: measure,
        filters: [dateFilter, getSelectFilter()],
    });

    const { result, status } = useDataView({ execution }, [execution?.fingerprint()]);
    const measureSeriesRevenue = result
        ?.data()
        .series()
        .firstForMeasure(Revenue);

    const handleSelect = React.useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            setSelectedOption(e.target.value);
        },
        [setSelectedOption],
    );

    const dashboardTitle = state.selectedFilterOption?.name;
    return (
        <Page>
            <Headline>My Dashboard: {dashboardTitle}</Headline>
            <div className={styles.dashboard}>
                <div className={styles.filter}>
                    <div className={styles.dateFilterWrapper}>
                        <DateFilterComponent
                            excludeCurrentPeriod={state.excludeCurrentPeriod}
                            selectedFilterOption={state.selectedFilterOption}
                            onApply={onApply}
                        />
                    </div>
                </div>
                <div className={styles.chart}>
                    <LineChartComponent
                        measure={measure}
                        segmentBy={Product.Default}
                        filters={[dateFilter, getSelectFilter()]}
                    />
                </div>
                <div className={styles.selector}>
                    <Headline tag="h2">
                        {measureSeriesRevenue ? measureSeriesRevenue.dataPoints()[0].formattedValue() : "N/A"}
                    </Headline>
                    <Select
                        id="revenue-select"
                        labelText="Select Revenue filter"
                        options={SELECT_OPTIONS}
                        disabled={status === "loading"}
                        onChange={handleSelect}
                    />
                </div>
            </div>
        </Page>
    );
};

export default Homework;
