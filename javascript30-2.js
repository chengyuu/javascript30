; (function () {

  const clock = document.querySelector('.clock')
  const hourHand = document.querySelector('.hour-hand')
  const minHand = document.querySelector('.min-hand')
  const secHand = document.querySelector('.sec-hand')
  const h1 = document.querySelector('h1')
  const body = document.querySelector('body')

  function setClock() {
    let date = new Date()
    // 指針變動
    let secDeg = date.getSeconds() * 6 // (360/60)
    let minDeg = date.getMinutes() * 6 + date.getSeconds() * 6 / 60  // (360/60)
    let hourDeg = date.getHours() * 30 + date.getMinutes() * 30 / 60 // (360/12)
    secHand.style.transform = `rotate(${secDeg}deg) `
    minHand.style.transform = `rotate(${minDeg}deg) `
    hourHand.style.transform = `rotate(${hourDeg}deg) `
    // 顯示時間
    h1.innerHTML = `It's ${date.toLocaleTimeString('it-IT')}.`
  }
  setClock() // 初始畫面  
  setInterval(setClock, 1000) // 計時器

  // 秒針到0時畫面顏色變動
  function changeColor() {
    if (secHand.style.transform == 'rotate(0deg)') {
      clock.style.backgroundColor = '#ccc'
    } else {
      clock.style.backgroundColor = 'transparent'
    }
  }
  changeColor()
  setInterval(changeColor, 1000)

})()