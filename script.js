/* ═══════════════════════════════════════════════════════════════════════
   THE ATTENTION RESET — page behaviour
   Everything you need to change to go live is in CONFIG.
   ═══════════════════════════════════════════════════════════════════════ */

const CONFIG = {
  // Shown wherever the price appears. Change it once, here.
  price: '$19.99',

  // The struck-through anchor price on the offer card. This should be a price
  // the book has actually sold at — invented "was" prices count as deceptive
  // pricing in most markets. Set to '' to hide it.
  listPrice: '$50',

  // TODO: your Gumroad / Stripe Payment Link / Lemon Squeezy checkout URL.
  // Left empty, the buy button just stays on the pricing card.
  checkoutUrl: '',
};

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── Price and checkout ────────────────────────────────────────────────── */
document.querySelectorAll('[data-price]').forEach(el => {
  el.textContent = CONFIG.price;
});

document.querySelectorAll('[data-list-price]').forEach(el => {
  // An empty listPrice drops the anchor and its screen-reader label together.
  if (!CONFIG.listPrice) { el.previousElementSibling?.remove(); el.remove(); return; }
  el.textContent = CONFIG.listPrice;
});

if (CONFIG.checkoutUrl) {
  document.querySelectorAll('[data-checkout]').forEach(a => {
    a.href = CONFIG.checkoutUrl;
    a.rel = 'noopener';
  });
}

/* ── Reveal on scroll ──────────────────────────────────────────────────────
   One observer for the whole page. Elements above the fold reveal on load so
   the hero never waits for a scroll event. */
const revealables = document.querySelectorAll('[data-reveal]');

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealables.forEach(el => el.classList.add('is-in'));
} else {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      obs.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.1 });

  revealables.forEach(el => {
    if (el.getBoundingClientRect().top < innerHeight) {
      el.classList.add('is-in');   // already on screen at load
    } else {
      observer.observe(el);
    }
  });
}

/* ── Sticky buy bar ────────────────────────────────────────────────────────
   Appears once the hero CTA has scrolled away, hides again over the pricing
   card — no point selling what the reader is already looking at. */
const buybar = document.getElementById('buybar');
const hero   = document.querySelector('.s-hero');
const pricing = document.getElementById('pricing');

if (buybar && hero && 'IntersectionObserver' in window) {
  let pastHero = false;
  let onOffer  = false;

  const sync = () => {
    const show = pastHero && !onOffer;
    if (show) buybar.hidden = false;
    buybar.classList.toggle('is-on', show);
  };

  new IntersectionObserver(([e]) => {
    pastHero = !e.isIntersecting;
    sync();
  }, { threshold: 0 }).observe(hero);

  if (pricing) {
    new IntersectionObserver(([e]) => {
      onOffer = e.isIntersecting;
      sync();
    }, { threshold: 0.25 }).observe(pricing);
  }
}

/* ── Book tilt ─────────────────────────────────────────────────────────────
   A few degrees of parallax on pointer devices. The cover is the argument;
   letting it catch the light rewards looking at it. */
const book = document.getElementById('book');

if (book && !reduceMotion && matchMedia('(pointer: fine)').matches) {
  const art = book.closest('.hero__art');
  const MAX = 5;

  art.addEventListener('pointermove', e => {
    const r = art.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    book.style.setProperty('--ry', `${(x * MAX).toFixed(2)}deg`);
    book.style.setProperty('--rx', `${(-y * MAX).toFixed(2)}deg`);
  });

  art.addEventListener('pointerleave', () => {
    book.style.setProperty('--ry', '0deg');
    book.style.setProperty('--rx', '0deg');
  });
}

