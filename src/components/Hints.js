import React from "react";

const Hints = props => {
    return (
        <div
            style={{ margin: '.5rem', border: '1px solid #000', padding: '.5rem' }}
            onClick={() => props.click(props.name)}
        >
            {props.name}
        </div>
    );
}

export default Hints;