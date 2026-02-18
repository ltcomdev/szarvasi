/* ========================================
   SZARVASI MOZZARELLA - Main JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initCategoryNav();
    initCarousels();
    initSmoothScroll();
    initHeaderScroll();
});

/* === MOBILE MENU === */
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.main-nav');
    
    if (!toggle || !nav) return;
    
    toggle.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('mobile-open');
        document.body.classList.toggle('menu-open');
    });
    
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            nav.classList.remove('mobile-open');
            document.body.classList.remove('menu-open');
        });
    });
}

/* === CATEGORY NAVIGATION === */
function initCategoryNav() {
    const categories = document.querySelectorAll('.category-item');
    
    categories.forEach(cat => {
        cat.addEventListener('click', function(e) {
            e.preventDefault();
            
            categories.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.dataset.category;
            console.log('Category selected:', category);
        });
    });
}

/* === CAROUSELS === */
function initCarousels() {
    initProductsCarousel();
    initRecipesCarousel();
}

function initProductsCarousel() {
    const wrapper = document.querySelector('.products-carousel-wrapper');
    if (!wrapper) return;
    
    const track = wrapper.querySelector('.products-track');
    const prevBtn = wrapper.querySelector('.carousel-prev');
    const nextBtn = wrapper.querySelector('.carousel-next');
    const dotsContainer = document.querySelector('.products-dots');
    
    if (!track || !prevBtn || !nextBtn) return;
    
    let currentSlide = 0;
    const cards = track.querySelectorAll('.product-card');
    const cardsPerSlide = getCardsPerSlide();
    const totalSlides = Math.ceil(cards.length / cardsPerSlide);
    
    function getCardsPerSlide() {
        if (window.innerWidth <= 600) return 2;
        if (window.innerWidth <= 900) return 2;
        if (window.innerWidth <= 1100) return 3;
        return 4;
    }
    
    function updateDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.className = 'dot' + (i === currentSlide ? ' active' : '');
            dot.setAttribute('aria-label', `${i + 1}. oldal`);
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }
    
    function goToSlide(index) {
        currentSlide = index;
        updateDots();
    }
    
    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateDots();
    });
    
    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateDots();
    });
    
    updateDots();
}

function initRecipesCarousel() {
    const wrapper = document.querySelector('.recipes-carousel-wrapper');
    if (!wrapper) return;
    
    const track = wrapper.querySelector('.recipes-track');
    const prevBtn = wrapper.querySelector('.carousel-prev');
    const nextBtn = wrapper.querySelector('.carousel-next');
    const dotsContainer = document.querySelector('.recipes-dots');
    
    if (!track || !prevBtn || !nextBtn) return;
    
    let currentSlide = 0;
    const cards = track.querySelectorAll('.recipe-card');
    const cardsPerSlide = getCardsPerSlide();
    const totalSlides = Math.ceil(cards.length / cardsPerSlide);
    
    function getCardsPerSlide() {
        if (window.innerWidth <= 600) return 1;
        if (window.innerWidth <= 900) return 2;
        return 3;
    }
    
    function updateDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.className = 'dot' + (i === currentSlide ? ' active' : '');
            dot.setAttribute('aria-label', `${i + 1}. oldal`);
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }
    
    function goToSlide(index) {
        currentSlide = index;
        updateDots();
    }
    
    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateDots();
    });
    
    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateDots();
    });
    
    updateDots();
}

/* === SMOOTH SCROLL === */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* === HEADER SCROLL EFFECT === */
function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

/* === LAZY LOADING IMAGES === */
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

/* === UTILITY FUNCTIONS === */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

window.addEventListener('resize', debounce(() => {
    initCarousels();
}, 250));
