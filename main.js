console.log('executing javascript')

var classArray = document.getElementsByClassName('widget')
if (classArray.length > 1) {
  var widgetDiv = classArray[classArray.length - 1]
} else {
  var widgetDiv = classArray[0]
}

var donateButton = document.createElement('BUTTON')
var fundraiserInfo = {}
var widgetOption = ''

var head = document.getElementsByTagName('head')[0]
var style = document.createElement('link')
// style.href = 'https://codepen.io/mahmudulshuvo/pen/LYVmyYj.css'
style.href = 'style.css'
style.type = 'text/css'
style.rel = 'stylesheet'
head.appendChild(style)

enableJQuery()

function enableJQuery() {
  console.log('enable jquery function called')
  widgetOption = widgetDiv.getAttribute('value')
  console.log('widget option ', widgetOption)
  var slug = widgetDiv.dataset.slug
  if (widgetOption === 'show-with-image') {
    console.log('widget option = ', widgetOption)
    designWidget(1)
    createModal(slug)
  } else if (widgetOption === 'donation-widget') {
    console.log('widget option = ', widgetOption)
    designWidget(3)
    createModal(slug)
  } else if (widgetOption === 'donation-form+image') {
    console.log('widget option = ', widgetOption)
    designWidget(2)
  } else if (widgetOption === 'donation-form+widget') {
    designWidget(4)
  } else {
    // Do nothing
  }

  if (window.jQuery) {
    console.log('jquery exists')
    // jQuery(document).ready(function() {
    // console.log(widgetDiv.dataset.message)
    var url = makeUrl()
    console.log('url is ', url)
    jQuery.ajax({
      url: url,
      async: false,
      beforeSend: function(xhr) {
        // console.log('before send')
      },
      success: function(result) {
        console.log('response ', result)

        fundraiserInfo = result['data']

        setModalId(result['data']['id'], widgetDiv.dataset.slug)

        var fundraiserImageView = document.getElementById(
          'fundraiser-image' + widgetDiv.dataset.slug,
        )
        if (fundraiserImageView) {
          fundraiserImageView.src = result['data']['background']['image']
        }

        var targetAmount = document.getElementById(
          'target-amount' + widgetDiv.dataset.slug,
        )
        var receiveAmount = document.getElementById(
          'receive-amount' + widgetDiv.dataset.slug,
        )
        receiveAmount.innerText = '€' + result['data']['donation']['amount']
        targetAmount.innerText = 'of €' + result['data']['amount_target']

        var date1 = new Date() // current date
        var date2 = new Date(result['data']['end_date']) // mm/dd/yyyy format
        var timeDiff = Math.abs(date2.getTime() - date1.getTime()) // in miliseconds
        var timeDiffInDays = Math.ceil(timeDiff / 1000 / 3600 / 24) // in second
        var remainDaysLabel = document.getElementById(
          'remaining-days' + widgetDiv.dataset.slug,
        )

        if (timeDiffInDays <= 0) {
          remainDaysLabel.innerText = 'closed'
          var donateBtn = document.getElementById(
            'donate-btn' + widgetDiv.dataset.slug,
          )
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
          var raisedBar = document.getElementById(
            'raised-bar' + widgetDiv.dataset.slug,
          )
          raisedBar.style.width = '100%'
        } else {
          raisedBar = document.getElementById(
            'raised-bar' + widgetDiv.dataset.slug,
          )
          raisedBar.style.width = progress.toString() + '%'
        }

        var raisedLabel = document.getElementById(
          'raised-label' + widgetDiv.dataset.slug,
        )
        raisedLabel.innerText = progress + '% funded'
      },
      error: function(message) {
        console.log('error message ', message)
      },
      complete: function() {
        // hide loader here
        // console.log('completed block')
        // var modal = document.getElementById(
        //   'myModal' + widgetDiv.dataset.slug,
        // )
        // modal.style.display = 'none'
      },
    })
    // })
  } else {
    console.log('jquery does not exists')
    addJquery()
  }
}

function addJquery() {
  var script = document.createElement('script')
  script.src = 'https://code.jquery.com/jquery-1.7.2.js'
  script.type = 'text/javascript'
  script.onload = function() {
    // your jQuery code here
    // jQuery(document).ready(function() {
    // console.log(widgetDiv.dataset.message)
    // if (typeof jQuery.easing[jQuery.easing.def] == 'function') {
    //   return jQuery.easing[jQuery.easing.def](x, t, b, c, d)
    // }
    var url = makeUrl()
    console.log('url is ', url)
    jQuery.ajax({
      url: url,
      async: false,
      beforeSend: function(xhr) {
        // console.log('before send')
      },
      success: function(result) {
        console.log('response ', result)

        setModalId(result['data']['id'], widgetDiv.dataset.slug)

        var fundraiserImageView = document.getElementById(
          'fundraiser-image' + widgetDiv.dataset.slug,
        )
        if (fundraiserImageView) {
          fundraiserImageView.src = result['data']['background']['image']
        }

        var targetAmount = document.getElementById(
          'target-amount' + widgetDiv.dataset.slug,
        )
        var receiveAmount = document.getElementById(
          'receive-amount' + widgetDiv.dataset.slug,
        )
        receiveAmount.innerText = '€' + result['data']['donation']['amount']
        targetAmount.innerText = 'of €' + result['data']['amount_target']

        var date1 = new Date() // current date
        var date2 = new Date(result['data']['end_date']) // mm/dd/yyyy format
        var timeDiff = Math.abs(date2.getTime() - date1.getTime()) // in miliseconds
        var timeDiffInDays = Math.ceil(timeDiff / 1000 / 3600 / 24) // in second
        var remainDaysLabel = document.getElementById(
          'remaining-days' + widgetDiv.dataset.slug,
        )

        if (timeDiffInDays <= 0) {
          remainDaysLabel.innerText = 'closed'
          var donateBtn = document.getElementById(
            'donate-btn' + widgetDiv.dataset.slug,
          )
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
          var raisedBar = document.getElementById(
            'raised-bar' + widgetDiv.dataset.slug,
          )
          raisedBar.style.width = '100%'
        } else {
          raisedBar = document.getElementById(
            'raised-bar' + widgetDiv.dataset.slug,
          )
          raisedBar.style.width = progress.toString() + '%'
        }

        var raisedLabel = document.getElementById(
          'raised-label' + widgetDiv.dataset.slug,
        )
        raisedLabel.innerText = progress + '% funded'
      },
      error: function(message) {
        console.log('error message ', message)
      },
      complete: function() {
        // hide loader here
        // console.log('completed block')
        // var modal = document.getElementById(
        //   'myModal' + widgetDiv.dataset.slug,
        // )
        // modal.style.display = 'none'
      },
    })
    // })
    // console.log(widgetDiv.dataset.message)
  }

  document.getElementsByTagName('head')[0].appendChild(script)
}

