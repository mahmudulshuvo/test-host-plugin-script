console.log('executing javascript')
var widgetDiv = document.getElementById('widget')
widgetDiv.style.backgroundColor = 'lightblue'
widgetDiv.style.height = '200px'
widgetDiv.style.width = '300px'
widgetDiv.style.margin = '50px'

var btn = document.createElement('BUTTON') // Create a <button> element
btn.innerHTML = 'CLICK ME'
btn.id = 'btn-request'
btn.onclick = this.handleClick
widgetDiv.appendChild(btn)

function handleClick() {
  console.log(widgetDiv.dataset.message)
  var res = httpGet()
  console.log('response ', res)
}

// jQuery('#btn-request').click(function() {
//   //block of code that runs when the click event triggers
//   console.log('here ', widgetDiv.dataset.message)
//   jQuery.ajax({
//     url:
//       'localhost:8000/api/v1/donation/order/receiver/?page=1&page_size=20&filter=&sort_direction=asc&sort_col=created_at&from_date=0&to_date=1583244373841',
//     beforeSend: function(xhr) {
//       xhr.setRequestHeader('API-KEY', 'w4R8fbUbg5P37IMn9CneRLIkLVmU5OEc')
//       xhr.setRequestHeader('Access-Control-Allow-Origin', '*')
//     },
//     success: function(data) {
//       alert(data)
//       //process the JSON data etc
//     },
//   })
// })

function httpGet() {
  //   var url =
  //     'http://127.0.0.1:8000/api/v1/project/fundraising/local/?slug=checking-a-new-fundraiser-with-new-crisp-integration'
  //   var xmlHttp = new XMLHttpRequest()
  //   xmlHttp.open('GET', url, false) // false for synchronous request
  //   xmlHttp.setRequestHeader('Content-Type', 'application/json')
  //   xmlHttp.setRequestHeader('Access-Control-Allow-Origin', '*')
  //   xmlHttp.setRequestHeader('API-KEY', 'w4R8fbUbg5P37IMn9CneRLIkLVmU5OEc')
  //   // xmlHttp.setRequestHeader(
  //   //   'Access-Control-Allow-Origin',
  //   //   'http://127.0.0.1:8000/',
  //   // )
  //   xmlHttp.send(null)
  //   return xmlHttp.responseText
  //   let headers = new Headers()
  //   headers.append('Content-Type', 'application/json')

  const proxyurl = 'https://intense-temple-29395.herokuapp.com/'
  const url =
    'https://whydonate-development.appspot.com/api/v1/project/fundraising/local/?slug=fundraising-by-shuvo' // site that doesn’t send Access-Control-*
  fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
    .then(response => response.text())
    .then(contents => console.log(contents))
    .catch(() =>
      console.log('Can’t access ' + url + ' response. Blocked by browser?'),
    )
}

// divElm = document.getElementById('widget');
// divElm.style.height = '200px';
// divElm.style.width = '300px';
// divElm.style.backgroundColor = "red";

// function performSignIn() {
//   let headers = new Headers()

//   headers.append('Content-Type', 'application/json')
//   headers.append('Accept', 'application/json')
//   headers.append(
//     'API-KEY',
//     'w4R8fbUbg5P37IMn9CneRLIkLVmU5OEc'),
//   )
//   headers.append('Origin', 'ttp://127.0.0.1:8000/api/v1/project/fundraising/local/?slug=checking-a-new-fundraiser-with-new-crisp-integration')

//   fetch(sign_in, {
//     mode: 'cors',
//     credentials: 'include',
//     method: 'GET',
//     headers: headers,
//   })
//     .then(response => response.json())
//     .then(json => console.log(json))
//     .catch(error => console.log('Authorization failed : ' + error.message))
// }
