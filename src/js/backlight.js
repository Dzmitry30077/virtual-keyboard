function backlight(key) {
  const lightKey = document.getElementById(key);
  lightKey.classList.add('active');
  setTimeout(() => {
    lightKey.classList.remove('active');
  }, 300);
}

export default backlight;
