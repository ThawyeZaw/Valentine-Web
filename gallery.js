const galleryImages = [
  // High-quality cute cats & romantic vibes
  'https://media1.tenor.com/m/aOi3KTDW8aAAAAAC/cute-so-cute.gif',
  'https://media.tenor.com/zHk9ZfeUNyIAAAAi/cat-blush.gif',
  'https://i.pinimg.com/236x/cf/72/55/cf7255ae7344ce44e62f784fe160ca0d.jpg',
  'https://godwinks.com/cdn/shop/articles/Screen_Shot_2020-02-09_at_6.02.51_AM_1024x1024.png?v=1581247204',
  'https://media1.tenor.com/m/9EWwYOJnM_oAAAAC/cute-cats.gif',
  'https://static.vecteezy.com/system/resources/thumbnails/069/826/496/small/cute-gray-kitten-wearing-a-pink-bow-sits-inside-a-paper-bag-photo.jpg',
  'https://img.freepik.com/premium-photo/cute-dogs-couple-love-with-hearts-3d-render-illustration_691560-7135.jpg',
  'https://ichef.bbci.co.uk/images/ic/640x360/p0hjd8f0.jpg',
  'https://i.pinimg.com/736x/a3/98/97/a39897813f0ea964ef8cf69c6976322a.jpg']

const galleryGifs = [
  // Minions & Cats mix
  'https://media.tenor.com/mfWIcgf_ao8AAAAi/minions-minion.gif',
  'https://media.tenor.com/W_4cIjlMTZsAAAAi/cc.gif',
  'https://media.tenor.com/SFy5Za0DyMEAAAAi/erm-fingers.gif',
  'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHpwaGZicWxqbmR6Z3Z2Z3Znbnh4Y2R0Z3VxeWZvY3p3emU1d2ZtOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/chzz1FQgqhytWRWbp3/giphy.gif',
  'https://media1.tenor.com/m/_WZy7E7hoTcAAAAd/cat-smile.gif',
  'https://media1.tenor.com/m/YonJHRH2-94AAAAd/cat-tiktok.gif',
  'https://media1.tenor.com/m/X-jA_vmTHUYAAAAd/yapapa-yapapa-cat.gif',
  'https://media.tenor.com/2KrmhQzy6mIAAAAi/cute-bear-silvia-emoji.gif',
  'https://media1.tenor.com/m/4HJ2V6mgJVQAAAAC/cute-cats-dancing.gif',
  'https://media1.tenor.com/m/YFolBZSo8UIAAAAd/123.gif',
  'https://media.giphy.com/media/M90mJvfWfd5mbUuULX/giphy.gif',
  'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXN6bjF6bm56bm56bm56bm56bm56bm56bm56bm56bm56bm56JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/111ebonMs90YLu/giphy.gif',
]

const galleryTexts = [
  'You are one in a Minion!',
  'You’re the cat’s pajamas.',
  'I’m bananas for you!',
  'You’re absolutely purr-fect.',
  'Will you be my partner in crime?',
  'I love you more than a Minion loves "Bello!"',
  'Life without you would be a catastrophe.',
  'You’re the sprinkles on my cupcake.',
  'Every day with you is a new adventure.',
  "I'd chase you across a thousand yarn balls.",
  'You’re the reason my tail wags.',
  'Crazy for you, minion-style.',
  'You + Me = Fur-ever.',
  'You stole my heart, keep it warm.',
  "Let's cuddle like kittens all day.",
  'My love for you is louder than a Minion laugh.',
  'You’re my favorite hello and hardest goodbye.',
  'Together we’re the perfect pair.',
]


const colorCombos = [
  // --- THE MINION & CAT SPECIALS ---
  { bg: '#581c87', card: '#9333ea', text: '#ffffff', label: 'Evil Minion Purple' },
  { bg: '#fef3c7', card: '#fbbf24', text: '#451a03', label: 'Golden Ginger Cat' },
  { bg: '#171717', card: '#262626', text: '#facc15', label: 'Black Cat & Neon' },
  { bg: '#ecfeff', card: '#ffffff', text: '#0891b2', label: 'Fluffy Unicorn' }, // Agnes's favorite!

  // --- MODERN & TRENDY ---
  { bg: '#f0fdf4', card: '#ffffff', text: '#166534', label: 'Matcha Date' },
  { bg: '#fff1f2', card: '#ffe4e6', text: '#9f1239', label: 'Strawberry Cream' },
  { bg: '#faf5ff', card: '#ffffff', text: '#581c87', label: 'Soft Lavender' },
  { bg: '#0f172a', card: '#1e293b', text: '#38bdf8', label: 'Space Cadet' },

  // --- VIBRANT & FUN ---
  { bg: '#4ade80', card: '#ffffff', text: '#064e3b', label: 'Lucky Clover' },
  { bg: '#fb7185', card: '#ffffff', text: '#881337', label: 'Bubblegum Pop' },
  { bg: '#ffedd5', card: '#fed7aa', text: '#7c2d12', label: 'Peach Cobbler' },
  { bg: '#2dd4bf', card: '#134e4a', text: '#ccfbf1', label: 'Retro Teal' },

  // --- ELEGANT & DEEP ---
  { bg: '#450a0a', card: '#7f1d1d', text: '#fca5a5', label: 'Velvet Rose' },
  { bg: '#064e3b', card: '#065f46', text: '#d1fae5', label: 'Emerald Love' },
  { bg: '#1e1b4b', card: '#312e81', text: '#e0e7ff', label: 'Midnight Serenade' },
  { bg: '#44403c', card: '#57534e', text: '#fafaf9', label: 'Warm Espresso' }
]