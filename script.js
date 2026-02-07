
const noTexts = ['No', 'Are you sure?', 'Think again', 'Pretty please?', "Don't break my heart", 'Okay, last chance', 'You mean yes, right?']
let noIndex = 0
let yesScale = 1
const yesGrowStep = 0.5

const yesBtn = document.getElementById('yesBtn')
const noBtn = document.getElementById('noBtn')
const celebration = document.getElementById('celebration')
const heroImage = document.getElementById('heroImage')

noBtn.addEventListener('click', () => {
  noIndex = (noIndex + 1) % noTexts.length
  noBtn.textContent = noTexts[noIndex]
  const targetScale = getCoverScale()
  yesScale = Math.max(yesScale, Math.min(yesScale + yesGrowStep, targetScale))
  yesBtn.style.transform = `scale(${yesScale})`
})

yesBtn.addEventListener('click', () => {
  celebration.classList.add('active')
  yesBtn.hidden = true
  noBtn.hidden = true
  launchConfetti()
})

const scrollCreate = document.getElementById('scrollCreate')
const scrollGallery = document.getElementById('scrollGallery')
const createPanel = document.getElementById('createPanel')
const galleryPanel = document.getElementById('galleryPanel')

scrollCreate.addEventListener('click', () => createPanel.scrollIntoView({ behavior: 'smooth' }))
scrollGallery.addEventListener('click', () => galleryPanel.scrollIntoView({ behavior: 'smooth' }))

const titleInput = document.getElementById('titleInput')
const subtitleInput = document.getElementById('subtitleInput')
const imageInput = document.getElementById('imageInput')
const accentInput = document.getElementById('accentInput')
const bgInput = document.getElementById('bgInput')
const shareOutput = document.getElementById('shareOutput')
const previewQuestion = document.getElementById('previewQuestion')
const previewSubtitle = document.getElementById('previewSubtitle')
const previewImage = document.getElementById('previewImage')
const previewCard = document.getElementById('previewCard')

function updatePreview() {
  const title = titleInput.value || 'Will you be my valentine?'
  const subtitle = subtitleInput.value || 'Click yes and let the confetti rain.'
  const imageUrl = imageInput.value.trim()
  const accent = accentInput.value
  const bg = bgInput.value

  previewQuestion.textContent = title
  previewSubtitle.textContent = subtitle
  previewCard.style.borderColor = accent
  previewCard.style.background = `linear-gradient(140deg, #ffffff, ${bg})`

  if (imageUrl) {
    previewImage.src = imageUrl
    previewImage.style.display = 'block'
  } else {
    previewImage.style.display = 'none'
  }
}

;[titleInput, subtitleInput, imageInput, accentInput, bgInput].forEach(input => {
  input.addEventListener('input', updatePreview)
})

document.getElementById('generateBtn').addEventListener('click', () => {
  const params = new URLSearchParams({
    title: titleInput.value || 'Will you be my valentine?',
    subtitle: subtitleInput.value || 'Click yes and let the confetti rain.',
    image: imageInput.value || '',
    accent: accentInput.value,
    bg: bgInput.value,
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
    subtitle: subtitleInput.value,
    image: imageInput.value,
    accent: accentInput.value,
    bg: bgInput.value,
    time: new Date().toISOString(),
  })
  localStorage.setItem('valentine-saves', JSON.stringify(saved.slice(0, 12)))
  alert('Saved! You can reuse from the gallery section.')
  renderGallery()
})

function applyFromParams() {
  const params = new URLSearchParams(window.location.search)
  if (!params.has('title')) return
  document.body.classList.add('share-mode')
  const title = params.get('title')
  const subtitle = params.get('subtitle')
  const image = params.get('image')
  const accent = params.get('accent')
  const bg = params.get('bg')

  document.getElementById('questionText').textContent = title || 'Will you be my valentine?'
  document.getElementById('subtitleText').textContent = subtitle || 'Click yes and let the confetti rain.'

  if (accent) {
    document.documentElement.style.setProperty('--accent', accent)
  }
  if (bg) {
    document.documentElement.style.setProperty('--bg-1', bg)
  }
  if (image) {
    heroImage.src = image
    heroImage.style.display = 'block'
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

const galleryItems = [
  {
    title: 'Be my co-pilot forever?',
    subtitle: 'Say yes for infinite snacks.',
    image: 'https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif',
    accent: '#ff6b6b',
    bg: '#fff0f3',
  },
  {
    title: 'Ready for a cozy yes?',
    subtitle: 'Blanket fort optional.',
    image: 'https://media.giphy.com/media/5GoVLqeAOo6PK/giphy.gif',
    accent: '#f78fb3',
    bg: '#fff7e6',
  },
  {
    title: "Let's be valentines",
    subtitle: 'Click yes and sparkle on.',
    image: 'https://media.giphy.com/media/xT0xezQGU5xCDJuCPe/giphy.gif',
    accent: '#ff9ff3',
    bg: '#fef6ff',
  },
]

function renderGallery() {
  const grid = document.getElementById('galleryGrid')
  grid.innerHTML = ''

  const saved = JSON.parse(localStorage.getItem('valentine-saves') || '[]')
  const combined = [...saved, ...galleryItems]

  combined.forEach(item => {
    const card = document.createElement('div')
    card.className = 'gallery-item'
    card.innerHTML = `
          <strong>${item.title || 'Custom valentine'}</strong>
          <div>${item.subtitle || ''}</div>
          <button class="secondary-btn" style="margin-top: 12px;">Use</button>
        `
    card.querySelector('button').addEventListener('click', () => {
      titleInput.value = item.title || ''
      subtitleInput.value = item.subtitle || ''
      imageInput.value = item.image || ''
      accentInput.value = item.accent || '#ff5d7c'
      bgInput.value = item.bg || '#fff1f5'
      updatePreview()
      createPanel.scrollIntoView({ behavior: 'smooth' })
    })
    grid.appendChild(card)
  })
}

function launchConfetti() {
  const canvas = document.getElementById('confetti')
  const ctx = canvas.getContext('2d')
  const colors = ['#ff5d7c', '#ffd166', '#7bdff2', '#b9fbc0', '#ff9f1c']
  const pieces = Array.from({ length: 120 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * -window.innerHeight,
    size: 6 + Math.random() * 6,
    color: colors[Math.floor(Math.random() * colors.length)],
    speed: 2 + Math.random() * 4,
    sway: Math.random() * 2 - 1,
  }))

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  let frame = 0
  function animate() {
    frame += 1
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    pieces.forEach(p => {
      p.y += p.speed
      p.x += p.sway
      ctx.fillStyle = p.color
      ctx.fillRect(p.x, p.y, p.size, p.size * 0.6)
    })
    if (frame < 160) {
      requestAnimationFrame(animate)
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
  }
  animate()
}

updatePreview()
applyFromParams()
renderGallery()
