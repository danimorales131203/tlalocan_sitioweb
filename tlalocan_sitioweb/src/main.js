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
const cartItemsContainer = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.getElementById('cartCount');

let cart = JSON.parse(localStorage.getItem('tlalocanCart')) || [];

function saveCart() {
  localStorage.setItem('tlalocanCart', JSON.stringify(cart));
}

function renderCart() {
  cartItemsContainer.innerHTML = '';

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <p class="empty-cart">Aún no has agregado productos al carrito.</p>
    `;
  }

  cart.forEach((product) => {
    cartItemsContainer.innerHTML += `
      <div class="cart-item">
        <h3>${product.name}</h3>
        <span>$${product.price.toFixed(2)} USD</span>
        <button class="remove-cart-item" data-id="${product.id}">Quitar</button>
      </div>
    `;
  });

  const total = cart.reduce((sum, product) => sum + product.price, 0);

  cartTotal.textContent = `$${total.toFixed(2)} USD`;
  cartCount.textContent = `(${cart.length})`;

  updateBuyButtons();
}

function updateBuyButtons() {
  buyButtons.forEach((button) => {
    const isInCart = cart.some((product) => product.id === button.dataset.id);

    if (isInCart) {
      button.textContent = 'Quitar';
      button.classList.add('added');
    } else {
      button.textContent = 'Comprar';
      button.classList.remove('added');
    }
  });
}

buyButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const product = {
      id: button.dataset.id,
      name: button.dataset.name,
      price: Number(button.dataset.price),
    };

    const isInCart = cart.some((item) => item.id === product.id);

    if (isInCart) {
      cart = cart.filter((item) => item.id !== product.id);
    } else {
      cart.push(product);
    }

    saveCart();
    renderCart();
  });
});

cartItemsContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('remove-cart-item')) {
    const productId = event.target.dataset.id;

    cart = cart.filter((item) => item.id !== productId);

    saveCart();
    renderCart();
  }
});

renderCart();