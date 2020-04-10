/*
* Функция установки статуса disable для кнопок
* */

/**
 * @param {array} btnArray
 * @param {object} template
 * @return {array}
 * */

const disableBtn = (btnArray, template) => {
    return btnArray.reduce((acc, item) => {
        let check = template.hasOwnProperty(item.title)
        if (check) acc.push({...item, disable: template[item.title]})
        else acc.push(item)
        return acc
    }, [])
}

export default disableBtn
