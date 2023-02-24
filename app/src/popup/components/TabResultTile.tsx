import React from "react";
import Browser from "webextension-polyfill";
import {translate} from "../../engine/i18n";

type Props = {
    tabId: number | undefined;
    tabTitle: string;
    onClose: (id: number) => void;
    tabUrl: string;
    favicon?: string;
};

export const TabResultTile = (props: Props) => {
    const {tabId, tabTitle, tabUrl, favicon, onClose} = props;

    const getTabDomainFromURL = (URL: string): string | null => {
        const result = URL.replace("https://", "").replace("http://", "").replace("www.", "");
        const results = result.match(/[^ /]+/g);
        return results && !results[0].includes(" ") && results[0].includes(".") ? results[0] : null;
    };

    const tabDomain = getTabDomainFromURL(tabUrl);

    if (!tabId) {
        return null;
    }

    const makeTabActive = () => {
        Browser.tabs
            .update(tabId, {
                active: true,
            })
            .then(() => {
                window.close();
            })
            .catch((error) => {
                console.error("ERROR: making tab active finished with ", error.message);
            });
    };

    const closeTab = () => {
        Browser.tabs
            .remove(tabId)
            .then(() => {
                onClose(tabId);
            })
            .catch((error) => {
                console.error("ERROR: making tab active finished with ", error.message);
            });
    };

    const trimTitleText = (): string => {
        const maxTitleTextLength = 60;
        return tabTitle.length > maxTitleTextLength
            ? tabTitle.slice(0, maxTitleTextLength).concat("...")
            : tabTitle;
    };

    const getTabIcon = (): string => {
        return favicon ? favicon : `https://icons.duckduckgo.com/ip3/${tabDomain}.ico`;
    };

    return (
        <div className="tab-tile-container">
            <div className="tab-tile-icon-container" title={tabDomain || tabUrl}>
                <img src={getTabIcon()} />
            </div>
            <div
                className="tab-tile-title-container"
                onClick={makeTabActive}
                title={`${translate("go-to")} ${tabDomain}`}>
                <div className="tab-tile-title">{trimTitleText()}</div>
            </div>
            <div
                className="tab-tile-close-action-icon-container"
                onClick={closeTab}
                title={translate("close")}>
                <div>{"+"}</div>
            </div>
        </div>
    );
};
