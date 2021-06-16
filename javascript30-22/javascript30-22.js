const links = document.querySelectorAll('a')
const highlight = document.createElement('span')
highlight.classList.add('highlight')
document.body.appendChild(highlight)
let now = null
function setPosition() {
  if (!now) return
  let { top, left, width, height } = now.getBoundingClientRect()

  highlight.style.top = top + window.scrollY + 'px'
  highlight.style.left = left + window.scrollX + 'px'
  highlight.style.width = width + 'px'
  highlight.style.height = height + 'px'
}
function enterHandler() {
  now = this
  setPosition()
}
links.forEach(link => link.addEventListener('mouseenter', enterHandler))
window.addEventListener('resize', setPosition)
