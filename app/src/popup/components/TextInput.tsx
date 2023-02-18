import React from "react";

type Props = {
    id: string;
    onChange: () => void;
};

export const TextInput = (props: Props) => {
    return (
        <div className="tab-search-entry-list-container">
            <input
                onChange={props.onChange}
                className="tab-search-entry-list"
                id={props.id}
                placeholder="..."
                type="text"
            />
        </div>
    );
};
