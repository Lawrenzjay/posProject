let inventory = JSON.parse(localStorage.getItem('inventory')) || [];

function renderInventory() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    inventory.forEach(product => {
        const li = document.createElement('li');
        li.classList.add('product-item');
        li.innerHTML = `
            ${product.name} - $${product.price.toFixed(2)} (Stock: ${product.quantity})
            <button class="remove-from-inventory" data-id="${product.id}">Remove</button>
        `;
        productList.appendChild(li);
    });
}

function addNewProduct(event) {
    event.preventDefault();

    const name = document.getElementById('product-name').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const quantity = parseInt(document.getElementById('product-quantity').value);

    if (name && !isNaN(price) && !isNaN(quantity)) {
        const newProduct = {
            id: inventory.length + 1,
            name,
            price,
            quantity
        };

        inventory.push(newProduct);
        localStorage.setItem('inventory', JSON.stringify(inventory)); 
        renderInventory();

        document.getElementById('add-product-form').reset();
    } else {
        alert('Please enter valid product details.');
    }
}

function removeProductFromInventory(productId) {
    const productIndex = inventory.findIndex(product => product.id === productId);
    if (productIndex !== -1) {
        inventory.splice(productIndex, 1); 
        localStorage.setItem('inventory', JSON.stringify(inventory));  
        renderInventory();
    } else {
        alert('Product not found in inventory.');
    }
}

document.getElementById('product-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-from-inventory')) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        removeProductFromInventory(productId);
    }
});

document.getElementById('add-product-form').addEventListener('submit', addNewProduct);

// Initialize the Inventory Page
renderInventory();
