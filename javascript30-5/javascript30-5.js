; (function () {
  const items = document.querySelectorAll('.item')
  // ==nodlist !==array
  function clickHandler() {
    this.classList.toggle('open') // JS:classList.add,classList.remove,classList.toggle == JQ:addClass,removeClass,toggleClass
  }
  function transitionendHandler(e) {
    //console.log(e)
    if (e.propertyName.indexOf('flex') !== -1) {
      this.classList.toggle('open-active')
    }
  }
  items.forEach(item => { item.addEventListener('click', clickHandler) })
  items.forEach(item => { item.addEventListener('transitionend', transitionendHandler) })
})()