function designWidget(option) {
  console.log('On desingWidget() with option = ', option)

  if (option === 1) {
    var fundraiserImage = document.createElement('IMG')
    fundraiserImage.id = 'fundraiser-image' + widgetDiv.dataset.slug
    fundraiserImage.className = 'fundraiser-image'
    fundraiserImage.style.height = '150px'
    fundraiserImage.style.width = '100%'
    fundraiserImage.style.marginBottom = '10px'
    fundraiserImage.style.borderTopLeftRadius = '15px'
    fundraiserImage.style.borderTopRightRadius = '15px'
    widgetDiv.style.height = '350px'
    // var blankDiv = document.createElement('DIV')
    // blankDiv.style.width = '100%'
    widgetDiv.appendChild(fundraiserImage)
    // widgetDiv.appendChild(blankDiv)

    var amountInfoDiv = document.createElement('div')
    amountInfoDiv.id = 'amount-info-div-only-image' + widgetDiv.dataset.slug
    amountInfoDiv.className = 'amount-info-div-only-image'
    widgetDiv.appendChild(amountInfoDiv)

    var receiveAmount = document.createElement('LABEL')
    receiveAmount.id = 'receive-amount' + widgetDiv.dataset.slug
    receiveAmount.className = 'receive-amount'
    amountInfoDiv.appendChild(receiveAmount)

    var targetAmount = document.createElement('LABEL')
    targetAmount.id = 'target-amount' + widgetDiv.dataset.slug
    targetAmount.className = 'target-amount'
    amountInfoDiv.appendChild(targetAmount)

    var progressBar = document.createElement('DIV')
    progressBar.className = 'progress-bar'
    progressBar.id = 'progress-bar' + widgetDiv.dataset.slug
    widgetDiv.appendChild(progressBar)

    var raisedBar = document.createElement('DIV')
    raisedBar.id = 'raised-bar' + widgetDiv.dataset.slug
    raisedBar.className = 'raised-bar'
    progressBar.appendChild(raisedBar)

    var progressDiv = document.createElement('DIV')
    progressDiv.id = 'prgoress-div' + widgetDiv.dataset.slug
    progressDiv.className = 'progress-div'
    widgetDiv.appendChild(progressDiv)

    var raisedLabel = document.createElement('LABEL')
    raisedLabel.id = 'raised-label' + widgetDiv.dataset.slug
    raisedLabel.className = 'raised-label'
    progressDiv.appendChild(raisedLabel)

    var daysLabel = document.createElement('LABEL')
    daysLabel.id = 'remaining-days' + widgetDiv.dataset.slug
    daysLabel.className = 'remaining-days'
    progressDiv.appendChild(daysLabel)

    // donateButton.id = 'donate-btn+' + widgetDiv.dataset.slug
    // donateButton.className = 'donate-btn'
    // donateButton.innerHTML = 'Donate'
    // donateButton.onclick = () => this.handleDonate(donateButton.id)
    // widgetDiv.appendChild(donateButton)

    var donateBtnDiv = document.createElement('div')
    donateBtnDiv.id = 'donate-btn-div+' + widgetDiv.dataset.slug
    donateButton.id = 'donate-btn+' + widgetDiv.dataset.slug
    donateButton.className = 'donate-btn'
    donateButton.innerHTML = 'Donate'
    donateButton.onclick = () => this.handleDonate(donateBtnDiv.id)
    donateBtnDiv.appendChild(donateButton)
    widgetDiv.appendChild(donateBtnDiv)
  } else if (option === 2) {
    //create left side
    var donationForm = document.createElement('DIV')
    donationForm.id = 'donation-form' + widgetDiv.dataset.slug
    donationForm.className = 'donation-form'
    donationForm.style.height = '100%'
    donationForm.style.width = '50%'
    donationForm.style.margin = '10px'
    // donationForm.style.backgroundColor = 'red'
    widgetDiv.className = 'widget-with-form'
    widgetDiv.style.backgroundColor = 'white'
    // widgetDiv.style.height = '350px !important'
    widgetDiv.appendChild(donationForm)

    widgetDiv.style.display = 'flex'
    widgetDiv.style.flexDirection = 'row'
    widgetDiv.style.width = '800px'

    var labelDiv = document.createElement('div')
    labelDiv.id = 'block-div' + widgetDiv.dataset.slug
    labelDiv.className = 'block-div'
    // labelDiv.style.display = 'flex'
    // labelDiv.style.flexDirection = 'column'
    donationForm.appendChild(labelDiv)

    var fundraiserIdLabel = document.createElement('label')
    fundraiserIdLabel.id = 'fundraiser-id-label' + widgetDiv.dataset.slug
    fundraiserIdLabel.style.display = 'none'
    fundraiserIdLabel.style.float = 'left'
    labelDiv.appendChild(fundraiserIdLabel)

    var label1 = document.createElement('label')
    label1.id = 'label1' + widgetDiv.dataset.slug
    label1.className = 'label1'
    label1.innerText = 'Secured Online Donation'
    labelDiv.appendChild(label1)

    var label2 = document.createElement('label')
    label2.id = 'label2' + widgetDiv.dataset.slug
    label2.className = 'label2'
    label2.innerText = 'Enter your donation'
    labelDiv.appendChild(label2)

    // ----------- period inervals -------------------

    var periodDiv = document.createElement('div')
    periodDiv.id = 'period-intervals' + widgetDiv.dataset.slug
    periodDiv.className = 'period-intervals'
    donationForm.appendChild(periodDiv)

    var periodOnetimeDiv = document.createElement('div')
    periodOnetimeDiv.id = 'period-intervals-onetime+' + widgetDiv.dataset.slug
    periodOnetimeDiv.className = 'period-intervals-onetime'

    var oneTimeLabel = document.createElement('label')
    oneTimeLabel.innerText = 'One time'
    oneTimeLabel.fontSize = '14px'
    oneTimeLabel.style.display = 'block'
    oneTimeLabel.onclick = () =>
      this.handlePeriodInterval(1, periodOnetimeDiv.id)

    var oneTimeRadio = document.createElement('input')
    oneTimeRadio.setAttribute('type', 'radio')
    oneTimeRadio.id = 'onetime' + widgetDiv.dataset.slug
    oneTimeRadio.name = 'period-intervals' + widgetDiv.dataset.slug
    oneTimeRadio.value = '1'
    oneTimeRadio.checked = true
    oneTimeRadio.onclick = () =>
      this.handlePeriodInterval(1, periodOnetimeDiv.id)

    periodOnetimeDiv.appendChild(oneTimeRadio)
    periodOnetimeDiv.appendChild(oneTimeLabel)
    periodDiv.appendChild(periodOnetimeDiv)

    var periodMonthlyDiv = document.createElement('div')
    periodMonthlyDiv.id = 'period-intervals-monthly+' + widgetDiv.dataset.slug
    periodMonthlyDiv.className = 'period-intervals-monthly'

    var monthlyLabel = document.createElement('label')
    monthlyLabel.innerText = 'Monthly'
    monthlyLabel.fontSize = '14px'
    monthlyLabel.style.display = 'block'
    monthlyLabel.onclick = () =>
      this.handlePeriodInterval(2, periodMonthlyDiv.id)

    var monthlyRadio = document.createElement('input')
    monthlyRadio.setAttribute('type', 'radio')
    monthlyRadio.id = 'monthly' + widgetDiv.dataset.slug
    monthlyRadio.name = 'period-intervals' + widgetDiv.dataset.slug
    monthlyRadio.value = '2'
    monthlyRadio.onclick = () =>
      this.handlePeriodInterval(2, periodMonthlyDiv.id)

    periodMonthlyDiv.appendChild(monthlyRadio)
    periodMonthlyDiv.appendChild(monthlyLabel)
    periodDiv.appendChild(periodMonthlyDiv)

    var periodYearlyDiv = document.createElement('div')
    periodYearlyDiv.id = 'period-intervals-yearly+' + widgetDiv.dataset.slug
    periodYearlyDiv.className = 'period-intervals-yearly'

    var yearlyLabel = document.createElement('label')
    yearlyLabel.innerText = 'Yearly'
    yearlyLabel.fontSize = '14px'
    yearlyLabel.style.display = 'block'
    yearlyLabel.onclick = () => this.handlePeriodInterval(3, periodYearlyDiv.id)

    var yearlyRadio = document.createElement('input')
    yearlyRadio.setAttribute('type', 'radio')
    yearlyRadio.id = 'yearly' + widgetDiv.dataset.slug
    yearlyRadio.name = 'period-intervals' + widgetDiv.dataset.slug
    yearlyRadio.value = '3'
    yearlyRadio.onclick = () => this.handlePeriodInterval(3, periodYearlyDiv.id)

    periodYearlyDiv.appendChild(yearlyRadio)
    periodYearlyDiv.appendChild(yearlyLabel)
    periodDiv.appendChild(periodYearlyDiv)

    // ----------- period inervals -------------------

    var hrule = document.createElement('hr')
    hrule.style.background = '#72bcd4'
    hrule.style.height = '2px'
    hrule.style.display = 'flex'
    hrule.style.flexDirection = 'row'
    hrule.style.justifyContent = 'space-between'
    donationForm.appendChild(hrule)

    var oneTimeBar = document.createElement('div')
    oneTimeBar.id = 'onetime-bar' + widgetDiv.dataset.slug
    oneTimeBar.className = 'onetime-bar'
    oneTimeBar.style.height = '2px'
    oneTimeBar.style.width = '100px'
    oneTimeBar.style.background = '#112FEB'
    hrule.appendChild(oneTimeBar)

    var monthlyBar = document.createElement('div')
    monthlyBar.id = 'monthly-bar' + widgetDiv.dataset.slug
    monthlyBar.className = 'monthly-bar'
    monthlyBar.style.height = '2px'
    monthlyBar.style.width = '100px'
    monthlyBar.style.background = '#72bcd4'
    hrule.appendChild(monthlyBar)

    var yearlyBar = document.createElement('div')
    yearlyBar.id = 'yearly-bar' + widgetDiv.dataset.slug
    yearlyBar.className = 'yearly-bar'
    yearlyBar.style.height = '2px'
    yearlyBar.style.width = '100px'
    yearlyBar.style.background = '#72bcd4'
    hrule.appendChild(yearlyBar)

    var selectAmountLabelDiv = document.createElement('div')
    selectAmountLabelDiv.id = 'select-amount-div' + widgetDiv.dataset.slug
    selectAmountLabelDiv.className = 'select-amount-div'

    var selectAmountlabel = document.createElement('label')
    selectAmountlabel.id = 'select-amount-label' + widgetDiv.dataset.slug
    selectAmountlabel.className = 'select-amount-label'
    selectAmountlabel.innerText = 'Select Amount'
    selectAmountlabel.style.fontSize = '14px'
    selectAmountlabel.fontWeight = '500'
    selectAmountLabelDiv.appendChild(selectAmountlabel)
    donationForm.appendChild(selectAmountLabelDiv)

    // ----------- copied from here -----------------------

    var amountDiv = document.createElement('div')
    amountDiv.style.display = 'flex'
    amountDiv.style.marginTop = '10px'
    amountDiv.style.flexDirection = 'row'
    amountDiv.style.justifyContent = 'space-around'
    donationForm.appendChild(amountDiv)

    var firstAmount = document.createElement('div')
    firstAmount.id = 'first-amount-div' + widgetDiv.dataset.slug
    firstAmount.className = 'first-amount-div'
    firstAmount.style.display = 'flex'
    firstAmount.style.flexDirection = 'row'
    firstAmount.style.height = '45px'
    firstAmount.style.width = '60px'
    firstAmount.style.borderRadius = '5px'
    firstAmount.style.border = '1px black solid'

    var firstAmountRadio = document.createElement('input')
    firstAmountRadio.setAttribute('type', 'radio')
    firstAmountRadio.id = 'first-amount' + widgetDiv.dataset.slug
    firstAmountRadio.name = 'select-amount'
    firstAmountRadio.value = '25'
    firstAmountRadio.style.marginTop = '15px'
    // firstAmountRadio.onclick = () => this.handlePeriodInterval(2)

    var firstAmountLabel = document.createElement('label')
    firstAmountLabel.id = 'first-amount-label+' + widgetDiv.dataset.slug
    firstAmountLabel.className = 'first-amount-label'
    firstAmountLabel.innerText = '€25'
    firstAmountLabel.style.fontSize = '16px'
    firstAmountLabel.style.fontWeight = '500'
    firstAmountLabel.style.marginTop = '12px'
    firstAmountLabel.style.display = 'block'
    firstAmountLabel.onclick = () =>
      this.handleSelectAmount(25, firstAmountLabel.id)

    firstAmount.appendChild(firstAmountRadio)
    firstAmount.appendChild(firstAmountLabel)

    amountDiv.appendChild(firstAmount)

    var secondAmount = document.createElement('div')
    secondAmount.id = 'second-amount-div' + widgetDiv.dataset.slug
    secondAmount.className = 'second-amount-div'
    secondAmount.style.height = '45px'
    secondAmount.style.width = '60px'
    secondAmount.style.borderRadius = '5px'
    secondAmount.style.border = '1px black solid'

    secondAmount.style.display = 'flex'
    secondAmount.style.flexDirection = 'row'

    var secondAmountRadio = document.createElement('input')
    secondAmountRadio.setAttribute('type', 'radio')
    secondAmountRadio.id = 'second-amount' + widgetDiv.dataset.slug
    secondAmountRadio.name = 'select-amount'
    secondAmountRadio.value = '50'
    secondAmountRadio.style.marginTop = '15px'
    // secondAmountRadio.onclick = () => this.handlePeriodInterval(2)

    var secondAmountLabel = document.createElement('label')
    secondAmountLabel.id = 'second-amount-label+' + widgetDiv.dataset.slug
    secondAmountLabel.className = 'second-amount-label'
    secondAmountLabel.innerText = '€50'
    secondAmountLabel.style.fontSize = '16px'
    secondAmountLabel.style.fontWeight = '500'
    secondAmountLabel.style.marginTop = '12px'
    secondAmountLabel.style.display = 'block'
    secondAmountLabel.onclick = () =>
      this.handleSelectAmount(50, secondAmountLabel.id)

    secondAmount.appendChild(secondAmountRadio)
    secondAmount.appendChild(secondAmountLabel)

    amountDiv.appendChild(secondAmount)

    var thirdAmount = document.createElement('div')
    thirdAmount.id = 'third-amount-div' + widgetDiv.dataset.slug
    thirdAmount.className = 'third-amount-div'
    thirdAmount.style.height = '45px'
    thirdAmount.style.width = '60px'
    thirdAmount.style.borderRadius = '5px'
    thirdAmount.style.border = '1px black solid'

    thirdAmount.style.display = 'flex'
    thirdAmount.style.flexDirection = 'row'

    var thirdAmountRadio = document.createElement('input')
    thirdAmountRadio.setAttribute('type', 'radio')
    thirdAmountRadio.id = 'third-amount' + widgetDiv.dataset.slug
    thirdAmountRadio.name = 'select-amount'
    thirdAmountRadio.value = '75'
    thirdAmountRadio.style.marginTop = '15px'
    // thirdAmountRadio.onclick = () => this.handlePeriodInterval(2)

    var thirdAmountLable = document.createElement('label')
    thirdAmountLable.id = 'third-amount-label+' + widgetDiv.dataset.slug
    thirdAmountLable.className = 'third-amount-label'
    thirdAmountLable.innerText = '€75'
    thirdAmountLable.style.fontSize = '16px'
    thirdAmountLable.style.fontWeight = '500'
    thirdAmountLable.style.marginTop = '12px'
    thirdAmountLable.style.display = 'block'
    thirdAmountLable.onclick = () =>
      this.handleSelectAmount(75, thirdAmountLable.id)

    thirdAmount.appendChild(thirdAmountRadio)
    thirdAmount.appendChild(thirdAmountLable)

    amountDiv.appendChild(thirdAmount)

    var forthAmount = document.createElement('div')
    forthAmount.id = 'forth-amount-div' + widgetDiv.dataset.slug
    forthAmount.className = 'forth-amount-div'
    forthAmount.style.height = '45px'
    forthAmount.style.width = '60px'
    forthAmount.style.borderRadius = '5px'
    forthAmount.style.border = '1px black solid'

    forthAmount.style.display = 'flex'
    forthAmount.style.flexDirection = 'row'

    var forthAmountRadio = document.createElement('input')
    forthAmountRadio.setAttribute('type', 'radio')
    forthAmountRadio.id = 'forth-amount' + widgetDiv.dataset.slug
    forthAmountRadio.name = 'select-amount'
    forthAmountRadio.value = '100'
    forthAmountRadio.style.marginTop = '15px'
    // forthAmountRadio.onclick = () => this.handlePeriodInterval(2)

    var forthAmountLabel = document.createElement('label')
    forthAmountLabel.id = 'forth-amount-label+' + widgetDiv.dataset.slug
    forthAmountLabel.className = 'forth-amount-label'
    forthAmountLabel.innerText = '€100'
    forthAmountLabel.style.fontSize = '16px'
    forthAmountLabel.style.fontWeight = '500'
    forthAmountLabel.style.marginTop = '12px'
    forthAmountLabel.style.display = 'block'
    forthAmountLabel.onclick = () =>
      this.handleSelectAmount(100, forthAmountLabel.id)

    forthAmount.appendChild(forthAmountRadio)
    forthAmount.appendChild(forthAmountLabel)

    amountDiv.appendChild(forthAmount)

    var otherAmount = document.createElement('div')
    otherAmount.id = 'other-amount-div' + widgetDiv.dataset.slug
    otherAmount.className = 'other-amount-div'
    otherAmount.style.height = '45px'
    otherAmount.style.width = '60px'
    otherAmount.style.borderRadius = '5px'
    otherAmount.style.border = '1px black solid'

    otherAmount.style.display = 'flex'
    otherAmount.style.flexDirection = 'row'

    var otherAmountRadio = document.createElement('input')
    otherAmountRadio.setAttribute('type', 'radio')
    otherAmountRadio.id = 'other-amount' + widgetDiv.dataset.slug
    otherAmountRadio.name = 'select-amount'
    otherAmountRadio.value = 'other'
    otherAmountRadio.style.marginTop = '15px'
    // otherAmountRadio.onclick = () => this.handlePeriodInterval(2)

    var otherAmountLabel = document.createElement('label')
    otherAmountLabel.id = 'other-amount-label+' + widgetDiv.dataset.slug
    otherAmountLabel.className = 'other-amount-label'
    otherAmountLabel.innerText = 'Other'
    otherAmountLabel.style.fontSize = '16px'
    otherAmountLabel.style.fontWeight = '500'
    otherAmountLabel.style.marginTop = '12px'
    otherAmountLabel.style.display = 'block'
    otherAmountLabel.onclick = () =>
      this.handleSelectAmount('other', otherAmountLabel.id)
    otherAmount.appendChild(otherAmountRadio)
    otherAmount.appendChild(otherAmountLabel)

    amountDiv.appendChild(otherAmount)

    var otherAmountInputDiv = document.createElement('div')
    otherAmountInputDiv.id = 'other-amount-input-div+' + widgetDiv.dataset.slug
    otherAmountInputDiv.className = 'other-amount-input-div'

    var otherAmountInput = document.createElement('input')
    otherAmount.setAttribute('type', 'number')
    otherAmountInput.placeholder = 'Input your amount'
    otherAmountInput.id = 'other-amount-input' + widgetDiv.dataset.slug
    otherAmountInputDiv.appendChild(otherAmountInput)
    donationForm.appendChild(otherAmountInputDiv)

    var donorInfoDiv = document.createElement('div')
    donorInfoDiv.id = 'donor-info-div' + widgetDiv.dataset.slug
    donorInfoDiv.className = 'donor-info-div'
    donationForm.appendChild(donorInfoDiv)

    var firstNameInput = document.createElement('input')
    firstNameInput.setAttribute('type', 'text')
    firstNameInput.placeholder = 'First name'
    firstNameInput.id = 'first-name-field' + widgetDiv.dataset.slug
    firstNameInput.className = 'first-name-field'
    donorInfoDiv.appendChild(firstNameInput)

    var lastNameInput = document.createElement('input')
    lastNameInput.setAttribute('type', 'text')
    lastNameInput.placeholder = 'Last name'
    lastNameInput.id = 'last-name-field' + widgetDiv.dataset.slug
    lastNameInput.className = 'last-name-field'
    donorInfoDiv.appendChild(lastNameInput)

    var emailInput = document.createElement('input')
    emailInput.setAttribute('type', 'text')
    emailInput.placeholder = 'Email'
    emailInput.id = 'email-field' + widgetDiv.dataset.slug
    emailInput.className = 'email-field'
    donorInfoDiv.appendChild(emailInput)

    // ----------- copied from here -----------------------

    // donateButton.id = 'donate-btn-in-form+' + widgetDiv.dataset.slug
    // donateButton.className = 'donate-btn-in-form'
    // donateButton.innerHTML = 'Donate'
    // donateButton.onclick = () => this.directDonate(donateButton.id)
    // donationForm.appendChild(donateButton)

    donateBtnDiv = document.createElement('div')
    donateBtnDiv.id = 'donate-btn-in-form-div+' + widgetDiv.dataset.slug
    donateButton.id = 'donate-btn-in-form+' + widgetDiv.dataset.slug
    donateButton.className = 'donate-btn-in-form'
    donateButton.innerHTML = 'Donate'
    donateButton.onclick = () => this.directDonate(donateBtnDiv.id)
    donateBtnDiv.appendChild(donateButton)
    donationForm.appendChild(donateBtnDiv)

    // create right side
    var fundraiserInfoDiv = document.createElement('DIV')
    fundraiserInfoDiv.id = 'fundraiser-info-div' + widgetDiv.dataset.slug
    fundraiserInfoDiv.className = 'fundraiser-info-div'

    fundraiserInfoDiv.style.height = '100%'
    fundraiserInfoDiv.style.width = '50%'
    fundraiserInfoDiv.style.backgroundColor = 'rgb(248, 245, 245)'
    fundraiserInfoDiv.style.borderRadius = '10px'

    widgetDiv.appendChild(fundraiserInfoDiv)

    fundraiserImage = document.createElement('IMG')
    fundraiserImage.id = 'fundraiser-image' + widgetDiv.dataset.slug
    fundraiserImage.className = 'fundraiser-image'
    fundraiserImage.style.height = '150px'
    fundraiserImage.style.width = '100%'
    fundraiserImage.style.marginBottom = '10px'
    fundraiserImage.style.borderTopLeftRadius = '15px'
    fundraiserImage.style.borderTopRightRadius = '15px'
    widgetDiv.style.height = '350px'

    // var blankDiv = document.createElement('DIV')
    // blankDiv.id = 'blank-div'
    // blankDiv.style.width = '100%'
    fundraiserInfoDiv.appendChild(fundraiserImage)
    // fundraiserInfoDiv.appendChild(blankDiv)

    var amountInfoDiv = document.createElement('div')
    amountInfoDiv.id = 'amount-info-div' + widgetDiv.dataset.slug
    amountInfoDiv.className = 'amount-info-div'

    var receiveAmount = document.createElement('LABEL')
    receiveAmount.id = 'receive-amount' + widgetDiv.dataset.slug
    receiveAmount.className = 'receive-amount'
    amountInfoDiv.appendChild(receiveAmount)
    // fundraiserInfoDiv.appendChild(receiveAmount)

    var targetAmount = document.createElement('LABEL')
    targetAmount.id = 'target-amount' + widgetDiv.dataset.slug
    targetAmount.className = 'target-amount'
    amountInfoDiv.appendChild(targetAmount)
    // fundraiserInfoDiv.appendChild(targetAmount)

    fundraiserInfoDiv.appendChild(amountInfoDiv)

    var progressBarDiv = document.createElement('div')
    progressBarDiv.id = 'progress-bar-div' + widgetDiv.dataset.slug
    progressBarDiv.className = 'progress-bar-div'

    var progressBar = document.createElement('DIV')
    progressBar.id = 'progress-bar' + widgetDiv.dataset.slug
    progressBar.className = 'progress-bar'
    progressBarDiv.appendChild(progressBar)
    fundraiserInfoDiv.appendChild(progressBarDiv)

    var raisedBar = document.createElement('DIV')
    raisedBar.id = 'raised-bar' + widgetDiv.dataset.slug
    raisedBar.className = 'raised-bar'
    progressBar.appendChild(raisedBar)

    var progressFormDiv = document.createElement('div')
    progressFormDiv.id = 'progress-form-div' + widgetDiv.dataset.slug
    progressFormDiv.className = 'progress-form-div'

    progressDiv = document.createElement('DIV')
    progressDiv.id = 'progress-div' + widgetDiv.dataset.slug
    progressDiv.className = 'progress-div'

    progressFormDiv.appendChild(progressDiv)
    fundraiserInfoDiv.appendChild(progressFormDiv)

    var raisedLabel = document.createElement('LABEL')
    raisedLabel.id = 'raised-label' + widgetDiv.dataset.slug
    raisedLabel.className = 'raised-label'
    progressDiv.appendChild(raisedLabel)

    var daysLabel = document.createElement('LABEL')
    daysLabel.id = 'remaining-days' + widgetDiv.dataset.slug
    daysLabel.className = 'remaining-days'
    progressDiv.appendChild(daysLabel)

    var rightSideRule = document.createElement('div')
    rightSideRule.id = 'right-side-rule' + widgetDiv.dataset.slug
    rightSideRule.className = 'right-side-rule'
    progressFormDiv.appendChild(rightSideRule)
    fundraiserInfoDiv.appendChild(progressFormDiv)

    // donateButton.id = 'donate-btn'
    // donateButton.innerHTML = 'Donate'
    // donateButton.onclick = this.handleDonate()
    // fundraiserInfoDiv.appendChild(donateButton)

    // widgetDiv.appendChild(fundraiserImage)
    // widgetDiv.appendChild(blankDiv)
  } else if (option === 4) {
    //create left side
    var donationForm = document.createElement('DIV')
    donationForm.id = 'donation-form' + widgetDiv.dataset.slug
    donationForm.className = 'donation-form'
    donationForm.style.height = '100%'
    donationForm.style.width = '50%'
    donationForm.style.margin = '10px'
    // donationForm.style.backgroundColor = 'red'
    widgetDiv.className = 'widget-with-form'
    widgetDiv.style.backgroundColor = 'white'
    // widgetDiv.style.height = '350px !important'
    widgetDiv.appendChild(donationForm)

    widgetDiv.style.display = 'flex'
    widgetDiv.style.flexDirection = 'row'
    widgetDiv.style.width = '800px'

    var labelDiv = document.createElement('div')
    labelDiv.id = 'block-div' + widgetDiv.dataset.slug
    labelDiv.className = 'block-div'
    // labelDiv.style.display = 'flex'
    // labelDiv.style.flexDirection = 'column'
    donationForm.appendChild(labelDiv)

    fundraiserIdLabel = document.createElement('label')
    fundraiserIdLabel.id = 'fundraiser-id-label' + widgetDiv.dataset.slug
    fundraiserIdLabel.style.display = 'none'
    fundraiserIdLabel.style.float = 'left'
    labelDiv.appendChild(fundraiserIdLabel)

    var label1 = document.createElement('label')
    label1.id = 'label1' + widgetDiv.dataset.slug
    label1.className = 'label1'
    label1.innerText = 'Secured Online Donation'
    labelDiv.appendChild(label1)

    var label2 = document.createElement('label')
    label2.id = 'label2' + widgetDiv.dataset.slug
    label2.className = 'label2'
    label2.innerText = 'Enter your donation'
    labelDiv.appendChild(label2)

    // ------------------ period intervals --------------------

    var periodDiv = document.createElement('div')
    periodDiv.id = 'period-intervals' + widgetDiv.dataset.slug
    periodDiv.className = 'period-intervals'
    donationForm.appendChild(periodDiv)

    var periodOnetimeDiv = document.createElement('div')
    periodOnetimeDiv.id = 'period-intervals-onetime+' + widgetDiv.dataset.slug
    periodOnetimeDiv.className = 'period-intervals-onetime'

    var oneTimeLabel = document.createElement('label')
    oneTimeLabel.innerText = 'One time'
    oneTimeLabel.fontSize = '14px'
    oneTimeLabel.style.display = 'block'
    oneTimeLabel.onclick = () =>
      this.handlePeriodInterval(1, periodOnetimeDiv.id)

    var oneTimeRadio = document.createElement('input')
    oneTimeRadio.setAttribute('type', 'radio')
    oneTimeRadio.id = 'onetime' + widgetDiv.dataset.slug
    oneTimeRadio.name = 'period-intervals' + widgetDiv.dataset.slug
    oneTimeRadio.value = '1'
    oneTimeRadio.checked = true
    oneTimeRadio.onclick = () =>
      this.handlePeriodInterval(1, periodOnetimeDiv.id)

    periodOnetimeDiv.appendChild(oneTimeRadio)
    periodOnetimeDiv.appendChild(oneTimeLabel)
    periodDiv.appendChild(periodOnetimeDiv)

    var periodMonthlyDiv = document.createElement('div')
    periodMonthlyDiv.id = 'period-intervals-monthly+' + widgetDiv.dataset.slug
    periodMonthlyDiv.className = 'period-intervals-monthly'

    var monthlyLabel = document.createElement('label')
    monthlyLabel.innerText = 'Monthly'
    monthlyLabel.fontSize = '14px'
    monthlyLabel.style.display = 'block'
    monthlyLabel.onclick = () =>
      this.handlePeriodInterval(2, periodMonthlyDiv.id)

    var monthlyRadio = document.createElement('input')
    monthlyRadio.setAttribute('type', 'radio')
    monthlyRadio.id = 'monthly' + widgetDiv.dataset.slug
    monthlyRadio.name = 'period-intervals' + widgetDiv.dataset.slug
    monthlyRadio.value = '2'
    monthlyRadio.onclick = () =>
      this.handlePeriodInterval(2, periodMonthlyDiv.id)

    periodMonthlyDiv.appendChild(monthlyRadio)
    periodMonthlyDiv.appendChild(monthlyLabel)
    periodDiv.appendChild(periodMonthlyDiv)

    var periodYearlyDiv = document.createElement('div')
    periodYearlyDiv.id = 'period-intervals-yearly+' + widgetDiv.dataset.slug
    periodYearlyDiv.className = 'period-intervals-yearly'

    var yearlyLabel = document.createElement('label')
    yearlyLabel.innerText = 'Yearly'
    yearlyLabel.fontSize = '14px'
    yearlyLabel.style.display = 'block'
    yearlyLabel.onclick = () => this.handlePeriodInterval(3, periodYearlyDiv.id)

    var yearlyRadio = document.createElement('input')
    yearlyRadio.setAttribute('type', 'radio')
    yearlyRadio.id = 'yearly' + widgetDiv.dataset.slug
    yearlyRadio.name = 'period-intervals' + widgetDiv.dataset.slug
    yearlyRadio.value = '3'
    yearlyRadio.onclick = () => this.handlePeriodInterval(3, periodYearlyDiv.id)

    periodYearlyDiv.appendChild(yearlyRadio)
    periodYearlyDiv.appendChild(yearlyLabel)
    periodDiv.appendChild(periodYearlyDiv)

    // ------------------ period intervals --------------------

    var hrule = document.createElement('hr')
    hrule.style.background = '#72bcd4'
    hrule.style.height = '2px'
    hrule.style.display = 'flex'
    hrule.style.flexDirection = 'row'
    hrule.style.justifyContent = 'space-between'
    donationForm.appendChild(hrule)

    var oneTimeBar = document.createElement('div')
    oneTimeBar.id = 'onetime-bar' + widgetDiv.dataset.slug
    oneTimeBar.className = 'onetime-bar'
    oneTimeBar.style.height = '2px'
    oneTimeBar.style.width = '100px'
    oneTimeBar.style.background = '#112FEB'
    hrule.appendChild(oneTimeBar)

    var monthlyBar = document.createElement('div')
    monthlyBar.id = 'monthly-bar' + widgetDiv.dataset.slug
    monthlyBar.className = 'monthly-bar'
    monthlyBar.style.height = '2px'
    monthlyBar.style.width = '100px'
    monthlyBar.style.background = '#72bcd4'
    hrule.appendChild(monthlyBar)

    var yearlyBar = document.createElement('div')
    yearlyBar.id = 'yearly-bar' + widgetDiv.dataset.slug
    yearlyBar.className = 'yearly-bar'
    yearlyBar.style.height = '2px'
    yearlyBar.style.width = '100px'
    yearlyBar.style.background = '#72bcd4'
    hrule.appendChild(yearlyBar)

    var selectAmountLabelDiv = document.createElement('div')
    selectAmountLabelDiv.id = 'select-amount-div' + widgetDiv.dataset.slug
    selectAmountLabelDiv.className = 'select-amount-div'

    var selectAmountlabel = document.createElement('label')
    selectAmountlabel.id = 'select-amount-label' + widgetDiv.dataset.slug
    selectAmountlabel.className = 'select-amount-label'
    selectAmountlabel.innerText = 'Select Amount'
    selectAmountlabel.style.fontSize = '14px'
    selectAmountlabel.fontWeight = '500'
    selectAmountLabelDiv.appendChild(selectAmountlabel)
    donationForm.appendChild(selectAmountLabelDiv)

    // ----------- copied from here -----------------------

    var amountDiv = document.createElement('div')
    amountDiv.style.display = 'flex'
    amountDiv.style.marginTop = '10px'
    amountDiv.style.flexDirection = 'row'
    amountDiv.style.justifyContent = 'space-around'
    donationForm.appendChild(amountDiv)

    var firstAmount = document.createElement('div')
    firstAmount.id = 'first-amount-div' + widgetDiv.dataset.slug
    firstAmount.className = 'first-amount-div'
    firstAmount.style.display = 'flex'
    firstAmount.style.flexDirection = 'row'
    firstAmount.style.height = '45px'
    firstAmount.style.width = '60px'
    firstAmount.style.borderRadius = '5px'
    firstAmount.style.border = '1px black solid'

    var firstAmountRadio = document.createElement('input')
    firstAmountRadio.setAttribute('type', 'radio')
    firstAmountRadio.id = 'first-amount' + widgetDiv.dataset.slug
    firstAmountRadio.name = 'select-amount'
    firstAmountRadio.value = '25'
    firstAmountRadio.style.marginTop = '15px'
    // firstAmountRadio.onclick = () => this.handlePeriodInterval(2)

    var firstAmountLabel = document.createElement('label')
    firstAmountLabel.id = 'first-amount-label+' + widgetDiv.dataset.slug
    firstAmountLabel.className = 'first-amount-label'
    firstAmountLabel.innerText = '€25'
    firstAmountLabel.style.fontSize = '16px'
    firstAmountLabel.style.fontWeight = '500'
    firstAmountLabel.style.marginTop = '12px'
    firstAmountLabel.style.display = 'block'
    firstAmountLabel.onclick = () =>
      this.handleSelectAmount(25, firstAmountLabel.id)

    firstAmount.appendChild(firstAmountRadio)
    firstAmount.appendChild(firstAmountLabel)

    amountDiv.appendChild(firstAmount)

    var secondAmount = document.createElement('div')
    secondAmount.id = 'second-amount-div' + widgetDiv.dataset.slug
    secondAmount.className = 'second-amount-div'
    secondAmount.style.height = '45px'
    secondAmount.style.width = '60px'
    secondAmount.style.borderRadius = '5px'
    secondAmount.style.border = '1px black solid'

    secondAmount.style.display = 'flex'
    secondAmount.style.flexDirection = 'row'

    var secondAmountRadio = document.createElement('input')
    secondAmountRadio.setAttribute('type', 'radio')
    secondAmountRadio.id = 'second-amount' + widgetDiv.dataset.slug
    secondAmountRadio.name = 'select-amount'
    secondAmountRadio.value = '50'
    secondAmountRadio.style.marginTop = '15px'
    // secondAmountRadio.onclick = () => this.handlePeriodInterval(2)

    var secondAmountLabel = document.createElement('label')
    secondAmountLabel.id = 'second-amount-label+' + widgetDiv.dataset.slug
    secondAmountLabel.className = 'second-amount-label'
    secondAmountLabel.innerText = '€50'
    secondAmountLabel.style.fontSize = '16px'
    secondAmountLabel.style.fontWeight = '500'
    secondAmountLabel.style.marginTop = '12px'
    secondAmountLabel.style.display = 'block'
    secondAmountLabel.onclick = () =>
      this.handleSelectAmount(50, secondAmountLabel.id)

    secondAmount.appendChild(secondAmountRadio)
    secondAmount.appendChild(secondAmountLabel)

    amountDiv.appendChild(secondAmount)

    var thirdAmount = document.createElement('div')
    thirdAmount.id = 'third-amount-div' + widgetDiv.dataset.slug
    thirdAmount.className = 'third-amount-div'
    thirdAmount.style.height = '45px'
    thirdAmount.style.width = '60px'
    thirdAmount.style.borderRadius = '5px'
    thirdAmount.style.border = '1px black solid'

    thirdAmount.style.display = 'flex'
    thirdAmount.style.flexDirection = 'row'

    var thirdAmountRadio = document.createElement('input')
    thirdAmountRadio.setAttribute('type', 'radio')
    thirdAmountRadio.id = 'third-amount' + widgetDiv.dataset.slug
    thirdAmountRadio.name = 'select-amount'
    thirdAmountRadio.value = '75'
    thirdAmountRadio.style.marginTop = '15px'
    // thirdAmountRadio.onclick = () => this.handlePeriodInterval(2)

    var thirdAmountLable = document.createElement('label')
    thirdAmountLable.id = 'third-amount-label+' + widgetDiv.dataset.slug
    thirdAmountLable.className = 'third-amount-label'
    thirdAmountLable.innerText = '€75'
    thirdAmountLable.style.fontSize = '16px'
    thirdAmountLable.style.fontWeight = '500'
    thirdAmountLable.style.marginTop = '12px'
    thirdAmountLable.style.display = 'block'
    thirdAmountLable.onclick = () =>
      this.handleSelectAmount(75, thirdAmountLable.id)

    thirdAmount.appendChild(thirdAmountRadio)
    thirdAmount.appendChild(thirdAmountLable)

    amountDiv.appendChild(thirdAmount)

    var forthAmount = document.createElement('div')
    forthAmount.id = 'forth-amount-div' + widgetDiv.dataset.slug
    forthAmount.className = 'forth-amount-div'
    forthAmount.style.height = '45px'
    forthAmount.style.width = '60px'
    forthAmount.style.borderRadius = '5px'
    forthAmount.style.border = '1px black solid'

    forthAmount.style.display = 'flex'
    forthAmount.style.flexDirection = 'row'

    var forthAmountRadio = document.createElement('input')
    forthAmountRadio.setAttribute('type', 'radio')
    forthAmountRadio.id = 'forth-amount' + widgetDiv.dataset.slug
    forthAmountRadio.name = 'select-amount'
    forthAmountRadio.value = '100'
    forthAmountRadio.style.marginTop = '15px'
    // forthAmountRadio.onclick = () => this.handlePeriodInterval(2)

    var forthAmountLabel = document.createElement('label')
    forthAmountLabel.id = 'forth-amount-label+' + widgetDiv.dataset.slug
    forthAmountLabel.className = 'forth-amount-label'
    forthAmountLabel.innerText = '€100'
    forthAmountLabel.style.fontSize = '16px'
    forthAmountLabel.style.fontWeight = '500'
    forthAmountLabel.style.marginTop = '12px'
    forthAmountLabel.style.display = 'block'
    forthAmountLabel.onclick = () =>
      this.handleSelectAmount(100, forthAmountLabel.id)

    forthAmount.appendChild(forthAmountRadio)
    forthAmount.appendChild(forthAmountLabel)

    amountDiv.appendChild(forthAmount)

    var otherAmount = document.createElement('div')
    otherAmount.id = 'other-amount-div' + widgetDiv.dataset.slug
    otherAmount.className = 'other-amount-div'
    otherAmount.style.height = '45px'
    otherAmount.style.width = '60px'
    otherAmount.style.borderRadius = '5px'
    otherAmount.style.border = '1px black solid'

    otherAmount.style.display = 'flex'
    otherAmount.style.flexDirection = 'row'

    var otherAmountRadio = document.createElement('input')
    otherAmountRadio.setAttribute('type', 'radio')
    otherAmountRadio.id = 'other-amount' + widgetDiv.dataset.slug
    otherAmountRadio.name = 'select-amount'
    otherAmountRadio.value = 'other'
    otherAmountRadio.style.marginTop = '15px'
    // otherAmountRadio.onclick = () => this.handlePeriodInterval(2)

    var otherAmountLabel = document.createElement('label')
    otherAmountLabel.id = 'other-amount-label+' + widgetDiv.dataset.slug
    otherAmountLabel.className = 'other-amount-label'
    otherAmountLabel.innerText = 'Other'
    otherAmountLabel.style.fontSize = '16px'
    otherAmountLabel.style.fontWeight = '500'
    otherAmountLabel.style.marginTop = '12px'
    otherAmountLabel.style.display = 'block'
    otherAmountLabel.onclick = () =>
      this.handleSelectAmount('other', otherAmountLabel.id)
    otherAmount.appendChild(otherAmountRadio)
    otherAmount.appendChild(otherAmountLabel)

    amountDiv.appendChild(otherAmount)

    var otherAmountInputDiv = document.createElement('div')
    otherAmountInputDiv.id = 'other-amount-input-div+' + widgetDiv.dataset.slug
    otherAmountInputDiv.className = 'other-amount-input-div'

    var otherAmountInput = document.createElement('input')
    otherAmount.setAttribute('type', 'number')
    otherAmountInput.placeholder = 'Input your amount'
    otherAmountInput.id = 'other-amount-input' + widgetDiv.dataset.slug
    otherAmountInputDiv.appendChild(otherAmountInput)
    donationForm.appendChild(otherAmountInputDiv)

    var donorInfoDiv = document.createElement('div')
    donorInfoDiv.id = 'donor-info-div' + widgetDiv.dataset.slug
    donorInfoDiv.className = 'donor-info-div'
    donationForm.appendChild(donorInfoDiv)

    var firstNameInput = document.createElement('input')
    firstNameInput.setAttribute('type', 'text')
    firstNameInput.placeholder = 'First name'
    firstNameInput.id = 'first-name-field' + widgetDiv.dataset.slug
    firstNameInput.className = 'first-name-field'
    donorInfoDiv.appendChild(firstNameInput)

    var lastNameInput = document.createElement('input')
    lastNameInput.setAttribute('type', 'text')
    lastNameInput.placeholder = 'Last name'
    lastNameInput.id = 'last-name-field' + widgetDiv.dataset.slug
    lastNameInput.className = 'last-name-field'
    donorInfoDiv.appendChild(lastNameInput)

    var emailInput = document.createElement('input')
    emailInput.setAttribute('type', 'text')
    emailInput.placeholder = 'Email'
    emailInput.id = 'email-field' + widgetDiv.dataset.slug
    emailInput.className = 'email-field'
    donorInfoDiv.appendChild(emailInput)

    // ----------- copied from here -----------------------

    donateBtnDiv = document.createElement('div')
    donateBtnDiv.id = 'donate-btn-in-form-div+' + widgetDiv.dataset.slug
    donateButton.id = 'donate-btn-in-form+' + widgetDiv.dataset.slug
    donateButton.className = 'donate-btn-in-form'
    donateButton.innerHTML = 'Donate'
    donateButton.onclick = () => this.directDonate(donateBtnDiv.id)
    donateBtnDiv.appendChild(donateButton)
    donationForm.appendChild(donateBtnDiv)

    // create right side
    var fundraiserInfoDiv = document.createElement('DIV')
    fundraiserInfoDiv.id = 'fundraiser-info-div' + widgetDiv.dataset.slug
    fundraiserInfoDiv.className = 'fundraiser-info-div'

    fundraiserInfoDiv.style.height = '100%'
    fundraiserInfoDiv.style.width = '50%'
    fundraiserInfoDiv.style.backgroundColor = 'rgb(248, 245, 245)'
    fundraiserInfoDiv.style.borderRadius = '10px'

    widgetDiv.appendChild(fundraiserInfoDiv)

    // fundraiserImage = document.createElement('IMG')
    // fundraiserImage.id = 'fundraiser-image' + widgetDiv.dataset.slug
    // fundraiserImage.className = 'fundraiser-image'
    // fundraiserImage.style.height = '150px'
    // fundraiserImage.style.width = '100%'
    // fundraiserImage.style.marginBottom = '10px'
    // fundraiserImage.style.borderTopLeftRadius = '15px'
    // fundraiserImage.style.borderTopRightRadius = '15px'

    // widgetDiv.style.height = '350px'

    // var blankDiv = document.createElement('DIV')
    // blankDiv.id = 'blank-div'
    // blankDiv.style.width = '100%'
    // fundraiserInfoDiv.appendChild(fundraiserImage)
    // fundraiserInfoDiv.appendChild(blankDiv)

    var amountInfoDiv = document.createElement('div')
    amountInfoDiv.id = 'amount-info-div' + widgetDiv.dataset.slug
    amountInfoDiv.className = 'amount-info-div'

    var receiveAmount = document.createElement('LABEL')
    receiveAmount.id = 'receive-amount' + widgetDiv.dataset.slug
    receiveAmount.className = 'receive-amount'
    amountInfoDiv.appendChild(receiveAmount)
    // fundraiserInfoDiv.appendChild(receiveAmount)

    var targetAmount = document.createElement('LABEL')
    targetAmount.id = 'target-amount' + widgetDiv.dataset.slug
    targetAmount.className = 'target-amount'
    amountInfoDiv.appendChild(targetAmount)
    // fundraiserInfoDiv.appendChild(targetAmount)

    fundraiserInfoDiv.appendChild(amountInfoDiv)

    var progressBarDiv = document.createElement('div')
    progressBarDiv.id = 'progress-bar-div' + widgetDiv.dataset.slug
    progressBarDiv.className = 'progress-bar-div'

    var progressBar = document.createElement('DIV')
    progressBar.id = 'progress-bar' + widgetDiv.dataset.slug
    progressBar.className = 'progress-bar'
    progressBarDiv.appendChild(progressBar)
    fundraiserInfoDiv.appendChild(progressBarDiv)

    var raisedBar = document.createElement('DIV')
    raisedBar.id = 'raised-bar' + widgetDiv.dataset.slug
    raisedBar.className = 'raised-bar'
    progressBar.appendChild(raisedBar)

    var progressFormDiv = document.createElement('div')
    progressFormDiv.id = 'progress-form-div' + widgetDiv.dataset.slug
    progressFormDiv.className = 'progress-form-div'

    progressDiv = document.createElement('DIV')
    progressDiv.id = 'progress-div' + widgetDiv.dataset.slug
    progressDiv.className = 'progress-div'

    progressFormDiv.appendChild(progressDiv)
    fundraiserInfoDiv.appendChild(progressFormDiv)

    var raisedLabel = document.createElement('LABEL')
    raisedLabel.id = 'raised-label' + widgetDiv.dataset.slug
    raisedLabel.className = 'raised-label'
    progressDiv.appendChild(raisedLabel)

    var daysLabel = document.createElement('LABEL')
    daysLabel.id = 'remaining-days' + widgetDiv.dataset.slug
    daysLabel.className = 'remaining-days'
    progressDiv.appendChild(daysLabel)

    var rightSideRule = document.createElement('div')
    rightSideRule.id = 'right-side-rule' + widgetDiv.dataset.slug
    rightSideRule.className = 'right-side-rule'
    progressFormDiv.appendChild(rightSideRule)
    fundraiserInfoDiv.appendChild(progressFormDiv)
  } else {
    var blankDiv = document.createElement('DIV')
    blankDiv.style.height = '20px'
    blankDiv.style.width = '100%'
    widgetDiv.appendChild(blankDiv)

    var amountInfoDiv = document.createElement('div')
    amountInfoDiv.id = 'amount-info-div-only-image' + widgetDiv.dataset.slug
    amountInfoDiv.className = 'amount-info-div-only-image'
    widgetDiv.appendChild(amountInfoDiv)

    var receiveAmount = document.createElement('LABEL')
    receiveAmount.id = 'receive-amount' + widgetDiv.dataset.slug
    receiveAmount.className = 'receive-amount'
    amountInfoDiv.appendChild(receiveAmount)

    var targetAmount = document.createElement('LABEL')
    targetAmount.id = 'target-amount' + widgetDiv.dataset.slug
    targetAmount.className = 'target-amount'
    amountInfoDiv.appendChild(targetAmount)

    var progressBar = document.createElement('DIV')
    progressBar.id = 'progress-bar' + widgetDiv.dataset.slug
    progressBar.className = 'progress-bar'
    widgetDiv.appendChild(progressBar)

    var raisedBar = document.createElement('DIV')
    raisedBar.id = 'raised-bar' + widgetDiv.dataset.slug
    raisedBar.className = 'raised-bar'
    progressBar.appendChild(raisedBar)

    var progressDiv = document.createElement('DIV')
    progressDiv.id = 'progress-div' + widgetDiv.dataset.slug
    progressDiv.className = 'progress-div'
    widgetDiv.appendChild(progressDiv)

    var raisedLabel = document.createElement('LABEL')
    raisedLabel.id = 'raised-label' + widgetDiv.dataset.slug
    raisedLabel.className = 'raised-label'
    progressDiv.appendChild(raisedLabel)

    var daysLabel = document.createElement('LABEL')
    daysLabel.id = 'remaining-days' + widgetDiv.dataset.slug
    daysLabel.className = 'remaining-days'
    progressDiv.appendChild(daysLabel)

    var donateBtnDiv = document.createElement('div')
    donateBtnDiv.id = 'donate-btn-div+' + widgetDiv.dataset.slug
    donateButton.id = 'donate-btn+' + widgetDiv.dataset.slug
    donateButton.className = 'donate-btn'
    donateButton.innerHTML = 'Donate'
    donateButton.onclick = () => this.handleDonate(donateBtnDiv.id)
    donateBtnDiv.appendChild(donateButton)
    widgetDiv.appendChild(donateBtnDiv)
  }
}

