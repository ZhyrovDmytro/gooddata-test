import React from "react";
import Select from "../../controls/Select";
import { configure, mount } from "enzyme";
import * as ReactSixteenAdapter from "enzyme-adapter-react-16";
const adapter = ReactSixteenAdapter as any;
configure({ adapter: new adapter.default() });

const onChange = jest.fn();
describe("Select component", () => {
    const TEST_SELECT_OPTIONS = [
        {
            value: "DEFAULT",
            text: "Default value",
        },
        {
            value: "NEXT",
            text: "Next value",
        },
    ];

    it("Should render Select component with options and label", () => {
        const labelText = "Test select";
        const wrapper = mount(
            <Select
                id="test-select"
                labelText={labelText}
                options={TEST_SELECT_OPTIONS}
                disabled={false}
                onChange={onChange}
            />,
        );

        const select = wrapper.find(Select);
        const option = select.find("option");
        const label = select.find("label");

        expect(select).toHaveLength(1);

        expect(option).toHaveLength(2);
        expect(option.at(0).text()).toEqual(TEST_SELECT_OPTIONS[0].text);
        expect(option.at(0).prop("value")).toEqual(TEST_SELECT_OPTIONS[0].value);
        expect(option.at(1).text()).toEqual(TEST_SELECT_OPTIONS[1].text);
        expect(option.at(1).prop("value")).toEqual(TEST_SELECT_OPTIONS[1].value);

        expect(label).toHaveLength(1);
        expect(label.text()).toEqual(labelText);

        select.find("select").simulate("change");
        expect(onChange).toHaveBeenCalledTimes(1);
    });

    it("Should render disabled Select component", () => {
        const labelText = "Test disabled select";
        const wrapper = mount(
            <Select
                id="test-select"
                labelText={labelText}
                options={TEST_SELECT_OPTIONS}
                disabled={true}
                onChange={onChange}
            />,
        );

        const select = wrapper.find(Select);
        const label = select.find("label");

        expect(select).toHaveLength(1);
        expect(select.find("select").prop("disabled")).toEqual(true);

        expect(label).toHaveLength(1);
        expect(label.text()).toEqual(labelText);
    });
});
