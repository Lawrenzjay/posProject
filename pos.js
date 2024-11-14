// Load inventory from localStorage
let inventory = JSON.parse(localStorage.getItem('inventory')) || [];
let cart = [];

// Function to render the inventory list
function renderInventory() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    inventory.forEach(product => {
        const li = document.createElement('li');
        li.classList.add('product-item');
        li.innerHTML = `
            ${product.name} - $${product.price.toFixed(2)} (Stock: ${product.quantity})
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        `;
        productList.appendChild(li);
    });
}

// Function to render the cart
function renderCart() {
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.name} - $${item.price.toFixed(2)} x ${item.quantity}
            <button class="remove-from-cart" data-id="${item.id}">Remove</button>
        `;
        cartList.appendChild(li);
        total += item.price * item.quantity;
    });

    document.getElementById('total-amount').innerText = total.toFixed(2);
}

// Function to add an item to the cart
function addToCart(productId) {
    const product = inventory.find(p => p.id === productId);
    if (product && product.quantity > 0) {
        const cartItem = cart.find(item => item.id === productId);
        if (cartItem) {
            cartItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        product.quantity--;  // Decrease stock in inventory
        localStorage.setItem('inventory', JSON.stringify(inventory));  // Update inventory
        renderInventory();
        renderCart();
    } else {
        alert('Product out of stock!');
    }
}

// Function to remove an item from the cart
function removeFromCart(productId) {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity--;
        if (cartItem.quantity === 0) {
            cart = cart.filter(item => item.id !== productId);
        }
        const product = inventory.find(p => p.id === productId);
        product.quantity++;  // Increase stock in inventory
        localStorage.setItem('inventory', JSON.stringify(inventory));  // Update inventory
        renderInventory();
        renderCart();
    }
}

// Function to handle checkout
function checkout() {
    if (cart.length > 0) {
        alert('Checkout successful! Total: $' + document.getElementById('total-amount').innerText);
        cart = [];  // Clear cart after checkout
        renderCart();
    } else {
        alert('Your cart is empty!');
    }
}

// Event listener for Add to Cart buttons
document.getElementById('product-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        addToCart(productId);
    }
});

// Event listener for Remove from Cart buttons
document.getElementById('cart-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-from-cart')) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        removeFromCart(productId);
    }
});

// Event listener for checkout button
document.getElementById('checkout-btn').addEventListener('click', checkout);

// Initialize the POS Page
renderInventory();
renderCart();
