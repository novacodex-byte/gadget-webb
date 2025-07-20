document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    
    window.addEventListener('load', function() {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Sticky Navigation
    const navbar = document.querySelector('.navbar');
    const heroSection = document.querySelector('.hero');
    const heroHeight = heroSection.offsetHeight;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > heroHeight * 0.8) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Back to Top Button
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
    
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Initialize Swiper Sliders
    const brandsSlider = new Swiper('.brands-slider', {
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },
        slidesPerView: 1,
        spaceBetween: 20,
        breakpoints: {
            576: {
                slidesPerView: 2
            },
            768: {
                slidesPerView: 3
            },
            992: {
                slidesPerView: 4
            },
            1200: {
                slidesPerView: 5
            }
        }
    });

    const testimonialSlider = new Swiper('.testimonial-slider', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        slidesPerView: 1,
        spaceBetween: 30,
        breakpoints: {
            768: {
                slidesPerView: 2
            }
        }
    });

    // Countdown Timer
    function updateCountdown() {
        const countdownDate = new Date();
        countdownDate.setDate(countdownDate.getDate() + 7); // 7 days from now
        
        const now = new Date().getTime();
        const distance = countdownDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Product Card Hover Effect
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.product-image img').style.transform = 'scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.product-image img').style.transform = 'scale(1)';
        });
    });

    // Add to Cart Animation
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            productCard.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                productCard.style.transform = 'scale(1)';
            }, 300);
            
            // Here you would normally add to cart functionality
            const productName = productCard.querySelector('.product-title').textContent;
            alert(`${productName} added to cart!`);
        });
    });
});



// Update the smooth scrolling to account for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Calculate the position considering the fixed header
            const headerHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }
    });
});

// Make sure home link scrolls to top
document.querySelector('a[href="#home"]').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    // Close mobile menu if open
    if (navMenu.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Cart functionality
let cart = [];
let cartCount = 0;

// Function to update cart display
function updateCartDisplay() {
  const cartCountElement = document.querySelector('.cart-count');
  cartCountElement.textContent = cartCount;
  
  // Add animation when item is added
  if (cartCount > 0) {
    cartCountElement.classList.add('animate-bounce');
    setTimeout(() => {
      cartCountElement.classList.remove('animate-bounce');
    }, 1000);
  }
}

// Add to cart function
function addToCart(product) {
  // Check if product already exists in cart
  const existingItem = cart.find(item => item.id === product.id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({...product, quantity: 1});
  }
  
  cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  updateCartDisplay();
  
  // Show added notification
  showNotification(`${product.name} added to cart!`);
}

// Product click handler
function setupProductClickHandlers() {
  const productCards = document.querySelectorAll('.product-card');
  
  productCards.forEach(card => {
    card.addEventListener('click', function(e) {
      // Don't trigger if clicking on buttons inside card
      if (e.target.closest('.quick-view') || e.target.closest('.add-wishlist')) {
        return;
      }
      
      const product = {
        id: this.dataset.id,
        name: this.querySelector('.product-title').textContent,
        price: this.querySelector('.current-price').textContent,
        image: this.querySelector('.product-image img').src
      };
      
      addToCart(product);
      
      // Add visual feedback
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 300);
    });
  });
}

// Show notification function
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'cart-notification';
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', function() {
  setupProductClickHandlers();
  
  // Add data-id attributes to product cards (you can use PHP or other backend to generate these)
  const products = document.querySelectorAll('.product-card');
  products.forEach((product, index) => {
    product.dataset.id = `prod-${index + 1}`;
  });
});





// Save to localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Load from localStorage
function loadCart() {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    updateCartDisplay();
  }
}

// Call loadCart() when page loads







// Hot Deals Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Filter deals
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      const filter = this.dataset.filter;
      const dealCards = document.querySelectorAll('.deal-card');
      
      dealCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
  
  // Countdown timers
  function updateCountdowns() {
    const countdowns = document.querySelectorAll('.deal-countdown');
    const now = new Date();
    
    countdowns.forEach(countdown => {
      const endDate = new Date(countdown.dataset.end);
      const diff = endDate - now;
      
      if (diff <= 0) {
        countdown.textContent = 'Deal expired!';
        return;
      }
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      countdown.textContent = `Ends in: ${days}d ${hours}h ${minutes}m`;
    });
  }
  
  updateCountdowns();
  setInterval(updateCountdowns, 60000); // Update every minute
  
  // Make "Hot Deals" nav link scroll to section
  document.querySelector('a[href="#hot-deals"]').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('#hot-deals').scrollIntoView({
      behavior: 'smooth'
    });
  });
});



// Deal Alert Functionality
document.querySelectorAll('.btn-deal').forEach(button => {
  button.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    showDealAlert();
  });
});

function showDealAlert() {
  const alert = document.getElementById('deal-alert');
  
  // Show alert
  alert.classList.add('show');
  
  // Auto-hide after 3 seconds
  setTimeout(() => {
    alert.classList.remove('show');
  }, 3000);
  
  // Manual close
  alert.querySelector('.close-alert').addEventListener('click', function() {
    alert.classList.remove('show');
  });
}
function showDealAlert() {
  const alert = document.getElementById('deal-alert');
  
  // Reset any ongoing animations
  alert.classList.remove('hide');
  void alert.offsetWidth; // Trigger reflow
  
  // Show alert with animation
  alert.classList.add('show');
  
  // Auto-hide after 3 seconds
  setTimeout(() => {
    alert.classList.remove('show');
    alert.classList.add('hide');
  }, 3000);
  
  // Manual close
  alert.querySelector('.close-alert').addEventListener('click', function() {
    alert.classList.remove('show');
    alert.classList.add('hide');
  });
}



// // Add this to your showDealAlert() function
// function showDealAlert() {
//   // ... existing alert code ...
  
//   // Confetti celebration!
//   const defaults = {
//     spread: 60,
//     ticks: 100,
//     gravity: 0,
//     decay: 0.94,
//     startVelocity: 30,
//     colors: ['#ff6b6b', '#794afa', '#00ff00'],
//     origin: { x: 0.5, y: 0.8 }
//   };
  
//   confetti({
//     ...defaults,
//     particleCount: 40,
//     scalar: 1.2
//   });
  
//   confetti({
//     ...defaults,
//     particleCount: 20,
//     scalar: 0.75,
//     shapes: ['circle']
//   });
// }
// function addToCart(product) {
//   // ... existing code ...
  
//   // Create flying element
//   const flyer = document.createElement('div');
//   flyer.className = 'cart-flyer';
//   flyer.innerHTML = `<img src="${product.image}" alt="${product.name}">`;
  
//   // Position at clicked item
//   const rect = event.target.getBoundingClientRect();
//   flyer.style.left = `${rect.left}px`;
//   flyer.style.top = `${rect.top}px`;
//   document.body.appendChild(flyer);
  
//   // Animate to cart
//   setTimeout(() => {
//     const cartRect = document.querySelector('.nav-cta').getBoundingClientRect();
//     flyer.style.transform = `translate(${cartRect.left - rect.left}px, ${cartRect.top - rect.top}px) scale(0.2)`;
//     flyer.style.opacity = '0.5';
    
//     // Remove after animation
//     setTimeout(() => flyer.remove(), 1000);
//   }, 10);
// }
// const countdownSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
// countdownSound.volume = 0.3;
// // Play in your countdown function
// // Track viewed deals
// if (!localStorage.viewedDeals) {
//   localStorage.viewedDeals = JSON.stringify([]);
// }