function loadBoard(data, lang = 'en', caps = false, shift = false) {
  const loadedBoard = [];

  for (let i = 0; i < data.length; i += 1) {
    const objOfKey = data[i];
    if (lang === 'en') {
      const enKey = objOfKey.en;
      let key = enKey[0];
      if (shift) {
        enKey[1] ? key = enKey[1] : key = enKey[0];  // eslint-disable-line
      }
      if (caps) {
        key = objOfKey.unit !== 'spec' ? key.toUpperCase() : key;
      }
      loadedBoard.push(key);
    }
    if (lang === 'ru') {
      const ruKey = objOfKey.ru;
      let key = ruKey[0];
      if (shift) {
        ruKey[1] ? key = ruKey[1] : key = ruKey[0]; // eslint-disable-line
      }
      if (caps) {
        key = objOfKey.unit !== 'spec' ? key.toUpperCase() : key;
      }
      loadedBoard.push(key);
    }
  }

  return loadedBoard;
}

export default loadBoard;
