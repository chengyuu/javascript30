const addItems = document.querySelector('.add-items')
const itemsList = document.querySelector('.plates')
const items = JSON.parse(localStorage.getItem('items')) || []

function createList(datas = [], dom) {
  dom.innerHTML = datas.map((data, i) => {
    return `
      <li>
        <input type='checkbox' data-index='${i}' id='item${i}' ${data.done ? 'checked' : ''} />
        <label for='item${i}'>${data.text}</label>
      </li>
    `
  }).join('')
}
createList(items, itemsList)
function submitHandler(e) {
  // 取消表單在提交後的執行動作
  e.preventDefault()
  let text = this.querySelector('[name=item]').value
  // 更新 javascript 資料
  items.push({ text, done: false })
  // 更新 localStorage 資料(須轉為字串)
  localStorage.setItem('items', JSON.stringify(items))
  // 更新 HTML 畫面
  createList(items, itemsList)
  // 清除輸入文字
  this.reset()
}
function clickHandler(e) {
  // e.currentTarget:整個事件綁定的對象 , e.target:事件穿過去的對象 
  // 避免重複觸發而抵銷
  if (!e.target.matches('input')) return
  let index = e.target.dataset['index']
  // 更新 javascript 資料
  items[index].done = !items[index].done
  // 更新 localStorage 資料(須轉為字串)
  localStorage.setItem('items', JSON.stringify(items))
  // 更新 HTML 畫面
  createList(items, itemsList)
}
addItems.addEventListener('submit', submitHandler)
itemsList.addEventListener('click', clickHandler)
