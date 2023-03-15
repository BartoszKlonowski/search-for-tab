import React, {useCallback, useMemo, useState} from "react";
import Browser from "webextension-polyfill";
import {TabResultTile} from "./TabResultTile";

type Props = {
    tabSearchPhrase: string;
    isCaseSensitive: boolean;
};

export const TabResultsList = (props: Props) => {
    const {tabSearchPhrase, isCaseSensitive} = props;

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

    const tabsFilterPredicate = useCallback(
        (tab: Browser.Tabs.Tab) => {
            const tabSearchPhraseLowerCase = tabSearchPhrase.toLowerCase();

            return isCaseSensitive
                ? tab.title?.includes(tabSearchPhrase) || tab.url?.includes(tabSearchPhrase)
                : tab.title?.toLowerCase().includes(tabSearchPhraseLowerCase) ||
                      tab.url?.toLowerCase().includes(tabSearchPhraseLowerCase);
        },
        [isCaseSensitive, tabSearchPhrase]
    );

    useMemo(
        () =>
            Browser.tabs
                .query({currentWindow: true})
                .then((tabs) => {
                    setAllTabs(tabs.filter(tabsFilterPredicate));
                })
                .catch((error) => {
                    console.error(error);
                }),
        [tabsFilterPredicate]
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
