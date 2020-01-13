const displayQuote = document.getElementById('quoteDisplay');
const inputQuote = document.getElementById('inputQuote');
const authorQuote = document.getElementById('auth');

inputQuote.addEventListener('input', matched);

function getQuote() {
  return fetch('https://api.quotable.io/random')
    .then(res => res.json())
    .then(data => data);
}

function matched() {
  const inputValue = inputQuote.value.split('');
  const quoteSpan = document.querySelectorAll('span');
  let done = true;
  quoteSpan.forEach((spanKarakter, index) => {
    const valueInput = inputValue[index];
    if (valueInput == null) {
      spanKarakter.classList.remove('benar');
      spanKarakter.classList.remove('salah');
      done = false;
    } else if (valueInput === spanKarakter.innerHTML) {
      spanKarakter.classList.add('benar');
      spanKarakter.classList.remove('salah');
    } else {
      spanKarakter.classList.remove('benar');
      spanKarakter.classList.add('salah');
      done = false;
    }
  });
  if (done) {
    tampilkan();
  }
}

async function tampilkan() {
  const quoteNya = await getQuote();
  displayQuote.innerHTML = '';
  quoteNya.content.split('').forEach(karakter => {
    const quoteSpan = document.createElement('span');
    quoteSpan.innerHTML = karakter;
    displayQuote.appendChild(quoteSpan);
  });
  authorQuote.innerHTML = quoteNya.author;
  inputQuote.value = null;
}

window.addEventListener('DOMContentLoaded', tampilkan);
