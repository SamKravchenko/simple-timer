/**
 * 
 * @param {number} sec 
 * @param {function} cb 
 * @param {number} timeout 
 */
const timer = (sec, cb, timeout = 1000) => {
  if (!sec && !cb) return;
  let stamp = setTimeout(() => sec <= 0 ? clearTimeout(stamp) : timer(sec - 1, cb, timeout), timeout);
  cb(sec);
}

/**
 * 
 * @param {Event} e 
 * @param {Element} htmlInput
 */
const handleClick = (e, htmlInput) => {
  e.preventDefault();
  console.log(htmlInput.value);
  if (!htmlInput.value) return;
  let currentTime = parseInt(htmlInput.value) - 1;
  e.target.disabled = true;
  const recursion = () => {
    if(currentTime <= 0) {
      e.target.disabled = false;
      return;
    };
    timer(999, (ms) => {
      if (ms <= 0 && currentTime >= 0) {
        currentTime--;
        recursion();
      }
      if (ms > 10 && ms <= 100) {
        htmlInput.value = `${currentTime}.0${ms}`
        return;
      }
      if (ms <= 10) {
        htmlInput.value = `${currentTime}.00${ms}`
        return;
      }
      htmlInput.value = `${currentTime}.${ms}`
    }, 1)
  }
  recursion();
}

const input = document.querySelector('.timer__counter');
const btn = document.querySelector('.timer__btn');

btn.addEventListener('click', e => handleClick(e, input));