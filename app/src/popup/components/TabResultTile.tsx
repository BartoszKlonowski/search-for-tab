import React from "react";
import Browser from "webextension-polyfill";

type Props = {
    tabId: number | undefined;
    tabTitle: string;
    tabUrl: string;
    favicon?: string;
};

export const TabResultTile = (props: Props) => {
    const {tabId, tabTitle, tabUrl, favicon} = props;

    if (!tabId) {
        return null;
    }

    const makeTabActive = () => {
        Browser.tabs
            .update(tabId, {
                active: true,
            })
            .catch((error) => {
                console.error("ERROR: making tab active finished with ", error.message);
            })
            .then(() => {
                window.close();
            });
    };

    const closeTab = () => {
        Browser.tabs.remove(tabId).catch((error) => {
            console.error("ERROR: making tab active finished with ", error.message);
        });
    };

    const trimTitleText = (): string => {
        const maxTitleTextLength = 60;
        return tabTitle.length > maxTitleTextLength
            ? tabTitle.slice(0, maxTitleTextLength).concat("...")
            : tabTitle;
    };

    const getTabDomainFromURL = (URL: string): string | null => {
        const result = URL.replace("https://", "").replace("http://", "").replace("www.", "");
        const results = result.match(/[^ /]+/g);
        return results && !results[0].includes(" ") && results[0].includes(".") ? results[0] : null;
    };

    const getTabIcon = (): string => {
        return favicon
            ? favicon
            : `https://icons.duckduckgo.com/ip3/${getTabDomainFromURL(tabUrl)}.ico`;
    };

    return (
        <div className="tab-tile-container">
            <div className="tab-tile-icon-container">
                <img src={getTabIcon()} />
            </div>
            <div className="tab-tile-title-container" onClick={makeTabActive}>
                <div className="tab-tile-title">{trimTitleText()}</div>
            </div>
            <div className="tab-tile-close-action-icon-container" onClick={closeTab}>
                <div>{"+"}</div>
            </div>
        </div>
    );
};
