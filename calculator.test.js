const calculator = require("./service/calculator")

const testArray = [
    { operation: '1*1+2/2', result: 2 },
    { operation: '2*1*5+5', result: 15 },
    { operation: '20+7*12-56/23', result: 101.56521739130434 },
    { operation: '50+20*50+10/5', result: 1052 },
    { operation: '2+5/1+sqr2+sqr2', result: 15 },
    { operation: '2+5/1+sqr2+sqr2-sqrt4', result: 13 },
]

testArray.forEach(item => {
    test(`Операция ${item.operation}, ожидаемый результат ${item.result}`, () => {
        expect(calculator(item.operation)).toBe(item.result);
    });
})