function handlePeriodInterval(value, idValue) {
  // console.log('handlePeriodInterval() ', value)
  var slug = idValue.split('+')[1]
  // console.log('slug ', slug)
  var onetimeBar = document.getElementById('onetime-bar' + slug)
  var monthlyBar = document.getElementById('monthly-bar' + slug)
  var yearlyBar = document.getElementById('yearly-bar' + slug)

  var onetimeRadio = document.getElementById('onetime' + slug)
  var monthlyRadio = document.getElementById('monthly' + slug)
  var yearlyRadio = document.getElementById('yearly' + slug)

  onetimeBar.style.backgroundColor = '#112FEB'
  monthlyBar.style.backgroundColor = '#112FEB'
  yearlyBar.style.backgroundColor = '#112FEB'

  if (value === 1) {
    onetimeRadio.checked = true
    monthlyBar.style.backgroundColor = '#72bcd4'
    yearlyBar.style.backgroundColor = '#72bcd4'
  } else if (value === 2) {
    monthlyRadio.checked = true
    onetimeBar.style.backgroundColor = '#72bcd4'
    yearlyBar.style.backgroundColor = '#72bcd4'
  } else {
    yearlyRadio.checked = true
    onetimeBar.style.backgroundColor = '#72bcd4'
    monthlyBar.style.backgroundColor = '#72bcd4'
  }
}

