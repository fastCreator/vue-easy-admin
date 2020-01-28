export function setKeyValue (type) {
  return function (state, value) {
    state[type] = value
  }
}
