/**
 * @param {string} operation
 * @return {number}
 * */

const calculator = (operation) => {
    const action = operation.split(/(\/|\*|\+|\-|sqrt|sqr)/g).filter(item => item !== '').reduce((acc, item) => {
        if (item === '*' || item === '/' || item === '+' || item === '-' || item === 'sqr' || item === 'sqrt') {
            if (item === 'sqr' || item === 'sqrt') acc.first.push(item)
            if (item === '*' || item === '/') acc.second.push(item)
            if (item === '+' || item === '-') acc.third.push(item)
            acc.list.push(item)
        } else acc.list.push(item * 1)
        return acc
    }, {list: [], first: [], second: [], third: []})

    action.first.push(...action.second, ...action.third)

    action.first.forEach(item => {
        for (let i = 0; i < action.list.length; i++) {
            const elem = action.list[i]
            if (elem === item) {
                let res = 0, mode = 'normal'
                switch (item) {
                    case 'sqr' : {
                        res = Math.pow(action.list[i + 1], 2)
                        mode = 'complex'
                    } break;
                    case 'sqrt' : {
                        res = Math.sqrt(action.list[i + 1])
                        mode = 'complex'
                    } break;
                    case '*' : res = action.list[i - 1] * action.list[i + 1]; break;
                    case '/' : res = action.list[i - 1] / action.list[i + 1]; break;
                    case '+' : res = action.list[i - 1] + action.list[i + 1]; break;
                    case '-' : res = action.list[i - 1] - action.list[i + 1]; break;
                    default: res = `${action.list[i -1]}${action.list[i]}${action.list[i + 1]}`; break;
                }
                if (mode === 'normal') action.list = [...action.list.slice(0, i - 1), res, ...action.list.slice(i + 2)]
                else action.list = [...action.list.slice(0, i), res, ...action.list.slice(i + 2)]
                break;
            }
        }
    })
    return action.list[0]
}

module.exports = calculator
