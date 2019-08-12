document.addEventListener('DOMContentLoaded', function(event) {
  document.filterString = ''
  document.fontStyle = null
  document.license = null

  var filterFonts = function() {
    // Check if there are any filters

    let noFilters = !document.filterString.length && !document.fontStyle && !document.license
    if (noFilters) return showAllFonts()

    // If there are filters, apply them
    let blocks = document.querySelectorAll('.FontBlockCol')
    let passFilters = [...blocks]
    if (document.license) {
      passFilters = passFilters.filter(x => x.getAttribute('license') == document.license)
    }
    if (document.fontStyle) {
      passFilters = passFilters.filter(x => x.getAttribute('fontStyle') == document.fontStyle)
    }
    if (document.filterString.length) {
      let reg = new RegExp(document.filterString, 'gi')
      passFilters = passFilters.filter(x => x.getAttribute('filterString').search(reg) >= 0)
    }
    let passingIds = passFilters.map(x => x.getAttribute('id'))
    Array.prototype.forEach.call(blocks, function(el) {
      let id = el.getAttribute('id')
      if (passingIds.includes(id)) el.classList.remove('is-hidden')
      else el.classList.add('is-hidden')
    })
  }
  var showAllFonts = function() {
    let blocks = document.querySelectorAll('.FontBlockCol')
    Array.prototype.forEach.call(blocks, function(el) {
      el.classList.remove('is-hidden')
    })
  }

  document.toggleTab = function(id, tabName) {
    // let block = document.getElementById(id)
    let tabHandles = document.querySelectorAll(`#${id} .tabs li`)
    let tabs = document.querySelectorAll(`#${id} .tab`)
    Array.prototype.forEach.call(tabHandles, function(el, i) {
      if (el.getAttribute('tabName') === tabName) {
        el.classList.add('is-active')
      } else {
        el.classList.remove('is-active')
      }
    })
    Array.prototype.forEach.call(tabs, function(el, i) {
      if (el.getAttribute('tabName') === tabName) {
        el.classList.remove('is-hidden')
      } else {
        el.classList.add('is-hidden')
      }
    })
  }
  document.closeModals = function() {
    let modals = document.querySelectorAll(`.modal`)
    Array.prototype.forEach.call(modals, function(el, i) {
      el.classList.remove('is-active')
    })
  }
  document.showModal = function(id) {
    let modals = document.querySelectorAll(`#${id}`)
    Array.prototype.forEach.call(modals, function(el, i) {
      el.classList.add('is-active')
    })
  }
  document.onFontStyleSelected = function(el) {
    let fontStyle = el.getAttribute('fontStyle')
    let buttons = document.querySelectorAll('.font-style-button')
    if (document.fontStyle !== fontStyle) document.fontStyle = fontStyle
    else document.fontStyle = null // toggle off to show all
    Array.prototype.forEach.call(buttons, function(element) {
      let styleAttr = element.getAttribute('fontStyle')
      if (styleAttr === document.fontStyle) element.classList.add('is-primary')
      else element.classList.remove('is-primary')
    })
    filterFonts()
  }
  document.onLicenseSelected = function(el) {
    let license = el.getAttribute('license')
    let buttons = document.querySelectorAll('.license-button')
    if (document.license !== license) document.license = license
    else document.license = null // toggle off to show all
    Array.prototype.forEach.call(buttons, function(element) {
      let styleAttr = element.getAttribute('license')
      if (styleAttr === document.license) element.classList.add('is-primary')
      else element.classList.remove('is-primary')
    })
    filterFonts()
  }
  document.toggleElementActive = function (id) {
    let el = document.getElementById(id)
    el.classList.toggle('is-active')
  }

  // Attach Listeners
  let filterInput = document.querySelector('#FilterInput')
  if (filterInput)
    filterInput.addEventListener('keyup', function(e) {
      document.filterString = e.target.value
      filterFonts()
    })
})

document.addEventListener('DOMContentLoaded', () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0)

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach(el => {
      el.addEventListener('click', () => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target
        const $target = document.getElementById(target)

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active')
        $target.classList.toggle('is-active')
      })
    })
  }
})

var dropdown = document.querySelector('.dropdown')
dropdown.addEventListener('click', function(event) {
  event.stopPropagation()
  dropdown.classList.toggle('is-active')
})
