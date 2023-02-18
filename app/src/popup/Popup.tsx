import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import {TextInput} from "./components/TextInput";

export const Popup = (): JSX.Element => {
    useEffect(() => {
        document.addEventListener("click", (event) => {
            event.preventDefault();
        });
    }, [document]);

    return (
        <div className="popup-view">
            <TextInput />
        </div>
    );
};

ReactDOM.render(<Popup />, document.getElementById("root"));
