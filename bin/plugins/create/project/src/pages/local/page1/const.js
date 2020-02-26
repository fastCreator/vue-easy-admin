export default function ({ $lang, $globLang }) {
  return {
    sex: [
      { label: $globLang.man, value: 0 },
      { label: $globLang.woman, value: 1 }
    ]
  }
}
