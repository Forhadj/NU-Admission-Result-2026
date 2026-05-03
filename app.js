/* ══════════════════════════════════════════════
   NU ADMISSION RESULT 2026 — app.js
   ══════════════════════════════════════════════ */

// ─── Tab Switching ───────────────────────────
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;
    document.querySelectorAll('.tab-btn').forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    document.getElementById('tab-' + target).classList.add('active');
  });
});

// ─── Search & Redirect ───────────────────────
function handleSearch() {
  const roll = document.getElementById('roll-input').value.trim();
  const url = 'http://app.nu.edu.bd/nu-web/admissionTestResultQueryForm';
  if (roll) {
    // Open official site; user will enter roll there
    window.open(url, '_blank', 'noopener,noreferrer');
  } else {
    // Still open site even if blank
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}

// Allow Enter key in search input
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('roll-input');
  if (input) {
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') handleSearch();
    });
  }
});

// ─── SMS Generator ───────────────────────────
function updateSMS() {
  const val = document.getElementById('sms-input').value.trim();
  const preview = document.getElementById('sms-preview');
  const sendBtn = document.getElementById('sms-send-btn');
  const msg = val ? `NU ATHN ${val}` : 'NU ATHN ...';
  preview.textContent = msg;
  if (val) {
    sendBtn.href = `sms:16222?body=${encodeURIComponent(msg)}`;
  } else {
    sendBtn.href = '#';
  }
}

function copySMS() {
  const val = document.getElementById('sms-input').value.trim();
  if (!val) { showToast('Please enter your roll number first'); return; }
  const msg = `NU ATHN ${val}`;
  navigator.clipboard.writeText(msg).then(() => {
    showToast('Copied: ' + msg);
  }).catch(() => {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = msg;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast('Copied: ' + msg);
  });
}

function sendSMS(e) {
  const val = document.getElementById('sms-input').value.trim();
  if (!val) {
    e.preventDefault();
    showToast('Please enter your roll number first');
    return false;
  }
  return true;
}

// ─── Toast Notification ──────────────────────
function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

// ─── Counter Animations ──────────────────────
function animateCounters() {
  document.querySelectorAll('.counter').forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1600;
    const start = performance.now();
    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(ease * target).toLocaleString('en-US');
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target.toLocaleString('en-US');
    }
    requestAnimationFrame(tick);
  });
}

// ─── Progress Bar Animation ──────────────────
function animateProgress() {
  document.querySelectorAll('.progress-fill[data-w]').forEach(el => {
    setTimeout(() => {
      el.style.width = el.dataset.w;
    }, 400);
  });
}

// ─── Intersection Observer for Hero ─────────
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      animateProgress();
      observer.disconnect();
    }
  });
}, { threshold: 0.2 });

const heroEl = document.querySelector('.hero');
if (heroEl) observer.observe(heroEl);
