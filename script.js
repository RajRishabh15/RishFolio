// ===== PROJECT MODAL LOGIC =====
const projectsData = {
  'french-tech': {
    title: 'France & Technology',
    tag: 'Full Stack',
    desc: 'Innovative France is a high-end digital hub designed to celebrate the engineering marvels that define the French spirit of discovery. From the wide-body twin-engine logic of Airbus and the record-breaking speed of the TGV, to the tactical air superiority of the Dassault Rafale and the galactic reach of Arianespace.',
    stack: ['React', 'Node.js', 'Tailwind', 'Vite'],
    img: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=2020&auto=format&fit=crop',
    live: 'https://french-tech.vercel.app',
    github: 'https://github.com/OpticRish/French_Tech'
  },
  'chandrayaan3': {
    title: 'Chandrayaan Mission Web',
    tag: 'Space Tech',
    desc: 'A dedicated website providing comprehensive insights into ISRO\'s Chandrayaan-3 lunar mission. Includes detailed information on launch timeline, objectives, spacecraft design, landing sequence, and scientific achievements. Built to educate and inspire space enthusiasts and curious minds.',
    stack: ['HTML', 'Javascript', 'Tailwind CSS'],
    img: 'https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=2000&auto=format&fit=crop',
    live: 'https://chandrayaan3-five.vercel.app',
    github: 'https://github.com/OpticRish/Chandrayaan3'
  },
  'todo-cli': {
    title: 'To-Do List App',
    tag: 'CLI Tool',
    desc: 'A simple, yet powerful command-line To-Do List app built completely with core Python. It requires no external libraries and works directly in your terminal, making it incredibly fast and lightweight for developers who prefer living in the console.',
    stack: ['Python', 'CLI', 'Terminal'],
    img: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=2000&auto=format&fit=crop',
    live: 'https://github.com/OpticRish/To-Do-List-CLI-',
    github: 'https://github.com/OpticRish/To-Do-List-CLI-'
  },
  'tech-event': {
    title: 'Tech Event Web',
    tag: 'Frontend',
    desc: 'A clean and responsive promotional website for a technology event. Designed to showcase schedules, speakers, and ticketing information with a modern aesthetic.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2000&auto=format&fit=crop',
    live: 'https://tech-event-web.vercel.app',
    github: 'https://github.com/OpticRish/Tech-Event-Web'
  }
};

function openProjectModal(projectId) {
  const data = projectsData[projectId];
  if (!data) return;

  document.getElementById('modal-title').textContent = data.title;
  document.getElementById('modal-tag').textContent = data.tag;
  document.getElementById('modal-desc').textContent = data.desc;
  document.getElementById('modal-img').src = data.img;
  document.getElementById('modal-live-link').href = data.live;
  document.getElementById('modal-github').href = data.github;

  const stackContainer = document.getElementById('modal-stack');
  stackContainer.innerHTML = '';
  data.stack.forEach(tech => {
    const span = document.createElement('span');
    span.className = 'px-3 py-1 bg-sky/10 border border-sky/20 rounded-lg text-[11px] text-sky tracking-wider';
    span.textContent = tech;
    stackContainer.appendChild(span);
  });

  const modal = document.getElementById('project-modal');
  const content = document.getElementById('project-modal-content');

  modal.classList.remove('hidden');
  modal.classList.add('open');
  document.body.classList.add('modal-active');
  void modal.offsetWidth;
  modal.classList.remove('opacity-0');
  content.classList.remove('scale-95');
  content.classList.add('scale-100');
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  const content = document.getElementById('project-modal-content');

  modal.classList.add('opacity-0');
  modal.classList.remove('open');
  document.body.classList.remove('modal-active');
  content.classList.remove('scale-100');
  content.classList.add('scale-95');

  setTimeout(() => {
    modal.classList.add('hidden');
  }, 300);
}


const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});

function animRing() {
  rx += (mx - rx) * 0.25;
  ry += (my - ry) * 0.25;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animRing);
}
animRing();

