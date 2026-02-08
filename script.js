const noTexts = ['No', 'Are you sure?', 'Think again', 'Pretty please?', "Don't break my heart", 'Okay, last chance', 'You mean yes, right?']
let noIndex = 0
let yesScale = 1
const yesGrowStep = 0.4

const yesBtn = document.getElementById('yesBtn')
const noBtn = document.getElementById('noBtn')
const celebration = document.getElementById('celebration')
const heroImageBefore = document.getElementById('heroImageBefore')
const heroImageAfter = document.getElementById('heroImageAfter')
const question = document.getElementById('questionText')

noBtn.addEventListener('click', () => {
  noIndex = (noIndex + 1) % noTexts.length
  noBtn.textContent = noTexts[noIndex]
  const targetScale = getCoverScale()
  yesScale = Math.max(yesScale, Math.min(yesScale + yesGrowStep, targetScale))
  yesBtn.style.transform = `scale(${yesScale})`
})

yesBtn.addEventListener('click', () => {
  celebration.classList.add('active')
  if (heroImageAfter && heroImageAfter.src) {
    heroImageBefore.style.display = 'none'
    heroImageAfter.style.display = 'block'
  }
  question.textContent = 'Yay! You said yes!'
  yesBtn.hidden = true
  noBtn.hidden = true
  launchConfetti()
})

const scrollCreate = document.getElementById('scrollCreate')
const scrollGallery = document.getElementById('scrollGallery')
const createPanel = document.getElementById('createPanel')
const gallerySection = document.getElementById('gallerySection')

if (scrollCreate) {
  scrollCreate.addEventListener('click', () => createPanel.scrollIntoView({ behavior: 'smooth' }))
}
if (scrollGallery) {
  scrollGallery.addEventListener('click', () => gallerySection.scrollIntoView({ behavior: 'smooth' }))
}

const titleInput = document.getElementById('titleInput')
const celebrationInput = document.getElementById('celebrationInput')
const imageBeforeInput = document.getElementById('imageBeforeInput')
const imageAfterInput = document.getElementById('imageAfterInput')
const bgInput = document.getElementById('bgInput')
const cardInput = document.getElementById('cardInput')
const textInput = document.getElementById('textInput')
const shareOutput = document.getElementById('shareOutput')
const previewQuestion = document.getElementById('previewQuestion')
const previewCelebration = document.getElementById('previewCelebration')
const previewImageBefore = document.getElementById('previewImageBefore')
const previewImageAfter = document.getElementById('previewImageAfter')
const previewCard = document.getElementById('previewCard')
const previewPanel = document.getElementById('previewPanel')

function updatePreview() {
  const title = titleInput.value || 'Will you be my valentine?'
  const celebrationText = celebrationInput.value || 'Yay! You just made this day sparkly.'
  const rawBefore = imageBeforeInput.value.trim()
  const rawAfter = imageAfterInput.value.trim()
  const imageBeforeUrl = rawBefore ? fixDriveUrl(rawBefore) : ''
  const imageAfterUrl = rawAfter ? fixDriveUrl(rawAfter) : ''
  const bg = bgInput.value
  const card = cardInput.value
  const text = textInput.value

  previewQuestion.textContent = title
  previewCelebration.textContent = celebrationText
  previewCard.style.color = text
  previewCard.style.background = card
  previewPanel.style.background = bg
  previewPanel.style.color = text
  celebration.textContent = celebrationText

  if (imageBeforeUrl) {
    previewImageBefore.src = imageBeforeUrl
    previewImageBefore.style.display = 'block'
  } else {
    previewImageBefore.style.display = 'none'
  }

  if (imageAfterUrl) {
    previewImageAfter.src = imageAfterUrl
    previewImageAfter.style.display = 'block'
  } else {
    previewImageAfter.style.display = 'none'
  }
}

;[titleInput, celebrationInput, imageBeforeInput, imageAfterInput, bgInput, cardInput, textInput].forEach(input => {
  input.addEventListener('input', updatePreview)
})

// GOOGLE DRIVE LINK CONVERTER (from v2)
function fixDriveUrl(url) {
  if (!url) return url
  if (!url.includes('drive.google.com')) return url

  let fileId = ''
  // Pattern 1: /file/d/ID/view
  if (url.includes('/file/d/')) {
    fileId = url.split('/file/d/')[1].split('/')[0]
  }
  // Pattern 2: ?id=ID or &id=ID
  else if (url.includes('id=')) {
    fileId = url.split('id=')[1].split('&')[0]
  }

  return fileId ? `https://lh3.googleusercontent.com/u/0/d/${fileId}` : url
}

