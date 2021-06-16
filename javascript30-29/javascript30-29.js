const timeButton = document.querySelectorAll('.timer__controls>.timer__button')
const timeInput = document.querySelector('#custom')
const leftTime = document.querySelector('.display__time-left')
const endTime = document.querySelector('.display__end-time')
const audioEnd = document.querySelector('audio[name="end"]')
const audioStart = document.querySelector('audio[name="start"]')
const soundButton = document.querySelector('.sound')
let timer
let sound = false

function setTimer(time) {
  // 清除已存在的計時器
  clearInterval(timer)
  const now = Date.now() // 現在的時間值為毫秒
  const then = now + time * 1000
  // 顯示結束的時間
  displayTimeEnd(then)
  // 顯示設定的時間 
  displayTimeLeft(time)
  soundButton.style.visibility = 'visible'
  timer = setInterval(() => {
    const countdown = Math.round((then - Date.now()) / 1000) // 值為秒
    // 顯示倒數的時間 
    displayTimeLeft(countdown)
    soundHandler(sound, countdown)
  }, 1000)
}
function soundHandler(sound, countdown) {
  if (sound) {
    soundButton.innerText = '🔊'
    audioStart.currentTime = 0
    audioEnd.currentTime = 0
    if (countdown > 0) {
      audioStart.pause()
      audioEnd.pause()
      audioStart.play()
    } else {
      audioEnd.pause()
      audioStart.pause()
      audioEnd.play()
    }
  } else {
    soundButton.innerText = '🔇'
    audioStart.pause()
    audioEnd.pause()
  }
}
function displayTimeLeft(time) {
  leftTime.classList.remove('blink')
  const hourLeft = Math.floor(time / 3600)
  const minLeft = Math.floor(time % 3600 / 60)
  const secLeft = time % 60
  const display = `${hourLeft <= 0 ? `` : `${hourLeft}:`}${minLeft < 10 ? `0${minLeft}:` : `${minLeft}:`}${secLeft < 10 ? `0${secLeft}` : secLeft}`
  leftTime.innerText = display
  document.title = display
  if (time < 0) {
    leftTime.innerText = `Time's up!`
    leftTime.classList.add('blink')
    document.title = `⏳ Countdown Timer`
  }
}
function displayTimeEnd(time) {
  const end = new Date(time);
  let hour = end.getHours()
  let min = end.getMinutes()
  endTime.innerText = `⏱️ ${hour}:${min < 10 ? `0${min}` : `${min}`}`
}
function buttonSetTimer() {
  let sec = parseInt(this.dataset.time)
  setTimer(sec)
}
function inputSetTimer(e) {
  // 防止預設送出表單功能
  e.preventDefault()
  let sec = parseInt(this.minutes.value) * 60 // 將值轉為數字再轉為秒
  if (sec) { // 若值不是數字則不執行
    // 清除表單的值
    this.reset()
    setTimer(sec)
  }
}

timeButton.forEach(btn => btn.addEventListener('click', buttonSetTimer))
timeInput.addEventListener('submit', inputSetTimer)
soundButton.addEventListener('click', () => {
  sound = !sound
})
