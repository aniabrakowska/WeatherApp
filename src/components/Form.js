import React from "react";
import style from './Form.module.scss';
import icons from '../icons';

const Form = props => {
    return (
        <>
            <form className={style.form} onSubmit={props.submit}>
                <input
                    className={style.formInput}
                    type="text"
                    value={props.value}
                    onChange={props.change}
                />
                <span className={style.formIcon}>{icons.search}</span>
            </form>
        </>
    );
}

export default Form;