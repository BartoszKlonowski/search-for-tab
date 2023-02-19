import React from "react";

type Props = {
    tabTitle: string;
}

export const TabResultTile = (props: Props) => {
    return (
        <div>
            <div className="tab-tile-icon-container"></div>
            <div className="tab-tile-title-container"></div>
            <div className="tab-tile-actions-container">
                <div className="tab-tile-goto-action-icon-container"></div>
                <div className="tab-tile-close-action-icon-container"></div>
            </div>
        </div>
    );
};
