/* ================================================================
   SZARVASI MOZZARELLA — main.js
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Mobile nav toggle ──────────────────────────────────────── */
  const menuToggle = document.querySelector('.menu-toggle');
  const siteNav    = document.querySelector('.site-nav');

  if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !expanded);
      siteNav.classList.toggle('open');
    });

    // Close nav when a link is clicked
    siteNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        siteNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ── Mobile dropdown toggle ─────────────────────────────────── */
  document.querySelectorAll('.has-dropdown > a').forEach(trigger => {
    trigger.addEventListener('click', e => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        trigger.parentElement.classList.toggle('open');
      }
    });
  });

  /* ── Generic carousel factory ───────────────────────────────── */
  function initCarousel({ trackWrap, prev, next, dotsContainer, visibleCount }) {
    if (!trackWrap) return;
    const track  = trackWrap.querySelector('[data-carousel-track]');
    if (!track) return;
    const items  = Array.from(track.children);
    let current  = 0;

    function getVisible() {
      if (window.innerWidth <= 520)  return 1;
      if (window.innerWidth <= 768)  return 2;
      if (window.innerWidth <= 1024) return 2;
      return visibleCount || 3;
    }

    function maxIndex() { return Math.max(0, items.length - getVisible()); }

    function goTo(idx) {
      current = Math.min(Math.max(idx, 0), maxIndex());
      const w = track.parentElement.offsetWidth;
      const gap = parseInt(getComputedStyle(track).gap) || 24;
      const itemW = (w - gap * (getVisible() - 1)) / getVisible();
      track.style.transform = `translateX(${-current * (itemW + gap)}px)`;
      if (dotsContainer) {
        dotsContainer.querySelectorAll('.dot').forEach((d, i) => {
          d.classList.toggle('active', i === current);
        });
      }
    }

    function buildDots() {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';
      const count = maxIndex() + 1;
      for (let i = 0; i < count; i++) {
        const btn = document.createElement('button');
        btn.className = 'dot' + (i === 0 ? ' active' : '');
        btn.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(btn);
      }
    }

    prev  && prev.addEventListener('click',  () => goTo(current - 1));
    next  && next.addEventListener('click',  () => goTo(current + 1));

    buildDots();
    goTo(0);

    window.addEventListener('resize', () => { buildDots(); goTo(0); });
  }

  /* ── Products carousel (Főoldal) ───────────────────────────── */
  const prodSection = document.querySelector('.products-section');
  if (prodSection) {
    initCarousel({
      trackWrap:     prodSection.querySelector('.carousel-track-wrap'),
      prev:          prodSection.querySelector('.carousel-arrow.prev'),
      next:          prodSection.querySelector('.carousel-arrow.next'),
      dotsContainer: prodSection.querySelector('.carousel-dots'),
      visibleCount:  4,
    });
  }

  /* ── Recipe cards carousel (Főoldal) ───────────────────────── */
  const recipeSection = document.querySelector('.recipe-cards-section');
  if (recipeSection) {
    initCarousel({
      trackWrap:     recipeSection.querySelector('.recipe-cards-track-wrap'),
      prev:          recipeSection.querySelector('.carousel-arrow.prev'),
      next:          recipeSection.querySelector('.carousel-arrow.next'),
      dotsContainer: recipeSection.querySelector('.carousel-dots'),
      visibleCount:  3,
    });
  }

  /* ── Similar products carousel (HP page) ───────────────────── */
  const similarSection = document.querySelector('.similar-section');
  if (similarSection) {
    initCarousel({
      trackWrap:     similarSection.querySelector('.carousel-track-wrap'),
      prev:          similarSection.querySelector('.carousel-arrow.prev'),
      next:          similarSection.querySelector('.carousel-arrow.next'),
      dotsContainer: similarSection.querySelector('.carousel-dots'),
      visibleCount:  3,
    });
  }

  /* ── Recipe cards carousel (HP page) ───────────────────────── */
  const relatedSection = document.querySelector('.related-recipes-section');
  if (relatedSection) {
    initCarousel({
      trackWrap:     relatedSection.querySelector('.recipe-cards-track-wrap'),
      prev:          relatedSection.querySelector('.carousel-arrow.prev'),
      next:          relatedSection.querySelector('.carousel-arrow.next'),
      dotsContainer: relatedSection.querySelector('.carousel-dots'),
      visibleCount:  3,
    });
  }

  /* ── Recipe search filter ───────────────────────────────────── */
  const searchInput = document.querySelector('.search-bar input');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase().trim();
      document.querySelectorAll('.receptek-card').forEach(card => {
        const title = card.querySelector('.receptek-card-title')?.textContent.toLowerCase() || '';
        card.style.display = title.includes(q) ? '' : 'none';
      });
    });
  }

});
