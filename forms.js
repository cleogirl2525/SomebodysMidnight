/* global Maths */
let h = 0

function dancingHearts () {
  const heart1 = document.querySelector('[alt="question one"]')
  const heart2 = document.querySelector('[alt="question two"]')
  const heart3 = document.querySelector('[alt="question three"]')
  const w3 = window.innerWidth / 3
  const w2 = window.innerWidth / 2
  const h2 = window.innerHeight / 2

  h += 0.005 // heart dancing speed

  if (heart1) {
    heart1.style.top = Math.cos(h) * h2 + h2 + 'px'
    heart1.style.left = Math.sin(h * 0.6) * w3 + w2 + 'px'
  }

  if (heart2) {
    heart2.style.top = Math.sin(h) * w3 + w2 + 'px'
    heart2.style.left = Math.cos(h * 0.6) * w3 + w2 + 'px'
  }

  if (heart3) {
    heart3.style.left = Math.sin(h) * w2 + w2 + 'px'
  }
}

function sestina (letter) {
  [...letter.children].forEach(div => {
    // split paragraphs into sentances
    const sents = div.textContent.split('. ')
    const newSents = []
    sents.forEach(sent => {
      // take center 3rd of each setance && randomize
      let words = sent.split(' ')
      if (words.length > 3) {
        const third = Math.ceil(words.length / 3)
        const begin = words.slice(0, third)
        let middle = words.slice(third, third * 2)
        const end = words.slice(third * 2)
        middle = Maths.shuffle(middle)
        words = [...begin, ...middle, ...end]
      }
      newSents.push(words.join(' '))
    })
    if (newSents[newSents.length - 1] === '') newSents.pop()
    // take second half of sentances && interweave in reverse (from the start)
    const half = Math.floor(newSents.length / 2)
    const newSentsA = newSents.slice(0, half)
    const newSentsB = newSents.slice(half, newSents.length).reverse()
    const tinad = []
    const length = newSentsA.length > newSentsB.length ? newSentsA.length : newSentsB.length
    for (let i = 0; i < length; i++) {
      if (newSentsB[i]) tinad.push(newSentsB[i])
      if (newSentsA[i]) tinad.push(newSentsA[i])
    }
    div.textContent = tinad.join('. ') + '.'
    div.textContent = div.textContent.replace('?.', '?')
    // TODO: ask stackoverflow how to regex ".."
    // div.textContent = div.textContent.replace(/\../g, '.')
  })
}

function countDown () {
  let h = String(23 - new Date().getHours())
  let m = String(60 - new Date().getMinutes())
  let s = String(60 - new Date().getSeconds())
  if (h.length === 1) h = '0' + h
  if (m.length === 1) m = '0' + m
  if (s.length === 1) s = '0' + s
  return `${h}:${m}:${s}`
}

function checkTime (blur) {
  const time = new Date()
  const hour = time.getHours()
  const mins = time.getMinutes()
  const wintime = 10 // window of time (ex: 10mins after 12)
  if (hour === 0 && mins < wintime) {
    return 'midnight'
  } else if (hour === 0 && mins >= wintime) {
    const blur = Maths.map(mins, wintime, 60, 0, blur)
    return blur
  } else {
    return 'waiting'
  }
}

function end (email, subject, body) {
  document.querySelector('.fb-bottom').style.display = 'none'
  document.querySelector('.fb-top').style.display = 'none'
  document.querySelector('.letter').style.display = 'none'

  const data = `mailto:${email}?subject=${subject}&body=${body}`
  const a = document.createElement('a')
  a.setAttribute('href', data)
  a.click()
  a.remove()
}

window.sestina = sestina
window.dancingHearts = dancingHearts
window.end = end
window.checkTime = checkTime
window.countDown = countDown
