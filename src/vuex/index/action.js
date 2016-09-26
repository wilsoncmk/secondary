const pad = (val) => {
    val += ''
    if (val.length < 2) {
        return '0' + val
    }
    return val
}
export const ACTION_TYPE = {
    SET_ITEMS: 'SET_ITEMS',
    SET_MY_ITEMS: 'SET_MY_ITEMS',
    SET_DATE_POINTER: 'SET_DATE_POINTER',
    SET_THEMES: 'SET_THEMES',
    SET_CATEGORY: 'SET_CATEGORY',
    SET_MY_CATEGORY: 'SET_MY_CATEGORY'
}

export const setItems = ({ dispatch }, date, arr) => {
    dispatch(ACTION_TYPE.SET_ITEMS, date, arr)
}

export const setMyItems = ({ dispatch }, date, arr) => {
    dispatch(ACTION_TYPE.SET_MY_ITEMS, date, arr)
}

export const setCategory = ({ dispatch }, date, arr) => {
    dispatch(ACTION_TYPE.SET_CATEGORY, date, arr)
}

export const setMyCategory = ({ dispatch }, date, arr) => {
    dispatch(ACTION_TYPE.SET_MY_CATEGORY, date, arr)
}

export const setDatePointer = ({ dispatch }, date) => {
    dispatch(ACTION_TYPE.SET_DATE_POINTER, {
        value: date.getFullYear() + pad(date.getMonth() + 1) + pad(date.getDate()),
        format: date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate())
    })
}

export const setThemes = ({ dispatch }, date, arr) => {
    dispatch(ACTION_TYPE.SET_THEMES, date, arr)
}

