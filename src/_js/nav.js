const { gsap } = require('../../node_modules/gsap')

class Menu {
  constructor (header, document) {
    this.body = document.querySelector('body')
    this.overlay = document.querySelector('.oza-dark-overlay')
    this.header = header
    this.menuButton = header.querySelector('#menu-toggle')
    this.menu = this.header.querySelector('#' + this.menuButton.getAttribute('aria-controls'))
    this.menuItems = this.header.querySelectorAll('.oza-menu-item')
    this.menuLinks = this.header.querySelectorAll('.oza-menu-link')
    this.openText = this.menuButton.querySelector('#toggle-text-opened')
    this.closeText = this.menuButton.querySelector('#toggle-text-closed')
  }

  init () {
    this.syncState(this.menu.classList.contains('oza-menu--is-open'))
    this.menuButton.addEventListener('click', this.handleMenuToggle.bind(this))
    this.menuLinks.forEach(link => link.addEventListener('mouseover', this.focusLink.bind(this)))
    this.menuLinks.forEach(link => link.addEventListener('focus', this.focusLink.bind(this)))
    this.menuLinks.forEach(link => link.addEventListener('mouseout', this.blurLink.bind(this)))
    this.menuLinks.forEach(link => link.addEventListener('blur', this.blurLink.bind(this)))
  }

  focusLink (linkHover) {
    this.menuLinks.forEach(link => {
      if (link !== linkHover.target) {
        link.classList.toggle('oza-menu-link--unhovered')
      }
    })
  }

  blurLink () {
    this.menuLinks.forEach(link => {
      link.classList.toggle('oza-menu-link--unhovered', false)
    })
  }

  syncState (isVisible) {
    this.toggleMenuText(isVisible)
    this.menuButton.setAttribute('aria-expanded', isVisible)
    this.toggleMenuIcon(isVisible)
    this.animateMenuItems(isVisible)
    this.disableScroll(isVisible)
    this.toggleOverlay(isVisible)
  }

  handleMenuToggle () {
    const isVisible = this.menu.classList.toggle('oza-menu--is-open')
    this.throttleMenuButton()
    this.syncState(isVisible)
  }

  throttleMenuButton () {
    this.menuButton.setAttribute('disabled', true)
    setTimeout(() => {
      this.menuButton.removeAttribute('disabled')
    }, 600)
  }

  toggleOverlay (isVisible) {
    this.overlay.classList.toggle('oza-dark-overlay--is-active', isVisible)
  }

  disableScroll (isVisible) {
    this.body.classList.toggle('stop-scroll', isVisible)
  }

  toggleMenuIcon (isVisible) {
    this.menuButton.classList.toggle('oza-menu__toggle--is-open', isVisible)
  }

  animateMenuItems (isVisible) {
    if (isVisible) {
      gsap.from(this.menuItems, { x: 100, duration: 0.5, opacity: 0, delay: 0.3, stagger: 0.05, ease: 'power2' })
    }
  }

  toggleMenuText (isVisible) {
    if (isVisible) {
      gsap.to(this.closeText, { display: 'none', opacity: 0, duration: 0.3 })
      gsap.to(this.openText, { display: 'block', opacity: 1, duration: 0.3, delay: 0.3 })
    } else {
      gsap.to(this.openText, { display: 'none', opacity: 0, duration: 0.3 })
      gsap.to(this.closeText, { display: 'block', opacity: 1, duration: 0.3, delay: 0.3 })
    }
  }
}

module.exports = Menu
