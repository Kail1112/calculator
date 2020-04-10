/*
* Функция которая возвращает новый объект для изменения state
* */

import whatShownBtn from "./whatShownBtn"; /// Функция которая возвращает новый массив кнопок в зависимости от того какой символ приняла функция в аргументы

/**
 * @param {string} symbol
 * @param {array} operation
 * @param {array} buttonsArray
 * @return {object}
 * */

const addSymbol = (symbol, operation, buttonsArray) => {
    let clearSymbol = symbol
    switch (symbol) { /// Чтобы было удобнее работать с строкой
        case 'x²' : clearSymbol = 'sqr'; break;
        case '√‎x' : clearSymbol = 'sqrt'; break;
        default: clearSymbol = symbol; break;
    }
    const resultFromShownFunction = whatShownBtn(clearSymbol, [...buttonsArray]) /// Получаем информацию о том на какой позиции сейчас находимся и какие кнопки следует заблокировать
    let newButtonsArray = resultFromShownFunction.array /// Из результата переменной выше получаем нужный нам список заблокированных кнопок
    if (resultFromShownFunction.step === 'first') { /// Если действие связанное с возведением в степень или получение квадратного корня
        if (operation[operation.length - 1] !== '') operation.push(clearSymbol, '')
        else {
            if (operation[operation.length - 1] === '') {
                operation[operation.length - 1] = clearSymbol
                operation.push('')
            } else operation.push(clearSymbol, '')
        }
    }
    if (resultFromShownFunction.step === 'second') { /// Базовые операции
        operation.push(symbol, '')
    }
    if (resultFromShownFunction.step === 'third') { /// Если пользователь работает с числами ( включая символ `.` )
        operation[operation.length - 1] += symbol
    }
    return { operation, buttonsArray: newButtonsArray }
}

export default addSymbol
