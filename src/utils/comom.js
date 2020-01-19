export function setKeyValue (type) {
  return function (state, key, value) {
    if (value) {
      state[type][key] = value
    } else {
      state[type] = key
    }
  }
}
