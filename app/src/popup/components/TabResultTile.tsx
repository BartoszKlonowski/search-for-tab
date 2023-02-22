import React from "react";

type Props = {
    tabTitle: string;
    tabUrl: string;
    favicon?: string;
};

export const TabResultTile = (props: Props) => {
    const {tabTitle, tabUrl, favicon} = props;

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
            <div className="tab-tile-title-container">
                <div className="tab-tile-title">{trimTitleText()}</div>
            </div>
            <div className="tab-tile-close-action-icon-container">
                <div>{"+"}</div>
            </div>
        </div>
    );
};
