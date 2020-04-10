/*
* Компонент рендера калькулятора
* */

import React, { Component } from "react";

import './index.css';

import connection from "../../utils/connection"; /// Класс получения|отправки данных на сервер

import disableBtn from "./functions/disableBtn"; /// Функция установки статуса disable для кнопок
import addSymbol from "./functions/addSymbol"; /// Функция которая возвращает новый объект для изменения state
import whatShownBtn from "./functions/whatShownBtn"; /// Функция которая возвращает новый массив кнопок в зависимости от того какой символ приняла функция в аргументы

import CalculatorFiled from "../CalculatorFiled"; /// Компонет отображения ввода и результата
import CalculatorButton from "../CalculatorButton"; /// Компонент кнопок калькулятора
import CalculatorHistory from "../CalculatorHistory"; /// Компонент показа истории

class CalculatorLayout extends Component{
    apiConnect = new connection()

    functionAddSymbol = (symbol) => {
        this.setState(({operation, buttonsArray}) => {
            return addSymbol(symbol, [...operation], [...buttonsArray])
        })
    }

    functionClearOperation = () => {
        this.setState(({buttonsArray}) => {
            return addSymbol('', [''], disableBtn([...buttonsArray], {'x²': false, '√‎x': false, '/': false, '*': false, '-': false, '+': false, '.': false}))
        })
    }

    functionDeleteOperation = () => {
        this.setState(({operation, buttonsArray}) => {
            let newOperation = []
            let newButtonsArray = []
            if (operation.length > 1) {
                newOperation = [...operation.slice(0, operation.length - 1)]
                const resultFromShownFunction = whatShownBtn(newOperation[newOperation.length - 1], [...buttonsArray])
                newButtonsArray = resultFromShownFunction.array
            } else {
                newOperation = ['']
                newButtonsArray = disableBtn([...buttonsArray], {'x²': false, '√‎x': false, '/': false, '*': false, '-': false, '+': false, '.': false})
            }
            return {
                operation: newOperation,
                buttonsArray: newButtonsArray
            }
        })
    }

    functionToggleHistory = async () => {
        const result = await this.apiConnect.getAllResults()
        this.setState( ({showHistory}) => {
            if (showHistory) {
                return {
                    showHistory: false
                }
            } else {
                return {
                    lastRequest: `${result[0].calculation} = ${result[0].result}`,
                    history: result,
                    showHistory: true
                }
            }
        })
    }

    functionCloseHistory = () => {
        this.setState({
            showHistory: false
        })
    }

    functionSendOperation = async () => {
        const {operation} = this.state
        const clearOperation = operation.join('')
        const request = await this.apiConnect.getResult(clearOperation)
        this.setState(({operation, history}) => {
            if (request.hasOwnProperty('calculation'))
                return {
                    lastRequest: `${operation.join('')} = ${request.result}`,
                    history: [request, ...history]
                }
            else
                return { lastRequest: `${request}` }
        })
    }

    state = {
        operation: [''],
        buttonsArray: [
            { title: 'History', func: this.functionToggleHistory, width: '0.5', disable: false, grey: true },
            { title: 'DEL', func: this.functionDeleteOperation, width: '0.5', disable: false, grey: true },
            { title: 'C', func: this.functionClearOperation, width: '0.25', disable: false, grey: true },
            { title: 'x²', func: this.functionAddSymbol, width: '0.25', disable: false, grey: true },
            { title: '√‎x', func: this.functionAddSymbol, width: '0.25', disable: false, grey: true },
            { title: '/', func: this.functionAddSymbol, width: '0.25', disable: false, grey: true },
            { title: '7', func: this.functionAddSymbol, width: '0.25', disable: false, grey: false },
            { title: '8', func: this.functionAddSymbol, width: '0.25', disable: false, grey: false },
            { title: '9', func: this.functionAddSymbol, width: '0.25', disable: false, grey: false },
            { title: '*', func: this.functionAddSymbol, width: '0.25', disable: false, grey: true },
            { title: '4', func: this.functionAddSymbol, width: '0.25', disable: false, grey: false },
            { title: '5', func: this.functionAddSymbol, width: '0.25', disable: false, grey: false },
            { title: '6', func: this.functionAddSymbol, width: '0.25', disable: false, grey: false },
            { title: '-', func: this.functionAddSymbol, width: '0.25', disable: false, grey: true },
            { title: '1', func: this.functionAddSymbol, width: '0.25', disable: false, grey: false },
            { title: '2', func: this.functionAddSymbol, width: '0.25', disable: false, grey: false },
            { title: '3', func: this.functionAddSymbol, width: '0.25', disable: false, grey: false },
            { title: '+', func: this.functionAddSymbol, width: '0.25', disable: false, grey: true },
            { title: '', func: null, width: '0.25', disable: true, grey: false },
            { title: '0', func: this.functionAddSymbol, width: '0.25', disable: false, grey: false },
            { title: '.', func: this.functionAddSymbol, width: '0.25', disable: false, grey: false },
            { title: '=', func: this.functionSendOperation, width: '0.25', disable: false, grey: false },
        ],
        lastRequest: '',
        history: [],
        showHistory: false
    }

    render () {
        const {functionCloseHistory} = this
        const {operation, buttonsArray, lastRequest, history, showHistory} = this.state
        const buttons = buttonsArray.map((item, index) => {
            const {title, func, width, disable, grey} = item
            return (
                <CalculatorButton key={`calculatorBtn-${index}`}
                                  title={title}
                                  func={func}
                                  width={width}
                                  disable={disable}
                                  grey={grey}/>
            )
        })
        return (
            <React.Fragment>
                <div className="calculator">
                    <CalculatorFiled operation={operation}
                                     lastRequest={lastRequest}/>
                    <div className={`calculator-btn__wrapper ${showHistory ? 'show-history' : ''}`}>
                        { buttons }
                    </div>
                    <CalculatorHistory history={history}
                                       show={showHistory}
                                       closeFunction={functionCloseHistory}/>
                </div>
            </React.Fragment>
        )
    }

    componentDidMount () {
        this.apiConnect.getAllResults().then(res => {
            this.setState(({operation}) => {
                return {
                    lastRequest: `${res[0].calculation} = ${res[0].result}`,
                    history: res
                }
            })
        })
    }
}

export default CalculatorLayout