const hoverTargets = 'a, button, [onclick], .project-card, .tool-pill, .tag, .nav-brand, .btn-primary, .btn-outline, .btn-abt, .contact-link';
document.querySelectorAll(hoverTargets).forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('cursor--hover');
    ring.classList.add('cursor--hover');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('cursor--hover');
    ring.classList.remove('cursor--hover');
  });
});

document.addEventListener('mouseleave', () => {
  cursor.style.opacity = '0';
  ring.style.opacity = '0';
});
document.addEventListener('mouseenter', () => {
  cursor.style.opacity = '1';
  ring.style.opacity = '1';
});

document.addEventListener('mousedown', () => {
  cursor.style.transform = 'translate(-50%, -50%) scale(0.75)';
});
document.addEventListener('mouseup', () => {
  cursor.style.transform = 'translate(-50%, -50%) scale(1)';
});

const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const colors = [
  'rgba(201,184,240,',
  'rgba(244,167,185,',
  'rgba(168,216,240,',
  'rgba(255,211,182,',
  'rgba(255,255,255,',
  'rgba(168,230,207,',
  'rgba(255,224,163,',
];

const stars = [];
for (let i = 0; i < 200; i++) {
  stars.push({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 1.4 + 0.2,
    color: colors[Math.floor(Math.random() * colors.length)],
    speed: Math.random() * 0.08 + 0.01,
    twinkleSpeed: Math.random() * 0.02 + 0.005,
    twinkleOffset: Math.random() * Math.PI * 2,
    opacity: Math.random() * 0.6 + 0.1,
  });
}

const glitters = [];
for (let i = 0; i < 120; i++) {
  let vx = (Math.random() - 0.5) * 0.3;
  let vy = (Math.random() - 0.5) * 0.3;
  glitters.push({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    size: Math.random() * 3 + 1.5,
    color: colors[Math.floor(Math.random() * colors.length)],
    life: Math.random(),
    lifeSpeed: Math.random() * 0.008 + 0.003,
    vx: vx,
    vy: vy,
    baseVx: vx,
    baseVy: vy,
  });
}

const shooters = [];
function spawnShooter() {
  shooters.push({
    x: Math.random() * window.innerWidth * 0.7,
    y: Math.random() * window.innerHeight * 0.4,
    len: Math.random() * 120 + 60,
    speed: Math.random() * 6 + 5,
    angle: Math.PI / 6 + (Math.random() - 0.5) * 0.3,
    opacity: 1,
    color: colors[Math.floor(Math.random() * 3)],
    life: 1,
  });
}
spawnShooter();
setInterval(spawnShooter, 2800);

const dustParticles = [];
for (let i = 0; i < 25; i++) {
  let vx = (Math.random() - 0.5) * 0.15;
  let vy = (Math.random() - 0.5) * 0.15;
  dustParticles.push({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 80 + 30,
    color: colors[Math.floor(Math.random() * colors.length)],
    opacity: Math.random() * 0.04 + 0.01,
    vx: vx,
    vy: vy,
    baseVx: vx,
    baseVy: vy,
  });
}

let t = 0;

