import React from "react";
import TestRenderer, {act, ReactTestInstance, ReactTestRenderer} from "react-test-renderer";
import TabResultsList from "../app/src/popup/components/TabResultsList";
import { TabResultTile } from "../app/src/popup/components/TabResultTile";

function renderElement(element: JSX.Element): ReactTestRenderer {
    const component = TestRenderer.create(element);
    return component;
}

async function renderElementAsObject(element: JSX.Element): Promise<ReactTestInstance> {
    let component;
    await act(async () => {
        component = renderElement(element);
    });
    return JSON.parse(JSON.stringify(component.toJSON()));
}

function getChild(renderedObject: ReactTestInstance, childIndex: number): ReactTestInstance {
    const child = renderedObject.children[childIndex] as ReactTestInstance;
    return child;
}

describe("TabResultsList", () => {
    it("renders correctly according to snapshot", async () => {
        global.browser.tabs.query = () => {
            return new Promise((resolve) => {
                resolve([{title: "some-results-for-test-phrase"}]);
            });
        };
        const resultsList = await renderElementAsObject(
            <TabResultsList tabSearchPhrase="test-phrase" />
        );
        expect(resultsList).toMatchSnapshot();
    });

    it("renders nothing if empty search phrase is passed within props", async () => {
        const resultsList = await renderElementAsObject(<TabResultsList tabSearchPhrase="" />);
        expect(resultsList).toBeNull();
    });

    it("renders a list when given some search phrase", async () => {
        global.browser.tabs.query = () => {
            return new Promise((resolve) => {
                resolve([{title: "some-results-test-search-phrase"}]);
            });
        };
        const resultsList = await renderElementAsObject(
            <TabResultsList tabSearchPhrase="test-search-phrase" />
        );
        expect(resultsList).toBeDefined();
        expect(getChild(resultsList, 0).type).toBe("li");
    });

    it("renders a list of three tabs when exactly three tabs matches the search phrase", async () => {
        global.browser.tabs.query = () => {
            return new Promise((resolve) => {
                resolve([
                    {title: "very rarely visited tab"},
                    {title: "tab-vary-with-content"},
                    {title: "tab-very-interesting"},
                    {title: "tab not very empty but matching"},
                    {title: "some-result-with-dummy-title"},
                ]);
            });
        };
        const resultsList = await renderElementAsObject(<TabResultsList tabSearchPhrase="very" />);
        expect(resultsList).toBeDefined();
        expect(resultsList.children.length).toBe(3);
    });
});

describe("TabResultTile", () => {
    it("renders correctly according to snapshot", async () => {
        const resultsList = renderElement(
            <TabResultTile tabTitle="test-phrase" />
        );
        expect(resultsList.toJSON()).toMatchSnapshot();
    });
});
