import React from "react";
import Headline from "../Headline";
import { configure, mount } from "enzyme";
import * as ReactSixteenAdapter from "enzyme-adapter-react-16";
const adapter = ReactSixteenAdapter as any;
configure({ adapter: new adapter.default() });

describe("Headline component", () => {
    it("Should render Headline with children", () => {
        const text = "Headline text 1";
        const children = <span>{text}</span>;
        const wrapper = mount(<Headline>{children}</Headline>);

        const headline = wrapper.find(Headline);
        expect(headline).toHaveLength(1);
        expect(headline.find("h1")).toHaveLength(1);
        expect(headline.find("span")).toHaveLength(1);
        expect(headline.find("span").text()).toEqual(text);
    });

    it("should render Headline with h2 tag", () => {
        const text = "Headline text 2";
        const wrapper = mount(<Headline tag={"h2"}>{text}</Headline>);

        const headline = wrapper.find(Headline);
        expect(headline).toHaveLength(1);
        expect(headline.find("h2")).toHaveLength(1);
        expect(headline.text()).toEqual(text);
    });
});
