const video = document.querySelector('.player')
const canvas = document.querySelector('.photo')
const ctx = canvas.getContext('2d')
const strip = document.querySelector('.strip')
const snap = document.querySelector('.snap')
let type = 2

function getVideo() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
      console.log(localMediaStream)
      video.srcObject = localMediaStream;
      video.play()
    })
    .catch(err => {
      console.error(`OH NO!!!`, err)
      alert(`you've to open your camera!`)
    });
}
function paintCanvas() {
  let width = video.videoWidth
  let height = video.videoHeight
  canvas.width = width
  canvas.height = height

  let pixels = ctx.getImageData(0, 0, width, height)
  console.log(`Area:${width * height},Pixels:${pixels.data.length}`)

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height)
    pixels = ctx.getImageData(0, 0, width, height)

    switch (type) {
      case 1:
        pixels = blueEffect(pixels)
        break
      case 2:
        pixels = rgbSplit(pixels)
        break
      case 3:
        pixels = greenScreen(pixels)
        break
    }
    ctx.clearRect(0, 0, width, height)
    ctx.putImageData(pixels, 0, 0)

  }, 16)
}
function blueEffect(pixels) {
  for (i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] - 50
    pixels.data[i + 1] = pixels.data[i + 1] + 0
    pixels.data[i + 2] = pixels.data[i + 2] + 200
  }
  return pixels
}
function rgbSplit(pixels) {
  for (i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0 - 100] = pixels.data[i + 0]
    pixels.data[i + 1 - 300] = pixels.data[i + 1]
    pixels.data[i + 2 - 150] = pixels.data[i + 2]
  }
  return pixels
}
function greenScreen(pixels) {
  const levels = {}
  document.querySelectorAll('.rgb input').forEach(input => {
    levels[input.name] = input.value
  })
  for (i = 0; i < pixels.data.length; i += 4) {
    let red = pixels.data[i + 0]
    let green = pixels.data[i + 1]
    let blue = pixels.data[i + 2];
    let alpha = pixels.data[i + 3];

    if (red >= levels.rmin
      && green >= levels.gmin
      && blue >= levels.bmin
      && red <= levels.rmax
      && green <= levels.gmax
      && blue <= levels.bmax) {
      pixels.data[i + 3] = 0;
    }
  }
  return pixels
}
function switchType(num) {
  type = num
  console.log(type)
  return type
}
function takePhoto() {
  snap.currentTime = 0;
  snap.play();

  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'webcam_image');
  link.innerHTML = `<img src="${data}" alt="Webcam Image" />`;
  strip.insertBefore(link, strip.firstChild);
}
getVideo()
video.addEventListener('canplay', paintCanvas)