function handleSelectAmount(value, idValue) {
  // console.log(value)
  var slug = idValue.split('+')[1]
  // console.log('slug ', slug)
  var firstAmountdiv = document.getElementById('first-amount-div' + slug)
  var secondAmountdiv = document.getElementById('second-amount-div' + slug)
  var thirdAmountdiv = document.getElementById('third-amount-div' + slug)
  var forthAmountdiv = document.getElementById('forth-amount-div' + slug)
  var otherAmountdiv = document.getElementById('other-amount-div' + slug)

  var firstAmountLabel = document.getElementById('first-amount-label+' + slug)
  var secondAmountLabel = document.getElementById('second-amount-label+' + slug)
  var thirdAmountLabel = document.getElementById('third-amount-label+' + slug)
  var forthAmountLabel = document.getElementById('forth-amount-label+' + slug)
  var otherAmountLabel = document.getElementById('other-amount-label+' + slug)

  var otherAmountDiv = document.getElementById('other-amount-input-div+' + slug)

  var firstAmountRadio = document.getElementById('first-amount' + slug)
  var secondAmountRadio = document.getElementById('second-amount' + slug)
  var thirdAmountRadio = document.getElementById('third-amount' + slug)
  var forthAmountRadio = document.getElementById('forth-amount' + slug)
  var otherAmountRadio = document.getElementById('other-amount' + slug)

  if (value === 25) {
    otherAmountDiv.style.visibility = 'hidden'
    firstAmountRadio.checked = true

    firstAmountdiv.style.backgroundColor = 'green'
    firstAmountdiv.style.color = 'white'
    firstAmountLabel.style.color = 'white'

    secondAmountdiv.style.backgroundColor = 'transparent'
    secondAmountdiv.style.color = 'black'
    secondAmountLabel.style.color = 'black'

    thirdAmountdiv.style.backgroundColor = 'transparent'
    thirdAmountdiv.style.color = 'black'
    thirdAmountLabel.style.color = 'black'

    forthAmountdiv.style.backgroundColor = 'transparent'
    forthAmountdiv.style.color = 'black'
    forthAmountLabel.style.color = 'black'

    otherAmountdiv.style.backgroundColor = 'transparent'
    otherAmountdiv.style.color = 'black'
    otherAmountLabel.style.color = 'black'
  } else if (value === 50) {
    otherAmountDiv.style.visibility = 'hidden'
    secondAmountRadio.checked = true

    firstAmountdiv.style.backgroundColor = 'transparent'
    firstAmountdiv.style.color = 'black'
    firstAmountLabel.style.color = 'black'

    secondAmountdiv.style.backgroundColor = 'green'
    secondAmountdiv.style.color = 'white'
    secondAmountLabel.style.color = 'white'

    thirdAmountdiv.style.backgroundColor = 'transparent'
    thirdAmountdiv.style.color = 'black'
    thirdAmountLabel.style.color = 'black'

    forthAmountdiv.style.backgroundColor = 'transparent'
    forthAmountdiv.style.color = 'black'
    forthAmountLabel.style.color = 'black'

    otherAmountdiv.style.backgroundColor = 'transparent'
    otherAmountdiv.style.color = 'black'
    otherAmountLabel.style.color = 'black'
  } else if (value === 75) {
    otherAmountDiv.style.visibility = 'hidden'
    thirdAmountRadio.checked = true

    firstAmountdiv.style.backgroundColor = 'transparent'
    firstAmountdiv.style.color = 'black'
    firstAmountLabel.style.color = 'black'

    secondAmountdiv.style.backgroundColor = 'transparent'
    secondAmountdiv.style.color = 'black'
    secondAmountLabel.style.color = 'black'

    thirdAmountdiv.style.backgroundColor = 'green'
    thirdAmountdiv.style.color = 'white'
    thirdAmountLabel.style.color = 'white'

    forthAmountdiv.style.backgroundColor = 'transparent'
    forthAmountdiv.style.color = 'black'
    forthAmountLabel.style.color = 'black'

    otherAmountdiv.style.backgroundColor = 'transparent'
    otherAmountdiv.style.color = 'black'
    otherAmountLabel.style.color = 'black'
  } else if (value === 100) {
    otherAmountDiv.style.visibility = 'hidden'
    forthAmountRadio.checked = true

    firstAmountdiv.style.backgroundColor = 'transparent'
    firstAmountdiv.style.color = 'black'
    firstAmountLabel.style.color = 'black'

    secondAmountdiv.style.backgroundColor = 'transparent'
    secondAmountdiv.style.color = 'black'
    secondAmountLabel.style.color = 'black'

    thirdAmountdiv.style.backgroundColor = 'transparent'
    thirdAmountdiv.style.color = 'black'
    thirdAmountLabel.style.color = 'black'

    forthAmountdiv.style.backgroundColor = 'green'
    forthAmountdiv.style.color = 'white'
    forthAmountLabel.style.color = 'white'

    otherAmountdiv.style.backgroundColor = 'transparent'
    otherAmountdiv.style.color = 'black'
    otherAmountLabel.style.color = 'black'
  } else {
    otherAmountDiv.style.visibility = 'visible'
    otherAmountRadio.checked = true

    firstAmountdiv.style.backgroundColor = 'transparent'
    firstAmountdiv.style.color = 'black'
    firstAmountLabel.style.color = 'black'

    secondAmountdiv.style.backgroundColor = 'transparent'
    secondAmountdiv.style.color = 'black'
    secondAmountLabel.style.color = 'black'

    thirdAmountdiv.style.backgroundColor = 'transparent'
    thirdAmountdiv.style.color = 'black'
    thirdAmountLabel.style.color = 'black'

    forthAmountdiv.style.backgroundColor = 'transparent'
    forthAmountdiv.style.color = 'black'
    forthAmountLabel.style.color = 'black'

    otherAmountdiv.style.backgroundColor = 'green'
    otherAmountdiv.style.color = 'white'
    otherAmountLabel.style.color = 'white'
  }
}

