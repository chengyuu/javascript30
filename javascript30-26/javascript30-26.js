let menu = document.querySelectorAll('.cool >li')
let dropdownBackground = document.querySelector('.dropdownBackground')
let menuRect = document.querySelector('.top').getBoundingClientRect()

function enterHandler() {
  dropdownBackground.classList.add('open')
  // 預設dropdown的display:none，須改為block才可偵測寬高
  this.classList.add('trigger-enter')
  // 滑鼠摸到顯示容器0.1秒後再顯示內容，判斷有enter再加enter-active
  setTimeout(() => {
    this.classList.contains('trigger-enter') &&
      this.classList.add('trigger-enter-active')
  }, 150)
  // 偵測對象為li裡面的dropdown
  let dropdown = this.querySelector('.dropdown')
  let rect = dropdown.getBoundingClientRect()
  // top和left須扣除外層nav的位置
  dropdownBackground.style.top = rect.top - menuRect.top + 'px'
  dropdownBackground.style.left = rect.left - menuRect.left + 'px'
  dropdownBackground.style.width = rect.width + 'px'
  dropdownBackground.style.height = rect.height + 'px'
}
function leaveHandler() {
  dropdownBackground.classList.remove('open')
  this.classList.remove('trigger-enter', 'trigger-enter-active')
}
menu.forEach(li => {
  li.addEventListener('mouseenter', enterHandler)
  li.addEventListener('mouseleave', leaveHandler)
})
