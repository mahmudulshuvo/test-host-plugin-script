console.log('executing javascript')

var widgetDiv = document.getElementById('widget')
var donateButton = document.createElement('BUTTON')

var head = document.getElementsByTagName('head')[0]
var style = document.createElement('link')
style.href = 'style.css'
style.type = 'text/css'
style.rel = 'stylesheet'
head.appendChild(style)

function designWidget(option) {
  console.log('option value ', option)

  if (option === 1) {
    var fundraiserImage = document.createElement('IMG')
    fundraiserImage.id = 'fundraiser-image'
    fundraiserImage.style.height = '150px'
    fundraiserImage.style.width = '100%'
    fundraiserImage.style.marginBottom = '10px'
    fundraiserImage.style.borderTopLeftRadius = '15px'
    fundraiserImage.style.borderTopRightRadius = '15px'
    widgetDiv.style.height = '350px'
    var blankDiv = document.createElement('DIV')
    blankDiv.style.width = '100%'
    widgetDiv.appendChild(fundraiserImage)
    widgetDiv.appendChild(blankDiv)

    var receiveAmount = document.createElement('LABEL')
    receiveAmount.id = 'receive-amount'
    widgetDiv.appendChild(receiveAmount)

    var targetAmount = document.createElement('LABEL')
    targetAmount.id = 'target-amount'
    widgetDiv.appendChild(targetAmount)

    var progressBar = document.createElement('DIV')
    progressBar.id = 'progress-bar'
    widgetDiv.appendChild(progressBar)

    var raisedBar = document.createElement('DIV')
    raisedBar.id = 'raised-bar'
    progressBar.appendChild(raisedBar)

    var progressDiv = document.createElement('DIV')
    progressDiv.id = 'prgoress-div'
    widgetDiv.appendChild(progressDiv)

    var raisedLabel = document.createElement('LABEL')
    raisedLabel.id = 'raised-label'
    progressDiv.appendChild(raisedLabel)

    var daysLabel = document.createElement('LABEL')
    daysLabel.id = 'remaining-days'
    progressDiv.appendChild(daysLabel)

    donateButton.id = 'donate-btn'
    donateButton.innerHTML = 'Donate'
    donateButton.onclick = this.handleDonate
    widgetDiv.appendChild(donateButton)
  } else if (option == 2) {
    //create left side
    var donationForm = document.createElement('DIV')
    donationForm.id = 'donation-form'
    donationForm.style.height = '100%'
    donationForm.style.width = '50%'
    donationForm.style.margin = '10px'
    // donationForm.style.backgroundColor = 'red'
    widgetDiv.appendChild(donationForm)

    widgetDiv.style.display = 'flex'
    widgetDiv.style.flexDirection = 'row'
    widgetDiv.style.width = '800px'

    var labelDiv = document.createElement('div')
    labelDiv.style.display = 'flex'
    labelDiv.style.flexDirection = 'column'
    donationForm.appendChild(labelDiv)

    var lable1 = document.createElement('label')
    lable1.innerText = 'Secured Online Donation'
    lable1.style.fontSize = '24px'
    lable1.style.fontWeight = '600'
    lable1.style.color = 'green'
    labelDiv.appendChild(lable1)

    var lable2 = document.createElement('label')
    lable2.innerText = 'Enter your donation'
    lable2.style.fontSize = '20px'
    lable2.style.fontWeight = '600'
    labelDiv.appendChild(lable2)

    var periodDiv = document.createElement('div')
    periodDiv.style.display = 'flex'
    periodDiv.style.flexDirection = 'row'
    periodDiv.style.marginTop = '10px'

    var oneTimeRadio = document.createElement('input')
    oneTimeRadio.setAttribute('type', 'radio')
    oneTimeRadio.name = 'period-intervals'
    oneTimeRadio.value = '1'
    oneTimeRadio.checked = true
    oneTimeRadio.onclick = () => this.handlePeriodInterval(1)

    var oneTimeLabel = document.createElement('label')
    oneTimeLabel.innerText = 'One time'
    oneTimeLabel.fontSize = '14px'
    oneTimeLabel.style.display = 'block'

    periodDiv.appendChild(oneTimeRadio)
    periodDiv.appendChild(oneTimeLabel)
    donationForm.appendChild(periodDiv)

    var monthlyRadio = document.createElement('input')
    monthlyRadio.setAttribute('type', 'radio')
    monthlyRadio.name = 'period-intervals'
    monthlyRadio.value = '2'
    monthlyRadio.onclick = () => this.handlePeriodInterval(2)

    var monthlyLabel = document.createElement('label')
    monthlyLabel.innerText = 'Monthly'
    monthlyLabel.fontSize = '14px'
    monthlyLabel.style.display = 'block'

    periodDiv.appendChild(monthlyRadio)
    periodDiv.appendChild(monthlyLabel)

    var yearlyRadio = document.createElement('input')
    yearlyRadio.setAttribute('type', 'radio')
    yearlyRadio.name = 'period-intervals'
    yearlyRadio.value = '3'
    yearlyRadio.onclick = () => this.handlePeriodInterval(3)

    var yearlylabel = document.createElement('label')
    yearlylabel.innerText = 'Yearly'
    yearlylabel.fontSize = '14px'
    yearlylabel.style.display = 'block'

    periodDiv.appendChild(yearlyRadio)
    periodDiv.appendChild(yearlylabel)
    // donationForm.appendChild(periodDiv)

    var hrule = document.createElement('hr')
    hrule.style.background = '#72bcd4'
    hrule.style.height = '1px'
    hrule.style.display = 'flex'
    hrule.style.flexDirection = 'row'
    hrule.style.justifyContent = 'space-between'
    donationForm.appendChild(hrule)

    var oneTimeBar = document.createElement('div')
    oneTimeBar.id = 'onetime-bar'
    oneTimeBar.style.height = '5px'
    oneTimeBar.style.width = '50px'
    oneTimeBar.style.background = 'red'
    hrule.appendChild(oneTimeBar)

    var monthlyBar = document.createElement('div')
    monthlyBar.id = 'monthly-bar'
    monthlyBar.style.height = '5px'
    monthlyBar.style.width = '50px'
    monthlyBar.style.background = '#72bcd4'
    hrule.appendChild(monthlyBar)

    var yearlyBar = document.createElement('div')
    yearlyBar.id = 'yearly-bar'
    yearlyBar.style.height = '5px'
    yearlyBar.style.width = '50px'
    yearlyBar.style.background = '#72bcd4'
    hrule.appendChild(yearlyBar)

    var selectAmountlabel = document.createElement('label')
    selectAmountlabel.innerText = 'Select Amount'
    selectAmountlabel.style.fontSize = '14px'
    selectAmountlabel.fontWeight = '500'
    donationForm.appendChild(selectAmountlabel)

    var amountDiv = document.createElement('div')
    amountDiv.style.display = 'flex'
    amountDiv.style.marginTop = '10px'
    amountDiv.style.flexDirection = 'row'
    amountDiv.style.justifyContent = 'space-around'
    donationForm.appendChild(amountDiv)

    var firstAmount = document.createElement('div')
    firstAmount.style.display = 'flex'
    firstAmount.style.flexDirection = 'row'
    firstAmount.style.height = '45px'
    firstAmount.style.width = '60px'
    firstAmount.style.borderRadius = '5px'
    firstAmount.style.border = '1px black solid'

    var firstAmountRadio = document.createElement('input')
    firstAmountRadio.setAttribute('type', 'radio')
    firstAmountRadio.name = 'select-amount'
    firstAmountRadio.value = '25'
    firstAmountRadio.style.marginTop = '15px'
    // firstAmountRadio.onclick = () => this.handlePeriodInterval(2)

    var firstAmountLabel = document.createElement('label')
    firstAmountLabel.innerText = '€25'
    firstAmountLabel.style.fontSize = '16px'
    firstAmountLabel.style.fontWeight = '500'
    firstAmountLabel.style.marginTop = '12px'
    firstAmountLabel.style.display = 'block'

    firstAmount.appendChild(firstAmountRadio)
    firstAmount.appendChild(firstAmountLabel)

    amountDiv.appendChild(firstAmount)

    var secondAmount = document.createElement('div')
    secondAmount.style.height = '45px'
    secondAmount.style.width = '60px'
    secondAmount.style.borderRadius = '5px'
    secondAmount.style.border = '1px black solid'

    secondAmount.style.display = 'flex'
    secondAmount.style.flexDirection = 'row'

    var secondAmountRadio = document.createElement('input')
    secondAmountRadio.setAttribute('type', 'radio')
    secondAmountRadio.name = 'select-amount'
    secondAmountRadio.value = '50'
    secondAmountRadio.style.marginTop = '15px'
    // secondAmountRadio.onclick = () => this.handlePeriodInterval(2)

    var secondAmountLabel = document.createElement('label')
    secondAmountLabel.innerText = '€50'
    secondAmountLabel.style.fontSize = '16px'
    secondAmountLabel.style.fontWeight = '500'
    secondAmountLabel.style.marginTop = '12px'
    secondAmountLabel.style.display = 'block'

    secondAmount.appendChild(secondAmountRadio)
    secondAmount.appendChild(secondAmountLabel)

    amountDiv.appendChild(secondAmount)

    var thirdAmount = document.createElement('div')
    thirdAmount.style.height = '45px'
    thirdAmount.style.width = '60px'
    thirdAmount.style.borderRadius = '5px'
    thirdAmount.style.border = '1px black solid'

    thirdAmount.style.display = 'flex'
    thirdAmount.style.flexDirection = 'row'

    var thirdAmountRadio = document.createElement('input')
    thirdAmountRadio.setAttribute('type', 'radio')
    thirdAmountRadio.name = 'select-amount'
    thirdAmountRadio.value = '75'
    thirdAmountRadio.style.marginTop = '15px'
    // thirdAmountRadio.onclick = () => this.handlePeriodInterval(2)

    var thirdAmountLable = document.createElement('label')
    thirdAmountLable.innerText = '€75'
    thirdAmountLable.style.fontSize = '16px'
    thirdAmountLable.style.fontWeight = '500'
    thirdAmountLable.style.marginTop = '12px'
    thirdAmountLable.style.display = 'block'

    thirdAmount.appendChild(thirdAmountRadio)
    thirdAmount.appendChild(thirdAmountLable)

    amountDiv.appendChild(thirdAmount)

    var forthAmount = document.createElement('div')
    forthAmount.style.height = '45px'
    forthAmount.style.width = '60px'
    forthAmount.style.borderRadius = '5px'
    forthAmount.style.border = '1px black solid'

    forthAmount.style.display = 'flex'
    forthAmount.style.flexDirection = 'row'

    var forthAmountRadio = document.createElement('input')
    forthAmountRadio.setAttribute('type', 'radio')
    forthAmountRadio.name = 'select-amount'
    forthAmountRadio.value = '100'
    forthAmountRadio.style.marginTop = '15px'
    // forthAmountRadio.onclick = () => this.handlePeriodInterval(2)

    var forthAmountLabel = document.createElement('label')
    forthAmountLabel.innerText = '€100'
    forthAmountLabel.style.fontSize = '16px'
    forthAmountLabel.style.fontWeight = '500'
    forthAmountLabel.style.marginTop = '12px'
    forthAmountLabel.style.display = 'block'

    forthAmount.appendChild(forthAmountRadio)
    forthAmount.appendChild(forthAmountLabel)

    amountDiv.appendChild(forthAmount)

    var otherAmount = document.createElement('div')
    otherAmount.style.height = '45px'
    otherAmount.style.width = '60px'
    otherAmount.style.borderRadius = '5px'
    otherAmount.style.border = '1px black solid'

    otherAmount.style.display = 'flex'
    otherAmount.style.flexDirection = 'row'

    var otherAmountRadio = document.createElement('input')
    otherAmountRadio.setAttribute('type', 'radio')
    otherAmountRadio.name = 'select-amount'
    otherAmountRadio.value = 'other'
    otherAmountRadio.style.marginTop = '15px'
    // otherAmountRadio.onclick = () => this.handlePeriodInterval(2)

    var otherAmountLable = document.createElement('label')
    otherAmountLable.innerText = 'Other'
    otherAmountLable.style.fontSize = '16px'
    otherAmountLable.style.fontWeight = '500'
    otherAmountLable.style.marginTop = '12px'
    otherAmountLable.style.display = 'block'

    otherAmount.appendChild(otherAmountRadio)
    otherAmount.appendChild(otherAmountLable)

    amountDiv.appendChild(otherAmount)

    // create right side
    var fundraiserInfoDiv = document.createElement('DIV')
    fundraiserInfoDiv.style.height = '100%'
    fundraiserInfoDiv.style.width = '50%'
    // fundraiserInfoDiv.style.margin = '10px'

    widgetDiv.appendChild(fundraiserInfoDiv)

    var fundraiserImage = document.createElement('IMG')
    fundraiserImage.id = 'fundraiser-image'
    fundraiserImage.style.height = '150px'
    fundraiserImage.style.width = '100%'
    fundraiserImage.style.marginBottom = '10px'
    fundraiserImage.style.borderTopLeftRadius = '15px'
    fundraiserImage.style.borderTopRightRadius = '15px'
    widgetDiv.style.height = '350px'
    var blankDiv = document.createElement('DIV')
    blankDiv.style.width = '100%'
    fundraiserInfoDiv.appendChild(fundraiserImage)
    fundraiserInfoDiv.appendChild(blankDiv)

    var receiveAmount = document.createElement('LABEL')
    receiveAmount.id = 'receive-amount'
    fundraiserInfoDiv.appendChild(receiveAmount)

    var targetAmount = document.createElement('LABEL')
    targetAmount.id = 'target-amount'
    fundraiserInfoDiv.appendChild(targetAmount)

    var progressBar = document.createElement('DIV')
    progressBar.id = 'progress-bar'
    fundraiserInfoDiv.appendChild(progressBar)

    var raisedBar = document.createElement('DIV')
    raisedBar.id = 'raised-bar'
    progressBar.appendChild(raisedBar)

    var progressDiv = document.createElement('DIV')
    progressDiv.id = 'prgoress-div'
    fundraiserInfoDiv.appendChild(progressDiv)

    var raisedLabel = document.createElement('LABEL')
    raisedLabel.id = 'raised-label'
    progressDiv.appendChild(raisedLabel)

    var daysLabel = document.createElement('LABEL')
    daysLabel.id = 'remaining-days'
    progressDiv.appendChild(daysLabel)

    donateButton.id = 'donate-btn'
    donateButton.innerHTML = 'Donate'
    donateButton.onclick = this.handleDonate
    fundraiserInfoDiv.appendChild(donateButton)

    // widgetDiv.appendChild(fundraiserImage)
    // widgetDiv.appendChild(blankDiv)
  } else {
    var blankDiv = document.createElement('DIV')
    blankDiv.style.height = '20px'
    blankDiv.style.width = '100%'
    widgetDiv.appendChild(blankDiv)

    var receiveAmount = document.createElement('LABEL')
    receiveAmount.id = 'receive-amount'
    widgetDiv.appendChild(receiveAmount)

    var targetAmount = document.createElement('LABEL')
    targetAmount.id = 'target-amount'
    widgetDiv.appendChild(targetAmount)

    var progressBar = document.createElement('DIV')
    progressBar.id = 'progress-bar'
    widgetDiv.appendChild(progressBar)

    var raisedBar = document.createElement('DIV')
    raisedBar.id = 'raised-bar'
    progressBar.appendChild(raisedBar)

    var progressDiv = document.createElement('DIV')
    progressDiv.id = 'prgoress-div'
    widgetDiv.appendChild(progressDiv)

    var raisedLabel = document.createElement('LABEL')
    raisedLabel.id = 'raised-label'
    progressDiv.appendChild(raisedLabel)

    var daysLabel = document.createElement('LABEL')
    daysLabel.id = 'remaining-days'
    progressDiv.appendChild(daysLabel)

    donateButton.id = 'donate-btn'
    donateButton.innerHTML = 'Donate'
    donateButton.onclick = this.handleDonate
    widgetDiv.appendChild(donateButton)
  }
}

