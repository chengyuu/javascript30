; (function () {
  const checkboxes = Array.from(document.querySelectorAll('input[type=checkbox]'))
  let lastCheck = null
  function clickHandler(e) {
    if (this.checked) {
      if (e.shiftKey && lastCheck !== null) {
        let nowCheck = checkboxes.indexOf(this)
        checkboxes.slice(
          Math.min(lastCheck, nowCheck),
          Math.max(lastCheck, nowCheck)
        ).forEach(input => input.checked = true)
      }
      lastCheck = checkboxes.indexOf(this)
    } else {
      lastCheck = null
    }
  }
  checkboxes.forEach(input => { input.addEventListener('click', clickHandler) })
})()
