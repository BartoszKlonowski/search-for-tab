import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import {TabResultsList} from "./components/TabResultsList";
import {TextInput} from "./components/TextInput";

export const Popup = (): JSX.Element => {
    useEffect(() => {
        document.addEventListener("click", (event) => {
            event.preventDefault();
        });
    }, [document]);

    const textInputID = "tab-search-entry-list-id";

    const [inputValue, setInputValue] = useState("");

    const onChange = () => {
        setInputValue((document.getElementById(textInputID) as HTMLInputElement).value);
    };

    return (
        <div className="popup-view">
            <TextInput id={textInputID} onChange={onChange} />
            <TabResultsList tabSearchPhrase={inputValue} />
        </div>
    );
};

ReactDOM.render(<Popup />, document.getElementById("root"));
