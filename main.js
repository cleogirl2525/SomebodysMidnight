/* global dancingHearts, sestina, end, checkTime, countDown */

// ...................................................................... setup

const email = 'memories@somebodysmidnight.space'
const subject = 'FORGETTING 2 REMEMBER / REMEMBERING 2 FORGET'
const countdown = document.querySelector('.countdown')
const blur = 4

const letter = document.querySelector('.letter')
const first = document.querySelector('.first')
let t = window.innerHeight // 2 - (TAKE THIS OUT BC IT IS A BANDAID AND NOT A FIX)
const margin = window.innerHeight * 0.6
letter.style.top = `${t}px`

const answers = []
const questions = [
  'In three words, describe how it felt to holding hands with your favorite lover.',
  'What is the name of the place you go to forget? Be specific.',
  'Name the place you look first when you lose something.'
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
    const body = `Hello, I am writing to tell you that I loved you once and that you still make me feel ${answers[0]}. Did you know that inside my stomach I could sail a ship? It docks in the ${answers[1]} and drifts until I find it in the ${answers[2]}. I know we're both busy and it's been so long but I hope we see us sooner than what's been our never.`
    end(email, subject, body)
  }
})

window.addEventListener('load', draw)