function drawSparkle(x, y, size, color, opacity) {
  ctx.save();
  ctx.translate(x, y);
  ctx.globalAlpha = opacity;
  const arms = 4;
  for (let a = 0; a < arms; a++) {
    ctx.save();
    ctx.rotate((a / arms) * Math.PI * 2);
    const grad = ctx.createLinearGradient(0, 0, 0, -size * 2.5);
    grad.addColorStop(0, color + '1)');
    grad.addColorStop(0.3, color + opacity + ')');
    grad.addColorStop(1, color + '0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(-size * 0.15, 0);
    ctx.lineTo(0, -size * 2.5);
    ctx.lineTo(size * 0.15, 0);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
  ctx.beginPath();
  ctx.arc(0, 0, size * 0.5, 0, Math.PI * 2);
  ctx.fillStyle = color + (opacity * 1.5) + ')';
  ctx.fill();
  ctx.restore();
}

function loop() {
  t += 0.016;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const d of dustParticles) {
    let dx = d.x - mx;
    let dy = d.y - my;
    let dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 200) {
      let force = (200 - dist) / 200;
      d.vx += (dx / dist) * force * 0.05;
      d.vy += (dy / dist) * force * 0.05;
    }
    d.vx += (d.baseVx - d.vx) * 0.02;
    d.vy += (d.baseVy - d.vy) * 0.02;

    d.x += d.vx;
    d.y += d.vy;
    if (d.x < -200) d.x = canvas.width + 200;
    if (d.x > canvas.width + 200) d.x = -200;
    if (d.y < -200) d.y = canvas.height + 200;
    if (d.y > canvas.height + 200) d.y = -200;
    const g = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r);
    g.addColorStop(0, d.color + (d.opacity * 3) + ')');
    g.addColorStop(1, d.color + '0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
    ctx.fill();
  }

  for (const s of stars) {
    s.y += s.speed;
    s.x += s.speed * 0.2;
    if (s.y > canvas.height + 5) { s.y = -5; s.x = Math.random() * canvas.width; }
    if (s.x > canvas.width + 5) { s.x = -5; }
    const twinkle = 0.5 + 0.5 * Math.sin(t * s.twinkleSpeed * 60 + s.twinkleOffset);
    const op = s.opacity * twinkle;
    ctx.globalAlpha = op;
    ctx.fillStyle = s.color + '1)';
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
  }

  for (const g of glitters) {
    let dx = g.x - mx;
    let dy = g.y - my;
    let dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 150) {
      let force = (150 - dist) / 150;
      g.vx += (dx / dist) * force * 0.2;
      g.vy += (dy / dist) * force * 0.2;
    }
    g.vx += (g.baseVx - g.vx) * 0.05;
    g.vy += (g.baseVy - g.vy) * 0.05;

    g.x += g.vx;
    g.y += g.vy;
    g.life += g.lifeSpeed;
    if (g.life > 1) {
      g.life = 0;
      g.x = Math.random() * canvas.width;
      g.y = Math.random() * canvas.height;
      g.color = colors[Math.floor(Math.random() * colors.length)];
      g.size = Math.random() * 3 + 1.5;
    }
    const phase = Math.sin(g.life * Math.PI);
    drawSparkle(g.x, g.y, g.size, g.color, phase * 0.85);
  }

  for (let i = shooters.length - 1; i >= 0; i--) {
    const s = shooters[i];
    s.x += Math.cos(s.angle) * s.speed;
    s.y += Math.sin(s.angle) * s.speed;
    s.life -= 0.018;

    if (s.life <= 0 || s.x > canvas.width + 200 || s.y > canvas.height + 200) {
      shooters.splice(i, 1);
      continue;
    }

    const tailX = s.x - Math.cos(s.angle) * s.len;
    const tailY = s.y - Math.sin(s.angle) * s.len;
    const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
    grad.addColorStop(0, s.color + '0)');
    grad.addColorStop(0.7, s.color + (s.life * 0.5) + ')');
    grad.addColorStop(1, s.color + (s.life * 0.9) + ')');
    ctx.globalAlpha = s.life;
    ctx.strokeStyle = grad;
    ctx.lineWidth = 1.5;
    ctx.shadowBlur = 8;
    ctx.shadowColor = s.color + '0.8)';
    ctx.beginPath();
    ctx.moveTo(tailX, tailY);
    ctx.lineTo(s.x, s.y);
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.globalAlpha = s.life * 0.9;
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(s.x, s.y, 1.5, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.globalAlpha = 1;
  requestAnimationFrame(loop);
}
loop();

function toggleMobileNav() {
  const ham = document.getElementById('hamburger');
  const drawer = document.getElementById('mobileNav');
  ham.classList.toggle('open');
  drawer.classList.toggle('open');
}

function closeMobileNav() {
  document.getElementById('hamburger').classList.remove('open');
  document.getElementById('mobileNav').classList.remove('open');
}

document.addEventListener('click', (e) => {
  const drawer = document.getElementById('mobileNav');
  const ham = document.getElementById('hamburger');

  if (drawer.classList.contains('open') && !drawer.contains(e.target) && !ham.contains(e.target)) {
    closeMobileNav();
    e.stopPropagation();
  }
}, true);

function showPage(id, pushHistory = true) {
  document.querySelectorAll('.page, .section-page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  document.querySelectorAll('.mobile-nav-drawer a').forEach(a => a.classList.remove('active'));

  const page = document.getElementById(id);
  if (page) {
    page.classList.add('active');
    page.querySelectorAll('.section-header, .about-grid, .projects-grid, .skills-layout, .contact-layout').forEach(el => {
      el.style.animation = 'none';
      el.offsetHeight;
      el.style.animation = '';
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const navLink = document.getElementById('nav-' + id);
  if (navLink) navLink.classList.add('active');

  const mNavLink = document.getElementById('mnav-' + id);
  if (mNavLink) mNavLink.classList.add('active');

  // Toggle education page navigation mode
  const nav = document.querySelector('nav');
  if (id === 'education') {
    nav.classList.add('education-mode');
  } else {
    nav.classList.remove('education-mode');
  }

  if (id === 'skills') {
    setTimeout(animSkills, 400);
  }

  // Push a history entry so the browser back button navigates between sections
  if (pushHistory) {
    const currentState = history.state;
    if (!currentState || currentState.section !== id) {
      history.pushState({ section: id }, '', '#' + id);
    }
  }
}

// Handle browser back/forward button — restore the correct section
window.addEventListener('popstate', (e) => {
  if (e.state && e.state.section) {
    showPage(e.state.section, false);
  } else {
    // No state means we've gone back to the very start — show home
    showPage('home', false);
  }
});

// On first load, set an initial history entry so back button has somewhere to go
(function initHistory() {
  const hash = window.location.hash.replace('#', '');
  const validPages = ['home', 'about', 'education', 'projects', 'skills', 'contact'];
  const startPage = validPages.includes(hash) ? hash : 'home';
  // Replace current entry (no extra back step on load)
  history.replaceState({ section: startPage }, '', '#' + startPage);
  if (startPage !== 'home') showPage(startPage, false);
})();

function animSkills() {
  document.querySelectorAll('.skill-fill').forEach(bar => {
    bar.style.width = bar.dataset.w + '%';
  });
}

document.addEventListener('keydown', e => {
  const pages = ['home', 'about', 'education', 'projects', 'skills', 'contact'];
  const current = [...document.querySelectorAll('.page.active, .section-page.active')].map(el => el.id)[0];
  const idx = pages.indexOf(current);
  if (e.key === 'ArrowRight' && idx < pages.length - 1) showPage(pages[idx + 1]);
  if (e.key === 'ArrowLeft' && idx > 0) showPage(pages[idx - 1]);
});

function handleFormSubmit(event) {
  event.preventDefault();

  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submit-btn');
  const status = document.getElementById('contact-status');

  const name = document.getElementById('contact-name').value.trim();
  const email = document.getElementById('contact-email').value.trim();
  const message = document.getElementById('contact-message').value.trim();

  if (!name || !email || !message) {
    status.textContent = 'Please fill in all fields before sending.';
    return false;
  }

  status.textContent = 'Sending message...';
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  // Submit form via fetch
  fetch(form.action, {
    method: 'POST',
    body: new FormData(form),
    headers: {
      'Accept': 'application/json'
    }
  })
    .then(response => {
      if (response.ok) {
        status.textContent = '✓ Message sent successfully! I will get back to you soon.';
        form.reset();
        submitBtn.textContent = 'Send Message ✦';
        setTimeout(() => {
          status.textContent = '';
          submitBtn.disabled = false;
        }, 3000);
      } else {
        status.textContent = 'Oops! Something went wrong. Please try again.';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message ✦';
      }
    })
    .catch(error => {
      console.error('Form submission error:', error);
      status.textContent = 'Network error. Please check your connection and try again.';
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message ✦';
    });

  return false;
}

window.addEventListener('load', () => {
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 800);
});
