/*
* Компонент кнопок калькулятора
* */

import React from "react";

import './index.css';

const CalculatorButton = (props) => {
    const {title, func, width, disable, grey} = props

    const classForBtn = width === '0.5' ? (disable ? (grey ? 'calculator-btn__medium calculator-btn__disable calculator-btn__grey' : 'calculator-btn__medium calculator-btn__disable') : (grey ? 'calculator-btn__medium calculator-btn__grey' : 'calculator-btn__medium')) : (disable ? (grey ? 'calculator-btn__disable calculator-btn__grey' : 'calculator-btn__disable') : (grey ? 'calculator-btn__grey' : ''))

    const clickFunction = () => !disable ? ( typeof func === 'function' ? func(title) : null ) : null
    return <button className={`calculator-btn ${classForBtn}`} onClick={clickFunction}>{title}</button>
}

export default CalculatorButton
