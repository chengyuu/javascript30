const scoreBoard = document.querySelector('.score')
const game = document.querySelector('.game')
const startButton = document.querySelector('button')
const moles = [...document.querySelectorAll('.mole')]
const molesStatus = moles.reduce((prev, current, index) => {
  prev[index] = false
  return prev
}, {})
const clickHandler = function () {
  punchAudio.pause()
  if (molesProxy[moles.indexOf(this)]) {
    setScore(scores + 1)
    punchAudio.currentTime = 0
    punchAudio.play()
    molesProxy[moles.indexOf(this)] = false
  } // 如果該序號功能打開，則點擊到分數+1，並將該序號功能關閉
}
const molesProxy = new Proxy(molesStatus, {
  get(target, key) {
    return target[key]
  },
  set(target, key, value) {
    target[key] = value
    moles[key].removeEventListener('click', clickHandler) // 避免重複監聽事件
    if (value) { //由資料控制畫面
      moles[key].classList.add('up')
      moles[key].addEventListener('click', clickHandler)
    } else {
      moles[key].classList.remove('up')
    }
  }
})
const punchAudio = document.querySelector('audio[name=punch]')
const startAudio = document.querySelector('audio[name=start]')
const endAudio = document.querySelector('audio[name=end]')
let scores = 0
let timeUp = true

function setScore(score) {
  scores = score
  scoreBoard.innerText = scores
}
function setMole(showMole, showTime) {
  molesProxy[showMole] = true // 將該序號功能打開
  setTimeout(() => {
    if (!timeUp) showRandomMole()
  }, 500) // 如果遊戲時間還沒到則0.5秒後再產生一個隨機出現的序號
  setTimeout(() => {
    molesProxy[showMole] = false
  }, showTime) // 出現時間到後將該序號功能關閉
}
function showRandomMole() {
  const showMole = Math.floor(Math.random() * moles.length) // 隨機出現的序號
  const showTime = Math.random() * (1500 - 1000) + 1000 // 隨機出現的時間(1s~1.5s)
  setMole(showMole, showTime)
}
function startGame() {
  if (!timeUp) return
  startButton.classList.add('close')
  game.classList.remove('close')
  setScore(0)
  timeUp = false
  startAudio.play()
  showRandomMole()
  setTimeout(() => {
    timeUp = true
    endAudio.play()
    setTimeout(() => {
      alert(`Time's up!`)
      startButton.classList.remove('close')
      game.classList.add('close')
    }, 100)
  }, 20000) // 遊戲時間 20s
}

startButton.addEventListener('click', startGame)