function createModal(slug) {
  console.log('Create modal for = ', slug)
  var modalDiv = document.createElement('DIV')
  modalDiv.id = 'myModal' + slug
  modalDiv.className = 'modal'

  var modalContent = document.createElement('DIV')
  modalContent.className = 'modal-content'
  modalDiv.appendChild(modalContent)

  var closeDiv = document.createElement('div')
  closeDiv.id = 'close-div' + slug
  closeDiv.className = 'close-div'

  var fundraiserIdLabel = document.createElement('label')
  fundraiserIdLabel.id = 'fundraiser-id-label' + slug
  fundraiserIdLabel.style.display = 'none'
  fundraiserIdLabel.style.float = 'left'
  closeDiv.appendChild(fundraiserIdLabel)
  // closeDiv.style.width = '100%'
  // closeDiv.style.height = '20px'
  // closeDiv.style.backgroundColor = 'red'
  // closeDiv.style.borderRadius = '15px'
  // closeDiv.style.top = '-10px'
  // closeDiv.style.right = '-10px'
  // closeDiv.style.float = 'right'
  modalContent.appendChild(closeDiv)

  var closeSpan = document.createElement('SPAN')
  closeSpan.id = 'close' + slug
  closeSpan.innerHTML = '&times;'
  closeSpan.className = 'close'
  closeDiv.appendChild(closeSpan)

  // var fundraiserIdLabel = document.createElement('label')
  // fundraiserIdLabel.id = 'fundraiser-id-label' + widgetDiv.dataset.slug
  // fundraiserIdLabel.className = 'fundraiser-id-label'
  // modalContent.appendChild(fundraiserIdLabel)
  var donationFormDiv = document.createElement('div')
  donationFormDiv.id = 'modal-donation-form' + slug
  donationFormDiv.className = 'modal-donation-form'
  modalContent.appendChild(donationFormDiv)

  var labelDiv = document.createElement('div')
  labelDiv.id = 'block-div-modal' + slug
  labelDiv.className = 'block-div-modal'
  // labelDiv.style.display = 'flex'
  // labelDiv.style.flexDirection = 'column'
  donationFormDiv.appendChild(labelDiv)

  var label1 = document.createElement('label')
  label1.id = 'label1' + slug
  label1.className = 'label1'
  label1.innerText = 'Secured Online Donation'
  labelDiv.appendChild(label1)

  var label2 = document.createElement('label')
  label2.id = 'label2' + slug
  label2.className = 'label2'
  label2.innerText = 'Enter your donation'
  labelDiv.appendChild(label2)

  var periodDiv = document.createElement('div')
  periodDiv.id = 'period-intervals' + slug
  periodDiv.className = 'period-intervals'
  donationFormDiv.appendChild(periodDiv)

  var periodOnetimeDiv = document.createElement('div')
  periodOnetimeDiv.id = 'period-intervals-onetime+' + slug
  periodOnetimeDiv.className = 'period-intervals-onetime'

  var oneTimeLabel = document.createElement('label')
  oneTimeLabel.innerText = 'One time'
  oneTimeLabel.fontSize = '14px'
  oneTimeLabel.style.display = 'block'
  oneTimeLabel.onclick = () => this.handlePeriodInterval(1, periodOnetimeDiv.id)

  var oneTimeRadio = document.createElement('input')
  oneTimeRadio.setAttribute('type', 'radio')
  oneTimeRadio.id = 'onetime' + slug
  oneTimeRadio.name = 'period-intervals' + slug
  oneTimeRadio.value = '1'
  oneTimeRadio.checked = true
  oneTimeRadio.onclick = () => this.handlePeriodInterval(1, periodOnetimeDiv.id)

  periodOnetimeDiv.appendChild(oneTimeRadio)
  periodOnetimeDiv.appendChild(oneTimeLabel)
  periodDiv.appendChild(periodOnetimeDiv)

  var periodMonthlyDiv = document.createElement('div')
  periodMonthlyDiv.id = 'period-intervals-monthly+' + slug
  periodMonthlyDiv.className = 'period-intervals-monthly'

  var monthlyLabel = document.createElement('label')
  monthlyLabel.innerText = 'Monthly'
  monthlyLabel.fontSize = '14px'
  monthlyLabel.style.display = 'block'
  monthlyLabel.onclick = () => this.handlePeriodInterval(2, periodMonthlyDiv.id)

  var monthlyRadio = document.createElement('input')
  monthlyRadio.setAttribute('type', 'radio')
  monthlyRadio.id = 'monthly' + slug
  monthlyRadio.name = 'period-intervals'
  monthlyRadio.value = '2'
  monthlyRadio.onclick = () => this.handlePeriodInterval(2, periodMonthlyDiv.id)

  periodMonthlyDiv.appendChild(monthlyRadio)
  periodMonthlyDiv.appendChild(monthlyLabel)
  periodDiv.appendChild(periodMonthlyDiv)

  var periodYearlyDiv = document.createElement('div')
  periodYearlyDiv.id = 'period-intervals-yearly+' + slug
  periodYearlyDiv.className = 'period-intervals-yearly'

  var yearlyLabel = document.createElement('label')
  yearlyLabel.innerText = 'Yearly'
  yearlyLabel.fontSize = '14px'
  yearlyLabel.style.display = 'block'
  yearlyLabel.onclick = () => this.handlePeriodInterval(3, periodYearlyDiv.id)

  var yearlyRadio = document.createElement('input')
  yearlyRadio.setAttribute('type', 'radio')
  yearlyRadio.id = 'yearly' + slug
  yearlyRadio.name = 'period-intervals'
  yearlyRadio.value = '3'
  yearlyRadio.onclick = () => this.handlePeriodInterval(3, periodYearlyDiv.id)

  periodYearlyDiv.appendChild(yearlyRadio)
  periodYearlyDiv.appendChild(yearlyLabel)
  periodDiv.appendChild(periodYearlyDiv)

  var hrule = document.createElement('hr')
  hrule.style.background = '#72bcd4'
  hrule.style.height = '2px'
  hrule.style.width = '100%'
  hrule.style.display = 'flex'
  hrule.style.flexDirection = 'row'
  hrule.style.justifyContent = 'space-between'
  donationFormDiv.appendChild(hrule)

  var oneTimeBar = document.createElement('div')
  oneTimeBar.id = 'onetime-bar' + slug
  oneTimeBar.className = 'onetime-bar'
  oneTimeBar.style.height = '2px'
  oneTimeBar.style.width = '110px'
  oneTimeBar.style.background = '#112FEB'
  hrule.appendChild(oneTimeBar)

  var monthlyBar = document.createElement('div')
  monthlyBar.id = 'monthly-bar' + slug
  monthlyBar.className = 'monthly-bar'
  monthlyBar.style.height = '2px'
  monthlyBar.style.width = '110px'
  monthlyBar.style.background = '#72bcd4'
  hrule.appendChild(monthlyBar)

  var yearlyBar = document.createElement('div')
  yearlyBar.id = 'yearly-bar' + slug
  yearlyBar.className = 'yearly-bar'
  yearlyBar.style.height = '2px'
  yearlyBar.style.width = '110px'
  yearlyBar.style.background = '#72bcd4'
  hrule.appendChild(yearlyBar)

  var selectAmountLabelDiv = document.createElement('div')
  selectAmountLabelDiv.id = 'select-amount-div-modal' + slug
  selectAmountLabelDiv.className = 'select-amount-div-modal'

  var selectAmountlabel = document.createElement('label')
  selectAmountlabel.id = 'select-amount-label' + slug
  selectAmountlabel.className = 'select-amount-label'
  selectAmountlabel.innerText = 'Select Amount'
  selectAmountlabel.style.fontSize = '14px'
  selectAmountlabel.fontWeight = '500'
  selectAmountLabelDiv.appendChild(selectAmountlabel)
  donationFormDiv.appendChild(selectAmountLabelDiv)

  var amountDiv = document.createElement('div')
  amountDiv.style.display = 'flex'
  amountDiv.style.marginTop = '10px'
  amountDiv.style.flexDirection = 'row'
  amountDiv.style.justifyContent = 'space-around'
  donationFormDiv.appendChild(amountDiv)

  var firstAmount = document.createElement('div')
  firstAmount.id = 'first-amount-div' + slug
  firstAmount.className = 'first-amount-div'
  firstAmount.style.display = 'flex'
  firstAmount.style.flexDirection = 'row'
  firstAmount.style.height = '45px'
  firstAmount.style.width = '60px'
  firstAmount.style.borderRadius = '5px'
  firstAmount.style.border = '1px black solid'

  var firstAmountRadio = document.createElement('input')
  firstAmountRadio.setAttribute('type', 'radio')
  firstAmountRadio.id = 'first-amount' + slug
  firstAmountRadio.name = 'select-amount'
  firstAmountRadio.value = '25'
  firstAmountRadio.style.marginTop = '15px'
  // firstAmountRadio.onclick = () => this.handlePeriodInterval(2)

  var firstAmountLabel = document.createElement('label')
  firstAmountLabel.id = 'first-amount-label+' + slug
  firstAmountLabel.className = 'first-amount-label'
  firstAmountLabel.innerText = '€25'
  firstAmountLabel.style.fontSize = '16px'
  firstAmountLabel.style.fontWeight = '500'
  firstAmountLabel.style.marginTop = '12px'
  firstAmountLabel.style.display = 'block'
  firstAmountLabel.onclick = () =>
    this.handleSelectAmount(25, firstAmountLabel.id)

  firstAmount.appendChild(firstAmountRadio)
  firstAmount.appendChild(firstAmountLabel)

  amountDiv.appendChild(firstAmount)

  var secondAmount = document.createElement('div')
  secondAmount.id = 'second-amount-div' + slug
  secondAmount.className = 'second-amount-div'
  secondAmount.style.height = '45px'
  secondAmount.style.width = '60px'
  secondAmount.style.borderRadius = '5px'
  secondAmount.style.border = '1px black solid'

  secondAmount.style.display = 'flex'
  secondAmount.style.flexDirection = 'row'

  var secondAmountRadio = document.createElement('input')
  secondAmountRadio.setAttribute('type', 'radio')
  secondAmountRadio.id = 'second-amount' + slug
  secondAmountRadio.name = 'select-amount'
  secondAmountRadio.value = '50'
  secondAmountRadio.style.marginTop = '15px'
  // secondAmountRadio.onclick = () => this.handlePeriodInterval(2)

  var secondAmountLabel = document.createElement('label')
  secondAmountLabel.id = 'second-amount-label+' + slug
  secondAmountLabel.className = 'second-amount-label'
  secondAmountLabel.innerText = '€50'
  secondAmountLabel.style.fontSize = '16px'
  secondAmountLabel.style.fontWeight = '500'
  secondAmountLabel.style.marginTop = '12px'
  secondAmountLabel.style.display = 'block'
  secondAmountLabel.onclick = () =>
    this.handleSelectAmount(50, secondAmountLabel.id)

  secondAmount.appendChild(secondAmountRadio)
  secondAmount.appendChild(secondAmountLabel)

  amountDiv.appendChild(secondAmount)

  var thirdAmount = document.createElement('div')
  thirdAmount.id = 'third-amount-div' + slug
  thirdAmount.className = 'third-amount-div'
  thirdAmount.style.height = '45px'
  thirdAmount.style.width = '60px'
  thirdAmount.style.borderRadius = '5px'
  thirdAmount.style.border = '1px black solid'

  thirdAmount.style.display = 'flex'
  thirdAmount.style.flexDirection = 'row'

  var thirdAmountRadio = document.createElement('input')
  thirdAmountRadio.setAttribute('type', 'radio')
  thirdAmountRadio.id = 'third-amount' + slug
  thirdAmountRadio.name = 'select-amount'
  thirdAmountRadio.value = '75'
  thirdAmountRadio.style.marginTop = '15px'
  // thirdAmountRadio.onclick = () => this.handlePeriodInterval(2)

  var thirdAmountLable = document.createElement('label')
  thirdAmountLable.id = 'third-amount-label+' + slug
  thirdAmountLable.className = 'third-amount-label'
  thirdAmountLable.innerText = '€75'
  thirdAmountLable.style.fontSize = '16px'
  thirdAmountLable.style.fontWeight = '500'
  thirdAmountLable.style.marginTop = '12px'
  thirdAmountLable.style.display = 'block'
  thirdAmountLable.onclick = () =>
    this.handleSelectAmount(75, thirdAmountLable.id)

  thirdAmount.appendChild(thirdAmountRadio)
  thirdAmount.appendChild(thirdAmountLable)

  amountDiv.appendChild(thirdAmount)

  var forthAmount = document.createElement('div')
  forthAmount.id = 'forth-amount-div' + slug
  forthAmount.className = 'forth-amount-div'
  forthAmount.style.height = '45px'
  forthAmount.style.width = '60px'
  forthAmount.style.borderRadius = '5px'
  forthAmount.style.border = '1px black solid'

  forthAmount.style.display = 'flex'
  forthAmount.style.flexDirection = 'row'

  var forthAmountRadio = document.createElement('input')
  forthAmountRadio.setAttribute('type', 'radio')
  forthAmountRadio.id = 'forth-amount' + slug
  forthAmountRadio.name = 'select-amount'
  forthAmountRadio.value = '100'
  forthAmountRadio.style.marginTop = '15px'
  // forthAmountRadio.onclick = () => this.handlePeriodInterval(2)

  var forthAmountLabel = document.createElement('label')
  forthAmountLabel.id = 'forth-amount-label+' + slug
  forthAmountLabel.className = 'forth-amount-label'
  forthAmountLabel.innerText = '€100'
  forthAmountLabel.style.fontSize = '16px'
  forthAmountLabel.style.fontWeight = '500'
  forthAmountLabel.style.marginTop = '12px'
  forthAmountLabel.style.display = 'block'
  forthAmountLabel.onclick = () =>
    this.handleSelectAmount(100, forthAmountLabel.id)

  forthAmount.appendChild(forthAmountRadio)
  forthAmount.appendChild(forthAmountLabel)

  amountDiv.appendChild(forthAmount)

  var otherAmount = document.createElement('div')
  otherAmount.id = 'other-amount-div' + slug
  otherAmount.className = 'other-amount-div'
  otherAmount.style.height = '45px'
  otherAmount.style.width = '60px'
  otherAmount.style.borderRadius = '5px'
  otherAmount.style.border = '1px black solid'

  otherAmount.style.display = 'flex'
  otherAmount.style.flexDirection = 'row'

  var otherAmountRadio = document.createElement('input')
  otherAmountRadio.setAttribute('type', 'radio')
  otherAmountRadio.id = 'other-amount' + slug
  otherAmountRadio.name = 'select-amount'
  otherAmountRadio.value = 'other'
  otherAmountRadio.style.marginTop = '15px'
  // otherAmountRadio.onclick = () => this.handlePeriodInterval(2)

  var otherAmountLabel = document.createElement('label')
  otherAmountLabel.id = 'other-amount-label+' + slug
  otherAmountLabel.className = 'other-amount-label'
  otherAmountLabel.innerText = 'Other'
  otherAmountLabel.style.fontSize = '16px'
  otherAmountLabel.style.fontWeight = '500'
  otherAmountLabel.style.marginTop = '12px'
  otherAmountLabel.style.display = 'block'
  otherAmountLabel.onclick = () =>
    this.handleSelectAmount('other', otherAmountLabel.id)
  otherAmount.appendChild(otherAmountRadio)
  otherAmount.appendChild(otherAmountLabel)

  amountDiv.appendChild(otherAmount)

  var otherAmountInputDiv = document.createElement('div')
  otherAmountInputDiv.id = 'other-amount-input-div+' + slug
  otherAmountInputDiv.className = 'other-amount-input-div'

  var otherAmountInput = document.createElement('input')
  otherAmount.setAttribute('type', 'number')
  otherAmountInput.placeholder = 'Input your amount'
  otherAmountInput.id = 'other-amount-input' + slug
  otherAmountInputDiv.appendChild(otherAmountInput)
  donationFormDiv.appendChild(otherAmountInputDiv)

  var missingAmountMsg = document.createElement('p')
  missingAmountMsg.id = 'missing-error-msg-amount' + slug
  missingAmountMsg.className = 'missing-error-msg'
  missingAmountMsg.innerText = 'Please select or input an amount'
  donationFormDiv.appendChild(missingAmountMsg)

  var donorInfoDiv = document.createElement('div')
  donorInfoDiv.id = 'donor-info-div-modal' + slug
  donorInfoDiv.className = 'donor-info-div-modal'
  donationFormDiv.appendChild(donorInfoDiv)

  var firstNameInput = document.createElement('input')
  firstNameInput.setAttribute('type', 'text')
  firstNameInput.placeholder = 'First name'
  firstNameInput.id = 'first-name-field' + slug
  firstNameInput.className = 'first-name-field'
  donorInfoDiv.appendChild(firstNameInput)

  var missingFirstnameMsg = document.createElement('p')
  missingFirstnameMsg.id = 'missing-error-msg-first-name' + slug
  missingFirstnameMsg.className = 'missing-error-msg'
  missingFirstnameMsg.innerText = 'Please enter your first name'
  donorInfoDiv.appendChild(missingFirstnameMsg)

  var lastNameInput = document.createElement('input')
  lastNameInput.setAttribute('type', 'text')
  lastNameInput.placeholder = 'Last name'
  lastNameInput.id = 'last-name-field' + slug
  lastNameInput.className = 'last-name-field'
  donorInfoDiv.appendChild(lastNameInput)

  var emailInput = document.createElement('input')
  emailInput.setAttribute('type', 'text')
  emailInput.placeholder = 'Email'
  emailInput.id = 'email-field' + slug
  emailInput.className = 'email-field'
  donorInfoDiv.appendChild(emailInput)

  var modalDonateButton = document.createElement('button')
  modalDonateButton.id = 'donate-btn-in-modal+' + slug
  modalDonateButton.className = 'donate-btn-in-form'
  modalDonateButton.innerHTML = 'Donate'
  modalDonateButton.onclick = () => this.directDonate(modalDonateButton.id)
  donationFormDiv.appendChild(modalDonateButton)

  document.body.appendChild(modalDiv)

  // Design donate Form
  // var formDiv = document.createElement('DIV')
  // formDiv.className = 'donate-form'

  // var fromLabel = document.createElement('label')
  // fromLabel.className = 'donate-form-label'
  // fromLabel.innerText = 'Doantion From'

  // modalContent.appendChild(formDiv)
  // formDiv.appendChild(fromLabel)
  console.log('Create Modal finish execution')
}