document.getElementById('generateBtn').addEventListener('click', () => {
  const imageBefore = imageBeforeInput.value ? fixDriveUrl(imageBeforeInput.value.trim()) : ''
  const imageAfter = imageAfterInput.value ? fixDriveUrl(imageAfterInput.value.trim()) : ''
  const params = new URLSearchParams({
    title: titleInput.value || 'Will you be my valentine?',
    celebrate: celebrationInput.value || '',
    imageBefore: imageBefore || 'https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif',
    imageAfter: imageAfter || 'https://media.giphy.com/media/xT0xezQGU5xCDJuCPe/giphy.gif',
    bg: bgInput.value,
    card: cardInput.value,
    text: textInput.value,
  })
  const url = `${location.origin}${location.pathname}?${params.toString()}`
  shareOutput.value = url
})

document.getElementById('copyBtn').addEventListener('click', async () => {
  if (!shareOutput.value) return
  try {
    await navigator.clipboard.writeText(shareOutput.value)
    alert('Link copied!')
  } catch (err) {
    shareOutput.select()
    document.execCommand('copy')
  }
})

document.getElementById('saveBtn').addEventListener('click', () => {
  const saved = JSON.parse(localStorage.getItem('valentine-saves') || '[]')
  saved.unshift({
    title: titleInput.value,
    celebrate: celebrationInput.value,
    imageBefore: imageBeforeInput.value,
    imageAfter: imageAfterInput.value,
    bg: bgInput.value,
    card: cardInput.value,
    text: textInput.value,
    time: new Date().toISOString(),
  })
  localStorage.setItem('valentine-saves', JSON.stringify(saved.slice(0, 12)))
  alert('Saved! You can reuse from the gallery section.')
  renderGallery()
})

function applyFromParams() {
  const params = new URLSearchParams(window.location.search)
  if ([...params.keys()].length === 0) return
  document.body.classList.add('share-mode')
  const homeBtn = document.getElementById('homeBtn')
  if (homeBtn) {
    homeBtn.href = `${location.origin}${location.pathname}`
  }
  const title = params.get('title')
  const celebrate = params.get('celebrate')
  const imageBefore = params.get('imageBefore')
  const imageAfter = params.get('imageAfter')
  const bg = params.get('bg')
  const card = params.get('card')
  const text = params.get('text')

  document.getElementById('questionText').textContent = title || 'Will you be my valentine?'
  celebration.textContent = celebrate || 'Yay! You just made this day sparkly.'

  if (bg) {
    document.documentElement.style.setProperty('--bg-1', bg)
    document.documentElement.style.setProperty('--bg-2', bg)
  }
  if (card) {
    document.documentElement.style.setProperty('--card', card)
  }
  if (text) {
    document.documentElement.style.setProperty('--ink', text)
  }

  if (imageBefore) {
    heroImageBefore.src = imageBefore
    heroImageBefore.style.display = 'block'
  } else {
    heroImageBefore.style.display = 'none'
  }

  if (imageAfter) {
    heroImageAfter.src = imageAfter
    heroImageAfter.style.display = 'none'
  } else {
    heroImageAfter.style.display = 'none'
  }

  if (!imageBefore && imageAfter) {
    heroImageAfter.style.display = 'block'
  }
}

function getCoverScale() {
  const yesRect = yesBtn.getBoundingClientRect()
  const noRect = noBtn.getBoundingClientRect()
  const yesRadius = Math.max(yesBtn.offsetWidth, yesBtn.offsetHeight) / 2
  const noRadius = Math.max(noBtn.offsetWidth, noBtn.offsetHeight) / 2
  const dx = noRect.left + noRect.width / 2 - (yesRect.left + yesRect.width / 2)
  const dy = noRect.top + noRect.height / 2 - (yesRect.top + yesRect.height / 2)
  const distance = Math.hypot(dx, dy)
  if (!yesRadius) return yesScale
  return Math.max(1, (distance + noRadius) / yesRadius)
}


function renderMediaGallery(list, targetId) {
  const container = document.getElementById(targetId)
  if (!container) return
  container.innerHTML = ''
  list.forEach(url => {
    const card = document.createElement('div')
    card.className = 'gallery-card'
    card.innerHTML = `
      <img src="${url}" alt="Gallery item" />
      <div class="gallery-copy-row">
        <input readonly value="${url}" />
        <button class="secondary-btn" data-use="before">Use Before Yes</button>
        <button class="secondary-btn" data-use="after">Use After Yes</button>
      </div>
    `
    const beforeBtn = card.querySelector('[data-use="before"]')
    const afterBtn = card.querySelector('[data-use="after"]')
    if (beforeBtn) {
      beforeBtn.addEventListener('click', () => {
        imageBeforeInput.value = url
        updatePreview()
        createPanel.scrollIntoView({ behavior: 'smooth' })
      })
    }
    if (afterBtn) {
      afterBtn.addEventListener('click', () => {
        imageAfterInput.value = url
        updatePreview()
        createPanel.scrollIntoView({ behavior: 'smooth' })
      })
    }
    container.appendChild(card)
  })
}

