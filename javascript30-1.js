; (function () {

  function playerHandler(e) {
    //play music
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`)
    if (audio) {
      audio.currentTime = 0
      audio.play()
    }
    //dom style
    const dom = document.querySelector(`div[data-key="${e.keyCode}"]`)
    if (dom) {
      dom.classList.add('playing')
    }
  }
  function TransitionHandler(e) {
    if (e.propertyName === 'transform') {
      e.currentTarget.classList.remove('playing')
    }
  }

  window.addEventListener('keydown', playerHandler)
  document.querySelectorAll('.key').forEach(key => key.addEventListener('transitionend', TransitionHandler))

})()