function handlePeriodInterval(value) {
  console.log('handlePeriodInterval() ', value)
  var onetimeBar = document.getElementById('onetime-bar')
  var monthlyBar = document.getElementById('monthly-bar')
  var yearlyBar = document.getElementById('yearly-bar')

  onetimeBar.style.backgroundColor = 'red'
  monthlyBar.style.backgroundColor = 'red'
  yearlyBar.style.backgroundColor = 'red'

  if (value === 1) {
    monthlyBar.style.backgroundColor = '#72bcd4'
    yearlyBar.style.backgroundColor = '#72bcd4'
  } else if (value === 2) {
    onetimeBar.style.backgroundColor = '#72bcd4'
    yearlyBar.style.backgroundColor = '#72bcd4'
  } else {
    onetimeBar.style.backgroundColor = '#72bcd4'
    monthlyBar.style.backgroundColor = '#72bcd4'
  }
}

function createModal() {
  var modalDiv = document.createElement('DIV')
  modalDiv.id = 'myModal'
  modalDiv.className = 'modal'

  var modalContent = document.createElement('DIV')
  modalContent.className = 'modal-content'
  modalDiv.appendChild(modalContent)

  var closeSpan = document.createElement('SPAN')
  closeSpan.innerHTML = '&times;'
  closeSpan.className = 'close'
  modalContent.appendChild(closeSpan)
  document.body.appendChild(modalDiv)

  // Design donate Form
  var formDiv = document.createElement('DIV')
  formDiv.className = 'donate-form'

  var fromLabel = document.createElement('label')
  fromLabel.className = 'donate-form-label'
  fromLabel.innerText = 'Doantion From'

  modalContent.appendChild(formDiv)
  formDiv.appendChild(fromLabel)
}

