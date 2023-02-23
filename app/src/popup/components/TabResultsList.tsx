import React, {useMemo, useState} from "react";
import Browser from "webextension-polyfill";
import {TabResultTile} from "./TabResultTile";

type Props = {
    tabSearchPhrase: string;
};

export const TabResultsList = (props: Props) => {
    const {tabSearchPhrase} = props;

    if (!tabSearchPhrase.length) {
        return null;
    }

    const [allTabs, setAllTabs] = useState<Browser.Tabs.Tab[]>();

    const renderSearchResultTile = (
        tabId: number | undefined,
        tabTitle: string,
        tabUrl: string,
        tabFavicon?: string
    ): JSX.Element => {
        return (
            <TabResultTile tabId={tabId} tabTitle={tabTitle} tabUrl={tabUrl} favicon={tabFavicon} />
        );
    };

    useMemo(
        () =>
            Browser.tabs
                .query({currentWindow: true})
                .then((tabs) => {
                    setAllTabs(
                        tabs.filter(
                            (tab) =>
                                tab.title?.includes(tabSearchPhrase) ||
                                tab.url?.includes(tabSearchPhrase)
                        )
                    );
                })
                .catch((error) => {
                    console.error(error);
                }),
        [tabSearchPhrase]
    );

    return (
        <div className="tab-search-results-list-container">
            {allTabs?.map((tab) => (
                <li key={`searchResultTile-${tab.title}`}>
                    {renderSearchResultTile(tab.id, tab.title || "", tab.url || "", tab.favIconUrl)}
                </li>
            ))}
        </div>
    );
};

export default TabResultsList;
