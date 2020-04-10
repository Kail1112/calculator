/*
* Компонент отображения элемента в истории
* */

import React from "react";

const CalculatorHistoryItem = (props) => {
    const {date, calculation, result} = props
    return (
        <li>
            <time>{date}</time>
            <p>{calculation}</p>
            <h3>{result}</h3>
        </li>
    )
}

export default CalculatorHistoryItem
