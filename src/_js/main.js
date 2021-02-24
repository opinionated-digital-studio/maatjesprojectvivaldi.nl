const { gsap } = require('../../node_modules/gsap')
const hamburgerMenu = document.getElementById('menu-toggle')
const mainMenu = document.getElementById('main-menu')
const body = document.getElementsByTagName('body')[0]
const hamburgerMenuTexts = document.getElementsByClassName('oza-menu__toggle-text')

const menuLinks = document.getElementsByClassName('oza-menu-link')

hamburgerMenu.addEventListener('click', function (e) {
  mainMenu.classList.toggle('oza-menu--is-open')
  hamburgerMenu.classList.toggle('oza-menu__toggle--is-open')
  body.classList.toggle('stop-scroll')
  for (const item of hamburgerMenuTexts) {
    item.classList.toggle('oza-menu__toggle-text--is-active')
  }
  if (mainMenu.classList.contains('oza-menu--is-open')) {
    toggleMenuText('opening')
    gsap.from(menuLinks, { x: 100, duration: 0.5, opacity: 0, delay: 0.3, stagger: 0.05, ease: 'power2' })
  } else {
    toggleMenuText('closing')
  }
})

function toggleMenuText (state) {
  const textClosed = document.getElementById('toggle-text-closed')
  const textOpened = document.getElementById('toggle-text-opened')
  if (state === 'opening') {
    gsap.to(textClosed, { display: 'none', opacity: 0, duration: 0.3 })
    gsap.to(textOpened, { display: 'block', opacity: 1, duration: 0.3, delay: 0.3 })
  } else {
    gsap.to(textOpened, { display: 'none', opacity: 0, duration: 0.3 })
    gsap.to(textClosed, { display: 'block', opacity: 1, duration: 0.3, delay: 0.3 })
  }
}
