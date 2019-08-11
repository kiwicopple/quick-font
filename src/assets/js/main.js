document.addEventListener('DOMContentLoaded', function(event) {
  document.toggleTab = function(id, tabName) {
    let block = document.getElementById(id)
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
