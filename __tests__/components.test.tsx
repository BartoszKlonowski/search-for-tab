import React from "react";
import TestRenderer, {act, ReactTestInstance, ReactTestRenderer} from "react-test-renderer";
import TabResultsList from "../app/src/popup/components/TabResultsList";
import {TabResultTile} from "../app/src/popup/components/TabResultTile";

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
                resolve([{id: 1, title: "some-results-for-test-phrase"}]);
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
                resolve([{id: 1, title: "some-results-test-search-phrase"}]);
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
                    {id: 1, title: "very rarely visited tab"},
                    {id: 2, title: "tab-vary-with-content"},
                    {id: 3, title: "tab-very-interesting"},
                    {id: 4, title: "tab not very empty but matching"},
                    {id: 5, title: "some-result-with-dummy-title"},
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
        const resultTile = renderElement(
            <TabResultTile
                onClose={(id: number) => {
                    id;
                }}
                tabId={1}
                tabTitle="test-phrase"
                tabUrl="test-url"
            />
        );
        expect(resultTile.toJSON()).toMatchSnapshot();
    });

    it("uses the correct domain for a certain tab URL", async () => {
        const resultTileWithDefaultURL = await renderElementAsObject(
            <TabResultTile
                onClose={(id: number) => {
                    id;
                }}
                tabId={1}
                tabTitle="fake-title"
                tabUrl="www.google.com"
            />
        );
        let resultTileIcon = getChild(getChild(resultTileWithDefaultURL, 0), 0);
        expect(resultTileIcon.props.src).toBe("https://icons.duckduckgo.com/ip3/google.com.ico");
        const resultTileWithHTTPSURL = await renderElementAsObject(
            <TabResultTile
                onClose={(id: number) => {
                    id;
                }}
                tabId={1}
                tabTitle="fake-title"
                tabUrl="https://google.com"
            />
        );
        resultTileIcon = getChild(getChild(resultTileWithHTTPSURL, 0), 0);
        expect(resultTileIcon.props.src).toBe("https://icons.duckduckgo.com/ip3/google.com.ico");
        const resultTileWithComplexURL = await renderElementAsObject(
            <TabResultTile
                onClose={(id: number) => {
                    id;
                }}
                tabId={1}
                tabTitle="fake-title"
                tabUrl="http://google.com/very-complex?url"
            />
        );
        resultTileIcon = getChild(getChild(resultTileWithComplexURL, 0), 0);
        expect(resultTileIcon.props.src).toBe("https://icons.duckduckgo.com/ip3/google.com.ico");
    });

    it("uses the default favicon if exists", async () => {
        const resultTileWithDefaultURL = await renderElementAsObject(
            <TabResultTile
                onClose={(id: number) => {
                    id;
                }}
                tabId={1}
                tabTitle="fake-title"
                favicon="existing-correct-icon.ico"
                tabUrl="www.google.com"
            />
        );
        const resultTileIcon = getChild(getChild(resultTileWithDefaultURL, 0), 0);
        expect(resultTileIcon.props.src).toBe("existing-correct-icon.ico");
    });

    it("does not render when the ID of the tab is broken", async () => {
        let resultTile = await renderElementAsObject(
            <TabResultTile
                onClose={(id: number) => {
                    id;
                }}
                tabId={0}
                tabTitle="fake-title"
                tabUrl="fake-tab-url"
            />
        );
        expect(resultTile).toBeNull();
        resultTile = await renderElementAsObject(
            <TabResultTile
                onClose={(id: number) => {
                    id;
                }}
                tabId={undefined}
                tabTitle="fake-title"
                tabUrl="fake-tab-url"
            />
        );
        expect(resultTile).toBeNull();
    });

    it("goes to selected tab by making it active", async () => {
        global.browser.tabs.update = () => {
            return new Promise(() => {
                return true;
            });
        };
        const tabTile = await renderElementAsObject(
            <TabResultTile
                onClose={(id: number) => {
                    id;
                }}
                tabId={11345}
                tabTitle="fake-title"
                tabUrl="fake-tab-url"
            />
        );
        const tabTileClickableContainer = getChild(tabTile, 1);
        expect(tabTileClickableContainer.props).toBeDefined();
    });

    it("closes selected tab by clicking close icon", async () => {
        global.browser.tabs.update = () => {
            return new Promise(() => {
                return true;
            });
        };
        const tabTile = await renderElementAsObject(
            <TabResultTile
                onClose={(id: number) => {
                    id;
                }}
                tabId={11345}
                tabTitle="fake-title"
                tabUrl="fake-tab-url"
            />
        );
        const tabTileClickableContainer = getChild(tabTile, 2);
        expect(tabTileClickableContainer.props).toBeDefined();
    });
});
