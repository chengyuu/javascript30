let canvas = document.querySelector('#draw')
let ctx = canvas.getContext('2d')
let width = document.querySelector('#width')
let randomColor = document.querySelector('.randomColor')
let save = document.querySelector('.save')

// 預設繪圖樣式與顏色
ctx.strokeStyle = '#ccc'
ctx.lineWidth = 20
ctx.lineCap = 'round'
ctx.lineJoin = 'round'

// 樣式變動
width.addEventListener('change', () => {
  changeWidth = false;
  ctx.lineWidth = width.value
})
function changeColor() {
  const random = Math.floor(Math.random() * 16777215).toString(16);
  ctx.strokeStyle = "#" + random;
  randomColor.style.backgroundColor = "#" + random;
}
randomColor.addEventListener('click', changeColor)

// 畫圖
let drawingIn = false
let drawingDown = false
let x = 0, y = 0

document.addEventListener('mousedown', (e) => {
  drawingDown = true;
  [x, y] = [e.offsetX, e.offsetY];
})
document.addEventListener('mouseup', () => {
  drawingDown = false;
})
canvas.addEventListener('mousemove', (e) => {
  if (drawingIn !== false && drawingDown !== false) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    [x, y] = [e.offsetX, e.offsetY];
    ctx.lineTo(x, y);
    ctx.stroke();
  }
  else {
    return
  }
})
canvas.addEventListener('mouseleave', () => {
  drawingIn = false;
})
canvas.addEventListener('mouseenter', (e) => {
  drawingIn = true;
  [x, y] = [e.offsetX, e.offsetY];
})

// 儲存
save.addEventListener('click', saveImage)
function saveImage() {
  this.href = canvas.toDataURL("image/jpg");
};