function setModalId(f_id, f_slug) {
  console.log('Modal id ', f_id)
  console.log('Modal slug ', f_slug)
  var modalFundraiserIdLabel = document.getElementById(
    'fundraiser-id-label' + f_slug,
  )
  modalFundraiserIdLabel.innerText = f_id + '+' + f_slug
}

function handleDonate(idValue) {
  // console.log('donate')
  var slug = idValue.split('+')[1]
  console.log('Clicked on donate button for slug = ', slug)
  // Get the modal
  var modal = document.getElementById('myModal' + slug)

  // // Get the button that opens the modal
  // var btn = document.getElementById('myBtn')

  // Get the <span> element that closes the modal
  var span = document.getElementById('close' + slug)

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
  // window.onclick = function(event) {
  //   if (event.target == modal) {
  //     modal.style.display = 'none'
  //   }
  // }
}

function directDonate(idValue) {
  console.log('Direct donate ', idValue)
  var slugVal = idValue.split('+')[1]

  var fundrasier_id = ''
  var periodIntervals = ''
  var selectedAmount = ''
  var firstName = ''
  var lastName = ''
  var email = ''

  fundrasier_id = document
    .getElementById('fundraiser-id-label' + slugVal)
    .innerText.split('+')[0]

  if (document.getElementById('onetime' + slugVal).checked) {
    // periodIntervals = document.getElementById('onetime' + slugVal).value
    periodIntervals = 'once'
  } else if (document.getElementById('monthly' + slugVal).checked) {
    // periodIntervals = document.getElementById('monthly' + slugVal).value
    periodIntervals = 'monthly'
  } else {
    // periodIntervals = document.getElementById('yearly' + slugVal).value
    periodIntervals = 'yearly'
  }

  if (document.getElementById('first-amount' + slugVal).checked) {
    selectedAmount = document.getElementById('first-amount' + slugVal).value
  } else if (document.getElementById('second-amount' + slugVal).checked) {
    selectedAmount = document.getElementById('second-amount' + slugVal).value
  } else if (document.getElementById('third-amount' + slugVal).checked) {
    selectedAmount = document.getElementById('third-amount' + slugVal).value
  } else if (document.getElementById('forth-amount' + slugVal).checked) {
    selectedAmount = document.getElementById('forth-amount' + slugVal).value
  } else {
    selectedAmount = document.getElementById('other-amount-input' + slugVal)
      .value
  }

  firstName = document.getElementById('first-name-field' + slugVal).value
  lastName = document.getElementById('last-name-field' + slugVal).value
  email = document.getElementById('email-field' + slugVal).value

  console.log('fundraiser local id ', fundrasier_id)
  console.log('period intervals value ', periodIntervals)
  console.log('selected amount ', selectedAmount)
  console.log('first name ', firstName)
  console.log('last name ', lastName)
  console.log('email ', email)

  var data = {
    amount: selectedAmount,
    is_anonymous: true,
    newsletter: false,
    pay_period: periodIntervals,
    fundraising_local_id: fundrasier_id,
    currency_code: 'eur',
    lang: 'en',
    description: 'Hey there, just want to help with donation',
    bank_account: '',
    return_url: 'https://www.google.com',
  }

  makeDonation(data)
}

