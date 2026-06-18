// ===============================
// MENU RESPONSIVE
// ===============================
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    menuToggle.classList.toggle("active");
  });
}

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    if (navMenu) {
      navMenu.classList.remove("active");
    }

    if (menuToggle) {
      menuToggle.classList.remove("active");
    }
  });
});


// ===============================
// TYPING ANIMATION
// ===============================
const typingText = document.getElementById("typingText");

const words = [
  "UI/UX Designer",
  "Web Designer",
  "Cloud Computing Student",
  "System Analyst",
  "Data Analyst"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  if (!typingText) return;

  const currentWord = words[wordIndex];

  if (isDeleting) {
    typingText.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingText.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  let typingSpeed = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === currentWord.length) {
    typingSpeed = 1200;
    isDeleting = true;
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    typingSpeed = 400;
  }

  setTimeout(typeEffect, typingSpeed);
}

typeEffect();


// ===============================
// SCROLL REVEAL ANIMATION
// ===============================
const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
  revealElements.forEach(element => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const revealPoint = 120;

    if (elementTop < windowHeight - revealPoint) {
      element.classList.add("show");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);


// ===============================
// ACTIVE NAVBAR SAAT SCROLL
// ===============================
const sections = document.querySelectorAll("section[id]");

function activeNavbar() {
  if (sections.length === 0) return;

  let currentSection = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 130;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    const href = link.getAttribute("href");

    if (!href) return;

    /*
      Untuk halaman utama, href biasanya: #home, #about, #projects.
      Untuk halaman detail, href biasanya: index.html#projects.
      Bagian ini dibuat aman agar tidak merusak active menu di halaman detail.
    */
    if (href.startsWith("#")) {
      link.classList.remove("active");

      if (href === `#${currentSection}`) {
        link.classList.add("active");
      }
    }
  });
}

window.addEventListener("scroll", activeNavbar);
window.addEventListener("load", activeNavbar);


// ===============================
// ANIMASI SKILL BAR
// ===============================
const skillBars = document.querySelectorAll(".skill-bar span");
let skillAnimated = false;

function animateSkills() {
  const skillsSection = document.querySelector("#skills");

  if (!skillsSection) return;

  const sectionTop = skillsSection.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if (sectionTop < windowHeight - 150 && !skillAnimated) {
    skillBars.forEach(bar => {
      const width = bar.getAttribute("data-width");
      bar.style.width = width;
    });

    skillAnimated = true;
  }
}

window.addEventListener("scroll", animateSkills);
window.addEventListener("load", animateSkills);


// ===============================
// PREVIEW GAMBAR PROJECT DAN GALLERY DETAIL
// ===============================
const projectPreviewButtons = document.querySelectorAll(
  ".project-preview, .gallery-preview"
);

const projectModal = document.getElementById("projectModal");
const projectModalImage = document.getElementById("projectModalImage");
const projectModalTitle = document.getElementById("projectModalTitle");
const projectModalClose = document.getElementById("projectModalClose");

projectPreviewButtons.forEach(button => {
  button.addEventListener("click", () => {
    const imageSrc = button.getAttribute("data-img");
    const title = button.getAttribute("data-title");

    if (!projectModal || !projectModalImage || !projectModalTitle) return;

    projectModalImage.src = imageSrc;
    projectModalTitle.textContent = title || "Preview Project";

    projectModal.classList.add("show");
    document.body.style.overflow = "hidden";
  });
});

function closeProjectModal() {
  if (!projectModal || !projectModalImage) return;

  projectModal.classList.remove("show");
  projectModalImage.src = "";
  document.body.style.overflow = "auto";
}

if (projectModalClose) {
  projectModalClose.addEventListener("click", closeProjectModal);
}

if (projectModal) {
  projectModal.addEventListener("click", event => {
    if (event.target === projectModal) {
      closeProjectModal();
    }
  });
}

document.addEventListener("keydown", event => {
  if (
    event.key === "Escape" &&
    projectModal &&
    projectModal.classList.contains("show")
  ) {
    closeProjectModal();
  }
});


// ===============================
// TOMBOL SCROLL KE ATAS
// ===============================
const scrollTopBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {
  if (!scrollTopBtn) return;

  if (window.scrollY > 500) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
});

if (scrollTopBtn) {
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}