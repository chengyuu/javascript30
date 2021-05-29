; (function () {
  const inputs = document.querySelectorAll('.controls input');

  function handleUpdate() {
    const unit = this.dataset.sizing || '';
    document.querySelector(':root').style.setProperty(`--${this.name}`, this.value + unit);
  }

  inputs.forEach(function (input) {
    input.addEventListener('change', handleUpdate)
    input.addEventListener('mousemove', handleUpdate)
  })
})()