function renderTextGallery(list, targetId) {
  const container = document.getElementById(targetId)
  if (!container) return
  container.innerHTML = ''
  list.forEach(text => {
    const card = document.createElement('div')
    card.className = 'gallery-card'
    card.innerHTML = `
      <div class="gallery-text">${text}</div>
      <button class="secondary-btn" data-use="before">Use Before Yes</button>
      <button class="secondary-btn" data-use="after">Use After Yes</button>
    `
    const beforeBtn = card.querySelector('[data-use="before"]')
    const afterBtn = card.querySelector('[data-use="after"]')
    if (beforeBtn) {
      beforeBtn.addEventListener('click', () => {
        titleInput.value = text
        updatePreview()
        createPanel.scrollIntoView({ behavior: 'smooth' })
      })
    }
    if (afterBtn) {
      afterBtn.addEventListener('click', () => {
        celebrationInput.value = text
        updatePreview()
        createPanel.scrollIntoView({ behavior: 'smooth' })
      })
    }
    container.appendChild(card)
  })
}

function renderColorGallery(list, targetId) {
  const container = document.getElementById(targetId)
  if (!container) return
  container.innerHTML = ''
  list.forEach(combo => {
    const card = document.createElement('div')
    card.className = 'gallery-card color-card'
    card.innerHTML = `
      <div class="color-swatches">
        <div class="color-swatch" style="background:${combo.bg}"></div>
        <div class="color-swatch" style="background:${combo.card}"></div>
        <div class="color-swatch" style="background:${combo.text}"></div>
      </div>
      <div class="color-label">${combo.label}</div>
      <button class="secondary-btn">Use Colors</button>
    `
    card.querySelector('button').addEventListener('click', () => {
      bgInput.value = combo.bg
      cardInput.value = combo.card
      textInput.value = combo.text
      updatePreview()
      createPanel.scrollIntoView({ behavior: 'smooth' })
    })
    container.appendChild(card)
  })
}

function renderGallerySections() {
  renderMediaGallery(galleryImages, 'galleryImages')
  renderMediaGallery(galleryGifs, 'galleryGifs')
  renderTextGallery(galleryTexts, 'galleryTexts')
  renderColorGallery(colorCombos, 'galleryColors')
}

const galleryButtons = document.querySelectorAll('[data-gallery-target]')
const galleryBlocks = {
  galleryImages: document.getElementById('galleryImagesBlock'),
  galleryGifs: document.getElementById('galleryGifsBlock'),
  galleryTexts: document.getElementById('galleryTextsBlock'),
  galleryColors: document.getElementById('galleryColorsBlock'),
}

function setActiveGallery(targetId) {
  Object.entries(galleryBlocks).forEach(([key, block]) => {
    if (!block) return
    if (key === targetId) {
      block.classList.remove('is-hidden')
    } else {
      block.classList.add('is-hidden')
    }
  })
  galleryButtons.forEach(btn => {
    if (btn.dataset.galleryTarget === targetId) {
      btn.classList.add('is-active')
    } else {
      btn.classList.remove('is-active')
    }
  })
}

galleryButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    setActiveGallery(btn.dataset.galleryTarget)
  })
})

function launchConfetti() {
  const canvas = document.getElementById('confetti')
  const ctx = canvas.getContext('2d')
  const colors = ['#ff5d7c', '#ffd166', '#7bdff2', '#b9fbc0', '#ff9f1c']
  const pieces = Array.from({ length: 220 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * -window.innerHeight,
    size: 6 + Math.random() * 8,
    color: colors[Math.floor(Math.random() * colors.length)],
    speed: 1.8 + Math.random() * 3.5,
    sway: Math.random() * 2 - 1,
    rotation: Math.random() * Math.PI * 2,
    spin: (Math.random() * 0.3 + 0.1) * (Math.random() > 0.5 ? 1 : -1),
  }))

  function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas, { once: true })

  let frame = 0
  const maxFrames = 360
  const gravity = 0.06
  function animate() {
    frame += 1
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    pieces.forEach(p => {
      p.speed += gravity
      p.y += p.speed
      p.x += p.sway
      p.rotation += p.spin
      ctx.fillStyle = p.color
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rotation)
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6)
      ctx.restore()
      if (p.y > canvas.height + 40) {
        p.y = -20 - Math.random() * canvas.height * 0.3
        p.x = Math.random() * canvas.width
        p.speed = 1.8 + Math.random() * 3.5
      }
    })
    if (frame < maxFrames) {
      requestAnimationFrame(animate)
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
  }
  animate()
}

updatePreview()
applyFromParams()
renderGallerySections()
setActiveGallery('galleryGifs')
