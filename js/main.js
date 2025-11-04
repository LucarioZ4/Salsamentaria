// Base de datos de productos
const products = [
    {
        id: 1,
        name: "Chorizo Artesanal",
        price: 12000,
        category: "embutidos",
        description: "Chorizo tradicional elaborado con carne de cerdo seleccionada y especias naturales",
    image: "chorizo-ar.jpeg"
    },
    {
        id: 2,
        name: "Longaniza Premium",
        price: 15000,
        category: "embutidos",
        description: "Longaniza especial con receta tradicional colombiana, perfecta para asados",
    image: "longaniza-pre.jpeg"
    },
    {
        id: 3,
        name: "Carne de Res Premium",
        price: 18000,
        category: "carnes",
        description: "Corte de res de primera calidad, ideal para bistec o carne asada",
    image: "carne-res.jpeg"
    },
    {
        id: 4,
        name: "Lomo de Cerdo",
        price: 16000,
        category: "carnes",
        description: "Lomo de cerdo fresco y tierno, perfecto para hornear o asar",
    image: "lomo-cerdo.jpeg"
    },
    {
        id: 5,
        name: "Butifarra Costeña",
        price: 10000,
        category: "especiales",
        description: "Butifarra tradicional de la costa caribeña colombiana",
    image: "butifarra-costena.jpeg"
    },
    {
        id: 6,
        name: "Morcilla Casera",
        price: 9000,
        category: "especiales",
        description: "Morcilla artesanal con arroz y especias, receta de la casa",
    image: "morcilla.jpeg"
    },
    {
        id: 7,
        name: "Pollo Adobado",
        price: 14000,
        category: "adobados",
        description: "Pechuga de pollo marinada con hierbas y especias secretas",
    image: "pollo-adobado.jpeg"
    },
    {
        id: 8,
        name: "Costillas Adobadas",
        price: 20000,
        category: "adobados",
        description: "Costillas de cerdo marinadas listas para la parrilla",
    image: "costillas-cerdo.jpeg"
    },
    {
        id: 9,
        name: "Salchichas Artesanales",
        price: 8000,
        category: "embutidos",
        description: "Salchichas hechas en casa sin conservantes ni aditivos",
    image: "salchichas.jpeg"
    },
    {
        id: 10,
        name: "Tocino Ahumado",
        price: 13000,
        category: "especiales",
        description: "Tocino artesanal ahumado con madera de nogal",
    image: "tocino.jpeg"
    },
    {
        id: 11,
        name: "Pechuga de Pollo",
        price: 12000,
        category: "carnes",
        description: "Pechuga de pollo fresca y sin piel, ideal para dietas saludables",
    image: "pechuga.jpeg"
    },
    {
        id: 12,
        name: "Chuletas de Cerdo",
        price: 17000,
        category: "carnes",
        description: "Chuletas de cerdo tiernas y jugosas, corte premium",
    image: "chuletas-cerdo.jpeg"
    }
];

// Construye la ruta local a la imagen dentro de images/productos/
function imgPath(filename) {
    if (!filename) return filename;
    // Si ya es una URL completa o ruta absoluta, devolverla tal cual
    if (filename.startsWith('http://') || filename.startsWith('https://') || filename.startsWith('/')) return filename;
    const isInPages = location.pathname.includes('/pages/') || location.pathname.includes('\\pages\\');
    const prefix = isInPages ? '../' : '';
    return prefix + 'images/productos/' + filename;
}


// Carrito de compras
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Contador de visitas
let visitCount = parseInt(localStorage.getItem('visitCount')) || 0;
visitCount++;
localStorage.setItem('visitCount', visitCount);

// Actualizar contador de visitas en el DOM
function updateVisitCounter() {
    const counter = document.getElementById('visit-counter');
    if (counter) {
        counter.textContent = visitCount;
    }
}

// Actualizar contador del carrito
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// Agregar producto al carrito
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification('Producto agregado al carrito');
}

// Eliminar producto del carrito
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    loadCartItems();
}

// Actualizar cantidad en el carrito
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            loadCartItems();
        }
    }
}

// Vaciar carrito
function clearCart() {
    if (confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        loadCartItems();
        showNotification('Carrito vaciado');
    }
}

// Mostrar notificación
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'alert alert-success position-fixed top-0 start-50 translate-middle-x mt-3';
    notification.style.zIndex = '9999';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Cargar productos destacados en la página principal
