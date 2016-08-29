const lory = require('lory.js').lory
require('image-zoom')


document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.project-gallery')
  if (!slider) { return }
  const navItems = document.querySelectorAll('.project-gallery-nav-item')
  const setSlideClasses = (currentSlide) => {
    Array.prototype.slice.call(navItems).forEach((el) => {
      if (el.getAttribute('data-loop-index') == currentSlide) {
        el.classList.add('active')
      } else {
        el.classList.remove('active')
      }
    })
  }

  const handleSlideChange = (e) => {
    const currentSlide = e.detail.currentSlide
    setSlideClasses(currentSlide)
  }

  slider.addEventListener('after.lory.slide', handleSlideChange)
  const lorySlider = lory(slider)
  window.sliderr = lorySlider
  slider.addEventListener('click', (e) => {
    if ( e.srcElement.classList.contains('project-gallery-nav-item') ) {
      e.preventDefault()
      lorySlider.slideTo(parseInt(e.srcElement.getAttribute('data-loop-index')))
      e.stopPropagation()
    }
  })

  setSlideClasses(0)
})
