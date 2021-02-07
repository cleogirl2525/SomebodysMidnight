/* global dancingHearts, sestina, end, checkTime, countDown */

// ...................................................................... setup

const email = 'cleogirl2525@gmail.com'
const subject = 'DEEP SUBJECT'
const countdown = document.querySelector('.countdown')
const blur = 3

const letter = document.querySelector('.letter')
const first = document.querySelector('.first')
let t = window.innerHeight / 2
const margin = window.innerHeight * 0.6
letter.style.top = `${t}px`

const answers = []
const questions = [
  'this is the first question?',
  'this is the second question?',
  'this is the third question?'
]

const submit = document.querySelector('.submit')
const modal = document.querySelector('.modal')
const heart1 = document.querySelector('[alt="question one"]')
const heart2 = document.querySelector('[alt="question two"]')
const heart3 = document.querySelector('[alt="question three"]')

// ...................................................................... draw

function draw () {
  setTimeout(draw, 1000 / 30)

  if (checkTime() === 'waiting') {
    letter.style.filter = `blur(${blur}px)`
    countdown.textContent = countDown()
  } else {
    if (typeof checkTime() === 'number') {
      letter.style.filter = `blur(${checkTime(blur)}px)`
    }

    dancingHearts()

    t -= 0.75 // speed
    letter.style.top = `${t}px`

    if (-t >= letter.offsetHeight * 0.2625 && heart1.parentElement) {
      heart1.style.display = 'block'
    }
    if (-t >= letter.offsetHeight * 0.6588 && heart2.parentElement) {
      heart2.style.display = 'block'
    }
    if (-t >= letter.offsetHeight * 0.1988 && heart3.parentElement && !first.parentElement) {
      heart3.style.display = 'block'
    }

    if (t <= -letter.offsetHeight + margin) { // when to loop
      if (first) first.remove()
      sestina(letter)
      t = window.innerHeight * 0.7 // reset position
    }
  }
}

// ...................................................................... events

document.querySelectorAll('.q').forEach(heart => {
  heart.addEventListener('click', (e) => {
    modal.setAttribute('placeholder', questions[answers.length])
    modal.style.display = 'block'
    submit.style.display = 'block'
    e.target.remove()
  })
})

submit.addEventListener('click', () => {
  const v = modal.value
  modal.style.display = 'none'
  submit.style.display = 'none'
  answers.push(v)
  modal.value = ''
  if (answers.length === 3) {
    const body = `Hello ${answers[0]}, and ${answers[1]} then ${answers[2]}!!!`
    end(email, subject, body)
  }
})

window.addEventListener('load', draw)