function loadFeaturedProducts() {
    const container = document.getElementById('featured-products');
    if (!container) return;

    const featured = products.slice(0, 3);
    container.innerHTML = featured.map(product => `
        <div class="col-md-4 mb-4">
            <div class="card h-100 shadow-sm">
                    <img src="${imgPath(product.image)}" loading="lazy" class="card-img-top" alt="${product.name}" onerror="this.onerror=null;this.src='data:image/svg+xml;utf8,<svg xmlns=%27http://www.w3.org/2000/svg%27 width=%27800%27 height=%27200%27><rect fill=%27%23f8f9fa%27 width=%27100%25%27 height=%27100%25%27/><text x=%2750%25%27 y=%2750%25%27 dominant-baseline=%27middle%27 text-anchor=%27middle%27 fill=%27%2328a745%27 font-family=%27Segoe%20UI,Arial%27 font-size=%2720%27>Imagen%20no%20disponible</text></svg>'">
                <div class="card-body">
                    <h5 class="card-title text-success">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="h5 text-success mb-0">$${product.price.toLocaleString()}</span>
                        <button class="btn btn-success" onclick="addToCart(${product.id})">
                            Agregar al Carrito
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Cargar todos los productos
function loadProducts() {
    const container = document.getElementById('products-container');
    if (!container) return;

    displayProducts(products);
}

// Mostrar productos
function displayProducts(productsToShow) {
    const container = document.getElementById('products-container');
    if (!container) return;

    if (productsToShow.length === 0) {
        container.innerHTML = '<div class="col-12 text-center"><p class="lead">No se encontraron productos</p></div>';
        return;
    }

    container.innerHTML = productsToShow.map(product => `
        <div class="col-md-4 col-lg-3 mb-4">
            <div class="card h-100 shadow-sm">
                <img src="${imgPath(product.image)}" loading="lazy" class="card-img-top" alt="${product.name}" onerror="this.onerror=null;this.src='data:image/svg+xml;utf8,<svg xmlns=%27http://www.w3.org/2000/svg%27 width=%27800%27 height=%27200%27><rect fill=%27%23f8f9fa%27 width=%27100%25%27 height=%27100%25%27/><text x=%2750%25%27 y=%2750%25%27 dominant-baseline=%27middle%27 text-anchor=%27middle%27 fill=%27%2328a745%27 font-family=%27Segoe%20UI,Arial%27 font-size=%2720%27>Imagen%20no%20disponible</text></svg>'">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title text-success">${product.name}</h5>
                    <p class="card-text text-muted small">${product.description}</p>
                    <div class="mt-auto">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <span class="h5 text-success mb-0">$${product.price.toLocaleString()}</span>
                        </div>
                        <button class="btn btn-success w-100" onclick="addToCart(${product.id})">
                            Agregar al Carrito
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Filtrar productos
function filterProducts() {
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');

    if (!categoryFilter || !priceFilter) return;

    let filtered = products;

    // Filtrar por categoría
    const category = categoryFilter.value;
    if (category !== 'all') {
        filtered = filtered.filter(p => p.category === category);
    }

    // Filtrar por precio
    const priceRange = priceFilter.value;
    if (priceRange === 'low') {
        filtered = filtered.filter(p => p.price < 12000);
    } else if (priceRange === 'medium') {
        filtered = filtered.filter(p => p.price >= 12000 && p.price <= 16000);
    } else if (priceRange === 'high') {
        filtered = filtered.filter(p => p.price > 16000);
    }

    displayProducts(filtered);
}

// Cargar items del carrito
function loadCartItems() {
    const container = document.getElementById('cart-items');
    const emptyCart = document.getElementById('empty-cart');
    const checkoutBtn = document.getElementById('checkout-btn');

    if (!container) return;

    if (cart.length === 0) {
        if (emptyCart) emptyCart.style.display = 'block';
        container.innerHTML = '';
        if (checkoutBtn) checkoutBtn.disabled = true;
        updateCartSummary();
        return;
    }

    if (emptyCart) emptyCart.style.display = 'none';
    if (checkoutBtn) checkoutBtn.disabled = false;

    container.innerHTML = cart.map(item => `
        <div class="card mb-3">
            <div class="row g-0">
                <div class="col-md-3">
                    <img src="${imgPath(item.image)}" loading="lazy" class="img-fluid rounded-start" alt="${item.name}" onerror="this.onerror=null;this.src='data:image/svg+xml;utf8,<svg xmlns=%27http://www.w3.org/2000/svg%27 width=%27400%27 height=%27250%27><rect fill=%27%23f8f9fa%27 width=%27100%25%27 height=%27100%25%27/><text x=%2750%25%27 y=%2750%25%27 dominant-baseline=%27middle%27 text-anchor=%27middle%27 fill=%27%2328a745%27 font-family=%27Segoe%20UI,Arial%27 font-size=%2716%27>Imagen%20no%20disponible</text></svg>'">
                </div>
                <div class="col-md-9">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start">
                            <div>
                                <h5 class="card-title text-success">${item.name}</h5>
                                <p class="card-text text-muted">${item.description}</p>
                            </div>
                            <button class="btn btn-danger btn-sm" onclick="removeFromCart(${item.id})">
                                ✕
                            </button>
                        </div>
                        <div class="d-flex justify-content-between align-items-center mt-3">
                            <div class="btn-group">
                                <button class="btn btn-outline-secondary" onclick="updateQuantity(${item.id}, -1)">-</button>
                                <button class="btn btn-outline-secondary" disabled>${item.quantity}</button>
                                <button class="btn btn-outline-secondary" onclick="updateQuantity(${item.id}, 1)">+</button>
                            </div>
                            <span class="h5 text-success mb-0">$${(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    updateCartSummary();
}

// Actualizar resumen del carrito
function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = cart.length > 0 ? 5000 : 0;
    const taxes = subtotal * 0.19;
    const total = subtotal + shipping + taxes;

    const subtotalEl = document.getElementById('subtotal');
    const shippingEl = document.getElementById('shipping');
    const taxesEl = document.getElementById('taxes');
    const totalEl = document.getElementById('total');
    const modalTotalEl = document.getElementById('modal-total');

    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toLocaleString()}`;
    if (shippingEl) shippingEl.textContent = `$${shipping.toLocaleString()}`;
    if (taxesEl) taxesEl.textContent = `$${Math.round(taxes).toLocaleString()}`;
    if (totalEl) totalEl.textContent = `$${Math.round(total).toLocaleString()}`;
    if (modalTotalEl) modalTotalEl.textContent = `$${Math.round(total).toLocaleString()}`;
}

// Formatear número de tarjeta
function formatCardNumber(input) {
    let value = input.value.replace(/\s/g, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    input.value = formattedValue;
}

// Formatear fecha de vencimiento
function formatExpiry(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    input.value = value;
}

// Manejar cambio de método de pago
function handlePaymentMethodChange() {
    const cardForm = document.getElementById('card-form');
    const selectedMethod = document.querySelector('input[name="payment-method"]:checked');
    
    if (cardForm) {
        if (selectedMethod && selectedMethod.value === 'card') {
            cardForm.style.display = 'block';
            // Hacer campos requeridos
            document.getElementById('card-name').required = true;
            document.getElementById('card-number').required = true;
            document.getElementById('card-expiry').required = true;
            document.getElementById('card-cvv').required = true;
        } else {
            cardForm.style.display = 'none';
            // Hacer campos no requeridos
            document.getElementById('card-name').required = false;
            document.getElementById('card-number').required = false;
            document.getElementById('card-expiry').required = false;
            document.getElementById('card-cvv').required = false;
        }
    }
}

// Procesar pago
function processPayment(event) {
    event.preventDefault();
    
    if (cart.length === 0) return;

    const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
    const deliveryName = document.getElementById('delivery-name').value;
    const deliveryPhone = document.getElementById('delivery-phone').value;
    const deliveryAddress = document.getElementById('delivery-address').value;
    
    // Cerrar modal de pago
    const paymentModal = bootstrap.Modal.getInstance(document.getElementById('paymentModal'));
    paymentModal.hide();
    
    // Mostrar modal de confirmación
    setTimeout(() => {
        const checkoutModal = new bootstrap.Modal(document.getElementById('checkoutModal'));
        checkoutModal.show();
        
        // Vaciar carrito
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        
        // Recargar items del carrito cuando se cierre el modal
        document.getElementById('checkoutModal').addEventListener('hidden.bs.modal', () => {
            loadCartItems();
        }, { once: true });
    }, 300);
}

// Enviar formulario de contacto
function submitContactForm(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    showNotification(`¡Gracias ${name}! Tu mensaje ha sido enviado. Te responderemos pronto.`);
    
    event.target.reset();
}

// Inicializar página
document.addEventListener('DOMContentLoaded', () => {
    updateVisitCounter();
    updateCartCount();
    loadFeaturedProducts();
    loadProducts();
    loadCartItems();

    // Event listeners para filtros
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');
    
    if (categoryFilter) categoryFilter.addEventListener('change', filterProducts);
    if (priceFilter) priceFilter.addEventListener('change', filterProducts);

    // Event listener para vaciar carrito
    const clearCartBtn = document.getElementById('clear-cart-btn');
    if (clearCartBtn) clearCartBtn.addEventListener('click', clearCart);

    // Event listener para formulario de contacto
    const contactForm = document.getElementById('contact-form');
    if (contactForm) contactForm.addEventListener('submit', submitContactForm);

    // Event listeners para formulario de pago
    const paymentForm = document.getElementById('payment-form');
    if (paymentForm) {
        paymentForm.addEventListener('submit', processPayment);
        
        // Formatear número de tarjeta
        const cardNumber = document.getElementById('card-number');
        if (cardNumber) {
            cardNumber.addEventListener('input', (e) => formatCardNumber(e.target));
        }
        
        // Formatear fecha de vencimiento
        const cardExpiry = document.getElementById('card-expiry');
        if (cardExpiry) {
            cardExpiry.addEventListener('input', (e) => formatExpiry(e.target));
        }
        
        // Restringir CVV a solo números
        const cardCvv = document.getElementById('card-cvv');
        if (cardCvv) {
            cardCvv.addEventListener('input', (e) => {
                e.target.value = e.target.value.replace(/\D/g, '');
            });
        }
        
        // Manejar cambio de método de pago
        const paymentMethods = document.querySelectorAll('input[name="payment-method"]');
        paymentMethods.forEach(method => {
            method.addEventListener('change', handlePaymentMethodChange);
        });
    }

    // Actualizar total en modal cuando se abre
    const paymentModal = document.getElementById('paymentModal');
    if (paymentModal) {
        paymentModal.addEventListener('show.bs.modal', updateCartSummary);
    }
});