designWidget(2)
createModal()
setTimeout(addJquery, 300)

function addJquery() {
  var script = document.createElement('script')
  script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js'
  script.type = 'text/javascript'
  script.onload = function() {
    // your jQuery code here
    jQuery(document).ready(function() {
      // console.log(widgetDiv.dataset.message)
      var url = makeUrl()
      jQuery.ajax({
        url: url,
        beforeSend: function(xhr) {
          console.log('before send')
        },
        success: function(result) {
          console.log('response ', result)
          testCheck()
          var fundraiserImageView = document.getElementById('fundraiser-image')
          if (fundraiserImageView) {
            fundraiserImageView.src = result['data']['background']['image']
          }

          var targetAmount = document.getElementById('target-amount')
          var receiveAmount = document.getElementById('receive-amount')
          receiveAmount.innerText = '€' + result['data']['donation']['amount']
          targetAmount.innerText = 'of €' + result['data']['amount_target']

          var date1 = new Date() // current date
          var date2 = new Date(result['data']['end_date']) // mm/dd/yyyy format
          var timeDiff = Math.abs(date2.getTime() - date1.getTime()) // in miliseconds
          var timeDiffInDays = Math.ceil(timeDiff / 1000 / 3600 / 24) // in second
          var remainDaysLabel = document.getElementById('remaining-days')

          if (timeDiffInDays <= 0) {
            remainDaysLabel.innerText = 'closed'
            var donateBtn = document.getElementById('donate-btn')
            donateBtn.disabled = true
            donateBtn.style.backgroundColor = 'gray'
          } else {
            remainDaysLabel.innerText = timeDiffInDays + ' day(s) left'
          }

          var progress =
            (result['data']['donation']['amount'] /
              result['data']['amount_target']) *
            100

          if (progress > 100) {
            progress = 100
            var raisedBar = document.getElementById('raised-bar')
            raisedBar.style.width = '100%'
          } else {
            raisedBar = document.getElementById('raised-bar')
            raisedBar.style.width = progress.toString() + '%'
          }

          var raisedLabel = document.getElementById('raised-label')
          raisedLabel.innerText = progress + '% funded'
        },
        error: function(message) {
          console.log('error message ', message)
        },
        complete: function() {
          // hide loader here
          console.log('completed block')
          var modal = document.getElementById('myModal')
          modal.style.display = 'none'
        },
      })
    })
    // console.log(widgetDiv.dataset.message)
  }
  document.getElementsByTagName('head')[0].appendChild(script)
}