function makeDonation(data) {
  const proxyurl = 'https://intense-temple-29395.herokuapp.com/'
  const donationApi =
    'https://whydonate-development.appspot.com/api/v1/donation/order/'

  const url = proxyurl + donationApi

  console.log('url is ', url)
  jQuery.ajax({
    url: url,
    type: 'POST',
    data: data,
    beforeSend: function(xhr) {
      // console.log('before send')
    },
    success: function(result) {
      console.log('donation request success response ', result)
      window.location.replace(result['data']['url'])
    },
    error: function(message) {
      console.log('error message ', message)
    },
    complete: function() {
      // hide loader here
      // console.log('completed block')
      // var modal = document.getElementById(
      //   'myModal' + widgetDiv.dataset.slug,
      // )
      // modal.style.display = 'none'
    },
  })
}

function makeUrl() {
  const proxyurl = 'https://intense-temple-29395.herokuapp.com/'
  const url =
    'https://whydonate-development.appspot.com/api/v1/project/fundraising/local/?slug=' +
    widgetDiv.dataset.slug.split('&')[0]

  console.log('options check ', widgetDiv.getAttribute('value'))

  return proxyurl + url
}

// function httpGet() {
//   const proxyurl = 'https://intense-temple-29395.herokuapp.com/'
//   const url =
//     'https://whydonate-development.appspot.com/api/v1/project/fundraising/local/?slug=fundraising-by-shuvo' // site that doesn’t send Access-Control-*
//   fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
//     .then(response => response.text())
//     .then(contents => console.log(contents))
//     .catch(() =>
//       console.log('Can’t access ' + url + ' response. Blocked by browser?'),
//     )
// }

