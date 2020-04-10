/*
* Компонет отображения ввода и результата
* */

import React, { Component } from "react";

import "./index.css";

class CalculatorFiled extends Component{
    render () {
        const {operation, lastRequest} = this.props
        let clearOperation = operation.join(' ')
        clearOperation = clearOperation === '' ? '0' : clearOperation.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
        return (
            <div className="calculator-field">
                <h3>{clearOperation}</h3>
                <p>Последний запрос: {lastRequest}</p>
            </div>
        )
    }
}

export default CalculatorFiled
