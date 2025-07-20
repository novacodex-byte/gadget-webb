// ===== DOM ELEMENTS =====
const mobileMenuBtn = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');
const backToTopBtn = document.getElementById('backToTop');
const preloader = document.querySelector('.preloader');
const cartButton = document.getElementById('cart-button');
const cartCount = document.querySelector('.cart-count');
const dealAlert = document.getElementById('deal-alert');
const closeAlert = document.querySelector('.close-alert');
const filterButtons = document.querySelectorAll('.filter-btn');
const dealCards = document.querySelectorAll('.deal-card');

// ===== GLOBAL VARIABLES =====
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
let products = []; // Will be populated with actual products later

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initMobileMenu();
    initBackToTop();
    initPreloader();
    initCart();
    initDealFilters();
    initCountdownTimer();
    initTestimonialSlider();
    initBrandsSlider();
    updateCartCount();
    
    // Load products (simulated)
    setTimeout(loadProducts, 1500);
    
    // Initialize smooth scrolling for anchor links
    initSmoothScrolling();
});

// ===== MOBILE MENU =====
function initMobileMenu() {
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    
    // Close menu when clicking on links
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    });
}

// ===== BACK TO TOP BUTTON =====
function initBackToTop() {
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== PRELOADER =====
function initPreloader() {
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.style.opacity = '0';
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
    });
}

// ===== CART FUNCTIONALITY =====
function initCart() {
    // Load cart from localStorage
    updateCartCount();
    
    // Cart button click event
    cartButton.addEventListener('click', function(e) {
        e.preventDefault();
        showAlert('Cart functionality coming soon!');
    });
    
    // Add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productId = productCard.dataset.id || Math.random().toString(36).substr(2, 9);
            const productName = productCard.querySelector('.product-title').textContent;
            const productPrice = parseFloat(productCard.querySelector('.current-price').textContent.replace(/[^\d.]/g, ''));
            const productImage = productCard.querySelector('.product-image img').src;
            
            addToCart({
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            });
            
            // Visual feedback
            this.textContent = 'Added!';
            this.style.backgroundColor = '#10b981';
            setTimeout(() => {
                this.textContent = 'Add to Cart';
                this.style.backgroundColor = '';
            }, 1500);
        });
    });
    
    // Grab deal buttons
    document.querySelectorAll('.btn-deal').forEach(button => {
        button.addEventListener('click', function() {
            const dealCard = this.closest('.deal-card');
            const dealName = dealCard.querySelector('h3').textContent;
            showAlert(`"${dealName}" deal selected! Coming soon!`);
        });
    });
}

function addToCart(product) {
    // Check if product already in cart
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push(product);
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateCartCount();
}

function updateCartCount() {
    const count = cartItems.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = count;
    cartCount.style.display = count > 0 ? 'flex' : 'none';
}

// ===== DEAL FILTERS =====
function initDealFilters() {
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            
            // Filter deals
            dealCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ===== COUNTDOWN TIMER =====
function initCountdownTimer() {
    const countdownElements = document.querySelectorAll('.deal-countdown');
    
    countdownElements.forEach(element => {
        const endDate = element.dataset.end;
        updateCountdown(element, endDate);
        
        // Update every second
        setInterval(() => {
            updateCountdown(element, endDate);
        }, 1000);
    });
    
    // Promo banner countdown
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    // Set end date (3 days from now)
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 3);
    
    function updatePromoCountdown() {
        const now = new Date();
        const diff = endDate - now;
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        daysEl.textContent = days.toString().padStart(2, '0');
        hoursEl.textContent = hours.toString().padStart(2, '0');
        minutesEl.textContent = minutes.toString().padStart(2, '0');
        secondsEl.textContent = seconds.toString().padStart(2, '0');
    }
    
    updatePromoCountdown();
    setInterval(updatePromoCountdown, 1000);
}

function updateCountdown(element, endDate) {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end - now;
    
    if (diff <= 0) {
        element.textContent = 'Deal expired!';
        return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    element.textContent = `Ends in: ${days}d ${hours}h ${minutes}m`;
}

// ===== TESTIMONIAL SLIDER =====
function initTestimonialSlider() {
    const testimonialSlider = new Swiper('.testimonial-slider', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
            }
        }
    });
}

// ===== BRANDS SLIDER =====
function initBrandsSlider() {
    const brandsSlider = new Swiper('.brands-slider', {
        slidesPerView: 2,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            640: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 4,
            },
            1024: {
                slidesPerView: 5,
            }
        }
    });
}

// ===== PRODUCTS LOADING (SIMULATED) =====
function loadProducts() {
    // In a real app, you would fetch this from an API
    products = [
        {
            id: 'iphone15',
            name: 'iPhone 15 Pro Max',
            price: 950000,
            oldPrice: 1050000,
            image: 'https://images.unsplash.com/photo-1610792516307-ea5acd9c3b00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
            rating: 4.5,
            reviews: 428,
            badge: 'Best Seller'
        },
        {
            id: 'macbookm2',
            name: 'MacBook Pro M2',
            price: 1250000,
            oldPrice: 1350000,
            image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
            rating: 4,
            reviews: 196,
            badge: 'New Arrival'
        },
        // Add more products as needed
    ];
    
    // In a real app, you would render these products to the DOM
    console.log('Products loaded:', products);
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== ALERT NOTIFICATION =====
function showAlert(message) {
    const alert = document.getElementById('deal-alert');
    alert.querySelector('.alert-message').textContent = message;
    alert.classList.add('show');
    
    setTimeout(() => {
        alert.classList.remove('show');
    }, 5000);
}

closeAlert.addEventListener('click', function() {
    dealAlert.classList.remove('show');
});

// ===== QUICK VIEW MODAL (Would be implemented fully in a complete app) =====
document.querySelectorAll('.quick-view').forEach(button => {
    button.addEventListener('click', function() {
        showAlert('Quick view coming soon!');
    });
});

// ===== WISHLIST FUNCTIONALITY =====
document.querySelectorAll('.add-wishlist').forEach(button => {
    button.addEventListener('click', function() {
        const icon = this.querySelector('i');
        icon.classList.toggle('far');
        icon.classList.toggle('fas');
        
        if (icon.classList.contains('fas')) {
            showAlert('Added to wishlist!');
        }
    });
});