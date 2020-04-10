/*
* Компонент показа истории
* */

import React from "react";

import './index.css';

import CalculatorHistoryItem from "./item"; /// Компонент отображения элемента в истории

const CalculatorHistory = (props) => {
    const {history, show, closeFunction} = props
    const historyItem = history.map((item, index) => {
        return (
            <CalculatorHistoryItem key={`calculator-history-item-${index}`}
                                   date={item.date}
                                   calculation={item.calculation}
                                   result={item.result}/>
        )
    })
    return (
        <div className={`calculator-history ${show ? 'show' : ''}`}>
            <div className="calculator-history__background" onClick={closeFunction}/>
            <ul>
                {historyItem}
            </ul>
        </div>
    )
}

export default CalculatorHistory
