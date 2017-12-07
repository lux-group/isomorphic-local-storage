import MemoryStorage from './memoryStorage'

const memoryStorage = new MemoryStorage()

// getStorage returns localStorage if the current browser supports it, or
// a memoryStorage otherwise
// https://gist.github.com/philfreo/68ea3cd980d72383c951
function getStorage() {
  if (typeof localStorage === 'object') {
    try {
      localStorage.setItem('localStorage', 1);
      localStorage.removeItem('localStorage');
      return localStorage
    } catch(e) {
      return memoryStorage
    }
  }

  return memoryStorage
}

export function set(key, value) {
  const storage = getStorage()

  return storage.setItem(key, JSON.stringify(value))
}

export function get(key) {
  const storage = getStorage()

  const localStorageValue = storage.getItem(key)
  if (!localStorageValue) {
    return {}
  }

  return JSON.parse(localStorageValue)
}
