// (C) 2007-2019 GoodData Corporation
import * as React from "react";
import {
    DateFilter,
    IDateFilterOptionsByType,
    IDateFilterStatePropsIntersection,
    DateFilterOption,
} from "@gooddata/sdk-ui-filters";
import { DateFilterGranularity } from "@gooddata/sdk-backend-spi";

const availableGranularities: DateFilterGranularity[] = ["GDC.time.year"];

export const dateFilterOptions: IDateFilterOptionsByType = {
    allTime: {
        localIdentifier: "ALL_TIME",
        type: "allTime",
        name: "All time",
        visible: true,
    },

    absolutePreset: [
        {
            from: "2016-01-01",
            to: "2016-12-31",
            name: "Year 2016",
            localIdentifier: "year2016",
            visible: true,
            type: "absolutePreset",
        },

        {
            from: "2017-01-01",
            to: "2017-12-31",
            name: "Year 2017",
            localIdentifier: "year2017",
            visible: true,
            type: "absolutePreset",
        },

        {
            from: "2018-01-01",
            to: "2018-12-31",
            name: "Year 2018",
            localIdentifier: "year2018",
            visible: true,
            type: "absolutePreset",
        },

        {
            from: "2019-01-01",
            to: "2019-12-31",
            name: "Year 2019",
            localIdentifier: "year2019",
            visible: true,
            type: "absolutePreset",
        },

        {
            from: "2020-01-01",
            to: "2020-12-31",
            name: "Year 2020",
            localIdentifier: "year2020",
            visible: true,
            type: "absolutePreset",
        },
    ],

    relativePreset: {
        "GDC.time.quarter": [
            {
                from: -3,
                to: 0,
                granularity: "GDC.time.quarter",
                localIdentifier: "LAST_4_QUARTERS",
                type: "relativePreset",
                visible: true,
                name: "Last 4 quarters",
            },
        ],
        "GDC.time.year": [
            {
                from: -1,
                to: -1,
                granularity: "GDC.time.year",
                localIdentifier: "oneYearAgo",
                type: "relativePreset",
                visible: true,
                name: "1 year ago",
            },

            {
                from: -2,
                to: -2,
                granularity: "GDC.time.year",
                localIdentifier: "twoYearsAgo",
                type: "relativePreset",
                visible: true,
                name: "2 years ago",
            },

            {
                from: -3,
                to: -3,
                granularity: "GDC.time.year",
                localIdentifier: "threeYearsAgo",
                type: "relativePreset",
                visible: true,
                name: "3 years ago",
            },

            {
                from: -4,
                to: -4,
                granularity: "GDC.time.year",
                localIdentifier: "fourYearsAgo",
                type: "relativePreset",
                visible: true,
                name: "4 years ago",
            },
        ],
    },
};

interface IDateFilterComponentExample extends IDateFilterStatePropsIntersection {
    onApply: (dateFilterOption: DateFilterOption, excludeCurrentPeriod: boolean) => void;
}

const DateFilterComponent: React.FC<IDateFilterComponentExample> = ({
    excludeCurrentPeriod,
    selectedFilterOption,
    onApply,
}) => {
    return (
        <DateFilter
            excludeCurrentPeriod={excludeCurrentPeriod}
            selectedFilterOption={selectedFilterOption}
            filterOptions={dateFilterOptions}
            availableGranularities={availableGranularities}
            customFilterName="Selected date"
            dateFilterMode="active"
            onApply={onApply}
        />
    );
};

export default DateFilterComponent;
