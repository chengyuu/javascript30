const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

/*XMLHttpRequest:
function requestHandler() {
  console.log(JSON.parse(this.response))
}
let req = new XMLHttpRequest()
req.addEventListener('load', requestHandler)
req.open('get', endpoint)
req.send()
*/
//Fetch:
let cities = null
fetch(endpoint)
  .then(response => response.json())
  .then(data => (cities = data))
function findMatches(wordToMatch, cities) {
  return cities.filter(place => {
    const regexp = new RegExp(wordToMatch, 'gi')
    return place.city.match(regexp) || place.state.match(regexp)
  })
}
function numberWithComa(x) {
  return (x * 1).toLocaleString()
  /*RegExp:
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  */
}
let suggestions = document.querySelector('.suggestions')
function inputHandler() {
  const matchArray = findMatches(this.value, cities)
  const html = matchArray
    .map(place => {
      const regexp = new RegExp(this.value, 'gi')
      const cityName = place.city.replace(regexp,
        `<span class='match'>${this.value}</span>`)
      const stateName = place.state.replace(regexp,
        `<span class='match'>${this.value}</span>`)
      return `    
    <li>
      <span class='name'>${cityName}, ${stateName}</span>
      <span class='population'>${numberWithComa(place.population)}
    </span >
    </li >
    `
    }).join('')
  suggestions.innerHTML = `
  <li>
    <span class='population'>city, state (${numberWithComa(matchArray.length)})</span>
    <span class='population'>population</span>
  </li> ${html}
  `
}
document.querySelector('.search').addEventListener('change', inputHandler)
document.querySelector('.search').addEventListener('keyup', inputHandler)
