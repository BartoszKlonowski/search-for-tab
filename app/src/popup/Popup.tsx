import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import {TextInput} from "./components/TextInput";

export const Popup = (): JSX.Element => {
    useEffect(() => {
        document.addEventListener("click", (event) => {
            event.preventDefault();
        });
    }, [document]);

    const textInputID = "tab-search-entry-list-id";

    const onChange = () => {
        const input = document.getElementById(textInputID) as HTMLInputElement;
        console.log(`onChange called with: ${input?.value}`);
    };

    return (
        <div className="popup-view">
            <TextInput id={textInputID} onChange={onChange} />
        </div>
    );
};

ReactDOM.render(<Popup />, document.getElementById("root"));
