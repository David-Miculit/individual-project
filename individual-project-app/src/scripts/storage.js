export const getState = (key, defaultValue=[]) => {
    try {
        const data = localStorage.getItem(key)
        if(data === null)
            return defaultValue
        return JSON.parse(data)
    } catch (err) {
        console.log(err)
        return defaultValue
    }
}

export const saveState = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value))
    } catch (err) {
        console.log("Couldn't save to localstorage", err)
    }
}