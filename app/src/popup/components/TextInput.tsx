import React from "react";

type Props = {
    id: string;
    onChange: () => void;
    matchCaseSelected: boolean;
    setMatchCase: () => void;
};

export const TextInput = (props: Props) => {
    const {id, onChange, matchCaseSelected, setMatchCase} = props;

    return (
        <div className="tab-search-entry-list-container">
            <i className="glyphicon glyphicon-search" />
            <input
                onChange={onChange}
                className="tab-search-entry-list"
                id={id}
                placeholder="..."
                type="text"
            />
            <div
                onClick={setMatchCase}
                className={
                    matchCaseSelected
                        ? "tab-search-entry-matchCase-selected"
                        : "tab-search-entry-matchCase-unselected"
                }>
                Aa
            </div>
        </div>
    );
};
