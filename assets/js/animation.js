// CURSOR
const cur = document.getElementById("cursor"),
  ring = document.getElementById("cursor-ring");
let mx = 0,
  my = 0,
  rx = 0,
  ry = 0;
document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  cur.style.left = mx + "px";
  cur.style.top = my + "px";
});
function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + "px";
  ring.style.top = ry + "px";
  requestAnimationFrame(animRing);
}
animRing();
document.addEventListener("mouseenter", () => {
  cur.style.opacity = 1;
});
document.addEventListener("mouseleave", () => {
  cur.style.opacity = 0;
});

// PARTICLES
const canvas = document.getElementById("particles"),
  ctx = canvas.getContext("2d");
let W = window.innerWidth,
  H = window.innerHeight;
canvas.width = W;
canvas.height = H;
window.addEventListener("resize", () => {
  W = window.innerWidth;
  H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;
});
const pts = Array.from({ length: 55 }, () => ({
  x: Math.random() * W,
  y: Math.random() * H,
  vx: (Math.random() - 0.5) * 0.3,
  vy: (Math.random() - 0.5) * 0.3,
  r: Math.random() * 1.5 + 0.4,
  o: Math.random() * 0.5 + 0.1,
}));
function drawP() {
  ctx.clearRect(0, 0, W, H);
  pts.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0) p.x = W;
    if (p.x > W) p.x = 0;
    if (p.y < 0) p.y = H;
    if (p.y > H) p.y = 0;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(200,168,75,${p.o})`;
    ctx.fill();
    pts.forEach((p2) => {
      const dx = p.x - p2.x,
        dy = p.y - p2.y,
        d = Math.sqrt(dx * dx + dy * dy);
      if (d < 120) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(200,168,75,${(1 - d / 120) * 0.06})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    });
  });
  requestAnimationFrame(drawP);
}
drawP();

// NAV SCROLL
window.addEventListener("scroll", () =>
  document.getElementById("nav").classList.toggle("scrolled", scrollY > 60),
);

// MOBILE MENU
function toggleMenu() {
  const m = document.getElementById("mmenu");
  m.classList.toggle("open");
  document.body.style.overflow = m.classList.contains("open") ? "hidden" : "";
}

// SCROLL REVEAL
const rvObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("vi");
        rvObs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1 },
);
document.querySelectorAll(".rv").forEach((el) => rvObs.observe(el));

// GOLD LINES
const glObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("vi");
        glObs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.5 },
);
document.querySelectorAll(".gold-line").forEach((el) => glObs.observe(el));

// COUNTER ANIMATION
function animCounter(el, target, duration = 1800) {
  let start = null;
  const ease = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
  function step(ts) {
    if (!start) start = ts;
    const p = Math.min((ts - start) / duration, 1);
    el.textContent = Math.round(ease(p) * target);
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }
  requestAnimationFrame(step);
}
const cntObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const t = parseInt(e.target.dataset.target);
        animCounter(e.target, t);
        cntObs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.5 },
);
document
  .querySelectorAll(".counter,.counter2,.counter3")
  .forEach((el) => cntObs.observe(el));

// FORM
function submitForm() {
  document.getElementById("cForm").style.display = "none";
  document.getElementById("cSuccess").style.display = "block";
}
function scrollToContact() {
  document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
}

// PARALLAX HERO LINES (subtle)
window.addEventListener("scroll", () => {
  const sy = scrollY * 0.02;
  document.querySelectorAll(".hero-line-h").forEach((el, i) => {
    el.style.transform = `scaleX(1) translateY(${i % 2 === 0 ? -sy : sy}px)`;
  });
});
