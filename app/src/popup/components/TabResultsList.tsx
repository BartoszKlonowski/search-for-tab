import React, {useCallback, useMemo, useState} from "react";
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

    const onClose = (tabId: number) => {
        setAllTabs(allTabs?.filter((tab) => tab.id !== tabId));
    };

    const renderSearchResultTile = (
        tabId: number | undefined,
        tabTitle: string,
        tabUrl: string,
        tabFavicon?: string
    ): JSX.Element => {
        return (
            <TabResultTile
                tabId={tabId}
                tabTitle={tabTitle}
                onClose={onClose}
                tabUrl={tabUrl}
                favicon={tabFavicon}
            />
        );
    };

    const tabsFilter = useCallback(
        (tabs: Browser.Tabs.Tab[]) => {
            setAllTabs(
                tabs.filter(
                    (tab) =>
                        tab.title?.includes(tabSearchPhrase) || tab.url?.includes(tabSearchPhrase)
                )
            );
        },
        [tabSearchPhrase]
    );

    useMemo(
        () =>
            Browser.tabs
                .query({currentWindow: true})
                .then((tabs) => {
                    tabsFilter(tabs);
                })
                .catch((error) => {
                    console.error(error);
                }),
        [tabsFilter]
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
