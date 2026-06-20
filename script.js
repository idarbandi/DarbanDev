// Language and Theme Management
const langToggle = document.getElementById('langToggle');
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const bodyElement = document.body;

// Mobile Menu Elements
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');
const navLinksArray = document.querySelectorAll('.nav a');

let currentLang = localStorage.getItem('language') || 'en';
let currentTheme = localStorage.getItem('theme') || 'light';

// Initialize theme based on system preference if not set
if (!localStorage.getItem('theme')) {
  currentTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
  applyLanguage(currentLang);
  applyTheme(currentTheme);
  updateControls();
});

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  const icon = mobileMenuBtn.querySelector('i');
  if (navMenu.classList.contains('active')) {
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-times');
  } else {
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  }
});

// Close mobile menu when a link is clicked
navLinksArray.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  });
});

// Language Toggle
langToggle.addEventListener('click', () => {
  currentLang = currentLang === 'en' ? 'fa' : 'en';
  localStorage.setItem('language', currentLang);
  applyLanguage(currentLang);
  updateControls();
});

// Theme Toggle
themeToggle.addEventListener('click', () => {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  localStorage.setItem('theme', currentTheme);
  applyTheme(currentTheme);
  updateControls();
});

// Apply Language
function applyLanguage(lang) {
  const elements = document.querySelectorAll('[data-en][data-fa]');
  elements.forEach(el => {
    const text = lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-fa');
    if (el.children.length === 0) {
      el.textContent = text;
    }
  });

  // Set HTML dir attribute
  htmlElement.setAttribute('lang', lang);
  htmlElement.setAttribute('dir', lang === 'fa' ? 'rtl' : 'ltr');
  bodyElement.setAttribute('dir', lang === 'fa' ? 'rtl' : 'ltr');
}

// Apply Theme
function applyTheme(theme) {
  if (theme === 'dark') {
    bodyElement.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    bodyElement.classList.remove('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }
}

// Update Controls
function updateControls() {
  langToggle.textContent = currentLang === 'en' ? 'فارسی' : 'English';
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Active navigation link on scroll
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('.section');
  
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    // Added a slight offset for better accuracy when header is fixed
    if (scrollY >= sectionTop - 250) {
      current = section.getAttribute('id');
    }
  });

  navLinksArray.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      // Stop observing once animated
      observer.unobserve(entry.target); 
    }
  });
}, observerOptions);

document.querySelectorAll('.project-card, .testimonial-card, .skill-category, .cert-item, .experience-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
  observer.observe(el);
});
