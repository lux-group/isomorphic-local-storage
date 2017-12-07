// MemoryStorage is a drop-in replacement for localStorage for environments
// in which localStorage is not supported (i.e. Safari private browsing sessions)
// It implements the Web Storate API https://www.w3.org/TR/webstorage/#storage-0
export default class MemoryStorage {
  constructor() {
    this.items = {}
    this._length = 0;
  }

  // noop
  set length(val) {
    return val
  }

  get length() {
    return this._length
  }

  getItem(key) {
    return this.items[key] || null
  }

  setItem(key, val) {
    if (!this.items[key]) {
      this._length++;
    }

    this.items[key] = val
  }

  removeItem(key) {
    if (this.items[key]) {
      this._length--
    }

    delete this.items[key]
  }

  clear() {
    this.items = {}
    this._length = 0
  }

  // IDEA: JS officially does not guarantee the order of keys in object but
  // this seems to work well
  key(n) {
    return Object.keys(this.items)[n]
  }
}
