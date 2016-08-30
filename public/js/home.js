let $container = document.querySelector('#home-content')
const letters = $container.textContent.split('').map((l, i) => {
  // let v = Math.floor(Math.random() * 10 + i) + 1
  let span = document.createElement('span')
  let h = Math.floor(Math.random() * 10 + i) + 1
  span.textContent = l
  span.style.transform = `rotate(${h})`
  span.classList.add('stupid')
  return span
})
$container.textContent = ''
letters.forEach((l) => {
  let h = Math.random() * 20
  let v = Math.random() * 15
  l = $container.appendChild(l)
  l.style.transform = `rotate(${h}deg)`
  l.style['-webkit-transform'] = `translate(${h}px, ${v}px) rotate(${h}deg)`
  l.style.display = 'inline-block'
})

// $container.addEventListener('mousemove', (e) => {
//   [].slice.call(document.querySelectorAll('.stupid')).forEach((span) => {
//     const rectangle = span.getBoundingClientRect()
//     let trSplit = span.style.transform.split(`px, `)[1].split('px,')[0].split(')')
//     let x = Number(span.style.transform.split(`translate(`)[1].split('px,')[0]) + ((rectangle.left-e.clientX)/500)
//     let y = Number(trSplit[0].split(`)`)[0].split('px')[0]) + ((rectangle.top-e.clientY)/500)
//     x+=Math.floor(Math.random() * 10) - 4
//     y+=Math.floor(Math.random() * 10) - 4
//     let rotate = trSplit[1]
//     // console.log(rotate);
//     // console.log(x);
//     // console.log(y);
//     span.style.transform = `translate(${x}px, ${y}px) ${rotate})`
//     // console.log(span.style.transform)
//     // console.log(e.clientX);
//     // x +
//     // console.log(span.style.transform);
//   })
// })
