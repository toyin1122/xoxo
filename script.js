// =======================
// 💖 XOXOChic App JS (Local Address Fix)
// =======================

// Load cart and address from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let savedAddress = JSON.parse(localStorage.getItem('shippingAddress')) || {};

// =======================
// 🛍️ UPDATE CART DISPLAY
// =======================
function updateCartDisplay() {
  const cartItemsDiv = document.getElementById('cart-items');
  const cartTotalSpan = document.getElementById('cart-total');
  const cartCountSpan = document.getElementById('cart-count');

  let total = 0;

  // Update cart badge count
  if (cartCountSpan) cartCountSpan.textContent = cart.length;

  // Display cart items
  if (cartItemsDiv) {
    cartItemsDiv.innerHTML = '';

    if (cart.length === 0) {
      cartItemsDiv.innerHTML = '<p>Your cart is empty 💔</p>';
    } else {
      cart.forEach((item, index) => {
        const quantity = item.quantity || 1;
        const price = parseInt(item.price, 10);
        const subtotal = price * quantity;
        total += subtotal;

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
          <span>${item.name} x ${quantity} - ₦${subtotal.toLocaleString()}</span>
          <button onclick="removeFromCart(${index})">Remove 💔</button>
        `;
        cartItemsDiv.appendChild(cartItem);
      });
    }

    if (cartTotalSpan) cartTotalSpan.textContent = total.toLocaleString();
  }

  // Save updated cart
  localStorage.setItem('cart', JSON.stringify(cart));

  // Show saved address in form if exists
  if (savedAddress) {
    document.getElementById('user-name').value = savedAddress.name || '';
    document.getElementById('user-email').value = savedAddress.email || '';
    document.getElementById('user-address').value = savedAddress.address || '';
  }
}

// =======================
// ➕ ADD TO CART
// =======================
function addToCart(name, price) {
  if (!name || !price) return;

  const intPrice = parseInt(price, 10);
  if (isNaN(intPrice)) return;

  const existingItemIndex = cart.findIndex(i => i.name === name);
  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity = (cart[existingItemIndex].quantity || 1) + 1;
  } else {
    cart.push({ name, price: intPrice, quantity: 1 });
  }

  updateCartDisplay();
  alert(`${name} added to cart 💖`);
}

// =======================
// ❌ REMOVE FROM CART
// =======================
function removeFromCart(index) {
  if (index >= 0 && index < cart.length) {
    cart.splice(index, 1);
    updateCartDisplay();
  }
}

// =======================
// 💾 SAVE ADDRESS LOCALLY
// =======================
function saveAddressLocally() {
  const name = document.getElementById('user-name')?.value;
  const email = document.getElementById('user-email')?.value;
  const address = document.getElementById('user-address')?.value;

  if (!name || !email || !address) return;

  savedAddress = { name, email, address };
  localStorage.setItem('shippingAddress', JSON.stringify(savedAddress));
}

// =======================
// 💳 SIMULATED PAYMENT (No Paystack)
// =======================
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty 💔");
    return;
  }

  saveAddressLocally();

  const { name, email, address } = savedAddress;
  if (!name || !email || !address) {
    alert("Please fill in your name, email, and delivery address 💕");
    return;
  }

  alert(`Thank you, ${name}! Your order will be shipped to:\n${address}`);

  // Clear cart but keep address
  cart = [];
  updateCartDisplay();
}

// =======================
// 📩 CONTACT FORM
// =======================
function handleContactForm() {
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      alert('Message sent 💖! We’ll reply soon.');
      form.reset();
    });
  }
}

// =======================
// 🚀 INIT APP
// =======================
document.addEventListener('DOMContentLoaded', () => {
  // Handle add-to-cart buttons
  document.addEventListener('click', e => {
    if (e.target.classList.contains('add-to-cart')) {
      const name = e.target.dataset.name;
      const price = e.target.dataset.price;
      addToCart(name, price);
    }
  });

  // Checkout button
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) checkoutBtn.addEventListener('click', checkout);

  // Initialize display and contact form
  updateCartDisplay();
  handleContactForm();

  console.log("XOXOChic App Loaded 💖");
});