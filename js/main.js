/* ── SOLASTICE — main.js ── */

/* Scroll-triggered animations */
const obs = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); }),
  { threshold: 0.1 }
);
document.querySelectorAll('.ani').forEach(el => obs.observe(el));

/* Sticky nav shadow */
const navEl = document.getElementById('nav');
window.addEventListener('scroll', () => {
  navEl.style.background = window.scrollY > 24
    ? 'rgba(19,18,16,0.98)'
    : 'rgba(19,18,16,0.92)';
});

/* Mobile nav toggle */
const toggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
toggle.addEventListener('click', () => navLinks.classList.toggle('open'));
document.querySelectorAll('#nav-links a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);

/* ── BUY MODAL ── */
const buyModal    = document.getElementById('buy-modal');
const buyOverlay  = document.getElementById('buy-overlay');

function openBuy() { buyOverlay.classList.add('open'); }
function closeBuy() { buyOverlay.classList.remove('open'); }

document.querySelectorAll('[data-buy]').forEach(el =>
  el.addEventListener('click', e => { e.preventDefault(); openBuy(); })
);
document.getElementById('buy-close').addEventListener('click', closeBuy);
buyOverlay.addEventListener('click', e => { if (e.target === buyOverlay) closeBuy(); });

document.getElementById('buy-form').addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.target.querySelector('.modal-submit');
  btn.textContent = 'Processing...';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Order Received. Probably.';
    setTimeout(() => {
      btn.textContent = "We'll email you. Maybe.";
      setTimeout(closeBuy, 1800);
    }, 1400);
  }, 1200);
});

/* ── VIDEO MODAL ── */
const vidOverlay = document.getElementById('vid-overlay');
document.getElementById('video-box').addEventListener('click', () =>
  vidOverlay.classList.add('open')
);
document.getElementById('vid-close').addEventListener('click', () =>
  vidOverlay.classList.remove('open')
);
vidOverlay.addEventListener('click', e => {
  if (e.target === vidOverlay) vidOverlay.classList.remove('open');
});

/* ── FAQ ACCORDION ── */
document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-q').addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

/* ── LIVE STATUS TICKER DATA ── */
const tickerMessages = [
  { dot: 'green',  text: 'AIMBOT: Online — mostly pointing at things' },
  { dot: 'red',    text: 'ANTICHEAT BYPASS: Bypassed (by anticheat)' },
  { dot: 'yellow', text: 'ESP: Rendering ±3 seconds off — adding character' },
  { dot: 'green',  text: 'SERVERS: Running, do not look at them directly' },
  { dot: 'red',    text: 'DETECTION STATUS: Detected since February' },
  { dot: 'yellow', text: 'CONFIG MENU: Exists. Does things. Unknown things.' },
  { dot: 'green',  text: 'INJECTION: Drag and drop. Works sometimes.' },
  { dot: 'red',    text: 'LAST BAN WAVE: 3 days ago. Good luck.' },
  { dot: 'yellow', text: 'UPDATE STATUS: Soon™' },
  { dot: 'green',  text: 'SUPPORT TEAM: Reading tickets. Not responding.' },
];

function buildTicker() {
  const track = document.getElementById('ticker-track');
  const doubled = [...tickerMessages, ...tickerMessages]; // duplicate for seamless loop
  track.innerHTML = doubled.map(m => `
    <span class="ticker-item">
      <span class="t-dot ${m.dot}"></span>
      ${m.text}
    </span>
  `).join('');
}
buildTicker();

/* ── LIVE USER COUNT (fake) ── */
const countEl = document.getElementById('live-count');
if (countEl) {
  let base = 2847;
  setInterval(() => {
    base += Math.floor(Math.random() * 3) - 1;
    countEl.textContent = base.toLocaleString();
  }, 3500);
}

/* keyboard close */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeBuy(); vidOverlay.classList.remove('open'); }
});
