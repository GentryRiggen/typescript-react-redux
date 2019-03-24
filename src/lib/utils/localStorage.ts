const parseItem = (item: any, defaultValue = false) =>
  item ? JSON.parse(item) : defaultValue

export const getLocalItem = (key: string) =>
  Promise.resolve(parseItem(localStorage.getItem(key)))

export const setLocalItem = (key: string, value: any) =>
  Promise.resolve(localStorage.setItem(key, JSON.stringify(value)))

export const removeLocalItem = (key: string) =>
  Promise.resolve(localStorage.removeItem(key))

export const clearAllLocalItems = () => Promise.resolve(localStorage.clear())
