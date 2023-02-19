import React, {useMemo, useState} from "react";
import Browser from "webextension-polyfill";

type Props = {
    tabSearchPhrase: string;
};

export const TabResultsList = (props: Props) => {
    const {tabSearchPhrase} = props;
    const [allTabs, setAllTabs] = useState<Browser.Tabs.Tab[]>();

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

    return <div className="tab-search-results-list-container"></div>;
};
