const utterance = new SpeechSynthesisUtterance()
utterance.text = document.querySelector('[name="text"]').value

let voices = []
const voicesDropdown = document.querySelector('[name="voice"]')
const options = document.querySelectorAll('[type="range"], [name="text"]')
const speakButton = document.querySelector('#speak')
const stopButton = document.querySelector('#stop')

function populateVoices() {
  voices = this.getVoices()
  voicesDropdown.innerHTML = voices
    .filter(voice => voice.lang.includes('zh-TW'))
    .map(voice => `<option value='${voice.name}'>${voice.name}</option>`).join('')
}
function setVoice() {
  utterance.voice = voices.find(voice => voice.name === this.value)
  console.log(utterance)
  play()
}
function setOption() {
  console.log(this.name, this.value)
  utterance[this.name] = this.value
  play()
}
function play() {
  stop()
  speechSynthesis.speak(utterance)
  console.log('play')
}
function stop() {
  speechSynthesis.cancel()
}
speechSynthesis.addEventListener('voiceschanged', populateVoices)
voicesDropdown.addEventListener('change', setVoice)
options.forEach(option => option.addEventListener('change', setOption))
speakButton.addEventListener('click', play)
stopButton.addEventListener('click', stop)
