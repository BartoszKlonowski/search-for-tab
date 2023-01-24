import React, {useEffect} from "react";
import ReactDOM from "react-dom";

export const Popup = (): JSX.Element => {
    useEffect(() => {
        document.addEventListener("click", (event) => {
            event.preventDefault();
        });
    }, [document]);

    return <div className="popup-view"></div>;
};

ReactDOM.render(<Popup />, document.getElementById("root"));
