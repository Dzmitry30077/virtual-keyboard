import '../sass/style.scss';
import dataOfKeys from './dataOfKeys';
import loadBoard from './loadBoard';
import backlight from './backlight';

// Const DOM
const body = document.getElementById('app');
const wrapper = document.createElement('div');
const keyboard = document.createElement('div');
const textArea = document.createElement('textarea');
const commentLang = document.createElement('p');

// Vars
const typesValue = [];
let langType = localStorage.lang || 'en';
let capsType = false;
let shiftType = false;

// Load first time
window.addEventListener('DOMContentLoaded', () => {
  wrapper.classList.add('wrapper');
  keyboard.classList.add('keyboard');
  textArea.classList.add('textarea');
  commentLang.classList.add('comment');
  commentLang.innerHTML = 'Для переключения языка Alt + Ctrl';

  body.prepend(wrapper);
  wrapper.append(textArea);
  wrapper.append(keyboard);
  wrapper.append(commentLang);
});

// Update text area
const updateTextArea = () => {
  textArea.value = typesValue.join('');
};

// Click on key to set changes and update text area
const typeKeyByClick = (nodeKey, keyName) => {
  nodeKey.addEventListener('click', () => {
    if (keyName === 'Space') {
      typesValue.push(' ');
    }
    if (keyName === 'Enter') {
      typesValue.push('\n');
    }
    if (keyName === 'Tab') {
      typesValue.push('  ');
    }
    if (keyName === 'del') {
      typesValue.shift();
    }
    if (keyName === 'Backspace') {
      typesValue.pop();
    }
    if (keyName.length === 1) {
      typesValue.push(keyName);
    }
    updateTextArea();
  });
};

// Create keyboard
const createBoard = (loadedBoard) => {
  keyboard.innerHTML = '';
  for (let i = 0; i < loadedBoard.length; i += 1) {
    const keyName = loadedBoard[i];
    const key = document.createElement('div');

    key.id = dataOfKeys[i].code;
    key.classList.add('keyboard__key');
    key.innerHTML = keyName;
    keyboard.append(key);
    typeKeyByClick(key, keyName);
  }
};

// Create board frist time
createBoard(loadBoard(dataOfKeys, langType));

// Listener for keyboard tips
textArea.addEventListener('keydown', (e) => {
  e.preventDefault();
  if (e.code === 'Space') {
    typesValue.push(' ');
  }
  if (e.code === 'Enter') {
    typesValue.push('\n');
  }
  if (e.code === 'Tab') {
    typesValue.push(' ', ' ', ' ', ' ');
  }
  if (e.code === 'Backspace') {
    typesValue.pop();
  }
  if (e.code === 'Delete') {
    typesValue.shift();
  }
  if (e.code === 'ArrowLeft') {
    typesValue.push('\u25C0');
  }
  if (e.code === 'ArrowRight') {
    typesValue.push('\u25B6');
  }
  if (e.code === 'ArrowUp') {
    typesValue.push('\u2B06');
  }
  if (e.code === 'ArrowDown') {
    typesValue.push('\u2B07');
  }
  if (e.key.length === 1 && e.key !== ' ') {
    const currentKey = document.getElementById(e.code);
    if (e.shiftKey) {
      typesValue.push(currentKey.textContent.toUpperCase());
    } else {
      typesValue.push(currentKey.textContent);
    }
  }
  updateTextArea();
  backlight(e.code);
});

// Listener for control lang, capsLock and Shift
window.addEventListener('keydown', (e) => {
  if (e.altKey && e.key === 'Control') {
    if (langType === 'en') {
      localStorage.setItem('lang', 'ru');
      langType = 'ru';
    } else {
      localStorage.setItem('lang', 'en');
      langType = 'en';
    }
    createBoard(loadBoard(dataOfKeys, langType, capsType));
    backlight(e.code);
  }
  if (e.code === 'CapsLock') {
    capsType = !capsType;
    createBoard(loadBoard(dataOfKeys, langType, capsType));
    backlight(e.code);
  }
  if (e.shiftKey) {
    shiftType = true;
    createBoard(loadBoard(dataOfKeys, langType, capsType, shiftType));
    backlight(e.code);
  }
});

// Listener for remove Shift
window.addEventListener('keyup', (e) => {
  if (e.key === 'Shift') {
    shiftType = false;
    createBoard(loadBoard(dataOfKeys, langType, capsType, shiftType));
  }
});