function testCheck() {
  console.log('Hi there')
}

function handleDonate() {
  console.log('donate')

  // Get the modal
  var modal = document.getElementById('myModal')

  // // Get the button that opens the modal
  // var btn = document.getElementById('myBtn')

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName('close')[0]

  if (modal.style.display === 'block') {
    modal.style.display = 'none'
  } else {
    modal.style.display = 'block'
  }

  // // When the user clicks the button, open the modal
  // donateButton.onclick = function() {
  //   modal.style.display = 'block'
  // }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = 'none'
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none'
    }
  }
}

var btn = document.createElement('BUTTON') // Create a <button> element
btn.innerHTML = 'GET'
btn.id = 'btn-request-get'
btn.onclick = this.handleGET
// widgetDiv.appendChild(btn)

var btnP = document.createElement('BUTTON') // Create a <button> element
btnP.innerHTML = 'POST'
btnP.id = 'btn-request-post'
btnP.onclick = this.handlePOST
// widgetDiv.appendChild(btnP)

var btnC = document.createElement('BUTTON') // Create a <button> element
btnC.innerHTML = 'Check'
btnC.id = 'btn-request'
// btnP.onclick = this.handleClick
// widgetDiv.appendChild(btnC)

// function handleGET() {
//   console.log(widgetDiv.dataset.message)
//   var res = httpGet()
//   console.log('response get ', res)
// }

