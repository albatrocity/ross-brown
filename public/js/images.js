require('image-zoom')
const $nav = document.querySelector('.project-gallery-nav-meta')
const slider = new IdealImageSlider.Slider({
  selector: '.project-gallery-frame',
  height: 400,
  width: 400,
  effect: 'fade',
  transitionDuration: 400,
  interval: 4000,
  afterChange: () => {
    setSlideClasses(parseInt(slider.get('currentSlide').getAttribute('data-index')))
  }
})

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

if ($nav) {
  $nav.addEventListener('click', (e) => {
    if ( e.srcElement.classList.contains('project-gallery-nav-item') ) {
      e.preventDefault()
      slider.gotoSlide(parseInt(e.srcElement.getAttribute('data-loop-index')))
      e.stopPropagation()
    }
  })
  setSlideClasses(1)
}
slider.start()
