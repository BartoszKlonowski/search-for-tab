import React from "react";

type Props = {
    tabTitle: string;
};

export const TabResultTile = (props: Props) => {
    const {tabTitle} = props;

    const trimTitleText = (): string => {
        const maxTitleTextLength = 60;
        return tabTitle.length > 60 ? tabTitle.slice(0, maxTitleTextLength).concat("...") : tabTitle;
    };

    return (
        <div className="tab-tile-container">
            <div className="tab-tile-icon-container">
                <img/>
            </div>
            <div className="tab-tile-title-container">
                <div className="tab-tile-title">
                    {trimTitleText()}
                </div>
            </div>
            <div className="tab-tile-close-action-icon-container">
                <div>{'+'}</div>
            </div>
        </div>
    );
};
