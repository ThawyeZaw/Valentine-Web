import { galleryImages, galleryGifs, galleryTexts } from '../data/galleryData';

function flatten(obj) {
  let arr = [];
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      arr = arr.concat(obj[key]);
    }
  }
  return arr;
}

const ALL_IMAGES = flatten(galleryImages);
const ALL_GIFS = flatten(galleryGifs);
const ALL_TEXTS = flatten(galleryTexts);

const keyMap = {
  occasion: 'o',
  title: 't',
  celebrate: 'c',
  imageBefore: 'ib',
  imageAfter: 'ia',
  bg: 'bg',
  card: 'ca',
  text: 'tx'
};

const reverseKeyMap = Object.entries(keyMap).reduce((acc, [k, v]) => {
  acc[v] = k;
  return acc;
}, {});

const encodeHex = (hex) => hex && hex.startsWith('#') ? hex.slice(1) : hex;
const decodeHex = (hex) => hex && !hex.startsWith('#') ? '#' + hex : hex;

export function encodeConfigObject(config) {
  const result = {};
  for (const [key, value] of Object.entries(config)) {
    const shortKey = keyMap[key] || key;
    let encodedValue = value;

    if (key === 'bg' || key === 'card' || key === 'text') {
      encodedValue = encodeHex(value);
    } else if (key === 'imageBefore' || key === 'imageAfter') {
      const idxGif = ALL_GIFS.indexOf(value);
      if (idxGif !== -1) {
        encodedValue = '_g' + idxGif;
      } else {
        const idxImg = ALL_IMAGES.indexOf(value);
        if (idxImg !== -1) {
          encodedValue = '_i' + idxImg;
        }
      }
    } else if (key === 'title' || key === 'celebrate') {
      const idxTxt = ALL_TEXTS.indexOf(value);
      if (idxTxt !== -1) {
        encodedValue = '_t' + idxTxt;
      }
    }
    
    result[shortKey] = encodedValue;
  }
  return result;
}

export function decodeConfigObject(params) {
  const result = {};
  for (const [key, value] of Object.entries(params)) {
    const originalKey = reverseKeyMap[key] || key;
    let decodedValue = value;

    if (originalKey === 'bg' || originalKey === 'card' || originalKey === 'text') {
      decodedValue = decodeHex(value);
    } else if (originalKey === 'imageBefore' || originalKey === 'imageAfter') {
      if (typeof value === 'string' && value.startsWith('_g')) {
        const idx = parseInt(value.slice(2), 10);
        if (!isNaN(idx) && ALL_GIFS[idx]) decodedValue = ALL_GIFS[idx];
      } else if (typeof value === 'string' && value.startsWith('_i')) {
        const idx = parseInt(value.slice(2), 10);
        if (!isNaN(idx) && ALL_IMAGES[idx]) decodedValue = ALL_IMAGES[idx];
      }
    } else if (originalKey === 'title' || originalKey === 'celebrate') {
      if (typeof value === 'string' && value.startsWith('_t')) {
        const idx = parseInt(value.slice(2), 10);
        if (!isNaN(idx) && ALL_TEXTS[idx]) decodedValue = ALL_TEXTS[idx];
      }
    }
    
    result[originalKey] = decodedValue;
  }
  return result;
}
