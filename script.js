// ========================================
// SZARVASI MOZZARELLA - CAROUSEL SCRIPTS
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // PRODUCTS CAROUSEL
    // ========================================
    const productSlides = document.querySelectorAll('.products-slide');
    const productDots = document.querySelectorAll('.products-dots .dot');
    const productPrev = document.querySelector('.products-prev');
    const productNext = document.querySelector('.products-next');
    let currentProductSlide = 0;

    function showProductSlide(index) {
        if (index >= productSlides.length) index = 0;
        if (index < 0) index = productSlides.length - 1;
        currentProductSlide = index;
        
        productSlides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) slide.classList.add('active');
        });
        productDots.forEach((dot, i) => {
            dot.classList.remove('active');
            if (i === index) dot.classList.add('active');
        });
    }

    productDots.forEach((dot, index) => {
        dot.addEventListener('click', () => showProductSlide(index));
    });
    
    if (productPrev) productPrev.addEventListener('click', () => showProductSlide(currentProductSlide - 1));
    if (productNext) productNext.addEventListener('click', () => showProductSlide(currentProductSlide + 1));

    // ========================================
    // RECIPES CAROUSEL
    // ========================================
    const recipeSlides = document.querySelectorAll('.recipes-slide');
    const recipeDots = document.querySelectorAll('.recipes-dots .dot');
    const recipePrev = document.querySelector('.recipes-prev');
    const recipeNext = document.querySelector('.recipes-next');
    let currentRecipeSlide = 0;

    function showRecipeSlide(index) {
        if (index >= recipeSlides.length) index = 0;
        if (index < 0) index = recipeSlides.length - 1;
        currentRecipeSlide = index;
        
        recipeSlides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) slide.classList.add('active');
        });
        recipeDots.forEach((dot, i) => {
            dot.classList.remove('active');
            if (i === index) dot.classList.add('active');
        });
    }

    recipeDots.forEach((dot, index) => {
        dot.addEventListener('click', () => showRecipeSlide(index));
    });
    
    if (recipePrev) recipePrev.addEventListener('click', () => showRecipeSlide(currentRecipeSlide - 1));
    if (recipeNext) recipeNext.addEventListener('click', () => showRecipeSlide(currentRecipeSlide + 1));

    // ========================================
    // CATEGORY MENU
    // ========================================
    const categoryItems = document.querySelectorAll('.category-item');

    categoryItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            categoryItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });
    
    console.log('Carousels initialized');
    console.log('Product slides:', productSlides.length);
    console.log('Recipe slides:', recipeSlides.length);
});
