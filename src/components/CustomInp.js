import React, { useState } from "react";

const CustomInp = ({ onInput }) => {
    const changeText = (e) => {
        onInput(e);
    }
    const [close, setClose] = useState(false);
    const handleClose = () => {
        setClose(!close);
    }
    return (
        <div className="custom-input" style={{display: close ? "none" : "block"}}>
            <div className="custom-contain">
            <span className="close" onClick={handleClose}>❌</span>
            <div className="custom-inp">
            <h2>Custom Input</h2>
                <textarea className="custom-area"
                    rows={6}
                    onChange={changeText} placeholder="Enter Custom Text" />
                <br />
                <button className="custom-submit card" type="submit" onClick={handleClose}>Submit</button>
            </div>
            </div>
            </div>
    )
}

export default CustomInp;