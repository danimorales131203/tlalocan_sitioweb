import './style.css';

import './style.css';

const openTrailer = document.getElementById('openTrailer');
const closeTrailer = document.getElementById('closeTrailer');
const videoPopup = document.getElementById('videoPopup');
const trailerVideo = document.getElementById('trailerVideo');

openTrailer.addEventListener('click', () => {
  videoPopup.classList.add('active');
  trailerVideo.play();
});

closeTrailer.addEventListener('click', () => {
  videoPopup.classList.remove('active');
  trailerVideo.pause();
  trailerVideo.currentTime = 0;
});

videoPopup.addEventListener('click', (event) => {
  if (event.target === videoPopup) {
    videoPopup.classList.remove('active');
    trailerVideo.pause();
    trailerVideo.currentTime = 0;
  }
});

const buyButtons = document.querySelectorAll('.buy-button');

buyButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const product = {
      id: button.dataset.id,
      name: button.dataset.name,
      price: Number(button.dataset.price),
      quantity: 1,
    };

    const currentCart = JSON.parse(localStorage.getItem('tlalocanCart')) || [];

    const existingProduct = currentCart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      currentCart.push(product);
    }

    localStorage.setItem('tlalocanCart', JSON.stringify(currentCart));

    button.textContent = 'Agregado';
    button.classList.add('added');

    setTimeout(() => {
      button.textContent = 'Comprar';
      button.classList.remove('added');
    }, 1200);

    console.log('Carrito actual:', currentCart);
  });
});