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

jQuery('#btn-request').click(function() {
  //block of code that runs when the click event triggers
  console.log('here ', widgetDiv.dataset.message)
  jQuery.ajax({
    url:
      'localhost:8000/api/v1/donation/order/receiver/?page=1&page_size=20&filter=&sort_direction=asc&sort_col=created_at&from_date=0&to_date=1583244373841',
    beforeSend: function(xhr) {
      xhr.setRequestHeader('API-KEY', 'w4R8fbUbg5P37IMn9CneRLIkLVmU5OEc')
      xhr.setRequestHeader('Access-Control-Allow-Origin', '*')
    },
    success: function(data) {
      alert(data)
      //process the JSON data etc
    },
  })
})

function httpGet() {
  var url =
    'https://whydonate-development.appspot.com/api/v1/project/fundraising/local/?slug=checking-a-new-fundraiser-with-new-crisp-integration'
  var xmlHttp = new XMLHttpRequest()
  xmlHttp.open('GET', url, false) // false for synchronous request
  xmlHttp.setRequestHeader('Content-Type', 'application/json')
  xmlHttp.setRequestHeader('API-KEY', 'w4R8fbUbg5P37IMn9CneRLIkLVmU5OEc')
  //   xmlHttp.setRequestHeader('Access-Control-Allow-Origin', '*')
  xmlHttp.send(null)
  return xmlHttp.responseText
}

// divElm = document.getElementById('widget');
// divElm.style.height = '200px';
// divElm.style.width = '300px';
// divElm.style.backgroundColor = "red";
