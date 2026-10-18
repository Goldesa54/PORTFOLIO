// ================= THEME TOGGLE =================
const themeIcon = document.getElementById('theme');
const body = document.body;

// Apply saved theme (light/dark) — class names updated in CSS
if (localStorage.getItem('theme') === 'light') body.classList.remove('dark-mode');
if (localStorage.getItem('theme') === 'dark') body.classList.add('dark-mode');

if (themeIcon) {
    themeIcon.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        themeIcon.classList.toggle('fa-moon');
        themeIcon.classList.toggle('fa-sun');
    });
}

// ================= MOBILE MENU ================= 
const menuIcon = document.getElementById('menu');
const nav = document.getElementById('nav');

if (menuIcon && nav) {
    menuIcon.addEventListener('click', () => nav.classList.toggle('active'));
}

// Close menu when a link is clicked
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => link.addEventListener('click', () => nav && nav.classList.remove('active')));

// ================= SMOOTH SCROLLING =================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ================= FORM VALIDATION =================
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = contactForm.querySelector('input[name="name"]');
        const email = contactForm.querySelector('input[name="email"]');
        const message = contactForm.querySelector('textarea[name="message"]');

        if (!name || !email || !message) return;
        if (name.value.trim() === '') return alert('Please enter your name');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value.trim())) return alert('Please enter a valid email');
        if (message.value.trim() === '') return alert('Please enter your message');

        // Simple UX feedback — in a real site you'd POST to an API
        alert('Thank you! Your message was sent.');
        contactForm.reset();
    });
}

// ================= SCROLL ANIMATIONS =================
const observerOptions = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-card, .project-card').forEach(el => {
    el.classList.add('pre-animate');
    observer.observe(el);
});

// ================= ACTIVE NAV LINK ================= 
// ================= ACTIVE NAV LINK + Scroll Top =================
const topBtn = document.getElementById('top');
window.addEventListener('scroll', () => {
    let current = '';
    document.querySelectorAll('section[id]').forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) current = section.id;
    });
    navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));

    if (topBtn) topBtn.classList.toggle('show', window.scrollY > 400);
});

if (topBtn) topBtn.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

// ================= TYPING EFFECT =================
const typingEl = document.getElementById('typing');
if (typingEl) {
    const roles = ['a Web Developer', 'an IT Student', 'a Problem Solver', 'a Lifelong Learner'];
    let idx = 0, char = 0, forward = true;
    function tick(){
        const word = roles[idx];
        if (forward) {
            char++;
            typingEl.textContent = word.slice(0,char);
            if (char === word.length) { forward = false; setTimeout(tick, 1200); return; }
        } else {
            char--;
            typingEl.textContent = word.slice(0,char);
            if (char === 0) { forward = true; idx = (idx+1)%roles.length; }
        }
        setTimeout(tick, forward ? 90 : 40);
    }
    tick();
}

const profileImageInput = document.getElementById('profileImageInput');
const profilePreview = document.getElementById('profilePreview');
if (profileImageInput && profilePreview) {
    profileImageInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            alert('Please upload a valid image file.');
            return;
        }
        const reader = new FileReader();
        reader.onload = () => profilePreview.src = reader.result;
        reader.readAsDataURL(file);
    });
}

// small helpers for animation class styles (kept in CSS)
console.log('Portfolio script loaded successfully!');

// ================= STAT COUNTERS =================
const counters = document.querySelectorAll('.count');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = +el.dataset.target;
            const duration = 1400;
            let start = null;
            function step(ts) {
                if (!start) start = ts;
                const progress = Math.min((ts - start) / duration, 1);
                el.textContent = Math.floor(progress * target);
                if (progress < 1) requestAnimationFrame(step);
                else el.textContent = target + (target >= 10 ? '' : '');
            }
            requestAnimationFrame(step);
            counterObserver.unobserve(el);
        }
    });
}, {threshold: 0.3});
counters.forEach(c => counterObserver.observe(c));

// ================= MOUSE GLOW =================
const mouseGlow = document.getElementById('mouse-glow');
if (mouseGlow) {
    document.addEventListener('mousemove', (e) => {
        mouseGlow.style.opacity = '1';
        mouseGlow.style.left = e.clientX + 'px';
        mouseGlow.style.top = e.clientY + 'px';
        mouseGlow.style.transform = 'translate(-50%,-50%) scale(1)';
    });
    document.addEventListener('mouseout', () => mouseGlow.style.opacity = '0');
}

// subtle parallax for blobs on mouse move (lightweight)
const blobs = document.querySelectorAll('.bg-blobs .blob');
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    blobs.forEach((b, i) => {
        const depth = (i + 1) * 0.6;
        b.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
    });
});