// function handlePOST() {
//   console.log(widgetDiv.dataset.message)
//   var res = httpPost()
//   console.log('response post ', res)
// }

function httpPost() {
  data = {
    amount: 25,
    is_anonymous: '',
    newsletter: false,
    pay_period: 'once',
    fundraising_local_id: 419,
    currency_code: 'eur',
    lang: 'en',
    description: 'Fundraising by Shuvo',
    bank_account: '',
    return_url:
      'https://whydonate-staging-ui.appspot.com/fundraising/fundraising-by-shuvo/en/',
  }

  let headers = new Headers()
  headers.append('Content-Type', 'application/json')

  //   const proxyurl = 'http://localhost:8080/'
  //     const url = 'http://127.0.0.1:8000/api/v1/donation/order/' // site that doesn’t send Access-Control-*

  const proxyurl = 'https://intense-temple-29395.herokuapp.com/'
  const url = 'https://whydonate-development.appspot.com/api/v1/donation/order/'
  fetch(proxyurl + url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data),
  }) // https://cors-anywhere.herokuapp.com/https://example.com
    .then(response => {
      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        throw new TypeError("Oops, we haven't got JSON!")
      }
      return response.json()
    })
    .then(data => {
      /* process your data further */
      window.location.replace(data.data.url)
      //   console.log(data.data.url)
    })
    .catch(error => console.error(error))
}

function makeUrl() {
  const proxyurl = 'https://intense-temple-29395.herokuapp.com/'
  const url =
    'https://whydonate-development.appspot.com/api/v1/project/fundraising/local/?slug=' +
    widgetDiv.dataset.slug

  console.log('options check ', widgetDiv.dataset.options)

  return proxyurl + url
}

function httpGet() {
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

// jQuery('#btn-request').click(function() {
//   //block of code that runs when the click event triggers
//   console.log('Hi im Shuvo ', widgetDiv.dataset.message)

// jQuery.ajax({
//   url:
//     'localhost:8000/api/v1/donation/order/receiver/?page=1&page_size=20&filter=&sort_direction=asc&sort_col=created_at&from_date=0&to_date=1583244373841',
//   beforeSend: function(xhr) {
//     xhr.setRequestHeader('API-KEY', 'w4R8fbUbg5P37IMn9CneRLIkLVmU5OEc')
//     xhr.setRequestHeader('Access-Control-Allow-Origin', '*')
//   },
//   success: function(data) {
//     alert(data)
//     //process the JSON data etc
//   },
// })
// })