// var btn = document.createElement('BUTTON') // Create a <button> element
// btn.innerHTML = 'GET'
// btn.id = 'btn-request-get'
// btn.onclick = this.handleGET
// // widgetDiv.appendChild(btn)

// var btnP = document.createElement('BUTTON') // Create a <button> element
// btnP.innerHTML = 'POST'
// btnP.id = 'btn-request-post'
// btnP.onclick = this.handlePOST
// // widgetDiv.appendChild(btnP)

// var btnC = document.createElement('BUTTON') // Create a <button> element
// btnC.innerHTML = 'Check'
// btnC.id = 'btn-request'

// function httpPost() {
//   data = {
//     amount: 25,
//     is_anonymous: '',
//     newsletter: false,
//     pay_period: 'once',
//     fundraising_local_id: 419,
//     currency_code: 'eur',
//     lang: 'en',
//     description: 'Fundraising by Shuvo',
//     bank_account: '',
//     return_url:
//       'https://whydonate-staging-ui.appspot.com/fundraising/fundraising-by-shuvo/en/',
//   }

//   let headers = new Headers()
//   headers.append('Content-Type', 'application/json')

//   //   const proxyurl = 'http://localhost:8080/'
//   //     const url = 'http://127.0.0.1:8000/api/v1/donation/order/' // site that doesn’t send Access-Control-*

//   const proxyurl = 'https://intense-temple-29395.herokuapp.com/'
//   const url = 'https://whydonate-development.appspot.com/api/v1/donation/order/'
//   fetch(proxyurl + url, {
//     method: 'POST',
//     headers: headers,
//     body: JSON.stringify(data),
//   }) // https://cors-anywhere.herokuapp.com/https://example.com
//     .then(response => {
//       const contentType = response.headers.get('content-type')
//       if (!contentType || !contentType.includes('application/json')) {
//         throw new TypeError("Oops, we haven't got JSON!")
//       }
//       return response.json()
//     })
//     .then(data => {
//       /* process your data further */
//       window.location.replace(data.data.url)
//       //   console.log(data.data.url)
//     })
//     .catch(error => console.error(error))
// }
