document.body.classList.add('js');

const header = document.getElementById('site-header');
const onScroll = () => {
  header.classList.toggle('is-scrolled', window.scrollY > 24);
};
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

const navToggle = document.getElementById('nav-toggle');
const nav = document.getElementById('site-nav');

const closeNav = () => {
  nav.classList.remove('is-open');
  navToggle.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Открыть меню');
  document.body.classList.remove('nav-open');
};

navToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  navToggle.classList.toggle('is-open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
  document.body.classList.toggle('nav-open', isOpen);
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeNav);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeNav();
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach((element) => {
  revealObserver.observe(element);
});

const yearElement = document.getElementById('year');
yearElement.textContent = new Date().getFullYear();
