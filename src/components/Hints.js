import React from "react";
import style from './Hints.module.scss';

const Hints = props => {
    return (
        <div
            className={style.hintsItem}
            onClick={() => props.click(props.name)}
        >
            {props.name}
        </div>
    );
}

export default Hints;