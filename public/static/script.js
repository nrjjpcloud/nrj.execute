// neeraj-built — vanilla JS / GSAP / Lenis

// ---------- swap in CDN assets ----------
const LOGO_URL = "/__l5e/assets-v1/2049a676-bec2-4177-905e-efc98d6e9eb1/neeraj-built-logo.png";
const PORTRAIT_URL = "/__l5e/assets-v1/8317c39d-6e68-4e62-a8f2-b4b91c5188c2/neeraj-portrait.jpeg";
document.getElementById("brandLogo").src = LOGO_URL;
document.getElementById("heroPortrait").src = PORTRAIT_URL;

// ---------- year ----------
document.getElementById("year").textContent = new Date().getFullYear();

// ---------- IST clock ----------
function tickClock() {
  const d = new Date();
  const s = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit", minute: "2-digit", second: "2-digit",
    hour12: false, timeZone: "Asia/Kolkata"
  }).format(d);
  document.getElementById("clock").textContent = s + " IST";
}
tickClock(); setInterval(tickClock, 1000);

// ---------- custom cursor ----------
const dot = document.getElementById("cursorDot");
const ring = document.getElementById("cursorRing");
const label = document.getElementById("cursorLabel");
let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
addEventListener("mousemove", e => { mx = e.clientX; my = e.clientY; });
(function loop() {
  rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
  dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
  ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
  requestAnimationFrame(loop);
})();
addEventListener("mouseover", e => {
  const t = e.target.closest("[data-cursor]");
  if (t) { ring.classList.add("has-label"); label.textContent = t.dataset.cursor || ""; }
  else   { ring.classList.remove("has-label"); label.textContent = ""; }
});

// ---------- Lenis smooth scroll ----------
const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
function raf(t) { lenis.raf(t); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

// ---------- GSAP ScrollTrigger animations ----------
gsap.registerPlugin(ScrollTrigger);
lenis.on("scroll", ScrollTrigger.update);

gsap.from(".display-hero", { y: 60, opacity: 0, duration: 1.2, ease: "expo.out" });
gsap.from(".lead-text",    { y: 30, opacity: 0, duration: 1, delay: .3, ease: "expo.out" });
gsap.from(".portrait-wrap",{ scale: .92, opacity: 0, duration: 1.2, delay: .2, ease: "expo.out" });

gsap.utils.toArray(".service-card").forEach((card, i) => {
  gsap.from(card, {
    y: 60, opacity: 0, duration: .9, delay: i * .1, ease: "expo.out",
    scrollTrigger: { trigger: card, start: "top 85%" }
  });
});

gsap.from(".pitch-copy", {
  y: 40, opacity: 0, duration: 1, ease: "expo.out",
  scrollTrigger: { trigger: ".pitch", start: "top 75%" }
});

// ---------- contact form ----------
document.querySelectorAll(".chip-group").forEach(group => {
  group.addEventListener("click", e => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    group.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
    chip.classList.add("active");
  });
});

const BUDGETS_USD = ["N/A", "$2–5k", "$5–8k", "$8–12k", "$12k+"];
const BUDGETS_INR = ["N/A", "₹1.5–4L", "₹4–7L", "₹7–10L", "₹10L+"];
const budgetChips = document.getElementById("budgetChips");
function renderBudget(cur) {
  const list = cur === "INR" ? BUDGETS_INR : BUDGETS_USD;
  budgetChips.innerHTML = list.map(b => `<button type="button" class="chip">${b}</button>`).join("");
}
renderBudget("USD");

document.getElementById("currencyToggle").addEventListener("click", e => {
  const b = e.target.closest("button[data-cur]");
  if (!b) return;
  document.querySelectorAll("#currencyToggle button").forEach(x => x.classList.remove("active"));
  b.classList.add("active");
  renderBudget(b.dataset.cur);
});

document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const data = Object.fromEntries(fd.entries());
  data.service = document.querySelector('[data-name="service"] .chip.active')?.textContent || null;
  data.budget  = document.querySelector('[data-name="budget"] .chip.active')?.textContent || null;
  data.currency = document.querySelector("#currencyToggle button.active")?.dataset.cur || "USD";
  console.log("Contact form submission:", data);
  document.getElementById("formStatus").textContent = "Thanks — I'll get back within 24h.";
  e.target.reset();
  document.querySelectorAll(".chip.active").forEach(c => c.classList.remove("active"));
});
