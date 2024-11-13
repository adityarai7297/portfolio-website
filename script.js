// Rotate the text for each title
const rotatingTextElements = document.querySelectorAll('.rotate');
let currentIndex = 0;

function rotateText() {
  rotatingTextElements.forEach((el) => el.classList.remove('active'));
  rotatingTextElements[currentIndex].classList.add('active');
  currentIndex = (currentIndex + 1) % rotatingTextElements.length;
}

// Initial call to set the first item active
rotateText();

// Rotate every 2 seconds
setInterval(rotateText, 2000);

// Highlight active link using IntersectionObserver
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

// Add the landing page to the observer
const landingPage = document.querySelector('#home');

const observerOptions = {
  root: null,
  threshold: 0.6 // 60% of the section needs to be in view
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const sectionId = entry.target.getAttribute('id');

    // Check if the landing page (home) is in view
    if (sectionId === 'home' && entry.isIntersecting) {
      // Remove active class from all nav links
      navLinks.forEach(link => link.classList.remove('active'));
    } else if (entry.isIntersecting) {
      // Highlight the current section's link
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === sectionId) {
          link.classList.add('active');
        }
      });
    }
  });
}, observerOptions);

// Observe each section and the landing page
observer.observe(landingPage);
sections.forEach(section => observer.observe(section));