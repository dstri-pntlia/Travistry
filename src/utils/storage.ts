export const setLocalStorageItem = (key: string, value: any) => {
  try {
    const serializedValue = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error('Error saving to localStorage', error);
  }
};


export const getLocalStorageItem = <T>(key: string): T | null => {
  try {
    const serializedValue = localStorage.getItem(key)
    return serializedValue ? JSON.parse(serializedValue) : null
  } catch (error) {
    console.error('Error reading from localStorage', error)
    return null
  }
}

export const removeLocalStorageItem = (key: string) => {
  localStorage.removeItem(key)
}

export const clearLocalStorage = () => {
  localStorage.clear()
}

export const setSessionStorageItem = (key: string, value: any) => {
  try {
    const serializedValue = JSON.stringify(value)
    sessionStorage.setItem(key, serializedValue)
  } catch (error) {
    console.error('Error saving to sessionStorage', error)
  }
}

export const getSessionStorageItem = <T>(key: string): T | null => {
  try {
    const serializedValue = sessionStorage.getItem(key)
    return serializedValue ? JSON.parse(serializedValue) : null
  } catch (error) {
    console.error('Error reading from sessionStorage', error)
    return null
  }
}

export const removeSessionStorageItem = (key: string) => {
  sessionStorage.removeItem(key)
}

export const clearSessionStorage = () => {
  sessionStorage.clear()
}