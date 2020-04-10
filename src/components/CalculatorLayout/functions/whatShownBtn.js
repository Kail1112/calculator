/*
* Функция которая возвращает новый массив кнопок в зависимости от того какой символ приняла функция в аргументы
* Возвращает объект с ключами `step` и `array` где, `step` какой приоритет и `array` результат
* */

import disableBtn from "./disableBtn"; /// Функция установки статуса disable для кнопок

/**
 * @param {string} symbol
 * @param {array} buttonsArray
 * @return {object}
 * */

const whatShownBtn = (symbol, buttonsArray) => {
    const check = {
        first: (symbol !== '*' || symbol !== '/' || symbol !== '+' || symbol !== '-') && (symbol === 'sqr' || symbol === 'sqrt'),
        second: (symbol === '*' || symbol === '/' || symbol === '+' || symbol === '-') && (symbol !== 'sqr' && symbol !== 'sqrt'),
        third: (symbol !== '*' && symbol !== '/' && symbol !== '+' && symbol !== '-' && symbol !== 'sqr' && symbol !== 'sqrt' && symbol !== '')
    }
    let step = ''
    let newButtonsArray = buttonsArray
    if (check.first) {
        step = 'first'
        newButtonsArray = disableBtn(buttonsArray, {'x²': true, '√‎x': true, '/': true, '*': true, '-': true, '+': true, '.': true})
    }
    if (check.second) {
        step = 'second'
        newButtonsArray = disableBtn(buttonsArray, {'x²': false, '√‎x': false, '/': true, '*': true, '-': true, '+': true, '.': true})
    }
    if (check.third) {
        step = 'third'
        newButtonsArray = disableBtn(buttonsArray, {'x²': true, '√‎x': true, '/': false, '*': false, '-': false, '+': false, '.': false})
    }
    return { step, array: newButtonsArray }
}

export default whatShownBtn
