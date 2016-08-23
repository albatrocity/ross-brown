const lory = require('lory.js').lory

document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.project-gallery')
  console.log('lory go!')
  window.slider = lory(slider)
})
